import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const TokenInput = ({ id, name, label, placeholder, register, validationProps, errors }) => {
  const { setValue, watch } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const tokensFromForm = watch(name);

  // Initialize tokens as an array
  const [tokens, setTokens] = useState(Array.isArray(tokensFromForm) ? tokensFromForm : []);

  const handleAddToken = () => {
    if (inputValue.trim()) {
      const newTokens = [...tokens, inputValue.trim()];
      setTokens(newTokens);
      setValue(name, newTokens); // Update form value
      setInputValue(''); // Clear input
    }
  };

  const handleRemoveToken = (indexToRemove) => {
    const newTokens = tokens.filter((_, index) => index !== indexToRemove);
    setTokens(newTokens);
    setValue(name, newTokens); // Update form value
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      handleAddToken();
    }
    if (event.key === 'Backspace' && !inputValue && tokens.length > 0) {
      // Remove the last token when backspace is pressed and input is empty
      handleRemoveToken(tokens.length - 1);
    }
  };

  console.log({
    validation: errors[name],
    validationProps
  });

  const { onChange: formOnChange, ...rest } = register(name, validationProps);

  const handleTokenChange = (e) => {
    setInputValue(e.target.value)
    formOnChange(e)
  }



  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {name}
      </label>
      <div
        className={`flex items-center flex-wrap bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${errors[name] ? 'border-red-500' : ''
          }`}
      >
        {tokens.map((token, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 flex items-center"
          >
            {token}
            <button
              type="button"
              onClick={() => handleRemoveToken(index)}
              className="ml-1 bg-transparent text-red-500 hover:text-red-700 dark:hover:text-red-300 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          id={id}
          name={name}
          value={inputValue}
          onChange={(e) => handleTokenChange(e)}
          onKeyDown={handleKeyDown}
          placeholder={tokens.length === 0 ? placeholder : ''}
          className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 dark:placeholder-gray-400"
        />
      </div>
      {errors[name] && (
        <div className="error">
          <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
        </div>
      )}
    </div>
  );
};

export default TokenInput;

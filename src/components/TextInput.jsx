import React from 'react';

const TextInput = ({ id, name, label, placeholder, register, errors,validationProps, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      {...register(name, validationProps)}
      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
        errors[name] ? 'border-red-500' : ''
      }`}
    />
    {errors[name] && (
        <div className="error">
          {Array.isArray(errors[name])
            ? errors[name].map((error, index) => (
                <p key={index} className="text-red-500 text-xs italic">
                  {error.message}
                </p>
              ))
            : <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
          }
        </div>
      )}
  </div>
);

export default TextInput;
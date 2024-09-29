import React from 'react';

const PasswordInput = ({ id, name, label, placeholder,  register, errors, validationProps,...rest }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type="password"
      id={id}
      name={name}
      placeholder={placeholder}
      {...register(name, validationProps)}
      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
        errors[name] ? 'border-red-500' : ''
      }`}
    />
    {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
      )}
  </div>
);

export default PasswordInput;

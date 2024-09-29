import React from 'react';

const RadioGroupInput = ({ id, name, label, options, register, validationProps }) => (
  <div className="mb-4">
    <span className="block text-sm font-medium text-gray-900 dark:text-white">{label}</span>
    <div className=" space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            id={`${id}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            {...register(name, validationProps)}
            className="h-4 w-4 text-indigo-600 cursor-pointer border-gray-300 focus:ring-indigo-500"
          />
          <label htmlFor={`${id}-${option.value}`} className="p-3 cursor-pointer block  text-sm font-medium text-gray-900 dark:text-white">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default RadioGroupInput;
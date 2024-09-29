import React from 'react';

const CheckboxInput = ({ id, name, label }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={id}
      name={name}
      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
  </div>
);

export default CheckboxInput;
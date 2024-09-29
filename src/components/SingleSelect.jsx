import React from 'react';
import Select from 'react-select';

const SingleSelect = ({ field, register, errors }) => {
    const options = [];

    const defaultOption = { value: '', label: 'Please select' };
    const optionsWithDefault = [defaultOption, ...options];
  return (
    <div>
        <label htmlFor={field.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {field.label}
        </label>
      <Select
        className={`${errors[field.name] ? 'border-red-500' : ''}`}
        options={optionsWithDefault}
        {...register(field.name, {
          required: field.validation?.required?field.validation?.message:field.validation?.required,
        })}
      />
      {errors[field.name] && <div className="text-red-600 text-sm mt-2">{errors[field.name].message}</div>}
    </div>
  );
};

export default SingleSelect;
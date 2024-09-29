import React from 'react';
import Select from 'react-select';
// import { useSelector } from 'react-redux';

const MultiSelect = ({ field, register, errors }) => {
    const options = [];
  return (
    <div>
      <label>{field.label}</label>
      <Select
        options={options}
        isMulti
        {...register(field.name, {
          required: field.validation?.required,
        })}
      />
      {errors[field.name] && <span>{errors[field.name].message}</span>}
    </div>
  );
};

export default MultiSelect;
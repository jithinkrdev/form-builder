import React from 'react'

const TextArea = ({field, register, errors, validationProps}) => (
    <div className="form-field mb-4">
    <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {field.label}
    </label>
    <textarea
      id={field.name}
      {...register(field.name, validationProps)}
      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${errors[field.name] ? 'border-red-500' : ''}`}
      rows={field.rows || 3}
    />
    {errors[field.name] && (
      <div className="text-red-500 text-xs italic">
        {errors[field.name].message}
      </div>
    )}
  </div>
)

export default TextArea
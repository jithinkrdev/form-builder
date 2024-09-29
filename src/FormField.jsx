import React from 'react';
import TextInput from './components/TextInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import CheckboxInput from './components/CheckboxInput';
import RadioGroupInput from './components/RadioGroupInput';
import FileUpload from './components/FileUpload';
import DatePicker from './components/DatePicker';
import TextArea from './components/TextArea';
import { useFormContext } from 'react-hook-form';
import SingleSelect from './components/SingleSelect';
import MultiSelect from './components/MultiSelect';
import TokenInput from './components/TokenInput';

const FormField = ({ field }) => {

  const { component: CustomComponent, validation, ...rest } = field;

  const { watch, register, formState: { errors }, control, setValue } = useFormContext();

  // Validation rules
  // const validationProps = {
  //   required: validation?.required ? { value: true, message: validation.message } : false,
  //   pattern: validation?.pattern ? { value: new RegExp(validation.pattern), message: validation.message } : undefined
  // };

  const validationProps = {
    required: field.validation?.required ? 'This field is required' : false,
    validate: (value) => {
      if (field.validation?.compareWith) {
        const compareFieldValue = watch(field.validation.compareWith);
        if (value !== compareFieldValue) {
          return field.validation.errorMessage || 'Fields do not match';
        }
      }
      return true;
    },
    ...(field.validation?.minLength && {
      minLength: {
        value: field.validation.minLength,
        message: `Minimum length is ${field.validation.minLength}`,
      },
    }),
    ...(field.validation?.maxLength && {
      maxLength: {
        value: field.validation.maxLength,
        message: `Maximum length is ${field.validation.maxLength}`,
      },
    }),
    ...(field.validation?.pattern && {
      pattern: {
        value: new RegExp(field.validation.pattern.value),
        message: field.validation.pattern.message || 'Invalid format',
      },
    }),
  };




  // Render custom component if provided in schema
  if (CustomComponent) {
    return <CustomComponent {...rest} register={register} errors={errors} setValue={setValue} formState={formState} watch={watch} validationProps={validationProps} />;
  }

  const formValues = watch();
  if (typeof field.isVisible === 'function' && !field.isVisible(formValues)) {
    return null;
  }


  switch (field.type) {
    case 'text':
      return <TextInput {...field} register={register} errors={errors} validationProps={validationProps} />;
    case 'email':
      return <EmailInput {...field} register={register} errors={errors} validationProps={validationProps} />;
    case 'password':
      return <PasswordInput {...field} register={register} errors={errors} validationProps={validationProps} />;
    case 'checkbox':
      return <CheckboxInput {...field} register={register} errors={errors} validationProps={validationProps} />;
    case 'radioGroup':
      return <RadioGroupInput {...field} register={register} errors={errors} validationProps={validationProps} />;
    case 'file':
      return <FileUpload field={field} register={register} errors={errors} setValue={setValue} />;
    case 'date':
      return <DatePicker {...field} register={register} errors={errors} validationProps={validationProps} />;
    case 'textarea':
      return <TextArea field={field} register={register} errors={errors} validationProps={validationProps} />;
    case 'singleSelect':
      return <SingleSelect field={field} register={register} errors={errors} />;
    case 'multiSelect':
      return <MultiSelect field={field} register={register}  errors={errors} />;
    case 'token':
      return <TokenInput {...field} register={register} errors={errors} setValue={setValue} validationProps={validationProps} />;
    default:
      return null;
  }
};

export default FormField;
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from './FormField';

const FormBuilder = ({ schema, onSubmit, onError, renderActionPanel = () => { }, formValues = [] }) => {
    // Function to render fields based on their type or custom component

    const methods = useForm({
        defaultValues: formValues
    });

    const { register, handleSubmit, watch, formState: { errors } }  = methods;

    // const methods = useForm();
    

    const generateSection = (section) => {
        const formValues = watch();

        if (typeof section.isVisible === 'function' && !section.isVisible(formValues)) {
            return null;
        }
        return (
            <div className="grid grid-cols-1 gap-4">
                {section.fields.map((field, fieldIndex) => (
                    <div
                        key={fieldIndex}
                        className={`grid grid-cols-${field.row ? 4 : 1} gap-4 ${field.fullWidth ? "col-span-full" : ""}`}
                    >
                        {field.row ? (
                            field.row.map((subField, subIndex) => (
                                <div
                                    key={subIndex}
                                    className={
                                        subField.colSpan === 2
                                            ? "col-span-2"
                                            : subField.colSpan === 1
                                                ? "col-span-1"
                                                : "col-span-4"
                                    }
                                >
                                    <FormField field={subField}  />
                                </div>
                            ))
                        ) : (
                            <FormField field={field} />
                        )}
                    </div>
                ))}
            </div>
        )
    }



    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit, onError)} >
                <h2 className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">{schema.title}</h2>
                {schema.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-600 mb-4">{section.title}</h3>
                        {generateSection(section)}
                    </div>
                ))}
                {renderActionPanel()}
            </form>
        </FormProvider>
    );
};

export default FormBuilder;
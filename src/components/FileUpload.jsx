import React, { useState } from 'react';
import axios from 'axios';
import config from '../config/config';


const FileUpload = ({ field, register, errors, setValue }) => {
  const { name, validation, uploadApi, colSpan } = field;
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // Validate file
    if (selectedFile) {
      if (validation?.maxSize && selectedFile.size > validation.maxSize) {
        setUploadError(`File size should not exceed ${validation.maxSize / (1024 * 1024)}MB.`);
        return;
      }
      if (validation?.acceptedFormats && !validation.acceptedFormats.includes(selectedFile.type)) {
        setUploadError("Invalid file format. Please upload PDF, JPEG, or PNG.");
        return;
      }
      setUploadError(null); // Clear error if file is valid
    }
  };


  const handleDelete = async () => {
    if(!uploadedFile) {
      setUploadError("file not found.");
      return;
    }

    try {

      const tokenList = localStorage.getItem('token');

      let tokenData = JSON.parse(tokenList)

      let { access } = tokenData

      const accessToken = access.token

      const headers = {...uploadApi.headers}

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
      }
      
      const response = await axios({
        url: config.API_URL + uploadApi.url,
        method: 'DELETE',
        headers: {
          ...headers,
        },
      });
      const { data } = response;
      setUploadedFile(null)
      setUploadError(null);
    } catch (error) {
      console.log({error});
      setUploadError("Failed to upload file. Please try again.");
    }

  }

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    if(uploadedFile) {
      return false;
    }

    const tokenList = localStorage.getItem('token');

    let tokenData = JSON.parse(tokenList)

    let { access } = tokenData

    const accessToken = access.token
    
    const formData = new FormData();

    formData.append('file', file);

    const headers = {...uploadApi.headers}

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    try {
      const response = await axios({
        url: config.API_URL + uploadApi.url,
        method: uploadApi.method,
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });
      const { data } = response;
      setUploadedFile(data.fileUrl);
      setValue(name, data.fileUrl);
      setUploadError(null);
    } catch (error) {
      console.log({error});
      setUploadError("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className={`col-span-${colSpan || 1} mb-4`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>
        {field.label}
      </label>
      <button type="button" onClick={() => document.getElementById(name).click()} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <svg className="w-4 h-4 mr-4 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
        Upload picture
    </button>
    <button
        type="button"
        disabled={uploadedFile?true:false}
        onClick={handleUpload}
        className="ml-4 mt-4 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        Upload
      </button>
    <input
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        className="block hidden w-full text-gray-700"
        // {...register(name, { required: validation?.required })}
      />
      
      {uploadedFile && 
      <>
      <div className="flex">
      <p className="text-gray-500 text-xs italic mt-2">{uploadedFile}</p>
      <i className="fa-regular fa-circle-xmark m-2 cursor-pointer" onClick={handleDelete}></i>
      </div>
        
      </>
        }
      {uploadError && <p className="text-red-500 text-xs italic mt-2">{uploadError}</p>}

      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FileUpload;
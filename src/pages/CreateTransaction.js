import React, { useState } from 'react';

function CreateTransaction() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:3001/api/upload-csv', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const result = await response.json();
            setMessage(result.message || 'File uploaded successfully');
        } catch (error) {
            setMessage(error.message || 'Error uploading file');
        }
    };


    return (
        <div>
        <h2>Please dont access if you are not MAKER</h2>
            <h2>Upload CSV</h2>

            <form onSubmit={handleUpload}>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateTransaction;

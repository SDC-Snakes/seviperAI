import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageDropzone({ handleUploadedImages }) {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        // Add the image to the state
        const dataUrl = reader.result;
        setImages(prevImages => [...prevImages, dataUrl]);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // useEffect(() => {
  //   console.log('images urls in drop', images)
  //   handleUploadedImages(images[0]);
  // }, [images,handleUploadedImages]);

  return (
    <div
      {...getRootProps()}
      style={{ border: '1px dashed black', padding: 30 }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
      <div style={{ marginTop: 30 }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            style={{
              width: 300,
              height: 'auto',
              marginRight: 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageDropzone;

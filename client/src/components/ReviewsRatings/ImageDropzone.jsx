/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageDropzone({ handleUploadedImages }) {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Upload the image to Imgur
        const dataUrl = reader.result;
        fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID 9fb7e41cbbbd831',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: dataUrl }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Add the link to the uploaded image to the state
            const imageUrl = data.data.link;
            setImages((prevImages) => [...prevImages, imageUrl]);
          })
          .then(() => handleUploadedImages(images[images.length - 1]))
          .catch((err) => console.log(err));
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

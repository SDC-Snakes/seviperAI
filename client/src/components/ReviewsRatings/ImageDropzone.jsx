/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageDropzone({ handleDropedInImages }) {
  const [images, setImages] = useState([]);
  const addImages = (image) => {
    setImages((prevImages) => [...prevImages, image]);
    handleDropedInImages([image])
  }
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Upload the image to Imgur
        const dataUrl = reader.result.split(',')[1];
        console.log(encodeURIComponent(dataUrl))
        fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID 27a348dc30933fb',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `image=${encodeURIComponent(dataUrl)}`,
        })
          .then((data) => {
            return data.json()
          })
          .then((data) => {
            const imageUrl = data.data.link;
            console.log('imageUrl:', imageUrl);
            addImages(imageUrl);
          })
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

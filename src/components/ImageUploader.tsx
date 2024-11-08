// src/components/ImageUploader.tsx
import React from 'react';
import styled from 'styled-components';

// Define the props interface
interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

// Styled component for the form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

// Styled component for the input
const FileInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 2px solid #007bff;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: #0056b3;
  }
`;

// Styled component for the button
const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, onSubmit, loading }) => {
  return (
    <Form onSubmit={onSubmit}>
      <FileInput type="file" accept="image/*" onChange={onImageChange} />
      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Detecting...' : 'Detect Objects'}
      </SubmitButton>
    </Form>
  );
};

export default ImageUploader;

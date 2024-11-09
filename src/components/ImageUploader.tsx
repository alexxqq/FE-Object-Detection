import React from 'react';
import styled from 'styled-components';

interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  background-color: #191e29;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 2px solid #696e79;
  border-radius: 5px;
  background-color: #132d46;
  color: #ffffff;
  width: 100%;
  max-width: 300px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #d1c38d;
  }
`;

const SubmitButton = styled.button`
  background-color: #d1c38d;
  color: #191e29;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #696e79;
    color: #ffffff;
  }

  &:disabled {
    background-color: #696e79;
    color: #ffffff;
    cursor: not-allowed;
    opacity: 0.6;
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

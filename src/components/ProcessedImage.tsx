// src/components/ProcessedImage.tsx
import React from 'react';
import styled from 'styled-components';

// Define types for props
type Process = {
  imageUrl: string;
};

// Styled component for the container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  border: 2px solid #007bff; // Border color
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9; // Light background color
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow effect
`;

// Styled component for the heading
const Title = styled.h2`
  margin-bottom: 1rem;
  color: #007bff; // Title color
`;

// Styled component for the image
const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px; // Slight rounding of image corners
`;

const ProcessedImage: React.FC<Process> = ({ imageUrl }) => {
  return (
    <Container>
      <Title>Processed Image with Detections:</Title>
      <StyledImage src={imageUrl} alt="Processed" />
    </Container>
  );
};

export default ProcessedImage;

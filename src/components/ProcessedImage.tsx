import React from 'react';
import styled from 'styled-components';

type Process = {
  imageUrl: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  border: 2px solid #696e79;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #132d46;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #d1c38d;
  font-weight: bold;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 2px solid #191e29;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

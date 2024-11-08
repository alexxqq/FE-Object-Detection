// src/components/DetectionList.tsx
import React from 'react';
import styled from 'styled-components';

// Define types for detected objects
interface DetectedObject {
  name: string;
  confidence: number;
}

// Define props type
interface DetectionListProps {
  detections: DetectedObject[];
}

// Styled component for the container
const Container = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  border: 2px solid #28a745; // Border color
  border-radius: 8px;
  background-color: #f9f9f9; // Light background color
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow effect
`;

// Styled component for the title
const Title = styled.h2`
  color: #28a745; // Title color
  margin-bottom: 1rem;
`;

// Styled component for the list
const List = styled.ul`
  list-style-type: none; // Remove default list styling
  padding: 0; // Remove default padding
`;

// Styled component for list items
const ListItem = styled.li`
  margin: 0.5rem 0; // Space between list items
  padding: 0.5rem; // Padding for list items
  border-radius: 4px; // Rounded corners
  background-color: #e2f0d9; // Light green background for items
  color: #333; // Text color
  transition: background-color 0.2s ease; // Transition for hover effect

  &:hover {
    background-color: #d4edda; // Darker green on hover
  }
`;

const DetectionList: React.FC<DetectionListProps> = ({ detections }) => {
  return (
    <Container>
      <Title>Detections:</Title>
      <List>
        {detections.map((det, index) => (
          <ListItem key={index}>
            {`${det.name} (${(det.confidence * 100).toFixed(2)}%)`}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DetectionList;

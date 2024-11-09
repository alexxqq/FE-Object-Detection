import React from 'react';
import styled from 'styled-components';

interface DetectedObject {
  name: string;
  confidence: number;
}

interface DetectionListProps {
  detections: DetectedObject[];
}

const Container = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  border: 2px solid #696e79;
  border-radius: 8px;
  background-color: #132d46;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  color: #d1c38d;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 5px;
  background-color: #191e29;
  color: #ffffff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #696e79;
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

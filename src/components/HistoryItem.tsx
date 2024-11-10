import React from 'react';
import styled from 'styled-components';

const HistoryItemContainer = styled.li`
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #404a5a;
  border-radius: 6px;
  background-color: #1a2533;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ItemDetail = styled.p`
  margin: 0.2rem 0;
  color: #d1c38d;
`;

const DeleteButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #d9534f;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c9302c;
  }
`;

interface HistoryItemProps {
  item: any;
  onDelete: (taskId: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onDelete }) => {
  return (
    <HistoryItemContainer>
      <ItemDetail><strong>Task ID:</strong> {item.id || 'N/A'}</ItemDetail>
      <ItemDetail><strong>User ID:</strong> {item.user_id}</ItemDetail>
      {/* <ItemDetail><strong>Status:</strong> {item.status || 'N/A'}</ItemDetail> */}
      {/* <ItemDetail><strong>Error:</strong> {item.error || 'None'}</ItemDetail> */}
      <ItemDetail><strong>Results:</strong></ItemDetail>
      <ul>
        {item.results.length > 0 ? (
          item.results.map((result: any, index: number) => (
            <li key={index} style={{ color: '#b8c6db' }}>
              <strong>Name:</strong> {result.name} <strong>Confidence:</strong> {result.confidence}
            </li>
          ))
        ) : (
          <li style={{ color: '#b8c6db' }}>No results found</li>
        )}
      </ul>
      <DeleteButton onClick={() => onDelete(item.id)}>
        Delete Task
      </DeleteButton>
    </HistoryItemContainer>
  );
};

export default HistoryItem;

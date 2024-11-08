import React from 'react';
import styled from 'styled-components';

const HistoryItemContainer = styled.li`
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ItemDetail = styled.p`
  margin: 0.2rem 0;
  color: #666;
`;

const DeleteButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
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
      <ItemDetail><strong>Status:</strong> {item.status || 'N/A'}</ItemDetail>
      <ItemDetail><strong>Error:</strong> {item.error || 'None'}</ItemDetail>
      <ItemDetail><strong>Results:</strong></ItemDetail>
      <ul>
        {item.results.length > 0 ? (
          item.results.map((result: any, index: number) => (
            <li key={index}>
              <strong>Name:</strong> {result.name} <strong>Confidence:</strong> {result.confidence}
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
      <DeleteButton onClick={() => onDelete(item.id)}>
        Delete Task
      </DeleteButton>
    </HistoryItemContainer>
  );
};

export default HistoryItem;

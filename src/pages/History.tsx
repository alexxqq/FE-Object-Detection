import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import detectionService from '../services/imageService';
import Navbar from '../components/Navbar';
import HistoryItem from '../components/HistoryItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const HistoryContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await detectionService.getHistory();
        setHistory(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await detectionService.deleteTask(taskId);
      setHistory(prev => prev.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Navbar />
      <HistoryContainer>
        <Title>Task History</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <HistoryList>
          {history.map((item) => (
            <HistoryItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </HistoryList>
      </HistoryContainer>
    </Container>
  );
};

export default History;

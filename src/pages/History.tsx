import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import detectionService from '../services/imageService';
import Navbar from '../components/Navbar';
import HistoryItem from '../components/HistoryItem';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Path } from '../common/constants/path.enum';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191e29;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const HistoryContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #2a2f3a;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h2`
  text-align: center;
  color: #d1c38d;
`;

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;

const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    navigate(Path.HOME);
  }

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

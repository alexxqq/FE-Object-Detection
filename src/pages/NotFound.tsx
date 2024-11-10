import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
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

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #b0b3b8;
  text-align: center;
  margin: 10px 0;
`;

const HomeButton = styled.a`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #1f2937;
  border: 2px solid #4a5568;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a5568;
  }
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <Title>404</Title>
      <Message>Oops! The page you’re looking for doesn’t exist.</Message>
      <HomeButton href={Path.HOME}>Return to Home</HomeButton>
    </Container>
  );
};

export default NotFound;

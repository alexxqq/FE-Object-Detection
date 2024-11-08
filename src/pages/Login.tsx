import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
// Define the form data structure
interface IFormInput {
  username: string;
  password: string;
}

// Styled components
const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  // Define the login handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await authService.login(data.username, data.password);
      console.log('Login successful:', response);
      navigate('/')
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Login</FormTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        
        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        
        <Button type="submit">Login</Button>
      </form>
    </FormWrapper>
  );
};

export default Login;

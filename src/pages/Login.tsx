import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Path } from "../common/constants/path.enum";

interface IFormInput {
  username: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #132d46;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #191e29;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #d1c38d;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.75rem 0;
  border-radius: 4px;
  border: 1px solid #696e79;
  background-color: #132d46;
  color: #ffffff;
  box-sizing: border-box;

  &::placeholder {
    color: #696e79;
  }

  &:focus {
    outline: none;
    border-color: #d1c38d;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #d1c38d;
  color: #132d46;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffffff;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  text-align: center;
`;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await authService.login(data.username, data.password);
      console.log("Login successful:", response);
      navigate(Path.HOME);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Navbar />
      <FormWrapper>
        <FormTitle>Login</FormTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          <Button type="submit">Login</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Login;

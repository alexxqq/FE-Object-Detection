import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface IFormInput {
  username: string;
  password: string;
  email: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

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
  background-color: #4caf50;
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

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await authService.register(
        data.username,
        data.password,
        data.email
      );
      console.log("Registration successful:", response);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Navbar />
      <FormWrapper>
        <FormTitle>Register</FormTitle>

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

          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Button type="submit">Register</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Register;

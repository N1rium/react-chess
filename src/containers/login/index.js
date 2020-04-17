import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from './queries';

const Login = styled.div.attrs({ id: 'login-container' })`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1``;
const SubTitle = styled.h2``;

const LoginSection = styled.section`
  display: inline-block;
  header {
    text-align: left;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  & > * {
    margin: 10px 0px;
  }
`;

const EmailInput = styled.input.attrs({ type: 'text', placeholder: 'email' })``;
const UsernameInput = styled.input.attrs({ type: 'text', placeholder: 'username' })``;
const PasswordInput = styled.input.attrs({ type: 'password', placeholder: 'password' })``;
const PasswordRepeatInput = styled(PasswordInput).attrs({ placeholder: 'repeat password' })``;
const SubmitButton = styled.button``;

export default ({}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [register, { data, error }] = useMutation(REGISTER);

  const submit = async () => {
    const user = await register({ variables: { input: { email, username, password, passwordRepeat } } });
  };

  useEffect(() => {
    if (data && data.createUser.token) {
      localStorage.setItem('token', data.createUser.token);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log('Got error: ', error);
    }
  }, [error]);

  return (
    <Login>
      <Title>Welcome</Title>
      <SubTitle>to Chessports!</SubTitle>
      <LoginSection>
        <header>Register</header>
        <Form onSubmit={e => e.preventDefault()}>
          <EmailInput value={email} onChange={e => setEmail(e.target.value)} />
          <UsernameInput value={username} onChange={e => setUsername(e.target.value)} />
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
          <PasswordRepeatInput value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
          <SubmitButton onClick={submit}>Done</SubmitButton>
        </Form>
      </LoginSection>
    </Login>
  );
};

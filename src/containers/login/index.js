import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER, LOGIN } from './queries';
import history from '../../store/history';
import Chessboard from '../../components/chessboard';
import { VincentVsMagnus, UweVsDrazen, SpasskyVsFischer } from './pgn';

const Login = styled.div.attrs({ id: 'login-container' })`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-y: auto;
`;

const Title = styled.h1``;
const SubTitle = styled.h2``;

const LoginSection = styled.section`
  max-width: 320px;
  margin: 0 auto;
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

const FullScreenView = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

const LoginView = styled(FullScreenView)`
  padding-top: 100px;
  height: 90vh;
`;

const ChessboardRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  @media screen and (max-width: ${(props) => props.theme.mediaTablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ChessBoardWrapper = styled.div`
  width: 256px;
  height: 256px;
  @media screen and (max-width: ${(props) => props.theme.mediaLaptop}) {
    width: 172px;
    height: 172px;
  }

  @media screen and (max-width: ${(props) => props.theme.mediaTablet}) {
    margin-top: 25px
    width: 256px;
    height: 256px;
  }
`;

const EmailInput = styled.input.attrs({ type: 'text', placeholder: 'email' })``;
const UsernameInput = styled.input.attrs({ type: 'text', placeholder: 'username' })``;
const PasswordInput = styled.input.attrs({ type: 'password', placeholder: 'password' })``;
const PasswordRepeatInput = styled(PasswordInput).attrs({ placeholder: 'repeat password' })``;
const SubmitButton = styled.button``;

export default ({}) => {
  const [state, setState] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [register, { data: registerData }] = useMutation(REGISTER);
  const [login, { data: loginData }] = useMutation(LOGIN);

  useEffect(() => {
    if (registerData && registerData.createUser.token) {
      localStorage.setItem('token', registerData.createUser.token);
      history.push('/');
    }

    if (loginData && loginData.login.token) {
      localStorage.setItem('token', loginData.login.token);
      history.push('/');
    }
  }, [registerData, loginData]);

  return (
    <Login>
      <LoginView>
        <Title>Welcome</Title>
        <SubTitle>to Chessports!</SubTitle>
        <LoginSection>
          {state === 1 && (
            <>
              <header>Sign in</header>
              <Form onSubmit={(e) => e.preventDefault()}>
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                <SubmitButton onClick={() => login({ variables: { input: { email, password } } })}>Done</SubmitButton>
              </Form>
            </>
          )}
          {state === 0 && (
            <>
              <header>Register</header>
              <Form onSubmit={(e) => e.preventDefault()}>
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
                <UsernameInput value={username} onChange={(e) => setUsername(e.target.value)} />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordRepeatInput value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
                <SubmitButton
                  onClick={() => register({ variables: { input: { email, username, password, passwordRepeat } } })}
                >
                  Done
                </SubmitButton>
              </Form>
            </>
          )}
        </LoginSection>
      </LoginView>
      <FullScreenView>
        <h1>Revisit favourite games</h1>
        <ChessboardRow>
          <ChessBoardWrapper size={'256px'}>
            <span>Keymer vs. Carlsen</span>
            <Chessboard showIndexes={false} pgn={VincentVsMagnus} />
          </ChessBoardWrapper>
          <ChessBoardWrapper size={'256px'}>
            <span>Spassky vs. Fischer</span>
            <Chessboard showIndexes={false} pgn={SpasskyVsFischer} />
          </ChessBoardWrapper>
          <ChessBoardWrapper size={'256px'}>
            <span>Kunsztowicz vs. Marovic</span>
            <Chessboard showIndexes={false} pgn={UweVsDrazen} />
          </ChessBoardWrapper>
        </ChessboardRow>
      </FullScreenView>
      <div>
        <h1>Try it out!</h1>
        <ChessBoardWrapper size={'512px'}>
          <Chessboard pgn={SpasskyVsFischer} moveIndex={0} />
        </ChessBoardWrapper>
      </div>
    </Login>
  );
};

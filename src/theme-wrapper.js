import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';

const mapStateToProps = state => ({});

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    background: #1e1e2d;
    font-family: sans-serif;
  }

  #app-container {
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;

const ThemeWrapper = ({ children }) => {
  const theme = {
    unitSize: 64,
  };
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default connect(mapStateToProps, {})(ThemeWrapper);

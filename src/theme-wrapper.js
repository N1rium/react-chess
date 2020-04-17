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
    background: #121212;
    color: ${props => props.theme.primaryTextColor};
    overflow: hidden;
  }

  body, input {
    font-family: circular, sans-serif;
  }

  a {
    color: ${props => props.theme.primaryTextColor};
  }

  #app-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .app-content {
      height: calc(100% - 48px);
      width: 100%;
    }
  }

  button {
    border-radius: 3px;
    background: #65B260;
    outline: none;
    border: none;
    padding: 0.5em 1.5em;
    color: #f0f4f2;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.8;
    }
  }

  .hover-btn {
    will-change: opacity;
    transition: opacity 0.15s ease-in-out;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }

  input {
    border: 0;
    outline: none;
    padding: 10px;
    border-radius: 3px;
  }

  section {
    position: relative;
    background: #232323;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.24);
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 3px;
    header, footer {
      background: #232323;
      padding: 10px;
    }
    header {
      font-weight: bold;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    }
    footer {
      box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.5);
    }
    section {
      box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.24);
    }
  }
`;

const ThemeWrapper = ({ children }) => {
  const theme = {};
  const darkTheme = {
    primaryTextColor: '#E0E0E0',
  };
  return (
    <ThemeProvider theme={{ ...theme, ...darkTheme }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, {})(ThemeWrapper);

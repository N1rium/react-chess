import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});

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
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.primaryTextColor};
    overflow: hidden;
  }

  body, input {
    font-family: circular, sans-serif;
  }

  h1, h2 {
    margin: 0;
  }

  a {
    color: ${(props) => props.theme.primaryTextColor};
  }

  table {
    width: 100%;
    border-spacing: 0;
    &.zebra {
      tr:nth-child(odd) {
        background: #1f1e1e;
      }
    }
  }

  td {
    padding: 5px;
    &:first-child {
      padding-left: 10px;
    }
    &:last-child {
      padding-right: 10px;
    }
    &.right {
      text-align: right;
    }
  }

  span {
    font-size: 0.8rem;
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
    background-color: ${(props) => props.theme.accent};
    outline: none;
    border: none;
    padding: 0.5em 1.5em;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.225s ease-in-out;
    will-change: background-color;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.75);
    }
    &:active {
      opacity: 0.8;
    }
    &:disabled {
      background-color: #63676f;
      cursor: not-allowed;
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
    overflow: hidden;
    background: ${(props) => props.theme.surface};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.24);
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 3px;
    display: flex;
    flex-direction: column;

    & > main {
      flex: 1 1 auto;
      overflow: auto;
    }

    & > header, & > footer {
      flex: 0 0 auto;
      background: ${(props) => props.theme.surface};
      padding: 10px;
    }
    & > header {
      font-weight: bold;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    }
    & > footer {
      box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.5);
    }
    section {
      box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.24);
    }
  }
`;

const ThemeWrapper = ({ children }) => {
  const theme = {
    mediaLaptop: '1024px',
    mediaTablet: '768px',
    danger: '#dc2c2c',
    accent: '#3b87ff',
  };

  const darkTheme = {
    background: '#191919',
    surface: '#232323',
    primaryTextColor: '#E0E0E0',
  };
  const lightTheme = {
    background: '#fff',
    surface: '#c3b7a6',
    primaryTextColor: '#000',
  };
  return (
    <ThemeProvider theme={{ ...theme, ...darkTheme }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, {})(ThemeWrapper);

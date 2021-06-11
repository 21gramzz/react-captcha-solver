import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { CaptchaSolverPage } from './components/pages/CaptchaSolverPage';
import './icon/fontawsome';

const root = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CaptchaSolverPage />
  </ThemeProvider>,
  root,
);

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *::-webkit-scrollbar {
      display: none;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    html{
      font-size: 10px;
      box-sizing: border-box;
    }
     body {
      font-family: 'Nunito Sans', 'sans-serif';
      font-size: 1.5em;
      letter-spacing: 0.025em;
      margin: 0;
      padding: 0;
      background: ${props => props.theme.main};
      color: ${props => props.theme.text};
      height: 100vh;
      width: 100vw;
    }
    button, input, select, textarea {
      font-family : inherit;
    }
  `;

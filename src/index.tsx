import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from './contexts/ModalContext';
import { MainPage } from './components/pages/MainPage';
import './icon/fontawsome';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ModalProvider>
          <MainPage />
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  root,
);

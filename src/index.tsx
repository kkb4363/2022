import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from 'styled-components';
import {lightheme} from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightheme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

{/* tsx 와 ts차이점
tsx 는 ts + react문법 이고
ts는 ts만 쓰는 것임. */}
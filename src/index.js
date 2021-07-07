import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </>,
  document.getElementById('root')
);

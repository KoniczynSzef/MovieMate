import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { MoviesContextProvider } from './data/MoviesContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<MoviesContextProvider>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</MoviesContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

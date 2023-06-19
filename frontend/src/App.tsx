import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { theme } from './theme/theme';
import { AccountProvider } from './providers/account/useAccount';

export const App = () => (
	<ChakraProvider theme={theme}>
		<AccountProvider>
			<RouterProvider router={router} />
		</AccountProvider>
	</ChakraProvider>
);

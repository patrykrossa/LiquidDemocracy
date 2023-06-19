import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageContainer } from '../shared/wrappers/PageContainer';
import { Navbar } from './navbar/Navbar';

export const RootLayout = () => {
	return (
		<Flex bgColor='#f9f9f9' color='black' minH='100vh'>
			<Navbar />
			<PageContainer isCentered>
				<Outlet />
			</PageContainer>
		</Flex>
	);
};

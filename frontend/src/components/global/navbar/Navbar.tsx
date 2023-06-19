import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectWallet } from './ConnectWallet';

export const Navbar = () => {
	return (
		<Flex
			position='fixed'
			top='0'
			left='0'
			w='100vw'
			p={{ base: '0', md: '24px 5vw', lg: '24px 10vw' }}
			align='center'
			justify='space-between'
			zIndex='1000'
			bg='white'>
			<Link to='/'>
				<Text fontSize='32px' fontWeight='800' color='primary'>
					LiquidDemocracy
				</Text>
			</Link>
			<Flex align='center' gap='16px'>
				<Link to='admin'>
					<Text fontSize='14px' _hover={{ opacity: '0.8' }}>
						Admin panel
					</Text>
				</Link>
				<ConnectWallet />
			</Flex>
		</Flex>
	);
};

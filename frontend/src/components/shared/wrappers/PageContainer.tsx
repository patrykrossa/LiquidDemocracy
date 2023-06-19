import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

interface IPageContainerProps {
	children: React.ReactNode;
	isCentered?: boolean;
}

export const PageContainer: FC<IPageContainerProps> = ({
	children,
	isCentered,
}) => {
	return (
		<Flex
			p={isCentered ? { base: '0', md: '50px 5vw', lg: '75px 10vw' } : '0'}
			flexDir='column'
			flexWrap='wrap'
			position='relative'
			w='100%'>
			{children}
		</Flex>
	);
};

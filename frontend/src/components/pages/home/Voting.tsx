import { Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../../../providers/account/useAccount';

interface IVotingProps {
	name: string;
	description: string;
	id: number;
}

export const Voting: FC<IVotingProps> = ({ name, description, id }) => {
	const { isLoggedIn } = useAccount();

	return (
		<Flex
			p='16px'
			bgColor='#EDEFF5'
			borderRadius='16px'
			border='1px solid #e6e2ec'
			flexDir='column'
			gap='8px'>
			<Text fontSize='18px'>{name}</Text>
			<Text fontSize='14px' fontWeight='600' color='#696F8C'>
				{description}
			</Text>
			<Link to={`/votings/${id}`}>
				<Tooltip label={!isLoggedIn && 'You need to connect your wallet'}>
					<Button
						bgColor='primary'
						mt='16px'
						_hover={{ opacity: '0.8' }}
						w='100%'
						isDisabled={!isLoggedIn}>
						Vote
					</Button>
				</Tooltip>
			</Link>
		</Flex>
	);
};

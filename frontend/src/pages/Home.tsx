import { Flex, Grid } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Voting } from '../components/pages/home/Voting';

export const Home = () => {
	const [votings, setVotings] = useState([
		{
			name: 'Głosowanie 1',
			description: 'Głosowanie 1 elo elo elo',
			id: 1,
		},
		{
			name: 'Głosowanie 2',
			description: 'Głosowanie 1 elo elo elo',
			id: 2,
		},
		{
			name: 'Głosowanie 3',
			description: 'Głosowanie 1 elo elo elo',
			id: 3,
		},
		{
			name: 'Głosowanie 4',
			description: 'Głosowanie 1 elo elo elo',
			id: 4,
		},
		{
			name: 'Głosowanie 5',
			description: 'Głosowanie 1 elo elo elo',
			id: 5,
		},
		{
			name: 'Głosowanie 5',
			description: 'Głosowanie 1 elo elo elo',
			id: 6,
		},
	]);

	return (
		<Grid
			w='100%'
			gridGap='32px'
			mt='10vh'
			templateColumns='repeat(5, 1fr)'
			justifyContent='space-between'>
			{votings.map((voting: any) => (
				<Voting
					key={voting.id}
					name={voting.name}
					description={voting.description}
					id={voting.id}
				/>
			))}
		</Grid>
	);
};

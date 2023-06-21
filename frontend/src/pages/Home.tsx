import { Flex, Grid, Spinner } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { abi } from '../abi';
import { Voting } from '../components/pages/home/Voting';
import { contractAddress } from '../contract';
import { useAccount } from '../providers/account/useAccount';

export const Home = () => {
	const [votings, setVotings] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	const { address } = useAccount();

	useEffect(() => {
		setVotings([]);
		const getVotings = async () => {
			console.log('co');
			setLoading(true);
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			const signer = provider.getSigner(address);
			const contract = new ethers.Contract(contractAddress, abi, signer);
			console.log(contract);
			const votingLength = await contract.getVotingLength();
			console.log(votingLength.toString());
			const v = [];
			for (var i = 0; i < +votingLength.toString(); i++) {
				const voting = await contract.getVoting(i);
				v.push({
					id: +voting[0].toString(),
					options: voting[1],
					title: voting[2],
					description: voting[3],
				});
				console.log(v);
			}
			setVotings(v);
			setLoading(false);
		};

		if (address !== '0x0000000000000000') getVotings();
	}, [address]);

	return (
		<Grid
			w='100%'
			gridGap='32px'
			mt='10vh'
			templateColumns='repeat(5, 1fr)'
			justifyContent='space-between'>
			{loading && <Spinner />}
			{!loading &&
				votings?.map((voting: any) => (
					<Voting
						key={voting.id}
						name={voting.title}
						description={voting.description}
						id={voting.id}
					/>
				))}
		</Grid>
	);
};

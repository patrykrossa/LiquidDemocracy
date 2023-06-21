import {
	Button,
	Flex,
	Radio,
	RadioGroup,
	Select,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { abi } from '../abi';
import { contractAddress } from '../contract';
import { useAccount } from '../providers/account/useAccount';

export const VotingDetails = () => {
	const { address } = useAccount();

	const [voting, setVoting] = useState<any>();
	const [voted, setVoted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [option, setOption] = useState();
	const [user, setUser] = useState();
	const [people, setPeople] = useState<any>();
	const [votingResults, setVotingResults] = useState<any>([]);
	const [votingPower, setVotingPower] = useState();

	const [votingView, setVotingView] = useState('option');

	const { id } = useParams();

	const toast = useToast();

	const navigate = useNavigate();

	useEffect(() => {
		if (address !== '0x0000000000000000') {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			const signer = provider.getSigner(address);
			const contract = new ethers.Contract(contractAddress, abi, signer);
			contract &&
				contract.on('errorEvent', (data: any) => {
					toast({
						title: 'This user already voted.',
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
					return;
				});
			contract &&
				contract.on(
					'votedForUserEvent',
					async (address: string, votes: number) => {
						navigate('/');
						// toast({
						// 	title: `Voted for user ${address}.`,
						// 	status: 'success',
						// 	duration: 9000,
						// 	isClosable: true,
						// });
						return;
					}
				);
			contract &&
				contract.on(
					'votedForOptionEvent',
					async (option: number, votes: number) => {
						navigate('/');
						// toast({
						// 	title: `Voted for option ${voting?.options[option]}.`,
						// 	status: 'success',
						// 	duration: 9000,
						// 	isClosable: true,
						// });
						return;
					}
				);
			contract &&
				contract.on(
					'revokedFromUserEvent',
					async (address: string, votes: number) => {
						navigate('/');
						// toast({
						// 	title: `Revoked ${votes} votes from the ${address} user.`,
						// 	status: 'success',
						// 	duration: 9000,
						// 	isClosable: true,
						// });
						return;
					}
				);
			contract &&
				contract.on(
					'revokedFromOptionEvent',
					async (option: number, votes: number) => {
						navigate('/');
						// toast({
						// 	title: `Revoked ${votes} votes from the "${voting?.options[option]}" option.`,
						// 	status: 'success',
						// 	duration: 9000,
						// 	isClosable: true,
						// });
						return;
					}
				);
		}
	});

	const getVoting = async () => {
		setLoading(true);
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum
		);
		const signer = provider.getSigner(address);
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const v = await contract.getVoting(parseInt(id!) - 1);
		const r = [] as any;
		v[1].forEach(async (option: any, index: number) => {
			const result = await contract.getOptionVotes(parseInt(id!) - 1, index);
			r.push([option, result.toString()]);
		});
		setVotingResults(r);
		const ifV = await contract.checkIfVoted(parseInt(id!) - 1);
		setVoted(ifV);
		console.log(ifV);
		setVoting({
			id: v[0],
			title: v[2],
			description: v[3],
			options: v[1],
		});
		const votingPower = await contract.getUserVotingPower(
			parseInt(id!) - 1,
			address
		);
		console.log(votingPower.toString());
		setVotingPower(votingPower.toString());
		setLoading(false);
	};

	// useEffect(() => {
	// 	const getVotingPower = async () => {
	// 		const provider = new ethers.providers.Web3Provider(
	// 			(window as any).ethereum
	// 		);
	// 		const signer = provider.getSigner(address);
	// 		const contract = new ethers.Contract(contractAddress, abi, signer);
	// 		const votingPower = await contract.getUserVotingPower(
	// 			parseInt(id!) - 1,
	// 			address
	// 		);
	// 		console.log(votingPower.toString());
	// 		setVotingPower(votingPower.toString());
	// 	};
	// 	if (address !== '0x0000000000000000') getVotingPower();
	// }, []);

	useEffect(() => {
		if (address !== '0x0000000000000000') getVoting();
	}, [address]);

	useEffect(() => {
		const getPeople = async () => {
			const res = await axios.get('http://localhost:8000/api/people', {
				headers: {
					Authorization: null,
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Allow-Headers':
						'Origin, X-Requested-With, Content-Type, Accept, Authorization',
				},
			});
			if (res.status < 300) {
				console.log(res.data);
				setPeople(res.data);
			}
		};
		getPeople();
	}, []);

	const revoke = async () => {
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum
		);
		const signer = provider.getSigner(address);
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const res = await contract.revoke(parseInt(id!) - 1);
		console.log(res);
	};

	const handleUserVote = async () => {
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum
		);
		const signer = provider.getSigner(address);
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const res = await contract.voteForUser(user, parseInt(id!) - 1);
		console.log(res);
	};

	const handleOptionVote = async () => {
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum
		);
		const signer = provider.getSigner(address);
		const contract = new ethers.Contract(contractAddress, abi, signer);
		if (option) {
			const res = await contract.voteForOption(option, parseInt(id!) - 1);
			console.log(res);
		}
	};

	return (
		<Flex mt='10vh'>
			{loading && <Spinner />}
			{!loading && (
				<Flex justify='space-between' w='100%'>
					<Flex flexDir='column' gap='16px'>
						<Text fontSize='32px' fontWeight='600'>
							{voting?.title}
						</Text>
						<Text fontSize='14px'>{voting?.description}</Text>
						{voted && (
							<Button colorScheme='red' onClick={revoke}>
								Revoke
							</Button>
						)}
						{votingView == 'option' && !voted && (
							<Flex flexDir='column' gap='8px'>
								<Button
									bgColor='#3466ff'
									mb='24px'
									_hover={{ opacity: '0.8' }}
									color='white'
									onClick={() => setVotingView('user')}>
									Vote for the user
								</Button>
								<RadioGroup
									onChange={(e: any) => {
										setOption(e);
									}}
									value={option}>
									<Flex flexDir='column' gap='4px'>
										{voting?.options.map((option: any, index: any) => (
											<Radio value={index.toString()}>{option}</Radio>
										))}
									</Flex>
								</RadioGroup>
								<Button
									bgColor='primary'
									_hover={{ opacity: '0.8' }}
									onClick={handleOptionVote}>
									Vote
								</Button>
							</Flex>
						)}
						{votingView == 'user' && !voted && (
							<Flex flexDir='column' gap='8px'>
								<Button
									bgColor='#3466ff'
									mb='24px'
									_hover={{ opacity: '0.8' }}
									color='white'
									onClick={() => setVotingView('option')}>
									Vote directly for the option
								</Button>
								<Select
									placeholder='Select user'
									value={user}
									onChange={(e: any) => setUser(e.target.value)}>
									{people.map((person: any) => {
										if (person.wallet_address != address)
											return (
												<option value={person.wallet_address}>
													{person.name} {person.surname}
												</option>
											);
									})}
								</Select>
								<Button
									bgColor='primary'
									_hover={{ opacity: '0.8' }}
									onClick={handleUserVote}>
									Vote
								</Button>
							</Flex>
						)}
					</Flex>
					<Text fontSize='24px' fontWeight='600'>
						Your voting power: {votingPower}
					</Text>
					<Flex flexDir='column' gap='8px'>
						<Text fontSize='24px' fontWeight='600'>
							Voting results
						</Text>
						{votingResults?.map((result: any, index: number) => (
							<Flex
								key={index}
								align='center'
								gap='8px'
								justify='space-between'>
								<Text>{result[0]}</Text>
								<Text>{result[1]}</Text>
							</Flex>
						))}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

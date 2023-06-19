import { Button, Flex, Select } from '@chakra-ui/react';
import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { abi } from '../../../abi';
import { useAccount } from '../../../providers/account/useAccount';

export const GrantAdminForm = () => {
	const [user, setUser] = useState<string>();
	const [people, setPeople] = useState<any>();

	const { address } = useAccount();

	const handleGrantAdmin = async () => {
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum
		);
		const signer = provider.getSigner(address);
		const contract = new ethers.Contract(
			'0x43498dfF38012fE2fF2c407C40D5A256B61b1656',
			abi,
			signer
		);
		if (user) {
			const res = await contract.giveAdmin(user);
			console.log(res);
		}
	};

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

	return (
		<Flex gap='8px' flexDir='column'>
			<Select
				placeholder='Select user'
				value={user}
				onChange={(e: any) => setUser(e.target.value)}>
				{people?.map((person: any) => (
					<option value={person.wallet_address} key={person.person_id}>
						{person.name} {person.surname}
					</option>
				))}
			</Select>
			<Button
				bgColor='primary'
				_hover={{ opacity: '0.8' }}
				onClick={handleGrantAdmin}>
				Grant admin
			</Button>
		</Flex>
	);
};

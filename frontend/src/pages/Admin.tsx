import {
	Flex,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { abi } from '../abi';
import { CreateVotingForm } from '../components/pages/admin/CreateVotingForm';
import { GrantAdminForm } from '../components/pages/admin/GrantAdminForm';
import { useAccount } from '../providers/account/useAccount';

export const Admin = () => {
	const { address } = useAccount();

	const navigate = useNavigate();

	useEffect(() => {
		const checkClaim = async () => {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			const signer = provider.getSigner(address);
			const contract = new ethers.Contract(
				'0x43498dfF38012fE2fF2c407C40D5A256B61b1656',
				abi,
				signer
			);
			const isAdmin = await contract.ifSenderAdmin();
			if (!isAdmin) navigate('/');
		};

		if (address !== '0x0000000000000000') {
			checkClaim();
		}
	}, [address]);

	return (
		<Flex flexDir='column' gap='16px' mt='10vh'>
			<Tabs>
				<TabList>
					<Tab>Create voting</Tab>
					<Tab>Grant admin permission</Tab>
				</TabList>
				<TabIndicator bg='primary' />

				<TabPanels>
					<TabPanel>
						<CreateVotingForm />
					</TabPanel>
					<TabPanel>
						<GrantAdminForm />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

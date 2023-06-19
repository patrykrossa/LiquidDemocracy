import { Button, Image, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAccount } from '../../../providers/account/useAccount';
import { trimAddress } from '../../../utils/trimAddress';

export const ConnectWallet = () => {
	const { login, logout, address, isLoggedIn } = useAccount();

	const btnhandler = () => {
		if (isLoggedIn) logout();
		else {
			try {
				if ((window as any).ethereum) {
					(window as any).ethereum
						.request({ method: 'eth_requestAccounts' })
						.then((res: any) => {
							login(res[0]);
						});
				} else {
					alert('install metamask extension!!');
				}
			} catch (error: any) {
				if (error.code === -32603) {
					console.log(error);
					return;
				}
			}
		}
	};

	useEffect(() => {
		const { ethereum } = window as any;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				alert('install metamask extension!!');
			}
			try {
				const accounts = await ethereum.request({
					method: 'eth_requestAccounts',
				});
				login(accounts[0]);
				ethereum.on('accountsChanged', async () => {
					const accounts = await ethereum.request({
						method: 'eth_requestAccounts',
					});
					login(accounts[0]);
				});
			} catch {
				return;
			}
		};
		checkMetamaskAvailability();
	}, []);

	return (
		<Button
			ml='24px'
			bgColor={isLoggedIn ? '#101840' : '#3466ff'}
			p='4px 8px'
			color='white'
			fontSize='12px'
			fontWeight='600'
			_hover={{ opacity: '0.8' }}
			alignItems='center'
			gap='4px'
			onClick={btnhandler}>
			{!isLoggedIn && <Image src='/assets/icons/wallet.svg' />}
			{isLoggedIn ? trimAddress(address) : 'Connect wallet'}
		</Button>
	);
};

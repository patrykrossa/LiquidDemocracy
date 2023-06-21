import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, Textarea } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { abi } from '../../../abi';
import { contractAddress } from '../../../contract';
import { useAccount } from '../../../providers/account/useAccount';

export const CreateVotingForm = () => {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [options, setOptions] = useState<string[]>(['']);

	const { address } = useAccount();

	const handleAddVoting = async () => {
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum
		);
		const signer = provider.getSigner(address);
		const contract = new ethers.Contract(contractAddress, abi, signer);
		if (title !== '' && description !== '' && options[0] !== '') {
			const res = await contract.createVoting(title, description, options);
			console.log(res);
		}
	};

	const handleAddOption = () => {
		setOptions((prev: any) => [...prev, '']);
	};

	const handleDeleteOption = (index: number) => {
		if (options.length > 1)
			setOptions((prev: any) => [
				...prev.slice(0, index),
				...prev.slice(index + 1),
			]);
	};

	return (
		<Flex flexDir='column' gap='16px'>
			<Input
				placeholder='Voting title'
				value={title}
				onChange={(e: any) => setTitle(e.target.value)}
			/>
			<Textarea
				placeholder='Voting description'
				value={description}
				onChange={(e: any) => setDescription(e.target.value)}
			/>
			<Flex maxH='20vh' overflow='auto' flexDir='column' gap='8px'>
				{options.map((option: any, index: number) => (
					<Flex align='center' key={index} gap='8px'>
						<Input
							placeholder='Voting option'
							value={option}
							onChange={(e: any) => {
								setOptions((prev: any) => [
									...prev.slice(0, index),
									e.target.value,
									...prev.slice(index + 1),
								]);
							}}
						/>
						<PlusSquareIcon cursor='pointer' onClick={handleAddOption} />
						{options.length > 1 && (
							<DeleteIcon
								cursor='pointer'
								onClick={() => handleDeleteOption(index)}
							/>
						)}
					</Flex>
				))}
			</Flex>
			<Button
				bgColor='primary'
				_hover={{ opacity: '0.8' }}
				onClick={handleAddVoting}>
				Create voting
			</Button>
		</Flex>
	);
};

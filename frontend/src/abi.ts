export const abi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: '_title',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_description',
				type: 'string',
			},
			{
				internalType: 'string[]',
				name: '_options',
				type: 'string[]',
			},
		],
		name: 'createVoting',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: 'message',
				type: 'string',
			},
		],
		name: 'errorEvent',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_for',
				type: 'address',
			},
		],
		name: 'giveAdmin',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
		],
		name: 'revoke',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'option',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'votes',
				type: 'uint256',
			},
		],
		name: 'revokedFromOptionEvent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'votes',
				type: 'uint256',
			},
		],
		name: 'revokedFromUserEvent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: 'message',
				type: 'string',
			},
		],
		name: 'successEvent',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'option',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'votes',
				type: 'uint256',
			},
		],
		name: 'votedForOptionEvent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'votes',
				type: 'uint256',
			},
		],
		name: 'votedForUserEvent',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_for',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
		],
		name: 'voteForOption',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_for',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
		],
		name: 'voteForUser',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
		],
		name: 'checkIfVoted',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_optionId',
				type: 'uint256',
			},
		],
		name: 'getOptionVotes',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
		],
		name: 'getUserVotingPower',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_votingId',
				type: 'uint256',
			},
		],
		name: 'getVoting',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'string[]',
				name: '',
				type: 'string[]',
			},
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getVotingLength',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ifSenderAdmin',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];

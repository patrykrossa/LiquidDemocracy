import { createContext, useContext, useState } from 'react';

export interface IProps {
	login: (account: address) => Promise<address | void>;
	logout: () => void;
	address: address;
	isLoggedIn: boolean;
}

const AccountContext = createContext({
	login: (address: address) => {},
	logout: () => {},
	address: '0x0000000000000000' as address,
	isLoggedIn: false,
});

export const AccountProvider = ({ children }: any) => {
	const [address, setAddress] = useState<address>('0x0000000000000000');
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const login = async (account: address) => {
		setIsLoggedIn(true);
		setAddress(account);
		localStorage.setItem('user', account);
		return account;
	};

	const logout = () => {
		setIsLoggedIn(false);
		setAddress('0x00000000000000000');
		localStorage.setItem('user', '');
	};

	return (
		<AccountContext.Provider value={{ login, logout, address, isLoggedIn }}>
			{children}
		</AccountContext.Provider>
	);
};

export const useAccount = () => {
	const context = useContext(AccountContext);

	if (!context) {
		throw new Error(
			'`useAccountProfileProvider` cannot be used outside of a `AccountProfileProvider`!'
		);
	}
	return context;
};

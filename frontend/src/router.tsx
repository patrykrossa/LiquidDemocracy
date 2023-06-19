import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/global/RootLayout';
import { Admin } from './pages/Admin';
import { Error } from './pages/Error';
import { Home } from './pages/Home';
import { VotingDetails } from './pages/VotingDetails';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <Error />,
		children: [
			{ path: '', element: <Home /> },
			{ path: 'admin', element: <Admin /> },
			{ path: 'votings/:id', element: <VotingDetails /> },
		],
	},
]);

import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/global/RootLayout';
import { Home } from './pages/Home';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <div>Error! Page not found:(</div>,
		children: [
			{ path: '', element: <Home /> },
			{ path: 'admin', element: <div>admin panel</div> },
			{ path: 'votings/:id', element: <div>voting details</div> },
		],
	},
]);

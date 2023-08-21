import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const PrivateRoutes = [
    {
        path: '/profile',
        element: <h2>AAA</h2>,
    },
    {
        path: '/profile/image',
        element: <h2>AAA</h2>,
    },
    {
        path: '/balance',
        element: <h2>AAA</h2>,
    },
    {
        path: '/services',
        element: <h2>AAA</h2>,
    },
    {
        path: '/banner',
        element: <h2>AAA</h2>,
    },
    {
        path: '/history',
        element: <h2>AAA</h2>,
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/login'} />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/registration',
        element: <h3>aaaaa</h3>,
    },
    {
        path: '/profile',
        element: <h2>AAA</h2>,
    },
    {
        path: '/profile/image',
        element: <h2>AAA</h2>,
    },
    {
        path: '/balance',
        element: <h2>AAA</h2>,
    },
    {
        path: '/services',
        element: <h2>AAA</h2>,
    },
    {
        path: '/banner',
        element: <h2>AAA</h2>,
    },
    {
        path: '/history',
        element: <h2>AAA</h2>,
    },
]);

export { PrivateRoutes, router };

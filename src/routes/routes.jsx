import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Pembayaran from '../pages/Pembayaran';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Topup from '../pages/Topup';
import Transaksi from '../pages/Transaksi';

const PrivateRoutes = [
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/topup',
        element: <Topup />,
    },
    {
        path: '/transaksi',
        element: <Transaksi />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/transaksi/:service_code',
        element: <Pembayaran />,
    },
];

const PublicRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/registration',
        element: <Register />,
    },
];

export { PrivateRoutes, PublicRoutes };

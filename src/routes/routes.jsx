import Dashboard from '../pages/Dashboard';
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
        element: <h2>AAA</h2>,
    },
    {
        path: '/history',
        element: <h2>AAA</h2>,
    },
];

export { PrivateRoutes };

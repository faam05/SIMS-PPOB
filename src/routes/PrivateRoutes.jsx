/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from 'react-router-dom';
import withAuth from '../utils/withAuth';

const PrivateRoute = (props, { children }) => {
    const { auth } = props;
    const navigate = useNavigate();

    if (auth == true)
        return (
            <>
                {children}
                <Outlet />
            </>
        );
    if (auth == false) {
        localStorage.removeItem('token');
        navigate('/login');
    }
};

export default withAuth(PrivateRoute);

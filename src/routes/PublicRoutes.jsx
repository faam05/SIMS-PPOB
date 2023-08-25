/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from 'react-router-dom';
import withPublic from '../utils/withPublic';

const PublicRoute = (props, { children }) => {
    const { auth } = props;
    const navigate = useNavigate();

    if (auth == false) {
        localStorage.removeItem('token');
        return (
            <>
                {children}
                <Outlet />
            </>
        );
    }
    if (auth == true) {
        navigate('/dashboard');
    }
};

export default withPublic(PublicRoute);

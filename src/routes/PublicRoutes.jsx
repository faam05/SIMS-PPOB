/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token'))
            return (
                <>
                    {children}
                    <Outlet />
                </>
            );
        navigate('/dashboard');
    }, []);
};

export default PublicRoutes;

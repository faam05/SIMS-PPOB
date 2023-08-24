/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, []);

    if (auth == true) {
        return <Navigate to={'/dashboard'} />;
    } else if (auth == false) {
        return (
            <>
                {children}
                <Outlet />
            </>
        );
    }
};

export default PublicRoute;

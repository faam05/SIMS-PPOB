/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';

const withPublic = (OriginalComponent) => {
    return (props) => {
        const [auth, setAuth] = useState(null);
        const getAuth = async () => {
            if (localStorage.getItem('token') != null) {
                setAuth(true);
            } else {
                setAuth(false);
            }
        };

        useEffect(() => {
            getAuth();
        }, [getAuth]);

        return (
            <div className='hoc-class'>
                <OriginalComponent {...props} auth={auth} />
            </div>
        );
    };
};

export default withPublic;

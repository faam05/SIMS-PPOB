/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import axios from 'axios';
import { useEffect, useState } from 'react';

const withAuth = (OriginalComponent) => {
    return (props) => {
        const [auth, setAuth] = useState(null);
        const getAuth = async () => {
            try {
                const data = await axios.get('https://take-home-test-api.nutech-integrasi.app/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (data.status == 200) {
                    setAuth(true);
                }
            } catch (error) {
                if (error) {
                    setAuth(false);
                }
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

export default withAuth;

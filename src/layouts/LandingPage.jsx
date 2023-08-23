/* eslint-disable react/prop-types */
import { Flex, Image } from '@mantine/core';
import logo from '../assets/images/IllustrasiLogin.png';

const LandingPage = ({ children }) => {
    return (
        <Flex style={{ minHeight: '100vh', margin: 0, top: 0, bottom: 0, right: 0, left: 0 }}>
            <div style={{ width: '50%', alignSelf: 'center' }}>{children}</div>
            <div style={{ width: '50%', alignSelf: 'center' }}>
                <Image fit='cover' maw={'100%'} height={'100vh'} src={logo} alt='Login Ilustration' />
            </div>
        </Flex>
    );
};

export default LandingPage;

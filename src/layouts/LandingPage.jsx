/* eslint-disable react/prop-types */
import { Flex, Image } from '@mantine/core';

const LandingPage = ({ children }) => {
    return (
        <Flex style={{ minHeight: '100vh', margin: 0, top: 0, bottom: 0, right: 0, left: 0 }}>
            <div style={{ width: '50%', alignSelf: 'center' }}>{children}</div>
            <div style={{ width: '50%', alignSelf: 'center' }}>
                <Image width={'100%'} mx='auto' src='../public/images/Illustrasi Login.png' alt='Login Ilustration' />
            </div>
        </Flex>
    );
};

export default LandingPage;

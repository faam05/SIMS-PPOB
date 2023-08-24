/* eslint-disable react/prop-types */
import { Card, Flex, Image } from '@mantine/core';
import logo from '../assets/images/IllustrasiLogin.png';
import { useMediaQuery } from '@mantine/hooks';

const LandingPage = ({ children }) => {
    const matches = useMediaQuery('(min-width: 768px)');

    return (
        <>
            {matches ? (
                <Flex style={{ minHeight: '100vh', margin: 0, top: 0, bottom: 0, right: 0, left: 0 }}>
                    <div style={{ width: '50%', alignSelf: 'center' }}>{children}</div>
                    <div style={{ width: '50%', alignSelf: 'center' }}>
                        <Image fit='cover' maw={'100%'} height={'100vh'} src={logo} alt='Login Ilustration' />
                    </div>
                </Flex>
            ) : (
                <Flex justify={'center'} align={'center'} style={{ minHeight: '100vh' }}>
                    <Image fit='cover' height={'100vh'} src={logo} alt='Login Ilustration' />
                    <Card style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: 'rgba(255, 255, 255, 0.7)' }}>
                        {children}
                    </Card>
                </Flex>
            )}
        </>
    );
};

export default LandingPage;

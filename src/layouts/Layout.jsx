/* eslint-disable react/prop-types */
import { AppShell, Container, Flex, Header, Image, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <AppShell
            padding='md'
            header={
                <Header height={50} p='md'>
                    <Container size={'xl'}>
                        <Flex>
                            <Link style={{ display: 'flex', textDecoration: 'none' }} to='/dashboard' align={'center'}>
                                <Image mx={7} src='../public/images/logo.png' alt='Logo' width={20} />
                                <Text fz={12} fw={600}>
                                    SIMS PPOB
                                </Text>
                            </Link>
                            <Flex ml={'auto'}>
                                <Link to='/topup' style={{ textDecoration: 'none' }}>
                                    <Text fz={12} fw={600} mx={20} color={location.pathname == '/topup' ? 'red' : 'black'}>
                                        Top Up
                                    </Text>
                                </Link>
                                <Link to='/transaksi' style={{ textDecoration: 'none' }}>
                                    <Text fz={12} fw={600} mx={20} color={location.pathname == '/transaksi' ? 'red' : 'black'}>
                                        Transaction
                                    </Text>
                                </Link>
                                <Link to='/profile' style={{ textDecoration: 'none' }}>
                                    <Text fz={12} fw={600} mx={20} color={location.pathname == '/profile' ? 'red' : 'black'}>
                                        Akun
                                    </Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Container>
                </Header>
            }>
            <Container size={'xl'}>{children}</Container>
        </AppShell>
    );
};

export default Layout;

/* eslint-disable react/prop-types */
import { AppShell, Container, Flex, Header, Image, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/images/Logo.png';
import { useMediaQuery } from '@mantine/hooks';

const Layout = ({ children }) => {
    const matches = useMediaQuery('(min-width: 768px)');
    const location = useLocation();

    return (
        <>
            {matches ? (
                <AppShell
                    padding='md'
                    header={
                        <Header height={50} p='md'>
                            <Container size={'xl'}>
                                <Flex>
                                    <Link style={{ display: 'flex', textDecoration: 'none' }} to='/dashboard' align={'center'}>
                                        <Image mx={7} src={logo} alt='Logo' width={20} />
                                        <Text fz={12} fw={600} color='black'>
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
            ) : (
                <AppShell
                    padding='md'
                    header={
                        <Header height={50} p='md'>
                            <Container size={'xl'}>
                                <Flex>
                                    <Link style={{ display: 'flex', textDecoration: 'none' }} to='/dashboard' align={'center'}>
                                        <Image mx={3} src={logo} alt='Logo' width={20} />
                                        <Text fz={12} fw={600} color='black'>
                                            SIMS PPOB
                                        </Text>
                                    </Link>
                                    <Flex ml={'auto'}>
                                        <Link to='/topup' style={{ textDecoration: 'none' }}>
                                            <Text fz={12} fw={600} mx={5} color={location.pathname == '/topup' ? 'red' : 'black'}>
                                                Top Up
                                            </Text>
                                        </Link>
                                        <Link to='/transaksi' style={{ textDecoration: 'none' }}>
                                            <Text fz={12} fw={600} mx={5} color={location.pathname == '/transaksi' ? 'red' : 'black'}>
                                                Transaction
                                            </Text>
                                        </Link>
                                        <Link to='/profile' style={{ textDecoration: 'none' }}>
                                            <Text fz={12} fw={600} mx={5} color={location.pathname == '/profile' ? 'red' : 'black'}>
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
            )}
        </>
    );
};

export default Layout;

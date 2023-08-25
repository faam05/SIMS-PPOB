import { Box, Button, Center, Grid, Image, Modal, NumberInput, Text } from '@mantine/core';
import Layout from '../layouts/Layout';
import { IconDialpad } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance, getBalance } from '../features/balanceSlice';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import logo from '../assets/images/Logo.png';
import { notifications } from '@mantine/notifications';
import Detail from '../components/Detail';

const Topup = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const dataBalance = useSelector((state) => state.balance);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const matches = useMediaQuery('(min-width: 1440px)');

    useEffect(() => {
        dispatch(getBalance());
    }, [dispatch]);

    const handleTopup = async () => {
        close();
        setLoading(true);
        await dispatch(addBalance(value));
        if (dataBalance.status == 'failed') {
            notifications.show({
                title: `Gagal!`,
                message: `Top Up sebesar Rp${value.toLocaleString('ID')} gagal dilakukan`,
                color: 'red',
                autoClose: 5000,
            });
            setLoading(false);
            return;
        } else if (dataBalance.status == 'success') {
            notifications.show({
                title: `Top Up berhasil!`,
                message: `Top Up sebesar Rp${value.toLocaleString('ID')} berhasil dilakukan`,
                color: 'green',
                autoClose: 5000,
                position: 'top-center',
            });
        }
        setLoading(false);
        setValue('');
    };

    return (
        <Layout>
            {matches ? (
                <>
                    <Modal opened={opened} onClose={close} centered>
                        <Center>
                            <Image src={logo} alt='Top Up' width={55} />
                        </Center>
                        <Text fw={500} fz={18} align='center' mt={20}>
                            Anda yakin ingin Top Up sebesar
                        </Text>
                        <Text fw={700} align='center' fz={24}>
                            Rp
                            {value.toLocaleString('ID')}?
                        </Text>
                        <Center mt={20}>
                            <Button variant='subtle' color='red' onClick={() => handleTopup()}>
                                <Text align='center'>Ya, lanjutkan Top Up</Text>
                            </Button>
                        </Center>
                        <Center mt={20}>
                            <Button variant='subtle' color='gray' onClick={close}>
                                <Text align='center'>Batalkan</Text>
                            </Button>
                        </Center>
                    </Modal>
                    <Detail />
                    <Text fz={18} mt={50} fw={450}>
                        Silahkan masukan
                    </Text>
                    <Text fz={24} fw={700}>
                        Nominal Top Up
                    </Text>
                    <Box mt={30}>
                        <Grid gutter={'lg'}>
                            <Grid.Col span={8}>
                                <NumberInput
                                    value={value}
                                    thousandsSeparator='.'
                                    onChange={(value) => setValue(value)}
                                    hideControls
                                    placeholder='masukan nominal Top Up'
                                    icon={<IconDialpad />}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.') : ''
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button w={103} variant='default' onClick={() => setValue(10000)}>
                                    Rp10.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button w={103} variant='default' onClick={() => setValue(20000)}>
                                    Rp20.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button w={103} variant='default' onClick={() => setValue(50000)}>
                                    Rp50.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <Button
                                    color='red'
                                    fullWidth
                                    disabled={!loading ? (value == '' ? true : false) : true}
                                    onClick={() => {
                                        if (value < 10000) {
                                            notifications.show({
                                                title: `Error!`,
                                                message: `Nominal Top Up minimal Rp10.000`,
                                                color: 'red',
                                                autoClose: 5000,
                                            });
                                        } else if (value > 1000000) {
                                            notifications.show({
                                                title: `Error!`,
                                                message: `Nominal Top Up maksimal Rp1.000.000`,
                                                color: 'red',
                                                autoClose: 5000,
                                            });
                                        } else {
                                            open();
                                        }
                                    }}>
                                    Top Up
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button variant='default' onClick={() => setValue(100000)}>
                                    Rp100.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button variant='default' onClick={() => setValue(250000)}>
                                    Rp250.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Button variant='default' onClick={() => setValue(500000)}>
                                    Rp500.000
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Box>
                </>
            ) : (
                <>
                    <Modal opened={opened} onClose={close} centered>
                        <Center>
                            <Image src={logo} alt='Top Up' width={55} />
                        </Center>
                        <Text fw={500} fz={18} align='center' mt={20}>
                            Anda yakin ingin Top Up sebesar
                        </Text>
                        <Text fw={700} align='center' fz={24}>
                            Rp
                            {value.toLocaleString('ID')}?
                        </Text>
                        <Center mt={20}>
                            <Button variant='subtle' color='red' onClick={() => handleTopup()}>
                                <Text align='center'>Ya, lanjutkan Top Up</Text>
                            </Button>
                        </Center>
                        <Center mt={20}>
                            <Button variant='subtle' color='gray' onClick={close}>
                                <Text align='center'>Batalkan</Text>
                            </Button>
                        </Center>
                    </Modal>
                    <Detail />
                    <Text fz={18} mt={50} fw={450}>
                        Silahkan masukan
                    </Text>
                    <Text fz={24} fw={700}>
                        Nominal Top Up
                    </Text>
                    <Box mt={30}>
                        <Grid gutterMd={'lg'} gutterXs='md'>
                            <Grid.Col span={6} sm={2} orderMd={2} md={2}>
                                <Button w={103} variant='default' onClick={() => setValue(10000)}>
                                    Rp10.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6} sm={2} orderMd={3} md={2}>
                                <Button w={103} variant='default' onClick={() => setValue(20000)}>
                                    Rp20.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6} sm={2} orderMd={4} md={2}>
                                <Button w={103} variant='default' onClick={() => setValue(50000)}>
                                    Rp50.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6} sm={2} orderMd={6} md={2}>
                                <Button variant='default' onClick={() => setValue(100000)}>
                                    Rp100.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6} sm={2} orderMd={7} md={2}>
                                <Button variant='default' onClick={() => setValue(250000)}>
                                    Rp250.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6} sm={2} orderMd={8} md={2}>
                                <Button variant='default' onClick={() => setValue(500000)}>
                                    Rp500.000
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={12} sm={12} orderMd={1} md={6}>
                                <NumberInput
                                    value={value}
                                    thousandsSeparator='.'
                                    onChange={(value) => setValue(value)}
                                    hideControls
                                    placeholder='masukan nominal Top Up'
                                    icon={<IconDialpad />}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.') : ''
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={12} orderMd={5} md={6}>
                                <Button
                                    color='red'
                                    fullWidth
                                    disabled={!loading ? (value == '' ? true : false) : true}
                                    onClick={() => {
                                        if (value < 10000) {
                                            notifications.show({
                                                title: `Error!`,
                                                message: `Nominal Top Up minimal Rp10.000`,
                                                color: 'red',
                                                autoClose: 5000,
                                            });
                                        } else if (value > 1000000) {
                                            notifications.show({
                                                title: `Error!`,
                                                message: `Nominal Top Up maksimal Rp1.000.000`,
                                                color: 'red',
                                                autoClose: 5000,
                                            });
                                        } else {
                                            open();
                                        }
                                    }}>
                                    Top Up
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Box>
                </>
            )}
        </Layout>
    );
};

export default Topup;

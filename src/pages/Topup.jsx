import { Box, Button, Center, Grid, Image, Modal, NumberInput, Text } from '@mantine/core';
import DetailShow from '../components/DetailShow';
import Layout from '../layouts/Layout';
import { IconDialpad } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance } from '../features/balanceSlice';
import { useDisclosure } from '@mantine/hooks';

import logo from '../assets/images/Logo.png';

const Topup = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const dataBalance = useSelector((state) => state.balance);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTopup = async () => {
        close();
        setLoading(true);
        await dispatch(addBalance(value));
        setValue('');
        setLoading(false);
    };

    return (
        <Layout>
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
            <DetailShow />
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
                        <Button color='red' fullWidth disabled={loading ? true : false} onClick={open}>
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
        </Layout>
    );
};

export default Topup;
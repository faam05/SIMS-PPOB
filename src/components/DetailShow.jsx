import { Box, Card, Flex, Image, Text } from '@mantine/core';
import { useEffect } from 'react';
import { getProfile } from '../features/profileSlice';
import { getBalance } from '../features/balanceSlice';
import { useDispatch, useSelector } from 'react-redux';

const DetailShow = () => {
    const dispatch = useDispatch();
    const dataProfile = useSelector((state) => state.profile);
    const dataBalance = useSelector((state) => state.balance);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getBalance());
    }, [dispatch]);
    return (
        <Flex justify={'space-between'} maw='100%' align={'center'} mt={10}>
            <div style={{ width: '30%' }}>
                <Image src={'../../public/images/Profile Photo.png'} alt='Logo' width={'42%'} />
                <Text mt={10} fz={18} fw={400}>
                    Selamat datang,
                </Text>
                <Text fz={25} fw={700}>
                    {dataProfile.first_name} {dataProfile.last_name}
                </Text>
            </div>
            <Box width='70%'>
                <Card
                    style={{ backgroundImage: `url('../../public/images/Background Saldo.png')` }}
                    h='155px'
                    w='650px'
                    pl={35}
                    shadow='sm'
                    radius='md'>
                    <Text mt={10} color='white' fz={12}>
                        Saldo anda
                    </Text>
                    <Text style={{ display: 'flex' }} mt={10} color='white' fz={25} fw={700} align='center'>
                        Rp
                        <input
                            type='text'
                            disabled
                            value={dataBalance.balance}
                            style={{ textDecoration: 'none', marginLeft: 10, border: 'none', background: 'transparent', color: 'white' }}
                        />
                    </Text>
                    <Text mt={24} color='white' fz={10}>
                        Tutup Saldo
                    </Text>
                </Card>
            </Box>
        </Flex>
    );
};

export default DetailShow;

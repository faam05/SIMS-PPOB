import { ActionIcon, Avatar, Box, Card, Flex, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { cekSaldo, getProfile } from '../features/profileSlice';
import { getBalance } from '../features/balanceSlice';
import { useDispatch, useSelector } from 'react-redux';

import profilePhoto from '../assets/images/Profile Photo.png';
import background from '../assets/images/Background Saldo.png';
import { IconEye } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

const Detail = () => {
    const [image, setImage] = useState(profilePhoto);
    const dispatch = useDispatch();
    const dataProfile = useSelector((state) => state.profile);
    const dataBalance = useSelector((state) => state.balance);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getBalance());
    }, [dispatch]);

    useEffect(() => {
        if (dataProfile.auth == true) {
            if (dataProfile.profile_image != 'https://minio.nutech-integrasi.app/take-home-test/null') {
                setImage(dataProfile.profile_image);
            }
        }
    }, [dataProfile]);

    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            {matches ? (
                <Flex justify={'space-between'} maw='100%' align={'center'} mt={10}>
                    <div style={{ width: '30%' }}>
                        <Avatar radius={'lg'} src={image} alt='Profile' size={'lg'} width={'42%'} />
                        <Text mt={10} fz={18} fw={400}>
                            Selamat datang,
                        </Text>
                        <Text fz={25} fw={700}>
                            {dataProfile.first_name} {dataProfile.last_name}
                        </Text>
                    </div>
                    <Box>
                        <Card style={{ backgroundImage: `url("${background}")` }} h='155px' w='650px' pl={35} shadow='sm' radius='md'>
                            <Text mt={10} color='white' fz={12}>
                                Saldo anda
                            </Text>
                            <Text style={{ display: 'flex' }} mt={10} color='white' fz={25} fw={700} align='center'>
                                Rp
                                <input
                                    type={!dataProfile.hide ? 'password' : 'text'}
                                    disabled
                                    value={!dataProfile.hide ? 'xxxxxxx' : dataBalance.balance.toLocaleString('ID')}
                                    style={{
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        marginLeft: 10,
                                        border: 'none',
                                        background: 'transparent',
                                        color: 'white',
                                    }}
                                />
                            </Text>
                            <Flex mt={18} align={'center'}>
                                <Text color='white' fz={10} mr={5}>
                                    Lihat Saldo
                                </Text>
                                <ActionIcon variant='transparent' onClick={() => dispatch(cekSaldo())}>
                                    <IconEye size={14} color='white' />
                                </ActionIcon>
                            </Flex>
                        </Card>
                    </Box>
                </Flex>
            ) : (
                <>
                    <div style={{ width: '100%' }}>
                        <Avatar radius={'lg'} src={image} alt='Profile' size={'lg'} width={'42%'} />
                        <Text mt={10} fz={16} fw={400}>
                            Selamat datang,
                        </Text>
                        <Text fz={20} fw={700}>
                            {dataProfile.first_name} {dataProfile.last_name}
                        </Text>
                    </div>
                    <Box mt={20}>
                        <Card style={{ backgroundImage: `url("${background}")` }} ml={'auto'} w='70%' h='155px' pl={35} shadow='sm' radius='md'>
                            <Text mt={10} color='white' fz={10}>
                                Saldo anda
                            </Text>
                            <Text style={{ display: 'flex' }} mt={10} color='white' fz={25} fw={700} align='center'>
                                Rp
                                <input
                                    type={!dataProfile.hide ? 'password' : 'text'}
                                    disabled
                                    value={!dataProfile.hide ? 'xxxxxxx' : dataBalance.balance.toLocaleString('ID')}
                                    style={{
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        marginLeft: 10,
                                        border: 'none',
                                        background: 'transparent',
                                        color: 'white',
                                    }}
                                />
                            </Text>
                            <Flex mt={22} align={'center'}>
                                <Text color='white' fz={10} mr={5}>
                                    Lihat Saldo
                                </Text>
                                <ActionIcon variant='transparent' onClick={() => dispatch(cekSaldo())}>
                                    <IconEye size={14} color='white' />
                                </ActionIcon>
                            </Flex>
                        </Card>
                    </Box>
                </>
            )}
        </>
    );
};

export default Detail;

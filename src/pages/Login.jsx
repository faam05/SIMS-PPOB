import { Box, Button, Image, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons-react';
import LandingPage from '../layouts/LandingPage';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

import logo from '../assets/images/Logo.png';
import { useMediaQuery } from '@mantine/hooks';

const Login = () => {
    const matches = useMediaQuery('(min-width: 768px)');

    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: { password: '', email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email tidak valid'),
            password: (value) => (value.length < 1 ? 'Password harus diisi' : null),
        },
    });
    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        setLoading(true);
        try {
            await axios.post('https://take-home-test-api.nutech-integrasi.app/login', value).then((res) => {
                if (res.data.status == 0) {
                    localStorage.setItem('token', res.data.data.token);
                    navigate('/dashboard');
                }
            });
        } catch (error) {
            notifications.show({
                title: `Error!`,
                message: error.response.data.message,
                color: 'red',
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <LandingPage>
            {matches ? (
                <Box maw={350} mx='auto'>
                    <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} my={20}>
                        <Image mx={7} src={logo} alt='Logo' width={25} />
                        <Title order={3}>SIMS PPOB</Title>
                    </Text>
                    <Title order={3} my={50} align='center'>
                        Masuk atau buat akun <br />
                        untuk memulai
                    </Title>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput icon={<IconAt />} placeholder='masukan email anda' {...form.getInputProps('email')} />
                        <PasswordInput icon={<IconLock />} mt='sm' placeholder='masukan password anda' {...form.getInputProps('password')} />
                        <Button fullWidth type='submit' color='red' mt={50} disabled={loading ? true : false}>
                            Masuk
                        </Button>
                    </form>
                    <Text fz='xs' mt={30} ta={'center'}>
                        belum punya akun? registrasi{' '}
                        <Link to={'/registration'} style={{ textDecoration: 'none', color: 'red' }}>
                            di sini
                        </Link>
                    </Text>
                </Box>
            ) : (
                <Box maw={200} mx='auto'>
                    <Text color='black' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} my={10}>
                        <Image mx={7} src={logo} alt='Logo' width={20} />
                        <Title order={5}>SIMS PPOB</Title>
                    </Text>
                    <Title color='black' order={6} my={20} align='center'>
                        Masuk atau buat akun <br />
                        untuk memulai
                    </Title>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput size='xs' icon={<IconAt size='0.8rem' />} placeholder='masukan email' {...form.getInputProps('email')} />
                        <PasswordInput
                            size='xs'
                            icon={<IconLock size='0.8rem' />}
                            mt='sm'
                            placeholder='masukan password'
                            {...form.getInputProps('password')}
                        />
                        <Button size='xs' fullWidth type='submit' color='red' mt={30} disabled={loading ? true : false}>
                            Masuk
                        </Button>
                    </form>
                    <Text color='black' fz={9} mt={20} ta={'center'}>
                        belum punya akun? registrasi{' '}
                        <Link to={'/registration'} style={{ textDecoration: 'none', color: 'red' }}>
                            di sini
                        </Link>
                    </Text>
                </Box>
            )}
        </LandingPage>
    );
};

export default Login;

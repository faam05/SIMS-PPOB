import { Box, Button, Image, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';
import LandingPage from '../layouts/LandingPage';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: { password: '', konfirmasiPassword: '', email: '', first_name: '', last_name: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email tidak valid'),
            konfirmasiPassword: (value, values) => (value !== values.password ? 'Password tidak sama' : null),
        },
    });

    const handleSubmit = async (value) => {
        const payload = {
            email: value.email,
            password: value.password,
            first_name: value.first_name,
            last_name: value.last_name,
        };
        setLoading(true);
        try {
            const { data } = await axios.post('https://take-home-test-api.nutech-integrasi.app/registration', payload);
            notifications.show({
                title: `Registrasi berhasil!`,
                message: data.message,
                color: 'green',
                autoClose: 5000,
                position: 'bottom-left',
            });
            navigate('/login');
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
            <Box maw={350} mx='auto'>
                <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} my={20}>
                    <Image mx={7} src='../public/images/logo.png' alt='Logo' width={25} />
                    <Title order={3}>SIMS PPOB</Title>
                </Text>
                <Title order={3} my={50} align='center'>
                    Lengkapi data untuk <br />
                    membuat akun
                </Title>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput icon={<IconAt />} placeholder='masukan email anda' {...form.getInputProps('email')} />
                    <TextInput icon={<IconUser />} mt='lg' placeholder='nama depan' {...form.getInputProps('first_name')} />
                    <TextInput icon={<IconUser />} mt='lg' placeholder='nama belakang' {...form.getInputProps('last_name')} />
                    <PasswordInput icon={<IconLock />} mt='lg' placeholder='buat password' {...form.getInputProps('password')} />
                    <PasswordInput icon={<IconLock />} mt='lg' placeholder='konfirmasi password' {...form.getInputProps('konfirmasiPassword')} />
                    <Button fullWidth type='submit' color='red' mt={50} disabled={loading ? true : false}>
                        Registrasi
                    </Button>
                </form>
                <Text fz='xs' mt={30} ta={'center'}>
                    sudah punya akun? login{' '}
                    <Link to={'/registration'} style={{ textDecoration: 'none', color: 'red' }}>
                        di sini
                    </Link>
                </Text>
            </Box>
        </LandingPage>
    );
};

export default Register;

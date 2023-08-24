import { Avatar, Button, Center, Container, FileInput, Flex, Input, InputBase, Modal, Text, rem } from '@mantine/core';
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updatePhotoProfile, updateProfile } from '../features/profileSlice';

import profilePhoto from '../assets/images/Profile Photo.png';
import { useNavigate } from 'react-router-dom';
import { IconPencil } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconUpload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(profilePhoto);
    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    // handle upload image
    const [opened, { open, close }] = useDisclosure(false);

    const dispatch = useDispatch();
    const dataProfile = useSelector((state) => state.profile);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (dataProfile.auth == true) {
            setEmail(dataProfile.email);
            setNamaDepan(dataProfile.first_name);
            setNamaBelakang(dataProfile.last_name);

            if (dataProfile.profile_image != 'https://minio.nutech-integrasi.app/take-home-test/null') {
                setImage(dataProfile.profile_image);
            }
        }
    }, [dataProfile]);

    const [value, setValue] = useState(null);

    const handleEdit = async () => {
        let oldImage = dataProfile.profile_image;
        const formData = new FormData();
        formData.append('file', value);
        await dispatch(updatePhotoProfile(formData));
        if (oldImage == dataProfile.profile_image) {
            notifications.show({
                title: `Error!`,
                message: `Upload gagal dilakukan`,
                color: 'red',
                autoClose: 5000,
            });
            close();
            return;
        } else if (oldImage != dataProfile.profile_image) {
            notifications.show({
                title: `Upload berhasil!`,
                message: `Upload berhasil dilakukan`,
                color: 'green',
                autoClose: 5000,
                position: 'top-center',
            });
            close();
        }
    };

    const handleUpdate = async () => {
        let values;
        values = {
            email: email,
            first_name: namaDepan,
            last_name: namaBelakang,
        };
        setLoading(true);
        await dispatch(updateProfile(values));
        setLoading(false);
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Layout>
            <Container size={'md'}>
                <Modal opened={opened} onClose={close} title='Upload Profile Picture'>
                    <FileInput
                        value={value}
                        onChange={setValue}
                        icon={<IconUpload size={rem(14)} />}
                        placeholder='Upload file'
                        accept='image/png,image/jpeg'
                    />
                    <Button mt={20} variant='filled' color='red' fullWidth onClick={() => handleEdit()}>
                        Upload
                    </Button>
                </Modal>
                <Center>
                    <Flex style={{ alignItems: 'self-end' }}>
                        <Avatar radius={'xl'} mt={10} src={image} alt='Profile' size={120} />
                        <Avatar component='button' radius={'xl'} style={{ position: 'absolute', marginLeft: 90 }} onClick={open}>
                            <IconPencil strokeWidth={1} color={'#192d4d'} />
                        </Avatar>
                    </Flex>
                </Center>
                <Text align='center' mt={10} fz={26} fw={600}>
                    {dataProfile.first_name} {dataProfile.last_name}
                </Text>

                {!edit ? (
                    <>
                        <InputBase component='button' mt={30} label='Email'>
                            <Input.Placeholder>{email}</Input.Placeholder>
                        </InputBase>
                        <InputBase component='button' mt={30} label='Nama Depan'>
                            <Input.Placeholder>{namaDepan}</Input.Placeholder>
                        </InputBase>
                        <InputBase component='button' mt={30} label='Nama Belakang'>
                            <Input.Placeholder>{namaBelakang}</Input.Placeholder>
                        </InputBase>

                        <Button mt={30} variant='outline' color='red' fullWidth onClick={() => setEdit(!edit)}>
                            Edit Profile
                        </Button>

                        <Button mt={30} variant='filled' color='red' fullWidth onClick={() => handleLogout()}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Input.Wrapper id='email' mt={30} label='Email'>
                            <Input id='email' defaultValue={email} onChange={(event) => setEmail(event.target.value)} />
                        </Input.Wrapper>
                        <Input.Wrapper id='nama-depan' mt={30} label='Nama Depan'>
                            <Input id='nama-depan' defaultValue={namaDepan} onChange={(event) => setNamaDepan(event.target.value)} />
                        </Input.Wrapper>
                        <Input.Wrapper id='nama-belakang' mt={30} label='Nama Belakang'>
                            <Input id='nama-belakang' defaultValue={namaBelakang} onChange={(event) => setNamaBelakang(event.target.value)} />
                        </Input.Wrapper>

                        <Button mt={30} disabled={loading} variant='filled' color='red' fullWidth onClick={() => handleUpdate()}>
                            Simpan
                        </Button>

                        <Button mt={30} variant='outline' color='red' fullWidth onClick={() => setEdit(!edit)}>
                            Batalkan
                        </Button>
                    </>
                )}
            </Container>
        </Layout>
    );
};

export default Profile;

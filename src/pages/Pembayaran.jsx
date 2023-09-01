import { Button, Input, InputBase, Text } from '@mantine/core';
import Layout from '../layouts/Layout';
import { IconDialpad } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../features/servicesSlice';
import { useParams } from 'react-router-dom';
import { saveTransaksi } from '../features/transaksiSlice';
import { notifications } from '@mantine/notifications';
import Detail from '../components/Detail';

const Pembayaran = () => {
    const { service_code } = useParams();
    const dispatch = useDispatch();
    const dataServices = useSelector((state) => state.services.services);
    const dataBalance = useSelector((state) => state.balance);
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState(false);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    useEffect(() => {
        if (dataServices) {
            setService(dataServices.find((service) => service.service_code == service_code));
        }
    }, [dataServices, service_code]);

    const handleBayar = async () => {
        setLoading(true);
        await dispatch(saveTransaksi({ service_code: service_code }));
        if (dataBalance.status == 'failed') {
            notifications.show({
                title: `Gagal!`,
                message: `Pembayaran ${service.service_name} gagal dilakukan`,
                color: 'red',
                autoClose: 5000,
            });
            setLoading(false);
            return;
        } else if (dataBalance.status == 'success') {
            notifications.show({
                title: `Pembayaran berhasil!`,
                message: `Pembayaran ${service.service_name} berhasil dilakukan`,
                color: 'green',
                autoClose: 5000,
                position: 'top-center',
            });
        }
        setLoading(false);
    };

    return (
        <Layout>
            <Detail />
            <Text fz={18} mt={50} fw={450}>
                Pembayaran
            </Text>
            <Text fz={24} fw={700}>
                {service ? service.service_name : 'Service Name'}
            </Text>
            <InputBase component='button' mt={30} icon={<IconDialpad />}>
                <Input.Placeholder>{service ? service.service_tariff.toLocaleString('ID') : 0}</Input.Placeholder>
            </InputBase>
            <Button mt={20} color='red' fullWidth disabled={loading} onClick={() => handleBayar()}>
                Top Up
            </Button>
        </Layout>
    );
};

export default Pembayaran;

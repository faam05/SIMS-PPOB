/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Group, ScrollArea, Text } from '@mantine/core';
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaksi } from '../features/balanceSlice';

import 'moment/locale/id';
import moment from 'moment/moment';
import Detail from '../components/Detail';

const Transaksi = () => {
    const dispatch = useDispatch();
    const dataTransaksi = useSelector((state) => state.balance);
    const [nextPage, setNextPage] = useState(null);

    const [value, setValue] = useState(0);

    useEffect(() => {
        dispatch(getTransaksi());
    }, [dispatch]);

    useEffect(() => {
        if (dataTransaksi.loading == false) {
            if (dataTransaksi.nextPage == false) {
                setNextPage(false);
            }
        }
    }, [dataTransaksi]);

    const handleMore = async () => {
        await dispatch(getTransaksi(value + 1));
        setValue(value + 1);
        // if (dataSelanjutnya.data.records.length == 5) {
        // }
    };

    return (
        <Layout>
            <Detail />
            <Text fz={18} mt={50} fw={650}>
                Semua Transaksi
            </Text>
            <ScrollArea h={670}>
                {dataTransaksi.transaksi?.map((transaksi, index) => (
                    <Card my={25} key={index} shadow='sm' padding='md' radius='md' withBorder>
                        <Group position='apart' mt='xs' mb='xs'>
                            {transaksi.transaction_type == 'TOPUP' ? (
                                <Text color='green' fz={20} weight={700}>
                                    + Rp {transaksi.total_amount.toLocaleString('ID')}
                                </Text>
                            ) : (
                                <Text color='red' fz={20} weight={700}>
                                    - Rp {transaksi.total_amount?.toLocaleString('ID')}
                                </Text>
                            )}
                            <Text fz={14} fw={450} variant='light' mb={'auto'}>
                                {transaksi.description}
                            </Text>
                        </Group>
                        <Text size='sm' color='dimmed'>
                            {moment(transaksi.created_on).format('DD MMMM YYYY HH:mm') + ' WIB'}
                        </Text>
                    </Card>
                ))}
            </ScrollArea>
            {nextPage == null ? (
                <>
                    <Button variant='subtle' color='red' size='md' fullWidth mt='md' radius='md' onClick={() => handleMore()}>
                        Show more
                    </Button>
                </>
            ) : null}
        </Layout>
    );
};

export default Transaksi;

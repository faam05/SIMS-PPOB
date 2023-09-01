/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Group, ScrollArea, Text } from '@mantine/core';
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaksi } from '../features/transaksiSlice';

import 'moment/locale/id';
import moment from 'moment/moment';
import Detail from '../components/Detail';
import { TransaksiSelectors } from '../features/transaksiSlice';

const Transaksi = () => {
    const dispatch = useDispatch();
    // const [nextPage, setNextPage] = useState(null);

    const [value, setValue] = useState(0);

    const dataTransaksi = useSelector(TransaksiSelectors.selectAll);
    const nextPage = useSelector((state) => state.transaksi.nextPage);

    useEffect(() => {
        dispatch(getTransaksi());
    }, [dispatch]);

    const handleMore = async () => {
        await dispatch(getTransaksi(value + 5));
        setValue(value + 5);
    };

    return (
        <Layout>
            <Detail />
            <Text fz={18} mt={30} fw={650}>
                Semua Transaksi
            </Text>
            {dataTransaksi.length > 0 ? (
                <ScrollArea h={570}>
                    {dataTransaksi?.map((transaksi, index) => (
                        <Card my={15} key={index} shadow='sm' padding='md' radius='md' withBorder>
                            <Group position='apart' mb='xs'>
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
            ) : null}
            {nextPage == true ? (
                <>
                    <Button variant='subtle' color='red' size='md' fullWidth radius='md' onClick={() => handleMore()}>
                        Show more
                    </Button>
                </>
            ) : null}
        </Layout>
    );
};

export default Transaksi;

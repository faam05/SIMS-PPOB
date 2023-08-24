import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Grid, Image, Text } from '@mantine/core';
import { getServices } from '../features/servicesSlice';
import { Carousel } from '@mantine/carousel';
import { getBanners } from '../features/bannerSlice';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import Detail from '../components/Detail';
import { useMediaQuery } from '@mantine/hooks';

const Dashboard = () => {
    const dispatch = useDispatch();
    const dataSevices = useSelector((state) => state.services.services);
    const dataBanners = useSelector((state) => state.banners.banners);

    useEffect(() => {
        dispatch(getServices());
        dispatch(getBanners());
    }, [dispatch]);

    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <Layout>
            {matches ? (
                <>
                    <Detail />
                    <Grid mt={30}>
                        {dataSevices?.map((service, index) => (
                            <Grid.Col span={1} key={index}>
                                <Link style={{ textDecoration: 'none' }} to={`/transaksi/${service.service_code}`}>
                                    <Image
                                        width={60}
                                        radius='md'
                                        src={service.service_icon}
                                        caption={
                                            <Text fz={9} fw={600} mt={10}>
                                                {service.service_name}
                                            </Text>
                                        }
                                    />
                                </Link>
                            </Grid.Col>
                        ))}
                    </Grid>
                    <Text fz={13} mt={40} fw={650}>
                        Temukan promo menarik
                    </Text>
                    <Carousel loop mt={25} slideSize='22%' height={'100%'} slideGap='10px' dragFree withControls={false} align='start'>
                        {dataBanners.map((banner, index) => (
                            <Carousel.Slide key={index}>
                                <Image key={index} src={banner.banner_image} alt='Banner' mx={10} />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </>
            ) : (
                <>
                    <Detail />
                    <Grid mt={30}>
                        {dataSevices?.map((service, index) => (
                            <Grid.Col span={3} key={index}>
                                <Link style={{ textDecoration: 'none' }} to={`/transaksi/${service.service_code}`}>
                                    <Image
                                        width={60}
                                        radius='md'
                                        src={service.service_icon}
                                        caption={
                                            <Text fz={9} fw={600} mt={10}>
                                                {service.service_name}
                                            </Text>
                                        }
                                    />
                                </Link>
                            </Grid.Col>
                        ))}
                    </Grid>
                    <Text fz={13} mt={40} fw={650}>
                        Temukan promo menarik
                    </Text>
                    <Carousel loop mt={25} slideSize='52%' height={'100%'} slideGap='10px' withControls={false} align='start'>
                        {dataBanners.map((banner, index) => (
                            <Carousel.Slide key={index}>
                                <Image key={index} src={banner.banner_image} alt='Banner' mx={10} />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </>
            )}
        </Layout>
    );
};

export default Dashboard;

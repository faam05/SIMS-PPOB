import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './app/strore.js';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={
                {
                    // breakpoints: {
                    //     xs: 500,
                    //     sm: 800,
                    //     md: 1000,
                    //     lg: 1200,
                    //     xl: 1400,
                    // },
                    // components: {
                    //     GridCol: {
                    //         defaultProps: {
                    //             sizes: {
                    //                 xs: 0,
                    //                 sm: 720,
                    //                 md: 960,
                    //                 lg: 1140,
                    //                 xl: 1320,
                    //             },
                    //         },
                    //     },
                    // },
                }
            }>
            <Notifications />
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </MantineProvider>
    </React.StrictMode>
);

import React from 'react';
import { Helmet } from 'react-helmet-async';

const Error = () => {
    return (
        <div className='flex items-center justify-center text-3xl font-bold h-screen'>
            <Helmet>
                <title>PenPalette | Error</title>
            </Helmet>
            <h1>404 Page Not Found</h1>
        </div>
    );
};

export default Error;
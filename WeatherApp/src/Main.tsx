import React, { FC } from 'react';
import { WeatherProvider } from './context/WeatherProvider';
import Home from './screen/Home';

const Main:FC = () => {
    return (
        <WeatherProvider>
            <Home />
        </WeatherProvider>
    )
}

export default Main
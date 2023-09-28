import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { getWeatherForecast } from '../api';

interface WeatherContextProps {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    weatherData: any;
    error: string;
    loading: boolean;
}

interface WeatherProviderProps {
    children: ReactNode;
}

export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<WeatherProviderProps> = (props) => {
    const [location, setLocation] = useState<string>('New York');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        getWeatherData(location);
    },[location]);

    const getWeatherData = async (location: string)=>{
        setLoading(true);
        getWeatherForecast({
          cityName: location,
          days: '5'
        }).then(data=>{
          setLoading(false);
          setWeatherData(data);
        }).catch(e => {
            setLoading(false);
            setError('Failed to retrieve weather data. Please try again.');
        })
    }

    return (
        <WeatherContext.Provider value={{ location, setLocation, weatherData, error, loading }}>
            {props.children}
        </WeatherContext.Provider>
    );
};

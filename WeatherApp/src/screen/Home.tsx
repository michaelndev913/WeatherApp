import React, { FC, useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Keyboard, ActivityIndicator } from 'react-native';
import { WeatherContext } from '../context/WeatherProvider';
import { getLocations } from '../api';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { weatherImages } from '../constant';
import LocationsList from '../components/LocationsList';
import DaysWeatherList from '../components/DaysWeatherList';
export interface LocationType {
    name: string,
    country: string,
}
const Home:FC = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('WeatherComponent must be used within a WeatherProvider');
    }
    const { location, setLocation, weatherData, error, loading } = context;
    const [locations, setLocations] = useState<Array<LocationType>>([]);
    const [showSearchList, setShowSearchList] = useState(false);
    const [searchLocation, setSearchLocation] = useState(location);

    const handleSearch = (search: string)=>{
        setShowSearchList(true);
        if(search && search.length > 2) {
            getLocations({cityName: search}).then(data=>{
                setLocations(data);
            });
        }
    }

    const handleLocation = (location: LocationType) => {
        setShowSearchList(false);
        setSearchLocation(`${location.name}, ${location?.country}`);
        setLocation(location.name);
    }
    const inputLocation = (text: string) => {
        setSearchLocation(text);
        handleSearch(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={searchLocation}
                onChangeText={text => inputLocation(text)}
                placeholderTextColor="#fff" 
                onBlur={() => Keyboard.dismiss()}
            />
            {showSearchList && (
                <LocationsList locations={locations} handleLocation={handleLocation} />
            )}
            {loading ?
            <View style={styles.centerContainer}>
                <ActivityIndicator size={'large'} color={'#fff'} />
            </View> :
            error ? 
            <View style={styles.centerContainer}>
                <Text style={styles.error}>{error}</Text>
            </View> :
            <View style={styles.contentContainer}>
                <Image
                    source={weatherImages[weatherData?.current?.condition?.text || 'other']} 
                    style={{width: 120, height: 120}}
                />
                <View>
                    <Text style={styles.tempLabel}>{weatherData?.current?.temp_c}&#176;</Text>
                    <Text style={styles.conditionLabel}>{weatherData?.current?.condition?.text}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsItem}>
                        <Image source={require('../assets/icons/wind.png')} style={styles.statsIcon}/>
                        <Text style={styles.conditionLabel}>{weatherData?.current?.wind_kph}km</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Image source={require('../assets/icons/drop.png')} style={styles.statsIcon}/>
                    <Text style={styles.conditionLabel}>{weatherData?.current?.humidity}%</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Image source={require('../assets/icons/sun.png')} style={styles.statsIcon}/>
                        <Text style={styles.conditionLabel}>{ weatherData?.forecast?.forecastday[0]?.astro?.sunrise }</Text>
                    </View>
                </View>
                <DaysWeatherList weathers={weatherData?.forecast?.forecastday} />
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
        paddingTop: 30,
        backgroundColor: 'black',
        height: heightPercentageToDP('100%'),
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        width: widthPercentageToDP('90%'),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 50,
        color: 'white',
        paddingHorizontal: 20
    },
    contentContainer: {
        alignItems: 'center',
        height: heightPercentageToDP('80%'),
        justifyContent: 'space-between',
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPercentageToDP('100%'),
    },
    tempLabel: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    },
    conditionLabel: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    statsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    statsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statsIcon: {
        width: 15,
        height: 15,
    },
    error: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Home
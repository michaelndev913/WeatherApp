import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { weatherImages } from '../../constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface LocationsListProps {
    weathers: Array<any>,
}

const DaysWeatherList = (props: LocationsListProps) => {
    const { weathers } = props;
    return (
        <View style={styles.container}>
            {weathers?.map((item: any,index: number)=>{
                const date = new Date(item.date);
                var minutes = date.getTimezoneOffset();
                let dayName = new Date(date.getTime() + minutes*60000).toLocaleDateString('en-US', { weekday: 'long' });
                dayName = dayName.split(',')[0];

                return (
                    <View 
                    key={index}
                    style={styles.daysContainer}
                    >
                        <Image 
                            source={weatherImages[item?.day?.condition?.text || 'other']}
                            style={{width: 20, height: 20,}}
                        />
                        <Text style={styles.conditionLabel}>{dayName}</Text>
                        <Text style={styles.conditionLabel}>
                            {item?.day?.avgtemp_c}&#176;
                        </Text>
                    </View>
                )
                })}
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        width: widthPercentageToDP('100%'),
        padding: 16,
    },
    daysContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 30,
    },
    conditionLabel: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
})

export default DaysWeatherList
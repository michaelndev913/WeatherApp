import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LocationType } from '../../screen/Home';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

interface LocationsListProps {
    locations: Array<LocationType>,
    handleLocation: (location: LocationType) => void
}

const LocationsList = (props: LocationsListProps) => {
    const {locations, handleLocation} = props;
    return (
        <ScrollView style={styles.searchListContainer} contentContainerStyle={{flexDirection: 'column'}}>
            {locations.length > 0 && locations.map((loc, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleLocation(loc)}
                    style={styles.locationItem}
                >
                    <Text style={styles.locationLabel}>{loc?.name}, {loc?.country}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    searchListContainer: {
        position: 'absolute',
        backgroundColor: 'black',
        top: 80,
        width: widthPercentageToDP('90%'),
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        maxHeight: heightPercentageToDP('40%'),
        padding: 10,
        zIndex: 9,
    },
    locationItem: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
    },
    locationLabel: {
        color: 'white',
    },

})

export default LocationsList
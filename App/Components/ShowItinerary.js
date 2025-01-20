import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'; // To handle location fetching
import { useSelector } from 'react-redux';


const ShowItinerary = () => {
    const userLocation = useSelector((state) => state.UserReducer.userGPSLocatio)
    const showItinerary = useSelector((state) => state.AppReducer.ShowItinerary)
    const [userLocationState, setUserLocationState] = useState(userLocation)
    useEffect(() => {
        setUserLocationState(userLocation)
        console.log(userLocationState, showItinerary)
        console.log('Shown')
    }, [userLocation])
    return (
        <View>
            {showItinerary ? (
                <>

                    <MapView
                        style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }}
                        initialRegion={{
                            latitude: userLocationState?.coords?.latitude || 0,
                            longitude: userLocationState?.coords?.longitude || 0,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: userLocationState.coords.latitude,
                                longitude: userLocationState.coords.longitude,
                            }}
                            title="Vous"
                            description="Votre position actuelle"
                        />
                    </MapView>
                </>
            ) : null}

        </View>
    )
}

export default ShowItinerary

const styles = StyleSheet.create({})
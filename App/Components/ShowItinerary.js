import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'; // To handle location fetching
import { useSelector } from 'react-redux';


const ShowItinerary = () => {
    const userLocation = useSelector((state) => state.UserReducer.userGPSLocatio)
    const showItinerary = useSelector((state) => state.AppReducer.ShowItinerary)
    useEffect(() => {
        console.log(userLocation)
    }, [])
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
                            latitude: userLocation?.coords?.latitude || 0,
                            longitude: userLocation?.coords?.longitude || 0,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: userLocation.coords.latitude,
                                longitude: userLocation.coords.longitude,
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
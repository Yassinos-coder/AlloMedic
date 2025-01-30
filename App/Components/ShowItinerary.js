import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Icon } from '@rneui/themed';
import { Pressable } from 'react-native-gesture-handler';
import MedicalPin from  '../assets/images/medicalPin.png';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY; // Replace with your actual API key

const ShowItinerary = () => {
    const userLocation = useSelector((state) => state.UserReducer.userGPSLocation);
    const route = useRoute();
    const [callData, setCallData] = useState(route.params || {});
    const [destinationLocation, setDestinationLocation] = useState({ latitude: 0, longitude: 0 });
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const navigation = useNavigation()
    useEffect(() => {
        // Validate callData and extract destination coordinates
        if (callData?.location?.coords) {
            const [latitude, longitude] = callData.location.coords.split(',').map(Number);
            console.log(`Destination Coords: ${latitude}, ${longitude}`); // Log destination coordinates
            setDestinationLocation({ latitude, longitude });
        }
    }, [callData]);

    useEffect(() => {
        if (
            userLocation?.coords?.latitude &&
            userLocation?.coords?.longitude &&
            destinationLocation.latitude &&
            destinationLocation.longitude
        ) {
            console.log(`User Coords: ${userLocation.coords.latitude}, ${userLocation.coords.longitude}`); // Log user coordinates
            fetchRoute(
                userLocation.coords.latitude,
                userLocation.coords.longitude,
                destinationLocation.latitude,
                destinationLocation.longitude
            );
        }
    }, [userLocation, destinationLocation]);


    const fetchRoute = async (originLat, originLng, destLat, destLng) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${GOOGLE_API_KEY}`
            );
            if (response.data.routes.length > 0) {
                const points = decodePolyline(response.data.routes[0].overview_polyline.points);
                setRouteCoordinates(points);
            } else {
                console.error('No routes found');
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const decodePolyline = (encoded) => {
        let points = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;

        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }
        return points;
    };

    return (
        <View>
            <Pressable style={{ zIndex: 10 }} >
                <View style={styles.goBackView} >
                    <Icon
                        name="back"
                        type="antdesign"
                        color="black"
                        size={22}
                        onPress={
                            () => navigation.navigate('HomeScreen')
                        }
                    />
                </View>
            </Pressable>

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
                {/* User Marker */}
                {userLocation?.coords?.latitude && userLocation?.coords?.longitude && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude,
                        }}
                        title="Vous"
                        description="Votre position actuelle"
                        image={MedicalPin} 

                    />
                )}

                {/* Destination Marker */}
                {destinationLocation.latitude && destinationLocation.longitude && (
                    <Marker
                        coordinate={destinationLocation}
                        title="L'appel D'urgence"
                        description={callData?.location?.address || "Destination"}
                        image={MedicalPin}
                        />

                )}

                {/* Polyline for the Route */}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#0000FF" // Blue color
                        strokeWidth={1}
                    />
                )}
            </MapView>
        </View>
    );
};

export default ShowItinerary;

const styles = StyleSheet.create({
    goBackView: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20
    }
});

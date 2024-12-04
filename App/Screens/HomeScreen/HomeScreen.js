import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from 'react-redux';
import HomeStyles from './HomeStyles';
import {  Dialog } from '@rneui/themed';
import { CreateUrgentCall } from '../../redux/CallsReducer';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const userGPSLocation = useSelector((state) => state.UserReducer.userGPSLocation);
  const [DialogVisible, setDialogVisible] = useState(false);
  const mapRef = useRef(null); // Reference for MapView
  const [userLocation, setUserLocation] = useState(userGPSLocation)

  const ToggleDialogUnavailable = () => {
    setDialogVisible(!DialogVisible);
  };

  useEffect(() => {
    setUserLocation(userGPSLocation)
  },[userGPSLocation])

  const refocusMap = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01, // Adjust for zoom level
        longitudeDelta: 0.01, // Adjust for zoom level
      });
    }
  };

  const sendUrgentCall = () => {
    const urgentCallData = {
      userId: "12345",
      location: { latitude: 37.7749, longitude: -122.4194 },
      urgencyLevel: "High",
      description: "Severe chest pain",
    };

    // Dispatch the action to create an urgent call
    dispatch(CreateUrgentCall(urgentCallData));
    console.log('sent')
  }

  return (
    <View style={HomeStyles.container}>
      <Dialog isVisible={DialogVisible} onBackdropPress={ToggleDialogUnavailable}>
        <Dialog.Title title="Service non disponible" />
      </Dialog>
      {userLocation ? (
        <MapView
          ref={mapRef} // Attach ref to the MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.01, // Adjust for zoom level
            longitudeDelta: 0.01, // Adjust for zoom level
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
      ) : (
        <Text style={HomeStyles.loadingText}>
          <ActivityIndicator size="large" color="#0000ff" /> Fetching location...
        </Text>
      )}
      <View style={HomeStyles.actionView}>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#F53C3C', borderTopLeftRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables} onPress={sendUrgentCall}>
            <Text style={HomeStyles.PressablesText}>Urgence Medic</Text>
          </Pressable>
        </View>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#0077FF', borderTopRightRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables} onPress={ToggleDialogUnavailable}>
            <Text style={HomeStyles.PressablesText}>Appel Ambulance</Text>
          </Pressable>
        </View>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#32CD32', borderBottomLeftRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables} onPress={ToggleDialogUnavailable}>
            <Text style={HomeStyles.PressablesText}>Assistance</Text>
          </Pressable>
        </View>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#FFA500', borderBottomRightRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables} onPress={ToggleDialogUnavailable}>
            <Text style={HomeStyles.PressablesText}>Visite Domicile</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

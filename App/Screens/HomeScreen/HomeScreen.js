import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Dimensions, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../../redux/UserReducer';
import HomeStyles from './HomeStyles';
import { Button, Dialog } from '@rneui/themed';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.UserReducer.userGPSLocation);
  const [DialogVisible, setDialogVisible] = useState(false);
  const [notificationScheduled, setNotificationScheduled] = useState(false);
  const mapRef = useRef(null); // Reference for MapView

  const scheduleNotification = async () => {
    if (notificationScheduled) return; // Prevent scheduling multiple notifications
    setNotificationScheduled(true); // Mark notification as scheduled

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Live location in use!',
        body: 'AlloMedic is using your live location.',
        data: { someData: 'goes here' },
      },
      trigger: { seconds: 0 }, // Trigger immediately
    });
  };

  const GetUserLocation = async () => {
    await scheduleNotification();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission not granted');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location); // Log the location object to see its contents
    dispatch(setUserLocation(location));
    // Focus the map to the user's location
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01, // Adjust for zoom level
        longitudeDelta: 0.01, // Adjust for zoom level
      });
    }
  };

  useEffect(() => {
    if (!userLocation) {
      GetUserLocation();
    }
  }, [userLocation]);

  const ToggleDialogUnavailable = () => {
    setDialogVisible(!DialogVisible);
  };

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
          <Pressable style={HomeStyles.Pressables} onPress={GetUserLocation}>
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

import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../../redux/UserReducer';
import HomeStyles from './HomeStyles';
import { Button, } from '@rneui/themed';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.UserReducer.userGPSLocation);

  const [notificationScheduled, setNotificationScheduled] = useState(false);

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
  };

  useEffect(() => {
    if (!userLocation) {
      GetUserLocation();
      console.log(userLocation);
    }
  }, [userLocation]);

  return (
    <View style={HomeStyles.container}>
      {userLocation ? (
        <MapView
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
        <Text style={HomeStyles.loadingText}>Fetching location...</Text>
      )}
      <View style={HomeStyles.actionView}>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#F53C3C', borderTopLeftRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables}>
            <Text style={HomeStyles.PressablesText}>Urgence Medic</Text>
          </Pressable>
        </View>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#0077FF', borderTopRightRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables}>
            <Text style={HomeStyles.PressablesText}>Appel Ambulance</Text>
          </Pressable>
        </View>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#32CD32', borderBottomLeftRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables}>
            <Text style={HomeStyles.PressablesText}>Assistance</Text>
          </Pressable>
        </View>
        <View style={[HomeStyles.nestedView, { backgroundColor: '#FFA500', borderBottomRightRadius: 20 }]}>
          <Pressable style={HomeStyles.Pressables}>
            <Text style={HomeStyles.PressablesText}>Visite Domicile</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};



export default HomeScreen;

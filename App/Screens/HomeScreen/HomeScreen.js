import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../../redux/UserReducer';

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
      console.log(userLocation)
    }
  }, [userLocation]);

  return (
    <View>
      <Text>{userLocation ? JSON.stringify(userLocation.coords) : 'Get location'}</Text>
    </View>
  );
};

export default HomeScreen;

import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import WelcomingScreen from '../Screens/WelcomingScreen/WelcomingScreen';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const PrivateScreens = () => {
  const isLoggedIn = useSelector((state) => state.UserReducer.isLoggedIn);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="AuthScreen" component={AuthScreen} />
        {isLoggedIn && (
          <>
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          </>
        )}
        {!isLoggedIn && (
          <Drawer.Screen name="WelcomingScreen" component={WelcomingScreen} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default PrivateScreens;
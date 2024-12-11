import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import WelcomingScreen from '../Screens/WelcomingScreen/WelcomingScreen';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { setUserLocation } from '../redux/UserReducer';
import CallsScreen from '../Screens/CallsScreen/CallsScreen';

const Drawer = createDrawerNavigator();

const PrivateScreens = () => {
  const isLoggedIn = useSelector((state) => state.UserReducer.isLoggedIn);
  const userLocation = useSelector((state) => state.UserReducer.userLocation);
  const userData = useSelector((state) => state.UserReducer.userData)
  const [isLoggedInSecureStore, setIsLoggedInSecureStore] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSecureStoreLogin = async () => {
      const storedLoginStatus = await SecureStore.getItemAsync('isLoggedInSecureStore');
      setIsLoggedInSecureStore(storedLoginStatus);
    };
    checkSecureStoreLogin();
  }, []);

  useEffect(() => {
    const setupLocationAndNotifications = async () => {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      // Check if location is already available in Redux, if not, fetch it
      if (!userLocation) {
        const location = await Location.getCurrentPositionAsync({});
        console.log('User location:', location);
        dispatch(setUserLocation(location));
      }

      // Schedule notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Live location in use!',
          body: 'AlloMedic is using your live location.',
        },
        trigger: null, // Immediate notification
      });
    };

    setupLocationAndNotifications();
  }, [dispatch, userLocation]); // This effect runs when the location changes

  const isLoggedInFromStore = isLoggedIn || isLoggedInSecureStore === 'true';

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            headerShown: false,
            title: 'Authentification',
            drawerItemStyle: { display: 'none' },
          }}
        />
        {isLoggedInFromStore && (
          <>
            {
              userData.role === 'medic' && (
                <Drawer.Screen
                  name="CallsScreen"
                  component={CallsScreen}
                  options={{ title: 'Appel en cours' }}
                />
              )
            }
            <Drawer.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: 'Accueil' }}
            />
            <Drawer.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ title: 'Mon compte' }}
            />

          </>
        )}
        {!isLoggedInFromStore && (
          <Drawer.Screen
            name="WelcomingScreen"
            component={WelcomingScreen}
            options={{
              headerShown: false,
              title: 'Bienvenue',
              drawerItemStyle: { display: 'none' },
            }}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default PrivateScreens;

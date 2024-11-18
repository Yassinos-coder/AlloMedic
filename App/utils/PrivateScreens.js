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
    const [isLoggedInSecureStore, setIsLoggedInSecureStore] = useState(null);

    useEffect(() => {
        const checkSecureStoreLogin = async () => {
            const storedLoginStatus = await SecureStore.getItemAsync('isLoggedInSecureStore');
            setIsLoggedInSecureStore(storedLoginStatus);
        };

        checkSecureStoreLogin();
    }, []);

    // Ensure that both `isLoggedIn` and `isLoggedInSecureStore` are truthy or falsy correctly
    const isLoggedInFromStore = isLoggedIn || isLoggedInSecureStore === 'true';

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="AuthScreen" component={AuthScreen} options={{
                    headerShown: false,
                    title: 'Authentification',
                    drawerItemStyle: { display: 'none' }
                }} />
                {isLoggedInFromStore && (
                    <>
                        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Accueil' }} />
                        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Paramètres du compte' }} />
                    </>
                )}
                {(!isLoggedInFromStore) && (
                    <Drawer.Screen name="WelcomingScreen" component={WelcomingScreen} options={{
                        headerShown: false,
                        title: 'Bienvenue',
                        drawerItemStyle: { display: 'none' }
                    }} />
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default PrivateScreens;

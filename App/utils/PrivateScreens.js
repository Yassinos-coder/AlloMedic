import * as SecureStore from 'expo-secure-store'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import WelcomingScreen from '../Screens/WelcomingScreen/WelcomingScreen';

const Drawer = createDrawerNavigator();

const PrivateScreens = () => {
    const [isSigned, setIsSigned] = useState(false);

    useEffect(() => {
        const checkSignInStatus = async () => {
            const StoredConnectionStatus = await SecureStore.getItemAsync('isSignedIn');
            setIsSigned(StoredConnectionStatus === 'true');
        };
        checkSignInStatus();
    }, []);

    return (
        <NavigationContainer>
            {
                !isSigned ? (
                    <Drawer.Navigator initialRouteName="WelcomeScreen">
                        <Drawer.Screen name="WelcomeScreen" component={WelcomingScreen} options={{ headerShown: false }} />
                        <Drawer.Screen name="Authentification" component={AuthScreen} options={{ headerShown: false }} />
                    </Drawer.Navigator>
                ) : (
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Profile" component={ProfileScreen} />
                    </Drawer.Navigator>
                )
            }
        </NavigationContainer>
    );
};

export default PrivateScreens;

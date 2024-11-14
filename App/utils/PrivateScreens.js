import * as SecureStore from 'expo-secure-store'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import WelcomingScreen from '../Screens/WelcomingScreen/WelcomingScreen';


const Drawer = createDrawerNavigator()



const PrivateScreens = () => {
    const [isSigned, setIsSigned] = useState(false)
    useEffect(() => {
        let StoredConnectionStatus = SecureStore.getItemAsync('isSignedIn')
        if (StoredConnectionStatus === 'true') {
            setIsSigned(true)
        } else {
            setIsSigned(false)
        }
    }, [])

    return (
        <NavigationContainer>
            {
                !isSigned ?
                    (<>
                        <Drawer.Navigator>
                            <Drawer.Screen name="WelcomeScreen" component={WelcomingScreen} options={{ headerShown: false }} />
                            <Drawer.Screen name="Authentification" component={AuthScreen} options={{ headerShown: false }} />
                        </Drawer.Navigator>
                    </>)
                    :
                    (<>
                        <Drawer.Navigator>
                            <Drawer.Screen name="Home" component={HomeScreen} />
                            <Drawer.Screen name="Profile" component={ProfileScreen} />
                        </Drawer.Navigator>
                    </>)
            }
        </NavigationContainer>
    )
}

export default PrivateScreens
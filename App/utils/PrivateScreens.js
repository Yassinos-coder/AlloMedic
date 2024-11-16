import * as SecureStore from 'expo-secure-store';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import WelcomingScreen from '../Screens/WelcomingScreen/WelcomingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/UserReducer';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('isSignedIn'); // Clear the stored sign-in status
        dispatch(logOut()); // Update Redux state to reflect logout
        // No need for manual navigation, as the state will trigger the right screen automatically
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Default Drawer Items */}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Log Out Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const PrivateScreens = () => {
    // Use logginState from Redux
    const logginState = useSelector((state) => state.UserReducer.isSigned);

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={!logginState ? "WelcomeScreen" : "HomeScreen"}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                {/* Always include Authentification */}
                <Drawer.Screen name="Authentification" component={AuthScreen} options={{ headerShown: false }} />

                {!logginState ? (
                    <>
                        <Drawer.Screen name="WelcomeScreen" component={WelcomingScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                        <Drawer.Screen name="Profile" component={ProfileScreen} />
                    </>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        padding: 15,
        backgroundColor: '#f44336',
        margin: 20,
        borderRadius: 8,
    },
    logoutText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default PrivateScreens;

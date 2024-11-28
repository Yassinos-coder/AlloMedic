import { Pressable, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileStyles from './ProfileStyles';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserData } from '../../redux/UserReducer';
import * as SecureStore from 'expo-secure-store';
import { Avatar } from '@rneui/themed';
import CustomText from '../../Components/CustomText';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [userDataParsed, setUserDataParsed] = useState(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true); // loading the userData

    // Get user data from Redux state
    const userDataFromRedux = useSelector((state) => state.UserReducer.userData);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await SecureStore.getItemAsync('userData');
                if (storedUserData) {
                    setUserDataParsed(JSON.parse(storedUserData));
                }
            } catch (error) {
                console.error('Error retrieving user data from SecureStore:', error);
            } finally {
                setLoading(false);  // Set loading to false once the data is fetched
            }
        };

        // Fetch user data from SecureStore first
        fetchUserData();

        // Also fetch from Redux (you might want to get the UUID from SecureStore or navigation params)
        const fetchUuid = async () => {
            const uuid = await SecureStore.getItemAsync('uuid'); // Assuming UUID is stored in SecureStore
            if (uuid) {
                dispatch(GetUserData({ uuid }));
            }
        };

        fetchUuid();
    }, [dispatch]);

    // Show loading indicator while fetching user data
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Use userData from Redux if available, else fall back to userDataParsed
    const userData = userDataFromRedux || userDataParsed;

    const Logout = () => {
        SecureStore.deleteItemAsync('tokenKey');
        SecureStore.deleteItemAsync('uuid');
        SecureStore.deleteItemAsync('isLoggedInSecureStore');
        navigation.navigate('AuthScreen');
    };

    return (
        <SafeAreaView style={ProfileStyles.container}>
            <View style={ProfileStyles.profileHeader}>
                <Avatar
                    size={100}
                    rounded
                    source={{
                        uri: "https://cdn.shopify.com/s/files/1/0576/8445/9657/files/SeekPng.com_profile-icon-png_9665493.png?v=1650620910",
                    }}
                />
                <CustomText style={{ textAlign: 'center', marginTop: 10 }}>
                    Bienvenue sur votre compte{' '}
                    <CustomText style={{ fontFamily: 'poppins-semibold' }}>
                        {userData?.fullname || 'Nom non disponible'}
                    </CustomText>
                </CustomText>
                <View style={ProfileStyles.actions}>
                    <Pressable
                        style={[ProfileStyles.BtnModifyData, ProfileStyles.Pressables]}
                        onPress={() => {
                            navigation.navigate('AccountSettings', { userData });
                        }}
                    >
                        <CustomText style={ProfileStyles.BtnModifyDataText}>Modifier mes donnèes</CustomText>
                    </Pressable>
                    <Pressable
                        style={[ProfileStyles.BtnLogout, ProfileStyles.Pressables]}
                        onPress={Logout}
                    >
                        <CustomText style={ProfileStyles.BtnLogoutText}>Se Deconnecter</CustomText>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

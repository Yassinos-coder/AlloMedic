import { Pressable, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileStyles from './ProfileStyles'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserData } from '../../redux/UserReducer'
import * as SecureStore from 'expo-secure-store'
import { Avatar } from '@rneui/themed'
import CustomText from '../../Components/CustomText'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const userData = useSelector((state) => state.UserReducer.userData) ? useSelector((state) => state.UserReducer.userData) : null
    const dispatch = useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        const SendGetUserData = async () => {
            let uuid = await SecureStore.getItemAsync('uuid')
            dispatch(GetUserData({ uuid }))
        }
        SendGetUserData()

        if (!userData) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }
    }, []);

    const Logout = () => {
        SecureStore.deleteItemAsync('tokenKey')
        SecureStore.deleteItemAsync('uuid')
        SecureStore.deleteItemAsync('isLoggedInSecureStore')
        navigation.navigate('AuthScreen')
    }

    return (
        <SafeAreaView style={ProfileStyles.container}>
            <View style={ProfileStyles.profileHeader}>
                <Avatar
                    size={100}
                    rounded
                    source={{ uri: "https://cdn.shopify.com/s/files/1/0576/8445/9657/files/SeekPng.com_profile-icon-png_9665493.png?v=1650620910" }}
                />
                <CustomText style={{ textAlign: 'center', marginTop: 10 }}>
                    Bienvenue sur votre compte{' '}
                    <CustomText style={{ fontFamily: 'poppins-semibold' }}>
                        {userData.fullname}
                    </CustomText>
                </CustomText>
                <View style={ProfileStyles.actions}>
                    <Pressable style={[ProfileStyles.BtnModifyData, ProfileStyles.Pressables]} onPress={() => { navigation.navigate('AccountSettings') }}>
                        <CustomText style={ProfileStyles.BtnModifyDataText}>Modifier mes donnèes</CustomText>
                    </Pressable>
                    <Pressable style={[ProfileStyles.BtnLogout, ProfileStyles.Pressables]} onPress={Logout}>
                        <CustomText style={ProfileStyles.BtnLogoutText}>Se Deconnecter</CustomText>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
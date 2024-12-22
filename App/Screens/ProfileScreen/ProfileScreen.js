import React, { useEffect, useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Input, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import CustomText from '../../Components/CustomText';
import ProfileStyles from './ProfileStyles';
import AccountStyles from '../AccountSettings/AccountStyles';
import { UpdateUserData, GetUserData } from '../../redux/UserReducer';

const ProfileScreen = () => {
    const [userDataParsed, setUserDataParsed] = useState(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [accountSettingsToggle, setAccountSettingsToggle] = useState(false);
    const [editField, setEditField] = useState(null); // Track which field is being edited
    const [updatedInputs, setUpdatedInputs] = useState({});
    const [userData, setUserData] = useState({});
    const [newData, setNewData] = useState({});
    const [uuid, setUUID] = useState();

    const userDataFromRedux = useSelector((state) => state.UserReducer.userData);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await SecureStore.getItemAsync('userData');
                if (storedUserData) {
                    setUserDataParsed(JSON.parse(storedUserData));
                }
                const uuid = await SecureStore.getItemAsync('uuid');
                if (uuid) {
                    setUUID(uuid);
                    dispatch(GetUserData({ uuid }));
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch]);

    useEffect(() => {
        if (userDataFromRedux) {
            setUserData(userDataFromRedux);
        } else if (userDataParsed) {
            setUserData(userDataParsed);
        }
    }, [userDataFromRedux, userDataParsed]);

    const handleInputChange = (field, value) => {
        setUpdatedInputs((prev) => ({
            ...prev,
            [field]: value,
        }));
        setNewData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const saveChanges = (field) => {
        setUserData((prev) => ({
            ...prev,
            [field]: updatedInputs[field] || prev[field],
        }));
        setUpdatedInputs((prev) => ({
            ...prev,
            [field]: '',
        }));
        setEditField(null);
    };

    const submitUpdate = (dataToUpdate) => {
        dispatch(UpdateUserData({ newData, dataToUpdate, uuid }));
    };

    const Logout = () => {
        SecureStore.deleteItemAsync('tokenKey');
        SecureStore.deleteItemAsync('uuid');
        SecureStore.deleteItemAsync('isLoggedInSecureStore');
        navigation.navigate('AuthScreen');
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={ProfileStyles.container}>
            {!accountSettingsToggle ? (
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
                    <CustomText>
                        Connectez en tant qu'{userData?.role === 'user' ? 'utilisateur' : userData?.role === 'medic' ?'Medic' : 'ERREUR'}
                    </CustomText>
                    <View style={ProfileStyles.actions}>
                        <Pressable
                            style={[ProfileStyles.BtnModifyData, ProfileStyles.Pressables]}
                            onPress={() => setAccountSettingsToggle(true)}
                        >
                            <CustomText style={ProfileStyles.BtnModifyDataText}>
                                Modifier mes données
                            </CustomText>
                        </Pressable>
                        <Pressable
                            style={[ProfileStyles.BtnLogout, ProfileStyles.Pressables]}
                            onPress={Logout}
                        >
                            <CustomText style={ProfileStyles.BtnLogoutText}>
                                Se Déconnecter
                            </CustomText>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                        <View style={AccountStyles.ActionsView}>
                            <CustomText> Cliquez sur le champ que vous souhaitez modifier </CustomText>

                            {['email', 'homeAddress', 'phonenumber', 'password'].map((field) => (
                                <Pressable
                                    key={field}
                                    style={AccountStyles.pressableEdits}
                                    onPress={() => setEditField(field === editField ? null : field)}
                                >
                                    <CustomText>
                                        {`Modifier votre ${field === 'phonenumber' ? 'Numéro de Téléphone' : field}`}
                                    </CustomText>
                                    <Input
                                        value={editField === field ? updatedInputs[field] : userData[field]}
                                        editable={editField === field}
                                        secureTextEntry={field === 'password'}
                                        onChangeText={(value) => handleInputChange(field, value)}
                                    />
                                    {editField === field && (
                                        <View style={AccountStyles.actionsOnEdit}>
                                            <Icon
                                                name="checkcircle"
                                                type="antdesign"
                                                color="#52C41A"
                                                onPress={() => {
                                                    saveChanges(field);
                                                    submitUpdate(field);
                                                }}
                                            />
                                            <Icon
                                                name="closecircle"
                                                type="antdesign"
                                                color="#FF4D4F"
                                                onPress={() => setEditField(null)}
                                            />
                                        </View>
                                    )}
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                    <Icon
                        name="back"
                        type="antdesign"
                        color="black"
                        size={22}
                        onPress={() => setAccountSettingsToggle(false)}
                    />
                </KeyboardAvoidingView>
            )}
        </SafeAreaView>
    );
};

export default ProfileScreen;

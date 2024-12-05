import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStyles from './AuthStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, ButtonGroup, Dialog, Input, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAccount, Signin } from '../../redux/UserReducer';
import * as SecureStore from 'expo-secure-store';
import UserObject from '../../Models/UserObject';
import axios from 'axios';

const AuthScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const isPending = useSelector((state) => state.UserReducer.status);
    const userData = useSelector((state) => state.UserReducer.userData);
    const userGPSLocation = useSelector((state) => state.UserReducer.userGPSLocation);

    const [newUser, setNewUser] = useState(new UserObject());
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mode, setMode] = useState(route.params?.mode || 'signin');
    const [userCredentials, setUserCredentials] = useState({});
    const [userIP, setUserIP] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMSG, setAlertMSG] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const showDialog = (message) => {
        setShowAlert(true);
        setAlertMSG(message);
    };

    useEffect(() => {
        const fetchUserIP = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setUserIP(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error.message);
            }
        };

        fetchUserIP();
    }, []);

    const Login = () => {
        const credentials = {
            ...userCredentials,
            user_ip: userIP,
            user_location: userGPSLocation || userLocation,
        };

        dispatch(Signin({ userCredentials: credentials }))
            .then(async (response) => {
                if (response.payload && response.payload.message === 'LOGIN_SUCCESS') {
                    const uuid = response.payload.userData._id;
                    const token = response.payload.tokenKey;

                    await SecureStore.setItemAsync('uuid', uuid);
                    await SecureStore.setItemAsync('isLoggedInSecureStore', 'true');
                    await SecureStore.setItemAsync('jwtToken', token);

                    navigation.navigate('HomeScreen');
                    setNewUser(new UserObject());
                    setUserCredentials({});
                    setSelectedIndex(null);
                } else if (response.payload.message === 'WRONG_PASSWORD') {
                    showDialog('Wrong Password');
                    console.error('Login failed or response was not successful.');
                }
            })
            .catch((err) => console.error(`Login error: ${err.message}`));
    };

    const Signup = () => {
        dispatch(CreateAccount({ newUser }))
            .then((response) => console.log('Signup successful:', response))
            .catch((err) => console.error(err.message));
    };

    return (
        <SafeAreaView style={AuthStyles.container}>
            <Dialog isVisible={showAlert} onBackdropPress={() => setShowAlert(false)}>
                <Dialog.Title title={`${alertMSG}`} />
            </Dialog>
            {mode === 'signup' ? (
                <View style={AuthStyles.signup}>
                    <View style={AuthStyles.subSignup}>
                        <Text style={AuthStyles.title}>
                            Authentification | Creation de compte
                        </Text>
                        <Input
                            placeholder="Entrez votre nom complet"
                            onChangeText={(text) => setNewUser({ ...newUser, fullname: text })}
                        />
                        <Input
                            placeholder="Entrez votre adresse mail"
                            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                        />
                        <Input
                            placeholder="Entrez votre numero de telephone"
                            onChangeText={(text) => setNewUser({ ...newUser, phonenumber: text })}
                        />
                        <Input
                            placeholder="Entrez votre mot de passe"
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setNewUser({ ...newUser, password: text })}
                            rightIcon={
                                <Icon
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    type="ionicon"
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                        />
                        <ButtonGroup
                            buttons={['Medecin/Infermier', 'Utilisateur']}
                            selectedIndex={selectedIndex}
                            onPress={(value) => {
                                setSelectedIndex(value);
                                const role = value === 0 ? 'medic' : 'user';
                                setNewUser({ ...newUser, role });
                            }}
                            containerStyle={{ marginBottom: 20 }}
                        />
                        <Button
                            title="Creer le compte"
                            loading={isPending === 'pending'}
                            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5 }}
                            containerStyle={{ marginHorizontal: 50, height: 50, width: 200, marginVertical: 10 }}
                            onPress={Signup}
                        />
                    </View>
                </View>
            ) : (
                <View style={AuthStyles.signin}>
                    <View style={AuthStyles.subSignin}>
                        <Text style={AuthStyles.title}>
                            Authentification | Connexion
                        </Text>
                        <Input
                            placeholder="Entrez votre adresse mail"
                            onChangeText={(text) => setUserCredentials({ ...userCredentials, email: text })}
                            value={userCredentials.email}
                            keyboardType="email-address"
                        />
                        <Input
                            placeholder="Entrez votre mot de passe"
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setUserCredentials({ ...userCredentials, password: text })}
                            value={userCredentials.password}
                            rightIcon={
                                <Icon
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    type="ionicon"
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                        />
                        <Button
                            title="Log in"
                            loading={isPending === 'pending'}
                            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5 }}
                            containerStyle={{ marginHorizontal: 50, height: 50, width: 200, marginVertical: 10 }}
                            onPress={Login}
                        />
                        <Button
                            title="Creer un compte"
                            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5 }}
                            containerStyle={{ marginHorizontal: 50, height: 50, width: 200, marginVertical: 10 }}
                            onPress={() => setMode('signup')}
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default AuthScreen;

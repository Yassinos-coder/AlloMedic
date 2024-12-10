import { View, Text, Linking, Pressable } from 'react-native';
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
import CustomText from '../../Components/CustomText'

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
    const [medicSigningUp, setmedicSigningUp] = useState(false)

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
                console.error('Erreur lors de la récupération de l\'adresse IP:', error.message);
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
                    showDialog('Mot de passe incorrect');
                    console.error('Échec de la connexion ou réponse non réussie.');
                }
            })
            .catch((err) => console.error(`Erreur de connexion: ${err.message}`));
    };

    const Signup = () => {
        dispatch(CreateAccount({ newUser }))
            .then((response) => console.log('Inscription réussie:', response))
            .catch((err) => console.error(err.message));
    };

    return (
        <SafeAreaView style={AuthStyles.container}>
            <Dialog isVisible={showAlert} onBackdropPress={() => setShowAlert(false)}>
                <Dialog.Title title={`${alertMSG}`} />
            </Dialog>
            {mode === 'signup' ? (
                medicSigningUp ? (
                    <View style={AuthStyles.signup}>
                        <View style={AuthStyles.subSignup}>
                            <CustomText>Pour créer votre compte en tant qu'infirmier ou médecin</CustomText>
                            <CustomText>Cliquez sur le lien ci-dessous</CustomText>
                            <Pressable
                                onPress={async () => {
                                    const url = 'https://www.google.com'; // Ensure the URL includes the protocol
                                    const supported = await Linking.canOpenURL(url);

                                    if (supported) {
                                        await Linking.openURL(url);
                                    } else {
                                        console.error(`Impossible d'ouvrir l'URL: ${url}`);
                                    }
                                }}
                            >
                                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                    Lien d'enregistrement
                                </Text>
                            </Pressable>

                            <View style={AuthStyles.goBackButton}>

                                <Icon
                                    name="back"
                                    type="antdesign"
                                    color="black"
                                    size={22}
                                    onPress={() => {
                                        setmedicSigningUp(false)
                                    }}
                                />
                            </View>
                            <CustomText>Retour à la page d'accueil</CustomText>
                        </View>
                    </View>
                ) : (
                    <View style={AuthStyles.signup}>
                        <View style={AuthStyles.subSignup}>
                            <Text style={AuthStyles.title}>
                                Authentification | Création de compte
                            </Text>
                            <Input
                                placeholder="Entrez votre nom complet"
                                onChangeText={(text) => setNewUser({ ...newUser, fullname: text })}
                            />
                            <Input
                                placeholder="Entrez votre adresse e-mail"
                                onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                            />
                            <Input
                                placeholder="Entrez votre numéro de téléphone"
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
                                buttons={['Médecin/Infirmier', 'Utilisateur']}
                                selectedIndex={selectedIndex}
                                onPress={(value) => {
                                    setSelectedIndex(value);
                                    const role = value === 0 ? 'medic' : 'user';
                                    if (value === 0) {
                                        setmedicSigningUp(true)
                                    }
                                    setNewUser({ ...newUser, role });
                                }}
                                containerStyle={{ marginBottom: 20 }}
                            />
                            <Button
                                title="Créer le compte"
                                loading={isPending === 'pending'}
                                buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5 }}
                                containerStyle={{ marginHorizontal: 50, height: 50, width: 200, marginVertical: 10 }}
                                onPress={Signup}
                            />
                            <Icon
                                name="back"
                                type="antdesign"
                                color="black"
                                size={22}
                                onPress={() => {
                                    setMode("signin")
                                }}
                            />
                            <CustomText>Retournez à la page d'accueil</CustomText>
                        </View>
                    </View>
                )
            ) : (
                <View style={AuthStyles.signin}>
                    <View style={AuthStyles.subSignin}>
                        <Text style={AuthStyles.title}>
                            Authentification | Connexion
                        </Text>
                        <Input
                            placeholder="Entrez votre adresse e-mail"
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
                            title="Connexion"
                            loading={isPending === 'pending'}
                            buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5 }}
                            containerStyle={{ marginHorizontal: 50, height: 50, width: 200, marginVertical: 10 }}
                            onPress={Login}
                        />
                        <Button
                            title="Créer un compte"
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

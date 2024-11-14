
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStyles from './AuthStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { Signin } from '../../redux/UserReducer';
import * as SecureStore from 'expo-secure-store'


const AuthScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute();
    const { mode } = route.params;
    const [userCredentials, setUserCredentials] = useState({})


    const Login = () => {
        dispatch(Signin({ userCredentials })).then((response) => {
            if (response.payload && response.payload.message === 'LOGIN_SUCCESS') {
                SecureStore.setItemAsync('isSignedIn', 'true');
                SecureStore.setItemAsync('jwtToken', response.payload.tokenKey);
                navigation.navigate('Home');
            } else {
                console.error('Login failed or response was not successful.');
            }
        }).catch(err => console.error(`Login error: ${err.message}`));
    };
    return (
        <SafeAreaView style={AuthStyles.container}>
            {
                mode === 'signup' ?
                    (<>
                        <View style={AuthStyles.signup}>

                        </View>
                    </>)
                    :
                    (<>
                        <View style={AuthStyles.signin}>
                            <View style={AuthStyles.subSignin}>
                                <Text style={AuthStyles.title}> Authentification | Connexion </Text>
                                <Input placeholder='Entrez votre adresse mail'
                                    onChangeText={(text) => {
                                        setUserCredentials({ ...userCredentials, email: text })
                                    }}
                                />
                                <Input placeholder='Entrez votre mot de passe'
                                    onChangeText={(text) => {
                                        setUserCredentials({ ...userCredentials, password: text })
                                    }} />
                                <Button
                                    title="Log in"
                                    loading={false}
                                    loadingProps={{ size: 'small', color: 'white' }}
                                    buttonStyle={{
                                        backgroundColor: 'rgba(111, 202, 186, 1)',
                                        borderRadius: 5,
                                    }}
                                    titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                                    containerStyle={{
                                        marginHorizontal: 50,
                                        height: 50,
                                        width: 200,
                                        marginVertical: 10,
                                    }}
                                    onPress={() => Login()}
                                />
                            </View>
                        </View>
                    </>)
            }
        </SafeAreaView>
    );
}

export default AuthScreen;

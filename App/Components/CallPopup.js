import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Icon, Input } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowCallMaker } from '../redux/AppReducer';
import axios from 'axios';
import CallsObject from '../Models/CallsObject';
import { CreateUrgentCall } from '../redux/CallsReducer';
import * as SecureStore from 'expo-secure-store'

const CallPopup = ({ isVisible }) => {
    const dispatch = useDispatch();
    const showCallMakerPopUp = useSelector((state) => state.AppReducer.showCallMakerPopUp);
    const userData = useSelector((state) => state.UserReducer.userData);
    const userGPSLocation = useSelector((state) => state.UserReducer.userGPSLocation);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [newCall, setNewCall] = useState(new CallsObject());

    useEffect(() => {
        if (userGPSLocation) {
            setNewCall((prevCall) => ({
                ...prevCall,
                call_location: `${userGPSLocation.coords.latitude}, ${userGPSLocation.coords.longitude}`,
            }));
        }
    }, [userGPSLocation]);

    const sendUrgentCall = async () => {
        if (!newCall.call_notes || !newCall.call_priority) {
            alert("Une erreur est survenue!");
            return;
        }

        try {
            const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: {
                    key: '8c25b6d183844aa0876b1a965e56b329',
                    pretty: 1,
                    no_annotations: 1,
                    q: `${userGPSLocation.coords.latitude}, ${userGPSLocation.coords.longitude}`,
                },
            });

            const caller_id_option = userData?._id || await SecureStore.getItemAsync('uuid');

            // Generate the call timestamp
            const now = new Date();
            const call_timestamp = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            const updatedCall = {
                ...newCall,
                caller_id: caller_id_option,
                call_location: {
                    address: response.data.results[0]?.formatted || 'Unknown Location',
                    coords: `${userGPSLocation.coords.latitude}, ${userGPSLocation.coords.longitude}`
                },
                call_status: 'ongoing',
                call_timestamp, // Add the generated timestamp here
            };

            setNewCall(updatedCall);

            dispatch(CreateUrgentCall(updatedCall))
                .then((response) => {
                    if (!response.payload) {
                        alert("Une erreur est survenue!");
                    }
                    dispatch(updateShowCallMaker());
                })
                .catch((error) => {
                    console.error('Error in dispatch:', error);
                    alert("Une erreur est survenue!");
                });
        } catch (error) {
            console.error('Error fetching geolocation:', error);
            alert('An error occurred while sending the call. Please try again.');
        }
    };



    return (
        <>
            {showCallMakerPopUp && (
                <View style={styles.container}>

                    <View style={styles.callView}>
                        <Icon
                            name="close"
                            type="antdesign"
                            color="black"
                            size={22}
                            onPress={() => dispatch(updateShowCallMaker())}
                            style={styles.popupClose}
                        />
                        <Text style={{ marginTop: 15, marginBottom: 5 }}>Veuillez remplir les champs ci-dessous</Text>
                        <Text style={{ fontFamily: 'poppins-semibold', color: 'red', marginBottom: 5 }}>
                            Nous allons envoyer votre position actuelle
                        </Text>
                        <Text>Décrivez votre urgence</Text>
                        <Input
                            onChangeText={(text) =>
                                setNewCall((prevCall) => ({ ...prevCall, call_notes: text }))
                            }
                            inputContainerStyle={{
                                borderBottomWidth: 0, // Removes the underline
                            }}
                            style={styles.Input}
                            placeholder='En bref, indiquez votre urgence'
                        />
                        <Text>Niveau d'urgence</Text>
                        <ButtonGroup
                            buttons={['FAIBLE', 'MOYEN', 'URGENT']}
                            selectedIndex={selectedIndex}
                            onPress={(value) => {
                                setSelectedIndex(value);
                                setNewCall((prevCall) => ({
                                    ...prevCall,
                                    call_priority: value === 2 ? 'Urgent' : value === 1 ? 'Moyen' : 'Faible',
                                }));
                            }}
                            containerStyle={{ marginBottom: 0 }}
                        />
                        <Button
                            title="Lancer L'appel"
                            onPress={sendUrgentCall}
                            buttonStyle={{
                                backgroundColor: 'red',
                                borderRadius: 3,
                                marginTop: 15,
                                width: 200,
                            }}
                            disabled={!newCall.call_notes || !newCall.call_priority ? true : false}
                        />

                    </View>
                </View>
            )}
        </>
    );
};

export default CallPopup;

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    callView: {
        position: 'relative', // Enable relative positioning for positioning child elements
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '80%', // Set a width to make the layout consistent
    },
    popupClose: {
        marginLeft: 260,
        marginTop: -5
    },
    Input: {
        backgroundColor: 'rgba(180, 180, 180, 0.5)',
        borderRadius: 50,
        paddingLeft: 15,
        fontSize: 15

    },

});


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
            alert("Please fill in all fields before proceeding.");
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

            const updatedCall = {
                ...newCall,
                caller_id: caller_id_option, 
                call_location: response.data.results[0]?.formatted || 'Unknown Location',
                call_status: 'ongoing',
            };

            setNewCall(updatedCall);
            dispatch(CreateUrgentCall(updatedCall));
            console.log('Call Sent:', updatedCall);
        } catch (error) {
            console.error('Error fetching geolocation:', error);
            alert('An error occurred while sending the call. Please try again.');
        }
    };

    return (
        <>
            {showCallMakerPopUp && (
                <View style={styles.container}>
                    <Icon
                        name="close"
                        type="antdesign"
                        color="black"
                        size={22}
                        onPress={() => dispatch(updateShowCallMaker())}
                    />
                    <View style={styles.callView}>
                        <Text>Veuillez remplir les champs ci-dessous</Text>
                        <Text style={{ fontFamily: 'poppins-semibold', color: 'red' }}>
                            Nous allons envoyer votre position actuelle
                        </Text>
                        <Text>Décrivez votre urgence</Text>
                        <Input
                            onChangeText={(text) =>
                                setNewCall((prevCall) => ({ ...prevCall, call_notes: text }))
                            }
                        />
                        <Text>Niveau d'urgence</Text>
                        <ButtonGroup
                            buttons={['FAIBLE', 'MOYEN', 'URGENT']}
                            selectedIndex={selectedIndex}
                            onPress={(value) => {
                                setSelectedIndex(value);
                                setNewCall((prevCall) => ({
                                    ...prevCall,
                                    call_priority: value === 2 ? 'URGENT' : value === 1 ? 'MOYEN' : 'FAIBLE',
                                }));
                            }}
                            containerStyle={{ marginBottom: 0 }}
                        />
                        <Button title="APPELER" onPress={sendUrgentCall} />
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(85, 85, 85, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
});

import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CallsObject from '../Models/CallsObject';
import { useDispatch, useSelector } from 'react-redux';
import { CreateUrgentCall } from '../redux/CallsReducer';
import { Button, ButtonGroup, Icon, Input } from '@rneui/themed';
import axios from 'axios';

const CallPopup = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [newCall, setNewCall] = useState(new CallsObject());
    const [selectedIndex, setSelectedIndex] = useState(null);
    const userData = useSelector((state) => state.UserReducer.userData);
    const userGPSLocation = useSelector((state) => state.UserReducer.userGPSLocation);

    const [userLocation, setUserLocation] = useState(userGPSLocation);


    useEffect(() => {
        setUserLocation(userGPSLocation);
        if (props.show !== show) setShow(props.show);
    }, [props.show]);

    const sendUrgentCall = async () => {
        const reverseGeoCoding = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                key: '8c25b6d183844aa0876b1a965e56b329',
                pretty: 1,
                no_annotations: 1,
                q: `${userLocation.coords.latitude}, ${userLocation.coords.longitude}`
            }
        });
        const updatedCall = {
            caller_id: userData._id,
            call_location: reverseGeoCoding.data.results[0]?.formatted,
            //  call_location: `${userLocation.coords.latitude}, ${userLocation.coords.longitude}`,
            call_status: 'ongoing',
            call_notes: newCall.call_notes,
            call_priority: newCall.call_priority
        };
        if (!newCall.call_notes || !newCall.call_priority) {
            alert("Please fill in all fields before proceeding.");
            return;
        }

        setNewCall(updatedCall);
        dispatch(CreateUrgentCall(updatedCall));
        console.log('sent', updatedCall);
    };

    return (

        <>{
            show && (<View style={styles.container}>
                <Icon
                    name={'closecircle'}
                    type="antdesign"
                    onPress={() => setShow(false)}
                />
                <Text>Veuillez remplir les champs ci-dessous</Text>
                <View>
                    <Text style={{ fontFamily: 'poppins-semibold', color: 'red' }}>Nous allons envoyer votre position actuelle</Text>
                </View>
                <View>
                    <Text>Décrivez votre urgence</Text>
                    <Input onChangeText={(text) => {
                        setNewCall({ ...newCall, call_notes: text })
                    }} />
                </View>
                <View>
                    <Text>Niveau d'urgence</Text>
                    <ButtonGroup
                        buttons={['FAIBLE', 'MOYEN', 'URGENT']}
                        selectedIndex={selectedIndex}
                        onPress={(value) => {
                            setSelectedIndex(value)
                            setNewCall({ ...newCall, call_priority: value === 2 ? 'URGENT' : value === 1 ? 'MOYEN' : 'FAIBLE' })
                        }}
                        containerStyle={{ marginBottom: 0 }}
                    />
                </View>
                <Button title={'APPELER'} onPress={sendUrgentCall} />
            </View>)
        }</>


    );
};

export default CallPopup;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 300, // Width of the popup
        padding: 20,
        borderRadius: 10,
    },
});

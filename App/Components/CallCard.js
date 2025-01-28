import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from './CustomText';
import { Avatar, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowItinerary } from '../redux/AppReducer';
import { useNavigation, useRoute } from '@react-navigation/native';

const CallCard = (props) => {
    const [priority, setPriority] = useState('medium');
    const showItinerary = useSelector((state) => state.AppReducer.ShowItinerary)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(() => {
        setPriority(props.priority);
    }, [props.priority]); // added props.priority as dependency


    // Set dynamic priority styles
    const priorityStyles = {
        Urgent: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'red',
            borderRadius: 20,
            maxWidth: 120,
            textAlign: 'center',
            fontSize: 13,
            padding: 5

        },
        Moyen: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'orange',
            borderRadius: 20,
            maxWidth: 120,
            textAlign: 'center',
            fontSize: 13,
            padding: 5

        },
        Faible: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'orange',
            borderRadius: 20,
            maxWidth: 120,
            textAlign: 'center',
            fontSize: 13,
            padding: 5


        },
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                        size={50}
                        rounded
                        source={{
                            uri: "https://cdn.shopify.com/s/files/1/0576/8445/9657/files/SeekPng.com_profile-icon-png_9665493.png?v=1650620910",
                        }}
                    />
                    <CustomText> {props.fullname} </CustomText>
                </View>
                <CustomText style={{ textAlign: 'right', fontSize: 12, color: '#555' }}>
                    Signalé le {props.timestamp}
                </CustomText>
            </View>

            <View style={styles.detailsContainer}>
                <CustomText style={[priorityStyles[priority]]}> Priorité:  {props.priority} </CustomText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Icon name="location-pin" type="entypo" size={20} />
                    <CustomText>: {props.location.address}</CustomText>
                </View>

                <CustomText style={{ marginTop: 5 }}>Description: {props.notes} </CustomText>
            </View>
            <View style={styles.viewActions}>
                <Pressable onPress={() => {
                    // dispatch(updateShowItinerary())
                    navigation.navigate('ShowItinerary', props)
                    console.log(props)
                }}>
                    <View style={[styles.pressables, { backgroundColor: 'yellow' }]}>
                        <CustomText style={styles.pressableText}>Voir sur la map</CustomText>
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate('TakeCallScreen', props)
                    console.log(props)
                }}>
                    <View style={styles.pressables}>
                        <CustomText style={[styles.pressableText, { color: 'white' }]}>Repondre à l'appel</CustomText>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default CallCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BEDAEB',
        borderRadius: 20,
        width: '90%',
        maxWidth: '90%', // Set width relative to parent for consistency
        alignSelf: 'center', // Center horizontally
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 10,
        marginTop: 15,
    },
    detailsContainer: {
        marginLeft: 50,
        paddingLeft: 10,
    },
    viewActions: {
        flexDirection: 'row',
        gap: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    pressables: {
        width: 150,
        backgroundColor: 'green',
        height: 30,
        borderRadius: 20,
        padding: 5,
    },
    pressableText: {
        textAlign: 'center',
    },
});

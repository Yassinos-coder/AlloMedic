import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from './CustomText';
import { Avatar, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowItinerary } from '../redux/AppReducer';

const CallCard = (props) => {
    const [priority, setPriority] = useState('medium');
    const showItinerary = useSelector((state) => state.AppReducer.ShowItinerary)

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
            fontSize: 13
        },
        Moyen: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'orange',
            borderRadius: 20,
            maxWidth: 70,
            textAlign: 'center',
            fontSize: 13

        },
        Faible: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'orange',
            borderRadius: 20,
            maxWidth: 70,
            textAlign: 'center',
            fontSize: 13

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
                    <CustomText>: {props.location}</CustomText>
                </View>

                <CustomText style={{ marginTop: 5 }}>Description: {props.notes} </CustomText>
            </View>
            <View style={styles.viewActions}>
                <Pressable onPress={() => {
                    dispatch(updateShowItinerary())
                    console.log(showItinerary)
                }}>
                    <View style={[styles.pressables, { backgroundColor: 'yellow' }]}>
                        <Text style={styles.pressableText}>Voir sur la map</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.pressables}>
                        <Text style={[styles.pressableText, { color: 'white' }]}>Repondre à l'appel</Text>
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

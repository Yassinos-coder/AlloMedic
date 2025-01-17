import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from './CustomText';
import { Avatar, Icon } from '@rneui/themed';

const CallCard = (props) => {
    const [priority, setPriority] = useState('medium');

    useEffect(() => {
        setPriority(props.priority);
        console.log(props.timestamp)
    }, [props.priority]); // added props.priority as dependency


    // Set dynamic priority styles
    const priorityStyles = {
        High: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'red',
            borderRadius: 20,
            width: 50,
            textAlign: 'center',
        },
        Medium: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'orange',
            borderRadius: 20,
            maxWidth: 70,
            textAlign: 'center',
        },
        Low: {
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'orange',
            borderRadius: 20,
            maxWidth: 70,
            textAlign: 'center',
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
                    Signalé à {props.timestamp}
                </CustomText>
            </View>

            <View style={styles.detailsContainer}>
                <CustomText style={[priorityStyles[priority]]}> {props.priority} </CustomText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Icon name="location-pin" type="entypo" size={20} />
                    <CustomText>: {props.location}</CustomText>
                </View>

                <CustomText style={{ marginTop: 5 }}>Description: {props.notes} </CustomText>
            </View>
            <View style={styles.viewActions}>
                <Pressable>
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
        backgroundColor: '#f0f0f0', // light grey background
        borderRadius: 20,
        maxWidth: 400,
        shadowColor: '#000', // shadow color
        shadowOffset: { width: 0, height: 2 }, // shadow position
        shadowOpacity: 0.1, // slight shadow opacity
        shadowRadius: 4, // shadow blur radius
        elevation: 3, // for Android shadow
        padding: 10,
    },
    detailsContainer: {
        marginLeft: 50, // Increased left margin to space out from Avatar
        paddingLeft: 10, // Extra padding to prevent text from touching edges
    },
    viewActions: {
        flexDirection: 'row',
        gap: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    pressables: {
        width: 150,
        backgroundColor: 'red',
        height: 30,
        borderRadius: 20,
        padding: 5,
    },
    pressableText: {
        textAlign: 'center',
    },
});

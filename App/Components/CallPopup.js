import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowCallMaker } from '../redux/AppReducer';

const CallPopup = ({ isVisible }) => {
    const dispatch = useDispatch()
    const showCallMakerPopUp = useSelector((state) => state.AppReducer.showCallMakerPopUp)


    return (<>
        {showCallMakerPopUp ?
            (<>
                <View style={styles.container}>
                    <Icon
                        name='close'
                        type="antdesign"
                        color="black"
                        size={22}
                        onPress={() => {
                            dispatch(updateShowCallMaker())
                        }}
                    />
                    <View style={styles.callView}>
                        <Text>hey</Text>
                    </View>
                </View>
            </>) : null}
    </>)
}


export default CallPopup;

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        width: '100%', // Ensure it takes full width
        height: '100%', // Ensure it takes full height
        backgroundColor: 'rgba(0,0,0,0.5)', // Optional: semi-transparent background
    },
    callView: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
        backgroundColor: 'red',
        padding: 20, // Add padding for spacing
        borderRadius: 10, // Optional: rounded corners
    },
});

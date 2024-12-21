import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import HomeStyles from './HomeStyles';
import { Dialog, Icon } from '@rneui/themed';
import { CreateUrgentCall } from '../../redux/CallsReducer';
import CallsObject from '../../Models/CallsObject';
import * as Location from 'expo-location';  // To handle location fetching
import CallPopup from '../../Components/CallPopup';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducer.userData);
  const userGPSLocation = useSelector((state) => state.UserReducer.userGPSLocation);
  const [DialogVisible, setDialogVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(userGPSLocation);
  const [newCall, setNewCall] = useState(new CallsObject());
  const calls = useSelector((state) => state.CallsReducer.calls);
  const mapRef = useRef(null); // Reference for MapView
  const [showCallMaker, setShowCallMaker] = useState(true)

  const ToggleDialogUnavailable = () => {
    setDialogVisible(!DialogVisible);
  };

  useEffect(() => {
    setUserLocation(userGPSLocation);
    console.log('new call registered', calls);
  }, [userGPSLocation, calls]);

  // Function to fetch current location
  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
    return location;
  };

  const refocusMap = async () => {
    const location = await getCurrentLocation();
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01, // Adjust for zoom level
        longitudeDelta: 0.01, // Adjust for zoom level
      });
    }
  };

  const sendUrgentCall = () => {
    setShowCallMaker(!showCallMaker)
    // Update the newCall state
    // const updatedCall = {
    //   caller_id: userData._id,
    //   call_location: `${userLocation.coords.latitude}, ${userLocation.coords.longitude}`,
    //   call_status: 'ongoing',
    // };
    // setNewCall(updatedCall); // Set the state

    // Dispatch the action to create an urgent call after state update
    // dispatch(CreateUrgentCall(updatedCall));
    // console.log('sent', updatedCall); // Log the updated call object
  };

  return (
    <View style={HomeStyles.container}>
      <View style={HomeStyles.callPopUpView}><CallPopup show={showCallMaker} /></View>

      <Dialog isVisible={DialogVisible} onBackdropPress={ToggleDialogUnavailable}>
        <Dialog.Title title="Service non disponible" />
      </Dialog>
      <View style={[HomeStyles.refocusMap, { backgroundColor: '#FFA500', borderRadius: 20 }]}>
        <Pressable style={HomeStyles.Pressables} onPress={refocusMap}>
          <Icon name="my-location" type="MaterialIcons" color="#000000" />
        </Pressable>
      </View>
      {userLocation ? (
        <MapView
          ref={mapRef} // Attach ref to the MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.01, // Adjust for zoom level
            longitudeDelta: 0.01, // Adjust for zoom level
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Vous"
            description="Votre position actuelle"
          />
        </MapView>
      ) : (
        <Text style={HomeStyles.loadingText}>
          <ActivityIndicator size="large" color="#0000ff" /> Fetching location...
        </Text>
      )}
      {
        showCallMaker ? (<></>) : (<View style={HomeStyles.actionView}>
          <View style={[HomeStyles.nestedView, { backgroundColor: '#F53C3C', borderTopLeftRadius: 20 }]}>
            <Pressable style={HomeStyles.Pressables} onPress={sendUrgentCall}>
              <Text style={HomeStyles.PressablesText}>Urgence Medic</Text>
            </Pressable>
          </View>
          <View style={[HomeStyles.nestedView, { backgroundColor: '#0077FF', borderTopRightRadius: 20 }]}>
            <Pressable style={HomeStyles.Pressables} onPress={ToggleDialogUnavailable}>
              <Text style={HomeStyles.PressablesText}>Appel Ambulance</Text>
            </Pressable>
          </View>
          <View style={[HomeStyles.nestedView, { backgroundColor: '#32CD32', borderBottomLeftRadius: 20 }]}>
            <Pressable style={HomeStyles.Pressables} onPress={ToggleDialogUnavailable}>
              <Text style={HomeStyles.PressablesText}>Assistance</Text>
            </Pressable>
          </View>
          <View style={[HomeStyles.nestedView, { backgroundColor: '#FFA500', borderBottomRightRadius: 20 }]}>
            <Pressable style={HomeStyles.Pressables} onPress={ToggleDialogUnavailable}>
              <Text style={HomeStyles.PressablesText}>Visite Domicile</Text>
            </Pressable>
          </View>
        </View>)
      }

    </View>
  );
};

export default HomeScreen;

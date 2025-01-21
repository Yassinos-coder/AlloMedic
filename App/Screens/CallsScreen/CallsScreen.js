import React, { useEffect, useState } from "react";
import CallsScreenStyles from './CallsScreenStyles';
import { FlatList, View, Text } from "react-native";
import socket from "../../utils/socketExpo";
import CallCard from "../../Components/CallCard";
import { useDispatch, useSelector } from "react-redux";
import { GetOnGoingCalls, updateCalls } from "../../redux/CallsReducer";

const CallsScreen = () => {
  const dispatch = useDispatch();
  const calls = useSelector((state) => state.CallsReducer.calls); // Redux state for all calls
  const [ongoingCalls, setOngoingCalls] = useState([]);

  useEffect(() => {
    // Fetch calls from the database
    dispatch(GetOnGoingCalls({}));

    // Connect to the socket server
    socket.connect();

    // Listen for live updates on urgent calls
    socket.on("urgentCallUpdate", (updatedCall) => {
      console.log("New Urgent Call Received:", updatedCall);
      // Dispatch to Redux store
      dispatch(updateCalls(updatedCall));
    });
    console.log(calls)
    // Clean up when the component unmounts
    return () => {
      socket.off("urgentCallUpdate");
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    setOngoingCalls(calls);
  }, [calls]);

  return (
    <View>
      <Text style={CallsScreenStyles.title}>Appel D'urgence Active</Text>
      <FlatList
        data={ongoingCalls}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ alignItems: 'center' }} // Center FlatList items
        renderItem={({ item }) => (
          <CallCard
            fullname="Yassine Castro"
            location={item.call_location}
            notes={item.call_notes}
            priority={item.call_priority}
            timestamp={item.call_timestamp}
          />
        )}
      />
    </View>
  );
};

export default CallsScreen;

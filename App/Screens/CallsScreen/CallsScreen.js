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

    // Clean up when the component unmounts
    return () => {
      socket.off("urgentCallUpdate");
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    // Sync Redux state with local state for ongoing calls
    setOngoingCalls(calls);
  }, [calls]);

  return (
    <View>
      <Text style={CallsScreenStyles.title}>Appel D'urgence Active</Text>
      <FlatList
        data={ongoingCalls}
        keyExtractor={(item, index) => index.toString()} // Use a unique key
        renderItem={({ item }) => (
          <CallCard
            fullname={'Yassine Castro'}
            priority={item.call_priority}
            notes={item.call_notes}
            location={item.call_location}
            timestamp={item.timestamp}
          />
        )}
      />
    </View>
  );
};

export default CallsScreen;

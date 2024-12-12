import React, { useEffect, useState } from "react";
import CallsScreenStyles from './CallsScreenStyles'
import { FlatList, View, Text } from "react-native";
import socket from "../../utils/socketExpo";
import CallCard from "../../Components/CallCard";

const CallsScreen = () => {
  const [ongoingCalls, setOngoingCalls] = useState([]);

  useEffect(() => {
    // Connect to the socket server
    socket.connect();

    // Listen for updates on urgent calls
    socket.on("urgentCallUpdate", (updatedCall) => {
      console.log("New Urgent Call Received:", updatedCall);

      // Update the ongoing calls list
      setOngoingCalls((prevCalls) => [...prevCalls, updatedCall]);
    });

    // Clean up when the component unmounts
    return () => {
      socket.off("urgentCallUpdate");
      socket.disconnect();
    };
  }, []);

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

import React, { useEffect, useState } from "react";
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
      <Text>Ongoing Calls</Text>
      <CallCard
        fullname={'Yassine Castro'}
        priority={'High'}
        notes={'Test description of the call, including any relevant details.'}
        location={'2 Rue Ahmed El Majjati, Casablanca, Morocco'}
      />

      <FlatList
        data={ongoingCalls}
        keyExtractor={(item, index) => index.toString()} // Use a unique key
        renderItem={({ item }) => (
          <CallCard notes={item.call_notes} />
        )}
      />
    </View>
  );
};

export default CallsScreen;

import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import socket from "../../utils/socketExpo";

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
      <FlatList
        data={ongoingCalls}
        keyExtractor={(item, index) => index.toString()} // Use a unique key
        renderItem={({ item }) => (
          <View>
            <Text>{`Call ID: ${item.userId}`}</Text>
            <Text>{`Location: ${item.location}`}</Text>
            <Text>{`Urgency Level: ${item.urgencyLevel}`}</Text>
            <Text>{`Description: ${item.description}`}</Text>
            <Text>{`Timestamp: ${item.timestamp}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CallsScreen;

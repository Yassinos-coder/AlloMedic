import React, { useEffect, useState } from "react";
import CallsScreenStyles from "./CallsScreenStyles";
import { FlatList, View, Text, RefreshControl } from "react-native";
import socket from "../../utils/socketExpo";
import CallCard from "../../Components/CallCard";
import { useDispatch, useSelector } from "react-redux";
import { GetOnGoingCalls, updateCalls } from "../../redux/CallsReducer";

const CallsScreen = () => {
  const dispatch = useDispatch();
  const calls = useSelector((state) => state.CallsReducer.calls); // Redux state for all calls
  const [ongoingCalls, setOngoingCalls] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

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
    setOngoingCalls(calls);
  }, [calls]);

  // Handle the pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch updated calls from the server
      await dispatch(GetOnGoingCalls({})); // Ensure this action fetches the latest calls
    } catch (error) {
      console.error("Error refreshing calls:", error);
    } finally {
      setRefreshing(false); // Stop the spinner
    }
  };

  return (
    <View>
      <Text style={CallsScreenStyles.title}>Appel D'urgence Active</Text>
      <FlatList
        data={ongoingCalls}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ alignItems: "center" }} // Center FlatList items
        renderItem={({ item }) => (
          <CallCard
            fullname="Yassine Castro"
            location={item.call_location}
            notes={item.call_notes}
            priority={item.call_priority}
            timestamp={item.call_timestamp}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default CallsScreen;

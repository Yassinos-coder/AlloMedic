import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AlertComponent = ({ alertType, alertMsg, isVisible }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();

      // Hide the alert after 5 seconds
      const timer = setTimeout(() => {
        hideAlert();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      hideAlert();
    }
  }, [isVisible]);

  const hideAlert = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // Adjust the initial position and final position as needed
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View
        style={[
          styles.alert,
          {
            backgroundColor:
              alertType === "info"
                ? "#CCCCCC"
                : alertType === "danger"
                ? "#FF7373"
                : alertType === "error"
                ? "#FFA500"
                : "#CCCCCC",
          },
        ]}
      >
        {alertType === "info" ? (
          <Feather name="info" size={24} color="black" />
        ) : alertType === "danger" ? (
          <MaterialIcons name="dangerous" size={24} color="black" />
        ) : alertType === "error" ? (
          <Ionicons name="warning" size={24} color="black" />
        ) : (
          <Feather name="info" size={24} color="black" />
        )}

        <Text style={{ color: "black", fontSize: 14, fontWeight: "700" }}>
          
          {alertMsg}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 5, // Adjust to position the alert at the top
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingTop: 20, // Adjust to add padding at the top
  },
  alert: {
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default AlertComponent;

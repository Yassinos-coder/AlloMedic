import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { SignupStyles } from "./SignupStyles";
import { AntDesign } from "@expo/vector-icons";

const SignupScreen = () => {
  const [role, setRole] = useState("user");
  return (
    <View style={SignupStyles.container}>
      <View style={SignupStyles.headerSignup}>
        <AntDesign
          style={SignupStyles.BackArrow}
          name="arrowleft"
          size={25}
          color="black"
        />
        <Image
          style={SignupStyles.imageRightSide}
          source={require("../../assets/images/SignupScreenRightImage.png")}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          color: "#333333",
          fontFamily: "poppins",
          marginLeft: 20,
          marginTop: -80,
        }}
      >
        Create New Account
      </Text>
      <View style={SignupStyles.roleView}>
        <Pressable
          onPress={() => {
            if (role === "medic") {
              setRole("user");
            } else {
              setRole("medic");
            }
          }}
        >
          <View
            style={[
              SignupStyles.userRole,
              role === "medic" ? {} : { backgroundColor: "#333333" },
            ]}
          >
            <Text
              style={
                role === "medic" ? { color: "#3A1E5D" } : { color: "white" }
              }
            >
              User
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            if (role === "user") {
              setRole("medic");
            } else {
              setRole("user");
            }
          }}
        >
          <View
            style={[
              SignupStyles.userRole,
              role === "medic" ? { backgroundColor: "#333333" } : {},
            ]}
          >
            <Text
              style={
                role === "medic" ? { color: "white" } : { color: "#3A1E5D" }
              }
            >
              Medic
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

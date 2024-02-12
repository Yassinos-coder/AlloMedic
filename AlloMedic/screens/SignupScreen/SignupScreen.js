import { View, Text, Image, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { SignupStyles } from "./SignupStyles";
import { AntDesign } from "@expo/vector-icons";

const SignupScreen = ({ navigation }) => {
  const [role, setRole] = useState("user");
  return (
    <SafeAreaView style={SignupStyles.container} accessible={true}>
      <View style={SignupStyles.headerSignup}>
        <AntDesign
          style={SignupStyles.BackArrow}
          name="arrowleft"
          size={25}
          color="black"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <Image
          style={SignupStyles.imageRightSide}
          source={require("../../assets/images/SignupScreenRightImage.png")}
          accessibilityLabel="Signup Screen Image"
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
        accessibilityLabel="Create New Account"
      >
        Create New Account
      </Text>
      <View style={SignupStyles.roleView} accessible={true}>
        <Pressable
          onPress={() => {
            if (role === "medic") {
              setRole("user");
            } else {
              setRole("user");
            }
          }}
          accessible={true}
        >
          <View
            style={[
              SignupStyles.userRole,
              role === "medic"
                ? {}
                : { backgroundColor: "#333333", borderRadius: 20 },
            ]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="User role button"
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
              setRole("medic");
            }
          }}
          accessible={true}
        >
          <View
            style={[
              SignupStyles.userRole,

              role === "medic"
                ? { backgroundColor: "#333333", borderRadius: 20 }
                : {},
            ]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Medic role button"
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
    </SafeAreaView>
  );
};

export default SignupScreen;

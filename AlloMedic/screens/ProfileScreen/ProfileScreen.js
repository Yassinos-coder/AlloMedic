import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import { ProfileStyles } from "./ProfileStyle";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const userData = useSelector((state) => state.userHandler.userData);
  return (
    <SafeAreaView style={ProfileStyles.container}>
      <View style={ProfileStyles.header}>
        <Pressable>
          <AntDesign
            style={ProfileStyles.BackArrow}
            name="arrowleft"
            size={25}
            color="black"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          />
        </Pressable>
        <Text style={ProfileStyles.textHeader}>Profile</Text>
      </View>
      <View style={ProfileStyles.profileData}>
        <Image
          source={
            userData && userData.avatar
              ? {
                  uri: `https://192.168.3.3:8009/uploads/${userData.fullname}/profilePic.png`,
                }
              : require("../../assets/images/nopp.png")
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

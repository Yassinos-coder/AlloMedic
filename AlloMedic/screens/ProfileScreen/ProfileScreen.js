import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import { ProfileStyles } from "./ProfileStyle";
import { AntDesign, Feather } from "@expo/vector-icons";
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
        <View style={ProfileStyles.userAvatarContainer}>
          <Image
            style={ProfileStyles.userAvatar}
            source={
              userData && userData.avatar
                ? {
                    uri: `https://192.168.3.3:8009/uploads/${userData.fullname}/profilePic.png`,
                  }
                : require("../../assets/images/nopp.png")
            }
          />
        </View>

        <View style={ProfileStyles.userInfoContainer}>
          <Text style={{ fontSize: 16 }}>{userData.fullname || "Erreur"}</Text>
          <Text style={{ fontSize: 12, color: "#999999" }}>
            {userData.email || "Erreur"}
          </Text>
        </View>
        <View style={ProfileStyles.editButtonContainer}>
          <Pressable>
            <View style={ProfileStyles.button}>
              <Text style={ProfileStyles.buttonText}>Edit</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={ProfileStyles.profilePanel}>
        <View style={[ProfileStyles.panelOptions, { marginTop: 10 }]}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={require("../../assets/acc3x.png")}
          />
          <Text style={{ fontSize: 14, width: 230 }}> Account Information</Text>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/chevron_right3x.png")}
          />
        </View>
        <Image
          style={{
            width: 311,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
          source={require("../../assets/break.png")}
        />
        <View style={ProfileStyles.panelOptions}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={require("../../assets/add3x.png")}
          />
          <Text style={{ fontSize: 14, width: 230 }}> Address</Text>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/chevron_right3x.png")}
          />
        </View>
        <Image
          style={{
            width: 311,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
          source={require("../../assets/break.png")}
        />

        <View style={ProfileStyles.panelOptions}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={require("../../assets/pay3x.png")}
          />
          <Text style={{ fontSize: 14, width: 230 }}> Payment Methods</Text>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/chevron_right3x.png")}
          />
        </View>
        <Image
          style={{
            width: 311,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
          source={require("../../assets/break.png")}
        />

        <View style={ProfileStyles.panelOptions}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={require("../../assets/report3x.png")}
          />
          <Text style={{ fontSize: 14, width: 230 }}> Report an issue</Text>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/chevron_right3x.png")}
          />
        </View>
      </View>
      <Pressable>
        <View style={ProfileStyles.buttonDA}>
          <Feather name="trash-2" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>
            Delete Account
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SignupStyles } from "./SignupStyles";
import { AntDesign } from "@expo/vector-icons";
import SignupModel from "../../models/SignupModel";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Signup } from "../../redux/UserReducer";

const SignupScreen = ({ navigation }) => {
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(new SignupModel());
  const [dataPrivacyAgree, setDataPrivacyAgree] = useState("square");
  const [dataTosAgree, setDataTosAgree] = useState("square");

  const TriggerSignup = () => {
    setNewUser({
      ...newUser,
      account_type: "user",
      isEmailVerified: false,
      isPhoneVerified: false,
    });
    dispatch(Signup({ SignupData: newUser })).then((response) => {
      console.log(response)
    });
  };

  return (
    <KeyboardAvoidingView
      style={SignupStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      enabled
    >
      <ScrollView contentContainerStyle={SignupStyles.scrollContainer}>
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
          {role === "medic" ? (
            <View style={SignupStyles.SignupInputsView}>
              {/* Role is medic */}
            </View>
          ) : role === "user" ? (
            <>
              <View style={SignupStyles.SignupInputsView}>
                {/* Role is user */}
                <TextInput
                  style={SignupStyles.Inputs}
                  placeholder="Full Name"
                  value={newUser.fullname}
                  onChangeText={(text) =>
                    setNewUser({ ...newUser, fullname: text })
                  }
                />
                <TextInput
                  style={SignupStyles.Inputs}
                  placeholder="Email"
                  value={newUser.email}
                  keyboardType="email-address"
                  onChangeText={(text) =>
                    setNewUser({ ...newUser, email: text })
                  }
                />
                <TextInput
                  style={SignupStyles.Inputs}
                  placeholder="Ex: 0600000000"
                  value={newUser.phoneNumber}
                  onChangeText={(text) =>
                    setNewUser({ ...newUser, phoneNumber: text })
                  }
                />
                <TextInput
                  style={SignupStyles.Inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={newUser.password}
                  onChangeText={(text) =>
                    setNewUser({ ...newUser, password: text })
                  }
                />
                <Pressable
                  onPress={() => {
                    if (dataPrivacyAgree === "square") {
                      setDataPrivacyAgree("check-square");
                    } else {
                      setDataPrivacyAgree("square");
                    }
                  }}
                >
                  <View style={SignupStyles.agreements}>
                    <Feather name={dataPrivacyAgree} size={20} color="grey" />
                    <Text
                      style={{ width: 320, paddingLeft: 10, color: "grey" }}
                    >
                      J'accepte le traitement des données conformément à la loi
                      LOI N° 09-08 relative à la protection des personnes
                      physiques à l'égard du traitement des données à caractère
                      personnel.
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (dataTosAgree === "square") {
                      setDataTosAgree("check-square");
                    } else {
                      setDataTosAgree("square");
                    }
                  }}
                >
                  <View style={SignupStyles.agreements}>
                    <Feather name={dataTosAgree} size={20} color="grey" />
                    <Text style={{ paddingLeft: 10, color: "grey" }}>
                      J'accepte les conditions d'utilisation.
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
                  onPress={() => {
                    if (
                      !newUser.fullname ||
                      !newUser.email ||
                      !newUser.phoneNumber ||
                      !newUser.password
                    ) {
                      Alert.alert("Please fill all fields.");
                    } else if (
                      dataPrivacyAgree !== "check-square" ||
                      dataTosAgree !== "check-square"
                    ) {
                      Alert.alert(
                        "Please you must agree to both the Data Privacy and Terms of Service"
                      );
                    } else {
                      TriggerSignup(); // Assuming TriggerSignup is a defined function
                    }
                  }}
                >
                  <View style={[SignupStyles.signup]}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontFamily: "poppins",
                      }}
                    >
                      Create Account
                    </Text>
                  </View>
                </Pressable>
              </View>
            </>
          ) : (
            Alert.alert("Please pick between User or Medic")
          )}
        </SafeAreaView>
      </ScrollView>
      <View style={{ justifyContent: "flex-end" }}>
        <Text
          style={{
            textAlign: "center",
            color: "#999999",
            fontSize: 12,
          }}
        >
          Copyright © CASTRO Digital Solutions
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

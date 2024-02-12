import { LoginStyles } from "./LoginStyles";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LoginModel from "../../models/LoginModel";
import { useDispatch } from "react-redux";
import { Signin, setConnectionStatus } from "../../redux/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState("square");
  const [loginData, setLoginData] = useState(new LoginModel());

  const SigninTrigger = () => {
    dispatch(Signin({ loginData: loginData }))
      .then(async (response) => {
        if (!response.payload.loginResult) {
          console.log(response);
          switch (response.payload.message) {
            case "INVALID_CREDENTIALS":
              Alert.alert("Password or User doesn't exist!");
              break;
            case "Internal server error":
              Alert.alert("Internal Error, Try Again!");
              break;
            default:
              Alert.alert("An error occurred, please try again later!");
          }
        } else {
          dispatch(setConnectionStatus());
          console.log(response.payload);
          await AsyncStorage.setItem("tokenKey", response.payload.token);
          await AsyncStorage.setItem(
            "userLoggedIn",
            JSON.stringify(response.payload.loginResult)
          );
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(response.payload.userData)
          );
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <SafeAreaView style={LoginStyles.container}>
      <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      <Image
        style={LoginStyles.loginImage}
        source={require("../../assets/images/loginImage.png")}
      />
      <Text style={LoginStyles.loginText}> Sign in to your account </Text>
      <View style={LoginStyles.loginBox}>
        <TextInput
          style={[LoginStyles.Inputs, { marginBottom: 20 }]}
          placeholder="Email"
          keyboardType="email-address"
          value={loginData.email}
          onChangeText={(text) =>
            setLoginData({ ...loginData, email: text.toLowerCase() })
          }
        />
        <TextInput
          style={LoginStyles.Inputs}
          placeholder="Password"
          value={loginData.password}
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(text) =>
            setLoginData({ ...loginData, password: text })
          }
        />
        <View style={LoginStyles.belowPasswordAction}>
          <Pressable
            onPress={() => {
              if (rememberMe === "square") {
                setRememberMe("check-square");
              } else if (rememberMe === "check-square") {
                setRememberMe("square");
              } else {
                setRememberMe("square");
              }
            }}
          >
            <View style={LoginStyles.belowPasswordActionStyles}>
              <Feather name={rememberMe} size={20} color="grey" />
              <Text style={{ color: "grey", fontSize: 15 }}> Remember me</Text>
            </View>
          </Pressable>
          <Pressable style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}>
            <View>
              <Text style={{ color: "#558FFE" }}>Forgot password ?</Text>
            </View>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
          onPress={() => {
            if (loginData.email === "" || loginData.password === "") {
              Alert.alert("Fields cannot be empty!");
            } else {
              SigninTrigger();
            }
          }}
        >
          <View style={LoginStyles.buttonView}>
            <Text style={LoginStyles.buttonText}>Sign in</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={LoginStyles.noAccount}>
          Don{"'"}t have an account yet?
        </Text>
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <View
            style={[
              LoginStyles.buttonView,
              {
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "#333333",
              },
            ]}
          >
            <Text style={LoginStyles.buttonText}>Sign up</Text>
          </View>
        </Pressable>

        <Text style={{ textAlign: "center", color: "#999999", fontSize: 12 }}>
          Copyright © CASTRO Digital Solutions
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

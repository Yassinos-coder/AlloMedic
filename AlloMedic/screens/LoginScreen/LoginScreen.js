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
import { useDispatch, useSelector } from "react-redux";
import { Signin, setConnectionStatus } from "../../redux/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import * as LocalAuthentication from "expo-local-authentication";
import AlertComponent from "../../utils/AlertComponent";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState("square");
  const [loginData, setLoginData] = useState(new LoginModel());
  const [isFocused, setFocus] = useState({});
  const isLoading = useSelector((state) => state.userHandler.status);
  // Alerts State
  const [alertWp, setalertWp] = useState(false); // Invalid Credentials
  const [alertIS, setalertIS] = useState(false); // Internal Server Error
  const [alertEF, setalertEF] = useState(false); // Empty Fields

  const authenticate = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();

      if (success) {
        // Biometric authentication successful, navigate to the main screen or perform other actions
        console.log("Authentication successful");
      } else {
        // Biometric authentication failed or was canceled by the user
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const SigninTrigger = () => {
    dispatch(Signin({ loginData: loginData }))
      .then(async (response) => {
        if (!response.payload.loginResult) {
          switch (response.payload.message) {
            case "INVALID_CREDENTIALS":
              // Alert.alert("Password or User doesn't exist!");
              setalertWp(true);
              setTimeout(() => {
                setalertWp(false)
              }, 2500);
              break;
            case "Internal server error":
              // Alert.alert("Internal Error, Try Again!");
              setalertIS(true);
              setTimeout(() => {
                setalertIS(false)
              }, 2500);
              break;
            default:
              setalertIS(true);
              setTimeout(() => {
                setalertIS(false)
              }, 2500);
          }
        } else {
          dispatch(setConnectionStatus());
          await AsyncStorage.setItem("tokenKey", response.payload.token);
          await AsyncStorage.setItem(
            "userLoggedIn",
            JSON.stringify(response.payload.loginResult)
          );
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(response.payload.userData)
          );
          navigation.navigate("HomeScreen");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <SafeAreaView style={LoginStyles.container}>
      <AlertComponent
        alertType="danger"
        alertMsg="E-mail/Mot de Passe Incorrect"
        isVisible={alertWp}
      />
      <AlertComponent
        alertType="error"
        alertMsg="Erreur du serveur, veuillez réessayer plus tard"
        isVisible={alertIS}
      />
      <AlertComponent
        alertType="info"
        alertMsg="Veuillez remplir tous les champs"
        isVisible={alertEF}
      />

      <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      <Image
        style={LoginStyles.loginImage}
        source={require("../../assets/images/loginImage.png")}
      />
      <Text style={LoginStyles.loginText}> Sign in to your account </Text>
      <View style={LoginStyles.loginBox}>
        <TextInput
          style={[
            LoginStyles.Inputs,
            { marginBottom: 20 },
            isFocused.email && { borderColor: "#3A7DFF", borderWidth: 2 },
          ]}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) =>
            setLoginData({ ...loginData, email: text.toLowerCase() })
          }
          onFocus={() => setFocus({ ...isFocused, email: true })}
          onBlur={() => setFocus({ ...isFocused, email: false })}
          returnKeyType="next" // Set returnKeyType to "next"
          onSubmitEditing={() => {
            passwordInputRef.focus();
          }} // Move focus to the password field
        />
        <TextInput
          ref={(input) => {
            passwordInputRef = input;
          }} // Create a ref for the password field
          style={[
            LoginStyles.Inputs,
            isFocused.password && { borderColor: "#3A7DFF", borderWidth: 2 },
          ]}
          placeholder="Password"
          keyboardType="ascii-capable"
          secureTextEntry={true}
          onChangeText={(text) =>
            setLoginData({ ...loginData, password: text })
          }
          onFocus={() => setFocus({ ...isFocused, password: true })}
          onBlur={() => setFocus({ ...isFocused, password: false })}
          returnKeyType="done" // Set returnKeyType to "done" for the last input field
          onSubmitEditing={() => {
            if (loginData.email === "" || loginData.password === "") {
              // Alert.alert("Fields cannot be empty!");
              setalertEF(true);
              setTimeout(() => {
                setalertEF(false)
              }, 2500);
            } else {
              SigninTrigger();
            }
          }}
        />

        <View style={LoginStyles.belowPasswordAction}>
          <Pressable
            onPress={async () => {
              if (rememberMe === "square") {
                setRememberMe("check-square");
                await AsyncStorage.setItem("doesDeviceRemember", "true");
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
          <Pressable
            style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
            onPress={() => {
              navigation.navigate("forgotPassword");
            }}
          >
            <View>
              <Text style={{ color: "#558FFE" }}>Forgot password ?</Text>
            </View>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
          onPress={() => {
            if (loginData.email === "" || loginData.password === "") {
              // Alert.alert("Fields cannot be empty!");
              setalertEF(true);
              setTimeout(() => {
                setalertEF(false);
              }, 2500);
            } else {
              SigninTrigger();
            }
          }}
        >
          <View style={LoginStyles.buttonView}>
            {isLoading === "pending" ? (
              <View
                style={{ flexDirection: "row", alignSelf: "center", gap: 10 }}
              >
                <Progress.Circle
                  style={{ paddingTop: 12 }}
                  size={24}
                  indeterminate={true}
                  color="white"
                  borderWidth={2}
                />
              </View>
            ) : (
              <Text style={LoginStyles.buttonText}>Sign in</Text>
            )}
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

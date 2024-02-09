import { LoginStyles } from "./LoginStyles";
import React, { useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LoginModel from "../../models/LoginModel";

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState("square");
  const [loginData, setLoginData] = useState(new LoginModel());
  return (
    <View style={LoginStyles.container}>
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
          onChangeText={(text) => setLoginData({ ...loginData, email: text })}
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
        <Pressable style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}>
          <View style={LoginStyles.buttonView}>
            <Text style={LoginStyles.buttonText}>Sign in</Text>
          </View>
        </Pressable>
      </View>
      <Text style={LoginStyles.noAccount}>Don{"'"}t have an account yet?</Text>
      <Pressable style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}>
        <View
          style={[
            LoginStyles.buttonView,
            { alignSelf: "center", marginTop: 20, backgroundColor: "#333333" },
          ]}
        >
          <Text style={LoginStyles.buttonText}>Sign in</Text>
        </View>
      </Pressable>
      <View style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "#999999", fontSize: 12 }}>
          Copyright © CASTRO Digital Solutions
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

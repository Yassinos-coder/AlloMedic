import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";
import DocsUpload from "../screens/SignupScreen/DocsUpload";

const drawer = createDrawerNavigator();

const NonAuthNav = () => {
  return (
    <>
      <drawer.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerStatusBarAnimation: "slide",
        }}
        backBehavior="order"
      >
        <drawer.Screen name="Signin" component={LoginScreen} />
        <drawer.Screen name="Signup" component={SignupScreen} />
        <drawer.Screen name="DocsUpload" component={DocsUpload} />
      </drawer.Navigator>
    </>
  );
};

const AuthNav = () => {
  return (
    <>
      <drawer.Navigator
        initialRouteName="Signin"
        screenOptions={{ headerShown: false }}
        backBehavior="order"
      >
        <drawer.Screen name="Signin" component={LoginScreen} />
        <drawer.Screen name="Signup" component={SignupScreen} />
      </drawer.Navigator>
    </>
  );
};

const Navigator = () => {
  const isUserConnected = useSelector(
    (state) => state.userHandler.isUserConnected
  );

  return (
    <NavigationContainer>
      {!isUserConnected ? <NonAuthNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default Navigator;

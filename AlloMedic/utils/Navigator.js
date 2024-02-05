import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import AuthScreen from "../screens/AuthScreen/AuthScreen";

const drawer = createDrawerNavigator();

const NonAuthNav = () => {
  return (
    <>
      <drawer.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerStatusBarAnimation: "slide",
        }}
        backBehavior="order"
      >
        <drawer.Screen name="Auth" component={AuthScreen} />
        {/* <drawer.Screen name="Report" /> */}
      </drawer.Navigator>
    </>
  );
};

const AuthNav = () => {
  return (
    <>
      <drawer.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
        backBehavior="order"
      >
        <drawer.Screen name="Auth" component={AuthScreen} />
        {/* <drawer.Screen name="Home" />
        <drawer.Screen name="Profile" />
        <drawer.Screen name="AppSettings" />
        <drawer.Screen name="Report" /> */}
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

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

const NonAuthNav = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Login" component={HomeScreen} />
      <Drawer.Screen name="Signup" component={HomeScreen} />
      <Drawer.Screen name="Report" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const AuthNav = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Login" component={HomeScreen} />
      <Drawer.Screen name="Signup" component={HomeScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Report" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  const isUserConnected = useSelector(
    (state) => state.UserHandler.isUserConnected
  );

  return (
    <NavigationContainer>
      {isUserConnected ? <AuthNav /> : <NonAuthNav />}
    </NavigationContainer>
  );
};

export default Navigator;

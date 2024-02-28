import React from "react";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";
import DocsUpload from "../screens/SignupScreen/DocsUpload";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
      >
        <drawer.Screen name="Signin" component={LoginScreen} />
        <drawer.Screen name="Signup" component={SignupScreen} />
        <drawer.Screen name="DocsUpload" component={DocsUpload} />
        <drawer.Screen
          options={({ navigation }) => ({
            headerShown: true,
            title: "Réinitialisation de mot de passe",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <AntDesign
                  name="arrowleft"
                  size={22}
                  color="black"
                  onPress={() => navigation.navigate('Signin')}
                  accessibilityLabel="Go back"
                  accessibilityRole="button"
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            ),
          })}
          name="forgotPassword"
          component={ForgotPassword}
        />
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

import React from "react";
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";
import DocsUpload from "../screens/SignupScreen/DocsUpload";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const navigateToScreen = (screenName) => () => {
    navigation.navigate(screenName);
  };
  const userData = useSelector((state) => state.userHandler.userData);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#EEEEEE",
          width: "100%",
          height: 90,
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/images/nopp.png")}
          style={{ resizeMode: "contain", width: 80, height: 80 }}
        />
        <Text style={{ padding: 20, fontSize: 18 }}>
          {" "}
          {userData.fullname ? userData.fullname : "Session Null"}{" "}
        </Text>
      </View>
      <TouchableOpacity
        onPress={navigateToScreen("HomeScreen")}
        style={[
          DrawerStyle.itemStyle,
          {
            height: 50,
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 16, paddingLeft: 10, color: "white" }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToScreen("ProfileScreen")}
        style={[
          DrawerStyle.itemStyle,
          {
            height: 50,
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 16, paddingLeft: 10, color: "white" }}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToScreen("AppSettings")}
        style={[
          DrawerStyle.itemStyle,
          {
            height: 50,
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 16, paddingLeft: 10, color: "white" }}>
          App Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToScreen("ReportBug")}
        style={[
          DrawerStyle.itemStyle,
          {
            height: 50,
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 16, paddingLeft: 10, color: "white" }}>
          Report Bug
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={navigateToScreen("Screen1")}
        style={[
          {
            height: 50,
            justifyContent: "center",
            backgroundColor: "red",
          },
        ]}
      >
        <View style={{ paddingLeft: 10, flexDirection: "row" }}>
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={{ paddingLeft: 10, fontSize: 16, color: "white" }}>
            Se Deconnecter
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DrawerStyle = StyleSheet.create({
  itemStyle: {
    backgroundColor: "grey",
    width: 250,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
});

const NonAuthNav = () => {
  return (
    <drawer.Navigator
      initialRouteName="Signin"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStatusBarAnimation: "slide",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <AntDesign
                name="arrowleft"
                size={22}
                color="black"
                onPress={() => navigation.navigate("Signin")}
                accessibilityLabel="Go back"
                accessibilityRole="button"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
        name="forgotPassword"
        component={ForgotPassword}
      />
    </drawer.Navigator>
  );
};

const AuthNav = () => {
  return (
    <drawer.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <drawer.Screen name="Signin" component={LoginScreen} />
      <drawer.Screen name="Signup" component={SignupScreen} />
      <drawer.Screen name="HomeScreen" component={HomeScreen} />
      <drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <drawer.Screen
        options={({ navigation }) => ({
          headerShown: true,
          title: "Réinitialisation de mot de passe",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <AntDesign
                name="arrowleft"
                size={22}
                color="black"
                onPress={() => navigation.navigate("Signin")}
                accessibilityLabel="Go back"
                accessibilityRole="button"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
        name="forgotPassword"
        component={ForgotPassword}
      />
    </drawer.Navigator>
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

import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import Mapper from "../Mapper";
import { HomeStyles } from "./HomeStyles";
import * as Location from "expo-location";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [regionName, setRegionName] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => {
    navigation.toggleDrawer(); // Toggle the drawer open or close
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, []); // Empty dependency array to fetch user location only once on component mount

  useEffect(() => {
    if (userLocation) {
      const fetchRegionName = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&format=json`
          );
          const data = response.data;
          setRegionName(
            `${data.address.neighbourhood || ""}` +
              ` ${data.address.city.split(" ")[0]}`
          );
          setLoading(false);
        } catch (error) {
          console.error("Error fetching region name:", error);
          setRegionName("Unknown");
          setLoading(false);
        }
      };

      fetchRegionName();
    }
  }, [userLocation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeStyles.header}>
        <View style={HomeStyles.burgerMenu}>
          <Pressable onPress={() => toggleDrawer()}>
            <Entypo name="menu" size={24} color="black" />
          </Pressable>
        </View>
        <View style={HomeStyles.posView}>
          <Image
            style={HomeStyles.bleuPin}
            source={require("../../assets/bluePin.png")}
          />
          <Text style={HomeStyles.posText}>
            {loading ? "Loading..." : regionName}
          </Text>
        </View>
        <View style={HomeStyles.filter}>
          <Pressable>
            <FontAwesome name="filter" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <Mapper />

      <Pressable
        style={({ pressed }) => [
          {
            position: "absolute",
            alignSelf: "center",
            bottom: 20, // Adjust this value as needed
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <View style={HomeStyles.callButton}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Demander de l'aide médicale
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

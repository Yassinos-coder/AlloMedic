import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import Mapper from "../Mapper";
import { HomeStyles } from "./HomeStyles";
import * as Location from "expo-location";
import axios from "axios";

const HomeScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [regionName, setRegionName] = useState('');
  const [loading, setLoading] = useState(true);

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
          setRegionName(`${data.address.neighbourhood || ''}` + ` ${data.address.city.split(" ")[0]}`);
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
      <View style={HomeStyles.posView}>
        <Image
          style={HomeStyles.bleuPin}
          source={require("../../assets/bluePin.png")}
        />
        <Text style={HomeStyles.posText}>
          {loading ? "Loading..." : regionName}
        </Text>
      </View>

      <Mapper />
    </SafeAreaView>
  );
};

export default HomeScreen;

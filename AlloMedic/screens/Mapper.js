import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import locationPinImage from "../assets/locationPin.png";

const Mapper = () => {
  const [userLocation, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const customMapStyle = [
    // Background (can be further adjusted if needed):
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#e0e0e0",
        },
      ],
    },
    // Text labels: Lighter gray
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#828282",
        },
      ],
    },
    // Water: Blue-toned
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#83b0e7",
        },
      ],
    },
    // Parks: Set a clear green color
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#76a593", // Example green color
        },
      ],
    },
    // Buildings & Streets: Adjust the gray shade
    {
      featureType: ["poi", "road"], // Target both types
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#d0d0d0", // Example darker gray (adjust if needed)
        },
      ],
    },
    // Roads: White with a thin white outline
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#ffffff", // Thin white outline
          weight: 1, // Adjust line thickness
        },
      ],
    },
    // Highways: Lighter yellow (adjust if needed)
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f5e898", // Example lighter yellow
        },
      ],
    },
    // Forests (experiment cautiously): Consider this optional due to potential side effects
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#92b384", // Example green color (adjust if needed)
        },
      ],
    },
    // PoI icons (e.g., gas station): Visible and slightly blue tint
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on", // Show icons
          color: "#99b3e6", // Slightly blue tint
        },
      ],
    },
    // Hide unnecessary labels (e.g., building names)
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>{errorMsg}</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Chargement de votre localisation...
        </Text>
      </View>
    );
  }

  // Set region to user's location, assuming it's available
  const { latitude, longitude } = userLocation.coords;

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.05, // Adjust this value for desired zoom level
    longitudeDelta: 0.01, // Adjust this value for desired zoom level
  };

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      customMapStyle={customMapStyle}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        image={locationPinImage}
        title="Votre Position"
        draggable={false}
      />
    </MapView>
  );
};

export default Mapper;

import React, { useState } from "react";
import { Provider } from "react-redux";
import Navigator from "./utils/Navigator";
import Store from "./redux/Store";
import * as Font from "expo-font";
import { AppLoading } from "expo-app-loading";

// Function to load the font
const fetchFonts = () => {
  return Font.loadAsync({
    poppins: require("./assets/fonts/poppins.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load the font before rendering the app
  const loadFont = async () => {
    await fetchFonts();
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
}

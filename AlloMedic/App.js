import React, { useState, useEffect, useCallback } from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Store from "./redux/Store";
import Navigator from "./utils/Navigator";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          poppins: require("./assets/fonts/Poppins.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={Store}>
      <StatusBar
        animated={true}
        showHideTransition={"fade"}
        barStyle={"default"}
      />
      <View
        style={{ flex: 1, backgroundColor: "#fff" }}
        onLayout={onLayoutRootView}
      >
        <Navigator />
      </View>
    </Provider>
  );
}

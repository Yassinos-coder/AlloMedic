import 'react-native-gesture-handler';
import { ActivityIndicator, Appearance, Platform } from 'react-native'; // Added Text import
import * as Fonts from 'expo-font';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import PrivateScreens from './utils/PrivateScreens';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store'

const LoadFonts = () => {
  return Fonts.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-extrabold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-italic': require('./assets/fonts/Poppins-Italic.ttf'),
  });
};

export default function App() {
  const [FontLoaded, setFontLoaded] = useState(false);
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const initializeApp = async () => {
      await LoadFonts();
      setColorScheme(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'); // Fixed here
      SecureStore.setItemAsync('userData', "")
      setFontLoaded(true);
    };

    initializeApp();
  }, []);

  if (!FontLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Provider store={Store}>
      <StatusBar backgroundColor={colorScheme === 'dark' ? 'black' : 'white'} translucent={Platform.OS === 'ios'} />
      <PrivateScreens />
    </Provider>
  );
}

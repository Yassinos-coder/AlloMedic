import 'react-native-gesture-handler';
import { ActivityIndicator, View, Text } from 'react-native'; // Added Text import
import * as Fonts from 'expo-font';
import * as SecureStore from 'expo-secure-store'; // Added SecureStore import
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import PrivateScreens from './utils/PrivateScreens';

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

  useEffect(() => {
    const initializeApp = async () => {
      const isSignedIn = await SecureStore.getItemAsync('isSignedIn');
      if (!isSignedIn) {
        await SecureStore.setItemAsync('isSignedIn', 'false');
      }

      await LoadFonts();
      setFontLoaded(true);
    };

    initializeApp();
  }, []);

  if (!FontLoaded) {
    return <ActivityIndicator size="large" color="#0000ff"/>;
  }

  return (
    <Provider store={Store}>
      <PrivateScreens />
    </Provider>
  );
}

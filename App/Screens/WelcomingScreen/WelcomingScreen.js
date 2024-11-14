
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonGroup } from '@rneui/themed';
import WelcomingStyles from './WelcomingStyles';
import { useNavigation } from '@react-navigation/native';

const WelcomingScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigation = useNavigation()
    return (
        <SafeAreaView style={WelcomingStyles.container}>
            <View style={WelcomingStyles.subContainer}>
                <Text style={WelcomingStyles.text}>Bienvenue sur Allo Medic</Text>
                <ButtonGroup
                    buttons={['S\'ENREGISTRER', 'SE CONNECTER']}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value);
                        const mode = value === 0 ? 'signup' : 'signin';
                        navigation.navigate('Authentification', { mode });
                    }}
                    containerStyle={{ marginBottom: 20 }}
                />
            </View>

        </SafeAreaView>
    );
}

export default WelcomingScreen;

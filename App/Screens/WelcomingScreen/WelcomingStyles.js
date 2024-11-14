import { StyleSheet } from "react-native";

const WelcomingStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,                  // Make the subContainer take up full height
        justifyContent: "center",  // Center vertically
        alignItems: "center",      // Center horizontally
    },
    text: {
        textAlign:'center',
        fontSize:20,
        marginBottom:20
    }
});

export default WelcomingStyles
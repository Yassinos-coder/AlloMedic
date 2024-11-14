import { StyleSheet } from "react-native";

const AuthStyles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'poppins-regular'
    },
    signin: {
        flex: 1,               // Take up the full height of the container
        justifyContent: 'center', // Center vertically
        alignItems: 'center',     // Center horizontally
    },
    subSignin: {
        justifyContent: 'center', // Center vertically
        alignItems: 'center',     // Center horizontally
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20
    },
    title: {
        fontSize: 18,
        padding: 30
    }
})

export default AuthStyles
import { StyleSheet } from 'react-native';

const AuthStyles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'poppins-regular',
    },
    signin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subSignin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        padding: 20, // Added padding
    },
    title: {
        fontSize: 18,
        paddingBottom: 30, // Adjusted for better spacing
    },
    signup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subSignup: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        padding: 20, // Added padding
    },
    goBackButton: {
        backgroundColor: '#e9e9e9',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        marginTop: 20
    }
});

export default AuthStyles;

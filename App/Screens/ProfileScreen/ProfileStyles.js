import { StyleSheet } from "react-native";

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
    },
    profileHeader: {
        flex: 1, // Ensures it takes up the available space
        alignItems: 'center', // Centers content horizontally
        marginTop: 30,
    },
    Pressables:{
        marginBottom:10
    },
    BtnLogout: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10
    },
    BtnLogoutText: {
        color: "white",
        textAlign: "center"

    },
    BtnModifyData: {
        backgroundColor: "white",
        padding: 10,
        width: 250,
        borderRadius: 10
    },
    BtnModifyDataText: {
        textAlign: "center"
    },
    actions: {
        marginTop: 50
    }
})


export default ProfileStyles
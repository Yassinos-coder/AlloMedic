import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
    posView: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: '#FFFFFF',
        alignSelf:"center",
        marginTop: 20,
        width: 237,
        height: 44,
        borderRadius: 50,
        flexDirection: "row",
        alignItems:"center",
        gap: 5,
        overflow:"hidden"
    },
    bleuPin: {
        resizeMode: "contain",
        marginLeft: 15,
        width: 24, 
        height: 24,
    },
    posText: {
        fontSize: 14,
        fontWeight: '500',
        overflow: "hidden"
    }
})


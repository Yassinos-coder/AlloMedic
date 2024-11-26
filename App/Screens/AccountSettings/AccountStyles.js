import { StyleSheet } from "react-native";

const AccountStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    ActionsView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    pressableEdits: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 300,
        marginTop: 10,
        padding: 5
    },
    actionsOnEdit: {
        alignSelf:"flex-end",
        flexDirection:"row",
        gap: 5
    }
})

export default AccountStyles
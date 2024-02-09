import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginImage: {
    width: 205,
    height: 190.5,
    marginTop: 50,
    alignSelf: "center",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  loginBox: {
    alignSelf: "center",
    marginTop: 50,
  },
  Inputs: {
    backgroundColor: "#F1F7FC",
    color: "#999999",
    fontSize: 14,
    borderRadius: 15,
    width: 343,
    height: 50,
    paddingLeft: 20,
  },
  belowPasswordAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  belowPasswordActionStyles: {
    flexDirection: "row",
  },
  buttonView: {
    width: 343,
    height: 50,
    backgroundColor: "#3A7DFF",
    borderRadius: 20,
    marginTop: 40
  },
  buttonText: {
    alignSelf: "center",
    paddingTop: 15,
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  noAccount: {
    textAlign:'center',
    color: '#666666',
    fontWeight: '700',
    marginTop: 100
  }
});

import { StyleSheet } from "react-native";

export const SignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerSignup: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  BackArrow: {
    backgroundColor: "#F4F4F4",
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  imageRightSide: {
    width: 205,
    height: 190.5,
  },
  roleView: {
    marginTop: 15,
    alignSelf: "center",
    width: 343,
    height: 50,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userRole: {
    width: 164,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  SignupInputsView: {
    alignSelf: "center",
    marginTop: 30,
  },
  Inputs: {
    backgroundColor: "#F1F7FC",
    color: "#999999",
    fontSize: 14,
    borderRadius: 15,
    width: 343,
    height: 50,
    paddingLeft: 20,
    marginBottom: 20,
  },
  agreements: {
    flexDirection: "row",
    marginBottom: 10,
  },
  signup: {
    marginTop: 30,
    width: 343,
    height: 50,
    backgroundColor: "#3A7DFF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

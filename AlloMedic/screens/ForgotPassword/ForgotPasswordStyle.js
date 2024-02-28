import { StyleSheet } from "react-native";

export const ForgotPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  textBox: {
    alignSelf: "center",
    width: 320,
    backgroundColor: "#e2e2e2",
    borderRadius: 20,
    padding: 10,
    marginTop: 50,
  },
  textBoxText: {
    textAlign: "center",
    fontSize: 17
  },
  inputBox: {
    alignSelf: "center",
    width: 320,
    marginTop: 50,
  },
  inputBoxInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#F1F7FC",
    borderRadius: 20,
    padding: 10,
  },
  buttonView: {
    width: 343,
    height: 50,
    backgroundColor: "#3A7DFF",
    borderRadius: 20,
    marginTop: 40,
  },
  buttonText: {
    alignSelf: "center",
    paddingTop: 15,
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  focusedInput: {
    borderWidth: 1,
    borderColor: "#3A7DFF",
  },
});

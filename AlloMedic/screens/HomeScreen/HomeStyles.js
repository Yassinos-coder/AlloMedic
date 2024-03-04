import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  header: {
    position: "absolute",
    zIndex: 1,
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  posView: {
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: 237,
    height: 44,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    overflow: "hidden",
  },
  bleuPin: {
    resizeMode: "contain",
    marginLeft: 15,
    width: 24,
    height: 24,
  },
  posText: {
    fontSize: 14,
    fontWeight: "500",
    overflow: "hidden",
  },
  burgerMenu: {
    backgroundColor: "#FFFFFF",
    width: 38,
    height: 38,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  filter: {
    backgroundColor: "#FFFFFF",
    width: 38,
    height: 38,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  callButton: {
    justifyContent:"center",
    backgroundColor: "#3A7DFF",
    width: 343,
    height: 60,
    borderRadius: 25
  },
});

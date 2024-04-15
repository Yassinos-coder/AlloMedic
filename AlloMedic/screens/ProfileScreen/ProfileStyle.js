import { StyleSheet } from "react-native";

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    margin: 20,
  },
  BackArrow: {
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingTop: 12,
    paddingLeft: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "600",
    padding: 8,
  },
  profileData: {
    backgroundColor: "#EEEEEE",
    width: 343,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});

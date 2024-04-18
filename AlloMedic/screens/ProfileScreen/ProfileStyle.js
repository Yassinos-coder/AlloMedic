import { StyleSheet } from "react-native";

const COLORS = {
  white: "#FFF",
  lightGray: "#F9F9F9",
  red: "red",
};

const DIMENSIONS = {
  borderRadius: 10,
};

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    gap: 30,
  },
  header: {
    flexDirection: "row",
    margin: 10,
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
    backgroundColor: COLORS.lightGray,
    width: 343,
    height: 100,
    borderRadius: DIMENSIONS.borderRadius,
    alignSelf: "center",
    flexDirection: "row",
    gap: 15,
  },
  userAvatarContainer: {
    justifyContent: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 15,
  },
  userInfoContainer: {
    justifyContent: "center",
  },
  editButtonContainer: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#3A7DFF",
    borderRadius: 12,
    width: 63,
    height: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    margin: 5,
    fontWeight: "500",
  },
  profilePanel: {
    width: 343,
    height: 216,
    borderRadius: DIMENSIONS.borderRadius,
    backgroundColor: COLORS.lightGray,
    alignSelf: "center",
  },
  panelOptions: {
    width: 313,
    height: 30,
    flexDirection: "row",
    gap: 15,
    marginLeft: 15,
    padding: 5,
  },
  buttonDA: {
    width: 330,
    height: 50,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#EE3737",
  },
});

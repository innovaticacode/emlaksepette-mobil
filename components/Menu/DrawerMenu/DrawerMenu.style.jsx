import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    gap: 15,
  },
  mainContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopRightRadius: 10,
    width: 320,
    paddingVertical: 12,
    width: "100%",
  },
  closeIconContainer: {
    alignItems: "flex-end",
    paddingRight: 15,
  },
  profileContainer: {
    width: "100%",
    alignItems: "center",
  },
  profileRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  profileImageContainer: {
    width: 65,
    height: 65,
  },
  profileImageWrapper: {
    borderRadius: 50,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  userInfoContainer: {
    gap: 6,
  },
  userName: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },
  userAccountText: {
    fontSize: 12,
  },
  divider: {
    width: "85%",
    backgroundColor: "#C4C4C4",
    padding: 0.5,
    alignSelf: "center",
  },
  searchContainer: {
    width: "100%",
    alignItems: "center",
  },
  searchWrapper: {
    width: "80%",
  },
  grayArea: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  categoryWrapper: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    width: "85%",
  },
  advertButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  advertButton: {
    backgroundColor: "#EA2C2E",
    width: "85%",
    padding: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  advertButtonText: {
    color: "white",
    fontWeight: "600",
  },
  customerServiceContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  customerServiceButton: {
    backgroundColor: "#FFF3F2",
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    justifyContent: "center",
    gap: 10,
    padding: 8,
  },
  customerServiceTextContainer: {
    gap: 5,
  },
  customerServiceText: {
    color: "#EA2C2E",
    fontWeight: "400",
    letterSpacing: 1,
  },
  customerServiceNumber: {
    color: "#EA2C2E",
    fontWeight: "400",
    letterSpacing: 1,
  },
});

import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  greenCardBody: {
    width: "100%",
    backgroundColor: "#DCF1E6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center", // Yatayda ortalamak için
    position: "relative", // Resim için mutlak konum
    marginTop: 40,
    marginBottom: 10,
  },
  iconContainer: {
    position: "absolute",
    top: -25,
    left: "50%",
    transform: [{ translateX: -25 }],
  },
  boldText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: "#000",
  },
  iconWrapperGreen: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#0FA958",
    justifyContent: "center",
    alignItems: "center",
    // Gölge için eklemeler:
    shadowColor: "#000", // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.62, // Gölgenin opaklığı
    shadowRadius: 3.84, // Gölge bulanıklık yarıçapı
    elevation: 5, // Android için gölge efekti
  },
  textArea: {
    gap: 16,
    marginTop: 52,
  },
  largeBoldtext: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
    color: "#000",
  },
  okeyBtn: {
    backgroundColor: "#0E713D",
    height: 30,
    width: 70,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  rejectBtn: {
    backgroundColor: "#EA2A28",
    height: 30,
    width: 70,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: "center",
  },
});

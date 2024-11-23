import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    paddingVertical: 14,
  },
  whyTitle: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  description: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
  },
  descCont: {
    paddingVertical: 14,
    gap: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 4, // Yarı çap, tam bir daire için genişliğin yarısı olmalı
    backgroundColor: "#000", // Dairenin rengi
    marginRight: 8,
  },
  listText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 10,
    lineHeight: 24,
    textAlign: "center",
  },
  sliderSection: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  pagerView: {
    flex: 1,
    width: "100%",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  sliderBorder: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    padding: 10,
    width: "90%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  sliderTitle: {
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 30,
  },
  sliderText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    paddingHorizontal: 10,
  },
  pageNumber: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    borderWidth: 1,
    borderColor: "#000",
    zIndex: 1,
  },
  pageNumberText: {
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 30,
    color: "#FFF",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotArea: {
    flexDirection: "row",
    gap: 4,
  },
  imgArea: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
});

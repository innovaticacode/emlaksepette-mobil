import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import ListGroup from "../assets/listGroup.png";

const SellAndRentList = () => {
  return (
    <React.Fragment>
      <Text
        style={styles.title}
      >{`Emlak Sepette ile Hızlı\nSat Kirala Sistemi`}</Text>
      <View>
        <View style={styles.imgArea}>
          <View>
            <Image source={ListGroup} resizeMode="contain" />
          </View>
          <View style={[styles.textArea, styles.type]}>
            <Text style={[styles.textOne, styles.type]}>
              İlan formunu doldur.
            </Text>
            <Text style={[styles.textTwo, styles.type]}>
              Emlak Sepette danışmanları size hizmet ve rehberlik etsin.
            </Text>
            <Text style={[styles.textThree, styles.type]}>
              İlanınız profesyonel bir şekilde emlak sepetinde
            </Text>
            <Text style={[styles.textFour, styles.type]}>
              İlanınız üstün hizmet ile emlak sepette yayınlansın.
            </Text>
            <Text style={[styles.five, styles.type]}>
              Siz sadece arkanıza yaslanın. Satışın keyfini çıkarın.
            </Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default SellAndRentList;

const styles = StyleSheet.create({
  title: {
    color: "#222222",
    fontWeight: "700",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 24,
  },
  imgArea: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textArea: {
    width: "50%",
    padding: 10,
  },
  textOne: {
    position: "absolute",
    top: 26,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  textTwo: {
    position: "absolute",
    top: 86,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  textThree: {
    position: "absolute",
    top: 168,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  textFour: {
    position: "absolute",
    top: 242,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  five: {
    position: "absolute",
    top: 326,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  type: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222222",
    lineHeight: 14,
  },
});

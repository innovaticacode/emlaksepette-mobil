import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SellAndRentAdvantageText = (props) => {
  const { boldText, thinText } = props;
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.thin}>
          <Text style={styles.bold}>{boldText}: </Text>
          {thinText}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default SellAndRentAdvantageText;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: "100%",
  },
  thin: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
  },
  bold: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
  },
});

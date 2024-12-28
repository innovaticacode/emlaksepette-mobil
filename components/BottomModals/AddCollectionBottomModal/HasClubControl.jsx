import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./HasClubControl.styles";

export default function HasClubControl({
  alert,
  btnText,
  type,
  corporateType,
  setIsVisible,
}) {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.alertText}>{alert}</Text>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          {type == 2 && corporateType == "Emlak Ofisi"
            ? "Portföyünüze konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"
            : "Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setIsVisible(false);
          nav.navigate("Collections");
        }}
      >
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
}

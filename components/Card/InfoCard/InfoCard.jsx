import React from "react";
import { Text, View } from "react-native";
import { styles } from "./InfoCard.styles";
import ArrowRight from "../../../assets/arrow-right.svg";
import { TouchableOpacity } from "react-native";

const InfoCard = ({
  description,
  date,
  name,
  surname,
  phone,
  eposta,
  onPress,
  colorKey,
}) => {
  const handlePress = async () => {
    await onPress();
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: colorKey % 2 === 0 ? "#FFF" : "#F7F7F7" },
        ]}
        onPress={() => {
          handlePress();
        }}
        activeOpacity={0.7}
      >
        <View style={styles.body}>
          <View>
            <Text style={styles.title}>Ad: {name}</Text>
            <Text style={styles.subTitle}>Soyad: {surname}</Text>
            <Text style={styles.subTitle}>Telefon: {phone}</Text>
            <Text style={styles.subTitle}>E-posta: {eposta}</Text>
          </View>
          <View style={styles.rightArea}>
            <Text style={styles.date}>{date}</Text>
            {!description && (
              <ArrowRight
                width={20}
                height={20}
                style={{ alignSelf: "flex-end" }}
              />
            )}
          </View>
        </View>
        {description && (
          <View style={{ width: "98%" }}>
            <View style={styles.descBody}>
              <Text style={styles.text}>{`Mesaj: `}</Text>
              <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">
                {description}
              </Text>
              <ArrowRight
                width={20}
                height={20}
                fill="#000"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default InfoCard;

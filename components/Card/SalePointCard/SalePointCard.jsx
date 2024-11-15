import React from "react";
import { Text, View } from "react-native";
import { styles } from "./SalePointCard.styles";
import Build from "../../../assets/build.svg";
import Acente from "../../../assets/acente.svg";
import Home from "../../../assets/home.svg";
import Settings from "../../../assets/settings.svg";

const icons = {
  Build: Build,
  Acente: Acente,
  Home: Home,
  Settings: Settings,
};

const SalePointCard = ({ description, title, icon = "Home" }) => {
  const IconComponent = icons[icon] || Home;

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <IconComponent
        width={100}
        height={100}
        style={{ position: "absolute", bottom: 30, left: 0 }}
      />
      <View style={styles.seperator} />
    </View>
  );
};

export default SalePointCard;

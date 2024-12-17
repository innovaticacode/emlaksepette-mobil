import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
export default function GraphicForClupRealtor() {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = [
    {
      name: "Reddedilen",
      population: 21500000,
      color: "#EA2C2E",
      legendFontColor: "#000000",
      legendFontSize: 11,
    },
    {
      name: "Onay Bekleyen",
      population: 2800000,
      color: "#FF9908",
      legendFontColor: "#000000",
      legendFontSize: 11,
    },
    {
      name: "Kazancım",
      population: 527612,
      color: "#00D21A",
      legendFontColor: "#000000",
      legendFontSize: 11,
    },
  ];
  return (
    <ScrollView
      contentContainerStyle={{ paddingLeft: 12, paddingRight: 12, gap: 14 }}
    >
      <View style={styles.card}>
        <View style={{ paddingLeft: 15, paddingTop: 8 }}>
          <Text style={{ color: "#6B6B6B", fontSize: 14, fontWeight: "500" }}>
            Emlak İlanları İstatistikleri
          </Text>
          <Text style={{ color: "#000000", fontSize: 15, fontWeight: "500" }}>
            2,233,434,32 ₺
          </Text>
        </View>
        <PieChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          style={{}}
        />
      </View>
      <View
        style={[
          styles.card,
          { padding: 10, flexDirection: "row", alignItems: "center", gap: 15 },
        ]}
      >
        <View>
          <View
            style={{
              backgroundColor: "#FF9908",
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="eyeo" size={20} color={"#fff"} />
          </View>
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 13 }}>
            Genel Görüntülenme Sayısı
          </Text>
          <Text style={{ color: "#000000", fontWeight: "600", fontSize: 12 }}>
            5550
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.card,
          { padding: 10, flexDirection: "row", alignItems: "center", gap: 15 },
        ]}
      >
        <View>
          <View
            style={{
              backgroundColor: "#FFD338",
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="heart" size={20} color={"#fff"} />
          </View>
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 13 }}>
            İlan Favorilere Eklenme Sayısı
          </Text>
          <Text style={{ color: "#000000", fontWeight: "600", fontSize: 12 }}>
            2000
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.card,
          { padding: 10, flexDirection: "row", alignItems: "center", gap: 15 },
        ]}
      >
        <View>
          <View
            style={{
              backgroundColor: "#EA2C2E",
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon2 name="coins" size={18} color={"#fff"} />
          </View>
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 13 }}>
            Toplam Satış
          </Text>
          <Text style={{ color: "#000000", fontWeight: "600", fontSize: 12 }}>
            14.500.000 ₺
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    width: "100%",
    borderRadius: 8,

    borderColor: "#e6e6e6",
  },
});

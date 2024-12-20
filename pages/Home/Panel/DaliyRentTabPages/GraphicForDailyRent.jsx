import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Arrow from "react-native-vector-icons/SimpleLineIcons";

import { useSelector } from "react-redux";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";
import PanelComponent from "../../../../components/PanelAdvert/PanelComponent";
export default function GraphicForDailyRent() {
  const SummaryRedux = useSelector((state) => state.summary.dataSummary);
  const screenWidth = Dimensions.get("window").width;

  //İstatistikler için hesaplama işlemleri
  const approvedTotal =
    SummaryRedux?.rental_summary?.sale_prices_sum?.approved?.reduce(
      (accumulator, item) => {
        return accumulator + item.price;
      },
      0
    );
  const PendingTotal =
    SummaryRedux?.rental_summary?.sale_prices_sum?.pending?.reduce(
      (accumulator, item) => {
        return accumulator + item.price;
      },
      0
    );

  const RejectedTotal =
    SummaryRedux?.rental_summary?.sale_prices_sum?.rejected?.reduce(
      (accumulator, item) => {
        return accumulator + item.price;
      },
      0
    );
  const TotalSaleGraphic = approvedTotal + PendingTotal + RejectedTotal;

  const TotalSale =
    SummaryRedux?.rental_summary?.sale_prices_sum?.approved?.reduce(
      (accumulator, item) => {
        return accumulator + item.price;
      },
      0
    );

  const SaleCards = [
    {
      text: "Kazancım",
      color: "#34B55E",
      textColor: "#00D21A",
      amount: approvedTotal,
      IconContainerColor: "#5AD481",
      Icon: "lira-sign",
      IconStatus: 0,
    },
    {
      text: "Reddedilen Kazancım",
      color: "#EA2B2E",
      textColor: "#EA2C2E",
      amount: RejectedTotal,
      IconContainerColor: "#F85154",
      Icon: "close",
      IconStatus: 1,
    },
    {
      text: "Onay Bekleyen Kazancım",
      color: "#FC8F00",
      textColor: "#FF9908",
      amount: PendingTotal,
      IconContainerColor: "#FFCA7D",
      Icon: "clock",
      IconStatus: 2,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingLeft: 12, paddingRight: 12, gap: 14 }}
      bounces={false}
    >
      <View
        style={[
          styles.card,
          { padding: 10, flexDirection: "row", alignItems: "center", gap: 15 },
        ]}
      >
        <View>
          <View
            style={{
              backgroundColor: "#34B55E",
              width: 40,
              height: 40,
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <Icon2 name="lira-sign" color={"white"} size={18} />
            </View>
          </View>
        </View>

        <View style={{ gap: 3 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 14 }}>
            Toplam Satış
          </Text>
          <Text style={{ color: "#34B55E", fontWeight: "700", fontSize: 16 }}>
            {addDotEveryThreeDigits(TotalSale)} ₺
          </Text>
        </View>
      </View>
      {/* <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 6,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "#E3E3E3",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                  <View>
                    <Icon name="calendar" size={20} color={"#888888"} />
                  </View>
                  <View>
                    <Text style={{ color: "#606060", fontSize: 13 ,fontWeight:'600'}}>Son 1 Ay</Text>
                  </View>
                </View>
                <View>
                  <Arrow name="arrow-down" size={15} color={"#606060"} />
                </View>
              </TouchableOpacity>
            </View> */}
      <View style={styles.StatisticCard}>
        {SaleCards.map((item, index) => (
          <PanelComponent
            header={item.text}
            backGroundColor={item.color}
            IconStatus={item.IconStatus}
            IconName={item.Icon}
            IconContainerColor={item.IconContainerColor}
            Balance={item.amount}
          />
        ))}
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
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="eyeo" size={20} color={"#fff"} />
          </View>
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 14 }}>
            Genel Görüntülenme Sayısı
          </Text>
          <Text style={{ color: "#000000", fontWeight: "600", fontSize: 16 }}>
            {SummaryRedux?.rental_summary?.total_view_count}
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
              backgroundColor: "#EA2B2E",
              width: 40,
              height: 40,
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="heart" size={20} color={"#fff"} />
          </View>
        </View>
        <View style={{ gap: 3 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 14 }}>
            İlan Favorilere Eklenme Sayısı
          </Text>
          <Text style={{ color: "#000000", fontWeight: "600", fontSize: 16 }}>
            {SummaryRedux?.rental_summary?.total_favorites_estate_count}
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
  card2: {
    flexDirection: "row",
  },
  StatisticCard: {
    gap: 10,
  },
  IconContainer: {
    backgroundColor: "transparent",
    borderRightColor: "#F6F6F6",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderRightWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
});

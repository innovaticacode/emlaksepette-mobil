import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import SellAndRentList from "../../components/SellAndRentList";
import BGTwo from "../../assets/buyAndRentBg.png";
import FastRent from "../../assets/FastRent.png";
import IndividualRent from "../../assets/IndividualRent.png";

export default function SellAndRentFormPage(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexGrow: 1, flex: 1 }}>
        <Image source={BGTwo} style={styles.bgImage} resizeMode="cover" />
        <View style={{ width: "100%", paddingHorizontal: 24 }}>
          <View style={styles.headTextArea}>
            <View>
              <Text style={styles.title}>MÜLKLERİNİZİ</Text>
              <Text
                style={styles.redTitle}
              >{`HIZLI SATIN, \nHIZLI KİRALAYIN!`}</Text>
            </View>
            <Text style={styles.desc}>
              Sat kirala, emlak satış ve kiralama işlerinizi güvenli ve hızlı
              bir şekilde hallediyor. Biz mülkünüzü alıcıya veya kiracıya
              ulaştırıyoruz!
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("ShareScreen");
            }}
            style={styles.redButton}
          >
            <Text style={styles.redButtonText}>Hemen İlan Ver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardArea}>
          <TouchableOpacity
            style={styles.redCard}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("SellAndRentAdvantage", { index: 0 });
            }}
          >
            <View style={styles.inner}>
              <View style={styles.cardDesc}>
                <Text style={styles.redCardText}>
                  Hızlı satıp kiralama avantajlarını hemen öğren..
                </Text>
                <Text></Text>
              </View>
              <View style={styles.whiteButton}>
                <Icon name="arrow-right" size={18} color="#EA2B2E" />
                <Text style={styles.whiteButtonText}>
                  Hızlı Sat Kirala Avantajları
                </Text>
              </View>
              <Image
                source={FastRent}
                style={styles.redCardImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whiteCard}
            onPress={() => {
              navigation.navigate("SellAndRentAdvantage", { index: 1 });
            }}
            activeOpacity={0.8}
          >
            <View style={styles.whiteCardInner}>
              <View style={styles.whiteCardInnerTextArea}>
                <Text style={styles.whiteCardText}>
                  Bireysel satıp kiralama dezavantajlarını hemen öğren..
                </Text>
                <Text></Text>
              </View>
              <View style={styles.whiteButton}>
                <Icon name="arrow-right" size={18} color="#EA2B2E" />
                <Text style={styles.whiteButtonText}>
                  Bireysel Sat Kirala Dezavantajları
                </Text>
              </View>
              <Image
                source={IndividualRent}
                style={styles.whiteCardImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, paddingBottom: 20 }}>
          <SellAndRentList />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  bgImage: {
    width: "100%",
    height: 310,
  },
  headTextArea: {
    paddingTop: 16,
  },
  title: {
    color: "#000000",
    fontSize: 35,
    lineHeight: 42,
    fontWeight: "300",
  },
  redTitle: {
    color: "#EA2B2E",
    fontSize: 35,
    lineHeight: 42,
    fontWeight: "700",
  },
  desc: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  redButton: {
    backgroundColor: "#EA2B2E",
    width: "100%",
    height: 38,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  redButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
  },
  cardArea: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  redCard: {
    width: "90%",
    minWidth: 336,
    height: 132,
    alignSelf: "center",
    height: 132,
    backgroundColor: "#EA2B2E",
    borderRadius: 14,
  },
  inner: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cardDesc: {
    width: "62%",
    height: "auto",
    paddingVertical: 6,
  },
  redCardText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#FFF",
  },

  whiteButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "76%",
    borderRadius: 22,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteButtonText: {
    color: "#EA2B2E",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
  },
  redCardImage: {
    position: "absolute",
    right: 12,
    top: 0,
    width: 150,
    height: 130,
    zIndex: -1,
  },
  whiteCard: {
    width: "90%",
    minWidth: 336,
    height:'auto',
    alignSelf: "center",
    backgroundColor: "#FFE3E3",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EA2b2E",
    marginTop: 20,
  },

  whiteCardInner: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  whiteCardInnerTextArea: {
    width: "62%",
    height: 'auto',
    paddingVertical: 6,
  },
  whiteCardText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#EA2B2E",
  },
  whiteCardImage: {
    position: "absolute",
    right: 12,
    top: 0,
    width: 150,
    height: 130,
    zIndex: -1,
  },
});

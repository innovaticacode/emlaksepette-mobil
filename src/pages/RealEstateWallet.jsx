import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Geri tuşu için ikon
import { Image } from "react-native-elements";
import axios from "axios";
import { apiUrl } from "../../components/methods/apiRequest";
import { getValueFor } from "../../components/methods/user";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { formatedPrice } from "../../utils";

const RealEstateWallet = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const amounts = ["1000", "2000", "3000", "4000", "5000"];

  const renderAmountButton = (amount) => {
    return (
      <TouchableOpacity
        key={amount}
        style={[
          styles.amountButton,
          selectedAmount === amount && styles.selectedAmountButton,
        ]}
        onPress={() =>
          setSelectedAmount(selectedAmount === amount ? null : amount)
        }
      >
        <Text style={styles.amountText}>{amount} ₺</Text>
      </TouchableOpacity>
    );
  };

  const fetchWallet = async () => {
    if (!user?.access_token) {
      return;
    }
    try {
      const response = await axios.get(apiUrl + "wallet", {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      setWallet(response?.data || {});
    } catch (error) {
      console.error("Error fetching wallet data: ", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Bilinmeyen bir hata oluştu.";
      setTimeout(() => {
        Dialog.show({
          type: ALERT_TYPE.ERROR,
          title: "Hata",
          textBody: errorMessage,
          button: "Tamam",
        });
      }, 250);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      fetchWallet();
    }
  }, [user]); // user değiştiğinde çalışacak

  useEffect(() => {
    console.debug("wallet------->", wallet); // wallet her değiştiğinde çalışacak
  }, [wallet]); // wallet değiştiğinde çalışacak

  return (
    <AlertNotificationRoot>
      <ScrollView>
        <View style={styles.container}>
          {/* Balance Card */}
          <View style={styles.withdrawSection}>
            <View style={[styles.balanceCard, { padding: 0 }]}>
              <ImageBackground
                source={require("../../src/assets/images/wallet_card.png")}
                style={styles.imageBack}
                borderRadius={20}
              />
              <View style={styles.balenceCardBottom}>
                <View style={styles.balenceCardRight}>
                  <View>
                    <Text style={styles.balanceTitle}>Toplam Bakiye</Text>
                    <Text style={styles.balanceAmount}>
                      {formatedPrice(wallet?.wallet?.amount || 0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.balanceTitle}>Emlak</Text>
                    <Text style={styles.balanceTitle}>Cüzdan</Text>
                  </View>
                </View>
                <View style={styles.balenceCardRight}>
                  <View>
                    <Text style={styles.balanceTitle}>
                      Kullanılabilir Bakiye
                    </Text>
                    <Text style={styles.balanceAmount}>
                      {formatedPrice(wallet?.wallet?.amount_available || 0)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.Title}>Emlak Cüzdan</Text>
              <Text style={styles.balanceDesc}>
                Emlak Cüzdan ile hızlıca ödeme yap. Emlak cüzdanlı olmanın
                ayrıcalıklarını yakala!
              </Text>
            </View>
          </View>

          {/* Withdraw Section */}
          <View style={styles.withdrawSection}>
            <View style={styles.balenceCardRight}>
              <Text style={styles.sectionTitle}>Para Çek</Text>
              <TouchableOpacity>
                <Text style={styles.removeCardText}>Kartı Sil</Text>
              </TouchableOpacity>
            </View>

            {/* Card Display */}
            <View style={styles.card}>
              <View style={styles.balenceCardBottom}>
                <View style={styles.balenceCardRight}>
                  <Image
                    source={require("../../src/assets/images/Ziraat.png")}
                    style={styles.cardImage2}
                  />
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                </View>
                <View style={styles.balenceCardRight}>
                  <Text style={styles.cardText}>20576****7877</Text>
                  <Image
                    source={require("../../src/assets/images/logos_mastercard.png")}
                    style={styles.cardImage}
                  />
                </View>
              </View>
            </View>

            {/* Add Card Section */}
            <TouchableOpacity style={styles.addCard}>
              <Ionicons name="add-circle" size={24} color="red" />
              <Text style={styles.addCardText}>Kart Ekle</Text>
            </TouchableOpacity>

            {/* Amount Selection */}
            <View style={styles.amountContainer}>
              <FlatList
                data={amounts}
                horizontal
                renderItem={({ item }) => renderAmountButton(item)}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {/* Custom Amount Input */}
            <TextInput
              style={styles.customInput}
              placeholder="Farklı Tutar giriniz..."
              keyboardType="numeric"
              value={customAmount}
              onChangeText={setCustomAmount}
            />

            {/* Withdraw Button */}
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawButtonText}>Hemen Para Çek</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  balanceCard: {
    width: "90%",
    height: 200,
    borderRadius: 25,
    backgroundColor: "#EA2B2E",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    alignSelf: "center",
  },
  imageBack: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  balenceCardBottom: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  balenceCardRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  balanceSubtitle: {
    fontSize: 14,
    color: "#fff",
  },

  Title: {
    color: "#EA2B2E",
    fontSize: 24,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  balanceDesc: {
    fontSize: 14,
    marginTop: 10,
    color: "#333",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  withdrawSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  removeCardText: {
    fontSize: 16,
    color: "#ff4d4d",
    textAlign: "right",
    marginBottom: 16,
  },
  card: {
    width: "90%",
    height: 200,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    position: "relative",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Yalnızca Android için
  },
  cardText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cardImage: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  cardImage2: {
    width: 62,
    height: 62,
    resizeMode: "contain",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amountButton: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 5,
    marginRight: 10,
    borderColor: "#919191",
    borderWidth: 1,
  },
  selectedAmountButton: {
    backgroundColor: "#ff4d4d",
  },
  amountText: {
    color: "#919191",
    fontWeight: "bold",
  },
  customInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 16,
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: "#EA2B2E",
    padding: 16,
    borderRadius: 10,
  },
  withdrawButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  addCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    borderColor: "#EA2B2E",
    borderWidth: 1,
  },
  addCardText: {
    color: "#ff4d4d",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default RealEstateWallet;

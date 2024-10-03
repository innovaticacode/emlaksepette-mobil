import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Feather";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";

export default function SuggestItem({ item }) {
  const [modalVisible, setModalVisible] = useState(false);
  const apiUrl = "http://192.168.1.102:8000";
  const stripHtmlTags = (str) => {
    if (str) {
      return str.replace(/<\/?[^>]+(>|$)/g, "");
    }
    return "";
  };
  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 7 }}>
          <View
            style={{
              width: 90,
              height: 90,
              backgroundColor: "red",
              borderRadius: 4,
            }}
          >
            <ImageBackground
              source={{
                uri: `${apiUrl}/${item?.project?.image.replace(
                  "public/",
                  "storage/"
                )}`,
              }}
              style={{ width: "100%", height: "100%", borderRadius: 4 }}
            />
          </View>
          <View style={{ gap: 7 }}>
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Teklif Edilen Fiyat
              </Text>
              <Text style={{ fontSize: 12 }}>
                {addDotEveryThreeDigits(item.price)} ₺
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Teklif Verilen Mağaza
              </Text>
              <Text style={{ fontSize: 12 }}>{item?.store?.name}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>
                {" "}
                <Text style={{ fontWeight: "600" }}>İlan No: </Text>#1000
                {item?.project_id}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ justifyContent: "space-between" }}>
          {item.offer_response == 0 && (
            <View
              style={{
                backgroundColor: "#FFEFCA",
                padding: 6,
                borderRadius: 4,
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="clock" color={"#FF9908"} />
              <Text
                style={{ fontSize: 10, color: "#FF9908", fontWeight: "600" }}
              >
                Yanıt Bekliyor
              </Text>
            </View>
          )}
          {item.offer_response == 1 && (
            <TouchableOpacity
              style={{
                backgroundColor: "#E1F2E6",
                padding: 6,
                borderRadius: 4,
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Icon2 name="check-circle" color={"#10A958"} />
              <Text
                style={{ fontSize: 10, color: "#10A958", fontWeight: "600" }}
              >
                Yanıtı Gör
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            <Text style={{ fontSize: 12, color: "#EA2C2E", fontWeight: "600" }}>
              İlanı İncele
            </Text>
            <Icon name="arrow-right" size={10} color={"#EA2C2E"} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mağaza Yanıtı</Text>
            <Text style={styles.modalText}>
              {stripHtmlTags(item.response_description)}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#EA2C2E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 12,
    width: "100%",
    marginVertical: 10,

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  profileImage: {
    width: 55,
    height: 50,
  },
  ProfileName: {
    flex: 1.3 / 2,
  },
});

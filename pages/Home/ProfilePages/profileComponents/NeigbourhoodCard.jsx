import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { frontEndUriBase } from "../../../../components/methods/apiRequest";
export default function NeigbourhoodCard({
  NeigBourHoodInfo,
  project,
  projectInfo,
  status,
}) {
  const navigation = useNavigation();

  const handleOpenPhone = () => {
    // Telefon uygulamasını açmak için
    Linking.openURL(`tel:+90${NeigBourHoodInfo.mobile_phone}`);
  };
  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    let formattedNumber = "";

    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 0) formattedNumber += "(";
      if (i === 3) formattedNumber += ") ";
      if (i === 6 || i === 8) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    return formattedNumber;
  };

  console.debug("NeigBourHoodInfo", NeigBourHoodInfo);
  return (
    <View style={styles.contain}>
      <View style={{ padding: 16, gap: 20 }}>
        <View style={styles.body}>
          <View style={styles.imageArea}>
            <ImageBackground
              source={{
                uri: `${frontEndUriBase}${projectInfo.image.replace(
                  "public/",
                  "storage/"
                )}`,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              borderRadius={5}
            />
          </View>
          <View style={styles.textArea}>
            <View style={{ gap: 1 }}>
              <Text style={styles.header}>Mülk Sahibi Adı</Text>
              <Text style={styles.Text}>
                {status === 1
                  ? NeigBourHoodInfo.name
                  : `${NeigBourHoodInfo.name.slice(0, 2)}********`}
              </Text>
            </View>
            <View style={{ gap: 1 }}>
              <Text style={styles.header}>Mülk Sahibi Telefonu</Text>
              <Text style={styles.Text}>
                {status === 1
                  ? formatPhoneNumber(NeigBourHoodInfo.mobile_phone)
                  : `${formatPhoneNumber(NeigBourHoodInfo.mobile_phone).slice(
                      0,
                      5
                    )}******`}
              </Text>
            </View>
            <View style={{ gap: 1 }}>
              <Text style={styles.header}>Konut Bilgisi</Text>
              <Text style={styles.Text}>
                {NeigBourHoodInfo &&
                  project &&
                  JSON.parse(project)["item"]["title"] +
                    " " +
                    JSON.parse(project)["item"]["housing"]}{" "}
                {""}No'lu İlan{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              status === 1 ? handleOpenPhone() : null;
            }}
            style={[
              styles.callButton,
              { backgroundColor: status === 1 ? "#10A958" : "#FFCE86" },
            ]}
            activeOpacity={status === 1 ? 0.2 : 1}
          >
            <Icon name="phone" color={"#fff"} />
            <Text style={{ textAlign: "center", color: "#FFF" }}>
              {status === 1 ? "Ara" : "Onay Bekleniyor"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Drawer", {
                screen: "PostDetails",
                params: {
                  HomeId: JSON.parse(project)?.item?.housing,
                  projectId: projectInfo?.id,
                },
              });
            }}
            style={styles.seeAdvertButton}
          >
            <Icon name="eye" color={"#fff"} />
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              İlanı Görüntüle
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contain: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "100%",
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
    marginVertical: 4,
  },
  Text: {
    color: "#333",
    fontSize: 11,
    fontWeight: "600",
  },
  header: {
    fontSize: 12,
    fontWeight: "300",
  },
  body: {
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },
  imageArea: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  callButton: {
    width: "45%",
    padding: 6,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  seeAdvertButton: {
    backgroundColor: "#000000",
    width: "45%",
    padding: 6,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  textArea: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

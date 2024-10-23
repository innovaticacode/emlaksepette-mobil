import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeAlert from "react-native-awesome-alerts";
import Icon from "react-native-vector-icons/FontAwesome5";
import FirstHome from "../FirstHome";

import IconApartment from "react-native-vector-icons/MaterialIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import { Dimensions } from "react-native";
import IconInfo from "react-native-vector-icons/Feather";
import SuccessForRent from "./SuccessForRent";
import axios from "axios";
import { color } from "@rneui/base";
const { width, height } = Dimensions.get("window");
export default function RentOrderDetails({ route }) {
  const [user, setUser] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderDetailsHousing, setOrderDetailsHousing] = useState([]);
  const [cityTitle, setCityTitle] = useState({});
  const [districtTitle, setDistrictTitle] = useState({});
  const navigation = useNavigation();
  const [alertForReservation, setAlertForReservation] = useState(false);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const { id, display } = route.params;

  const getOrderDetails = async (id) => {
    console.log("Fetching order details for id:", id); // Log the id,
    console.log("aaaaaaaaaaa", user.access_token);

    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/reservation_detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        setOrderDetails(response.data || []);
        setOrderDetailsHousing(response.data.housing || []);
        /*    setCityTitle(response.data.housing.city.title || []);
        setDistrictTitle(response.data.housing.district.ilce_title || []); */
      }
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);

      throw error;
    }
  };
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);

    // Return formatted date as dd/mm/yyyy
    return date.toLocaleDateString("en-GB", options).replace(/\//g, "/");
  };
  const handleCancelButtonPress = () => {
    setAlertForReservation(true);
  };
  const handleNavigateToCancelReservation = () => {
    navigation.navigate("SuccessForRent", {
      message: "Reservasyon iptaliniz başarılı ile gönderildi.",
      primaryButtonText: "Reservasyon Yap",
      secondaryButtonText: "Ana Sayfa",
      icon: "check-circle", // İkonu belirt
      onContinue: () => navigation.navigate("HomePage"),
      onGoHome: () => navigation.navigate("HomePage"),
    });
  };
  const handleRecreateReservation = () => {
    navigation.navigate("HomePage");
  };
  useEffect(() => {
    console.log("RentOrderDetails mounted with id:", id);

    if (user?.access_token) {
      getOrderDetails(id);
    }
  }, [user, id]);
  /*   const handleStatus = () => {
    // Default values
    let backgroundColor = "gray"; // Default color
    let text = "Loading..."; // Default text
    if (orderDetails && orderDetails.status !== undefined) {
      switch (orderDetails.status) {
        case 0:
          return { backgroundColor: "#FFCE86", text: "Onay Bekliyor..." };
        case 1:
          return { backgroundColor: "#3E9D36", text: "Onaylandı" };
        case 2:
          return { backgroundColor: "white", text: "İptal Edildi" };
        case 3:
          return { backgroundColor: "#EA2B2E", text: "Reddedildi" };
        default: // Add a default case
          return { backgroundColor: "gray", text: "Yükleniyor" };
      }
    }
    return { backgroundColor, text };
  }; */
  const handleStatusIcon = () => {
    if (orderDetails && orderDetails.status !== undefined) {
      switch (orderDetails.status) {
        case 0:
          return (
            <View style={[styles.status, { backgroundColor: "#FFCE86" }]}>
              <Icon3
                name="clock-outline" // Corrected to string
                size={20}
                color="#764A0B"
                style={{ marginRight: 5 }}
              />
              <Text
                style={{ color: "#764A0B", fontSize: 15, fontWeight: "500" }}
              >
                Onay Bekliyor...
              </Text>
              {/* Optional text for context */}
            </View>
          );
        case 1:
          return (
            <View style={[styles.status, { backgroundColor: "#3E9D36" }]}>
              <Icon2
                name="check-circle-outline" // Corrected to string
                size={20}
                color="#fff"
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 2,
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                Onaylandı
              </Text>
              {/* Optional text for context */}
            </View>
          ); // Example icon for "Onaylandı"
        case 2:
          return (
            <View
              style={[
                styles.status,
                {
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#EA2B2E",
                },
              ]}
            >
              <Icon2
                name="cancel" // Corrected to string
                size={20}
                color="#EA2B2E"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.statusText}>İptal Edildi</Text>
              {/* Optional text for context */}
            </View>
          );
        case 3:
          return (
            <View style={[styles.status, { backgroundColor: "#EA2B2E" }]}>
              <Icon2
                name="block"
                size={20}
                color="#fff"
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 2,
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                Reddedildi
              </Text>
              {/* Optional text for context */}
            </View>
          );
        default:
          return (
            <Icon2
              name={question - circle}
              size={20}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          ); // Default icon for unknown status
      }
    }
    return <Icon name="spinner" size={20} color="#fff" />; // Default icon for loading
  };

  const OrderComponent = ({ labels, values }) => {
    return (
      <View style={styles.secondContainer}>
        {labels.map((label, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.constantLeft}>{label}</Text>
            <Text
              style={[
                styles.datasRight,
                label === "Adres" ? styles.longText : null,
              ]}
            >
              {values[index]}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const handleButtonStatus = () => {
    // Default values
    let backgroundColor2 = "gray"; // Default color
    let text2 = "Loading..."; // Default text
    let onPress = () => {};
    if (orderDetails && orderDetails.status !== undefined) {
      switch (orderDetails.status) {
        case 0:
        case 1:
          return {
            backgroundColor2: "#EA2B2E",
            text2: "Rezervasyonu İptal Et ",
            onPress: handleCancelButtonPress,
          };
        case 2:
        case 3:
          return {
            backgroundColor2: "#3E9D36",
            text2: "Tekrar Rezervasyon Oluştur",
            onPress: handleRecreateReservation,
          };
        default: // Add a default case
          return { backgroundColor2, text2, onPress };
      }
    }
    return { backgroundColor2, text2, onPress };
  };
  /*   const { backgroundColor, text } = handleStatus();
   */ const { backgroundColor2, text2, onPress } = handleButtonStatus();

  console.log(orderDetails.status);
  console.log(orderDetails.id);
  function capitalizeFirstLetter(str) {
    if (!str) return ""; // Return an empty string if str is undefined or null

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const formattedCityName = capitalizeFirstLetter(
    orderDetailsHousing.city?.title
  );
  const formattedDistrictName = capitalizeFirstLetter(
    orderDetailsHousing?.district?.ilce_title
  );
  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the time difference
    const timeDifference = end.getTime() - start.getTime();

    // Convert time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  return (
    <ScrollView style={styles.container}>
      <View>{handleStatusIcon()}</View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{orderDetailsHousing?.title}</Text>
        <View style={styles.firstContainer}>
          <View style={styles.image}></View>
          <View style={styles.nameDetails}>
            <View style={styles.infoContainer}>
              <View style={styles.oneLineSentence}>
                <Text>
                  <Text style={{ fontWeight: "600" }}>
                    {orderDetails?.housing_id}
                  </Text>{" "}
                  No'lu Konut
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="map-marker-alt"
                  size={17}
                  color="#EA2B2E"
                  style={{ paddingRight: 7 }}
                />
                <Text
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {formattedCityName} / {formattedDistrictName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  fontWeight: "600",
                }}
              >
                <Icon
                  name="wallet"
                  size={15}
                  color="#EA2B2E"
                  style={{ paddingRight: 7 }}
                />
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {orderDetails?.price} ₺{" "}
                  <Text style={{ fontWeight: "500", opacity: 0.6 }}>
                    /{" "}
                    {calculateDaysDifference(
                      orderDetails?.check_in_date,
                      orderDetails?.check_out_date
                    )}{" "}
                    Gece
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.titleStyle}>Rezervasyon Detayları</Text>
        <OrderComponent
          labels={[
            "Rezervasyon Tarihi",
            "Giriş Tarihi",
            "Çıkış Tarihi",
            "Kişi Sayısı",
            "Referans Kodu",
            "Kapıda Ödenecek Tutar",
            "Gecelik",
          ]}
          values={[
            formatDate(orderDetails?.created_at),
            formatDate(orderDetails?.check_in_date),
            formatDate(orderDetails?.check_out_date),
            orderDetails?.person_count,
            orderDetails?.reference_id,
            orderDetails?.down_payment,
            orderDetails?.price,
          ]}
        />

        <View style={styles.divider}></View>
        <Text style={styles.titleStyle}>Acente İle İletişim Bilgileri</Text>
        <OrderComponent
          labels={["Acente Adı", "Telefon Numarası", "E-posta"]}
          values={[
            orderDetails?.owner?.name,
            orderDetails?.owner?.phone,
            orderDetails?.owner?.email,
          ]}
        />
        <View style={styles.divider}></View>
        <Text style={styles.titleStyle}>Satın Alan Kişinin Bilgileri</Text>
        <OrderComponent
          labels={[
            "TC Kimlik",
            "Ad Soyad",
            "Telefon Numarası",
            "E-posta",
            "Referans Kodu",
            "Adres",
          ]}
          values={[
            orderDetails?.tc,
            orderDetails?.full_name,
            orderDetails?.phone,
            orderDetails?.email,
            orderDetails?.reference_id,

            orderDetails?.address,
          ]}
        />
        <View style={styles.divider}></View>
        <View style={styles.receipt}>
          <TouchableOpacity>
            <View style={styles.iconInfo}>
              <Icon2
                name="receipt"
                size={20}
                color="#EA2B2E"
                style={{ paddingRight: 3 }}
              />
              <View>
                <Text style={styles.receiptTitle}>Faturamı Görüntüle </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.iconInfo}>
          <IconInfo
            name="info"
            size={20}
            color="#EA2B2E"
            style={{ paddingRight: 3 }}
          />
          <View>
            <Text style={styles.infoTitle}> İade Durumu </Text>
            <Text style={styles.infoContent}>
              Lorem ipsum dolo rem ipsum dolorem ipsum dolo Lorem ipsum dolo rem
              ipsum dolorem.. asdkk askdkmasd lkma dlkm asdklaskd jf fdj kfd
              fdfgkdklgf lgkl fdlöglö fdlö lpö
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: backgroundColor2 }]}
          onPress={onPress}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            {text2}
          </Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={alertForReservation}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={"Rezervasyon İptali"}
        messageStyle={{ textAlign: "center" }}
        message={`Rezervasyonunuz iptal etmek istiyor musunuz?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Hayır"
        confirmText="Evet"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setAlertForReservation(false);
        }}
        onConfirmPressed={() => {
          handleNavigateToCancelReservation();
          setAlertForReservation(false);
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  status: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  firstContainer: { flexDirection: "row", padding: 10, paddingVertical: 20 },
  name: {
    flexDirection: "flex-start",
    padding: 10,
    fontSize: 20,
    fontWeight: "600",
  },
  image: {
    flex: 3,
    borderRadius: 9,
    padding: 10,
  },
  nameDetails: {
    flex: 5,
    paddingHorizontal: 10,
  },
  secondContainer: {
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 15,
  },
  constantLeft: {
    color: "#919191",
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
  },
  datasRight: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    flexShrink: 1,
  },
  longText: {
    flexWrap: "wrap",
    width: "70%",
    paddingRight: 0,
    textAlign: "right",
  },
  thirdsContainer: {
    flexDirection: "row",
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#777777",
    opacity: 0.2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  oneLineSentence: {
    fontSize: 15,
  },
  thirdContainer: { padding: 10, gap: 10 },
  btn: {
    width: "100%",
    padding: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  infoContainer: { gap: 8, paddingHorizontal: 5 },
  titleStyle: { fontSize: 16, fontWeight: "400", paddingHorizontal: 5 },
  iconInfo: { flexDirection: "row", paddingHorizontal: 8 },
  infoTitle: { fontSize: 15, fontWeight: "400", color: "#292A2E" },
  infoContent: {
    fontSize: 12,
    color: "#404040",
    paddingHorizontal: 4,
    marginTop: 4,
    paddingVertical: 2,
  },
  receiptTitle: { fontSize: 15, fontWeight: "600", color: "#EA2B2E" },
  receipt: { marginVertical: 15 },
});

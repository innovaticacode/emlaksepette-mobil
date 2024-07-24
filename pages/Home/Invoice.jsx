import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
import { useRoute } from "@react-navigation/native";
import { Platform } from "react-native";

import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { ActivityIndicator } from "react-native-paper";

export default function Invoice() {
  const [user, setUser] = useState({});
  const route = useRoute();
  const { OrderId } = route.params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/institutional/invoice/${OrderId}`,

          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);
  const date = new Date(data?.invoice?.created_at);
  // Ay isimleri dizisi
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  // Günü, ay ismini ve yılı al
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  const [parsedData, setparsedData] = useState("");
  useEffect(() => {
    if (
      data?.invoice?.order?.cart &&
      typeof data?.invoice?.order?.cart === "string" &&
      user.access_token
    ) {
      try {
        // JSON verisini ayrıştırıyoruz
        const cartObject = JSON.parse(data?.invoice?.order?.cart);
        // cartObject ve item.image'in var olup olmadığını kontrol ediyoruz
        if (cartObject && cartObject.item && cartObject.item.image) {
          setparsedData(cartObject);
        } else {
          console.error("Cart nesnesi veya item.image bulunamadı");
        }
      } catch (error) {
        console.error("JSON parse edilemedi:", error);
      }
    }
  }, [data, user.access_token]);

  const createPDF = async () => {
    try {
      // Yeni PDF dokümanı oluştur
      const pdfPath = `${RNFS.DocumentDirectoryPath}/invoice.pdf`;
      const page1 = PDFDocument.Page.create()
        .setMediaBox(200, 200)
        .drawText("Invoice", {
          x: 5,
          y: 170,
          fontSize: 20,
          color: "#007386",
        })
        .drawText("Date: 2023-05-22", {
          x: 5,
          y: 150,
          fontSize: 12,
          color: "#000",
        });

      const pdfDoc = PDFDocument.create(pdfPath).addPages(page1);

      await pdfDoc.write(); // PDF dosyasını kaydet

      return pdfPath;
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = async () => {
    const pdfPath = await createPDF();

    if (pdfPath) {
      const shareOptions = {
        title: "Download Invoice",
        url: `file://${pdfPath}`,
        type: "application/pdf",
      };

      Share.open(shareOptions)
        .then((res) => {})
        .catch((err) => {
          err && console.log(err);
        });
    } else {
      Alert.alert("Error", "Failed to create PDF.");
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#333" />
        </View>
      ) : (
        <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{}}>
            <View style={{ backgroundColor: "#F4F4F4", padding: 20 }}>
              <View style={{ width: "100%" }}>
                <View style={{ width: "50%", height: 50 }}>
                  <ImageBackground
                    source={require("../../components/emlaksepettelogo.png")}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={{ marginTop: 5 }}>Cevizli, Çanakkale Cad.</Text>
                <Text>No:103A, 34865 Kartal/İstanbul</Text>
                <Text style={{ marginTop: 5 }}>
                  Müşteri Hizmetleri: 444 3 284
                </Text>
                <Text style={{ marginTop: 5 }}>
                  E-posta: info@test.emlaksepette.com
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: "#fff", padding: 20 }}>
              <Text style={{ fontWeight: "700" }}>Fatura Bilgileri</Text>
              <Text style={{ marginTop: 5 }}>
                Fatura No:{" "}
                <Text style={{ fontWeight: "700" }}>
                  {data?.invoice?.invoice_number}{" "}
                </Text>{" "}
              </Text>
              <Text style={{ marginTop: 5 }}>
                Fatura Tarihi:{" "}
                <Text style={{ fontWeight: "700" }}> {formattedDate} </Text>{" "}
              </Text>
              <Text style={{ marginTop: 5 }}>
                İlan No:{" "}
                <Text style={{ fontWeight: "700" }}>
                  {data?.project
                    ? `1000${data.project.id}`
                    : data?.housing
                    ? `2000${data.housing.id}`
                    : "Değer bulunamadı"}
                </Text>
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ marginRight: 15 }}>
                  <View style={{ width: 100, height: 100 }}>
                    {parsedData.item && parsedData.item.image ? (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: parsedData.item.image }}
                      />
                    ) : (
                      <Text>Resim yüklenemedi</Text>
                    )}
                  </View>
                </View>
                <View>
                  {parsedData && parsedData.item ? (
                    <>
                      <Text style={{ fontWeight: "700" }}>
                        {parsedData.item.title}
                      </Text>
                    </>
                  ) : (
                    <Text>Veri yüklenemedi</Text>
                  )}
                  <Text>İlan bilgisi çekilcek</Text>
                  <Text>İlan bilgisi çekilcek</Text>
                  <Text>İlan bilgisi çekilcek</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "#F4F4F4", padding: 20 }}>
              <Text style={{ fontWeight: "700" }}>Alıcı Bilgileri</Text>
              <Text style={{ marginTop: 5, fontWeight: "700" }}>
                {data?.invoice?.order?.user?.name}{" "}
              </Text>
              <Text style={{ marginTop: 5, fontWeight: "700" }}>
                {data?.invoice?.order?.user?.email}
              </Text>
              <Text style={{ marginTop: 5, fontWeight: "700" }}>
                {data?.invoice?.order?.user?.phone}{" "}
              </Text>
            </View>
            <View style={{ backgroundColor: "#fff", padding: 20 }}>
              <Text style={{ fontWeight: "700" }}>Ödeme Bilgileri</Text>
              <Text style={{ marginTop: 5 }}>
                {data?.invoice?.order?.bank?.receipent_full_name} -{" "}
                {data?.invoice?.order?.bank?.iban}
              </Text>
              <Text style={{ marginTop: 5 }}>
                <Text style={{}}>
                  Kapora:{" "}
                  <Text style={{ fontWeight: "700" }}>
                    {data?.invoice?.order?.amount}
                  </Text>{" "}
                </Text>
              </Text>
              <Text style={{ marginTop: 5 }}>
                Toplam Fiyat:{" "}
                <Text style={{ fontWeight: "700" }}>
                  {addDotEveryThreeDigits(parsedData?.item?.price)} ₺
                </Text>{" "}
              </Text>
            </View>
            <View style={{ backgroundColor: "#F4F4F4", padding: 20 }}>
              <Text style={{ fontWeight: "700" }}>Satıcı Bilgileri</Text>
              <Text style={{ marginTop: 5 }}>
                <Text style={{}}>{data?.invoice?.order?.store?.name}</Text>
              </Text>
              <Text style={{ marginTop: 5 }}>
                {data?.invoice?.order?.store?.email}
              </Text>
              {/* <Text>Vergi No: {data?.invoice?.order?.store?.taxNumber}</Text> */}
              <Text style={{ marginTop: 5 }}>
                İletişim No: {data?.invoice?.order?.store?.phone}
              </Text>
            </View>
            <View style={{ backgroundColor: "#fff", padding: 20 }}></View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    paddingVertical: 10,
    width: "100%",
    marginVertical: 7,
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    paddingRight: 10,
    paddingLeft: 10,
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
});

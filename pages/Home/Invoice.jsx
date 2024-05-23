import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { PDFDocument, Page } from "react-native-pdf-lib";
import RNFS from "react-native-fs";
import Share from "react-native-share";

export default function Invoice() {
  const [user, setUser] = useState({});
  const route = useRoute();
  const { OrderId } = route.params;

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(


          `https://test.emlaksepette.com/api/institutional/invoice/${OrderId}`,

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
        .then((res) => {
          console.log("PDF shared:", res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    } else {
      Alert.alert("Error", "Failed to create PDF.");
    }
  };

  return (
    <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          backgroundColor: "#0879FB",
          position: "relative",
          height: 170,
        }}
      >
        <Text
          style={{
            color: "#3B82FC",
            textAlign: "center",
            fontSize: 80,
            justifyContent: "center",
            display: "flex",

            position: "absolute",
            right: 40,
            top: 20,
          }}
        >
          {" "}
          FATURA{" "}
        </Text>
        <View style={{ padding: 25 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: "40%" }}>
              <View style={{ width: 100, height: 100 }}>
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
            <View width={{ width: "60%" }}>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                Cevizli, Çanakkale Cd. No:103A, 34865
              </Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                Kartal/İstanbul
              </Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                Müşteri Hizmetleri : 444 3 284
              </Text>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                Email: info@emlaksepette.com
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#F5F6FA",
            width: 230,
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 10,
            marginTop: -15,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "700" }}>Alıcı Bilgisi:</Text>
          <Text> {data?.invoice?.order?.user?.name} </Text>
          <Text>{data?.invoice?.order?.user?.email}</Text>
          <Text>İş: {data?.invoice?.order?.user?.phone}</Text>
        </View>
        <View style={{ gap: 3 }}>
          <Text>Fatura No:</Text>
          <Text style={{ fontWeight: "700" }}>
            {" "}
            {data?.invoice?.invoice_number}{" "}
          </Text>
          <Text>Tarih</Text>
          <Text style={{ fontWeight: "700" }}> {formattedDate} </Text>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View
            style={{
              backgroundColor: "#0879FB",
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 20,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Text style={{ color: "white", width: "25%" }}>Kapak Görseli</Text>
            <Text style={{ color: "white", width: "75%" }}>İlan Başlığı</Text>
          </View>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View
            style={{
              backgroundColor: "#E7E7E7",
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 20,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: 100, height: 100 }}>
              {parsedData.item && parsedData.item.image ? (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: parsedData.item.image }}
                />
              ) : (
                <Text>Resim yüklenemedi</Text> // Eğer item veya image yoksa bir mesaj göster
              )}
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                width: "75%",
              }}
            >
              {parsedData && parsedData.item ? (
                <>
                  <Text>{parsedData.item.title}</Text>
                  {/* Title'ı yazdırıyoruz */}
                </>
              ) : (
                <Text>Veri yüklenemedi</Text> // Eğer item veya image yoksa bir mesaj göster
              )}
              <Text style={{ fontWeight: "700" }}>İSTANBUL / KARTAL</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{}}>
        <View style={[styles.card, { paddingLeft: 10, paddingRight: 10 }]}>
          <Text style={{ fontWeight: "700" }}>Ödeme Bilgileri:</Text>
          <Text>
            {data?.invoice?.order?.bank?.receipent_full_name} -{" "}
            {data?.invoice?.order?.bank?.iban}
          </Text>
          <Text>Kapora: {data?.invoice?.order?.amount}</Text>
        </View>
        <View
          style={[
            styles.card,
            {
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            },
          ]}
        >
          <View>
            <Text style={{ fontWeight: "700" }}> Toplam Fiyat </Text>
            <Text> {addDotEveryThreeDigits(parsedData?.item?.price)} ₺</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "700" }}> Kapora </Text>
            <Text> {data?.invoice?.order?.amount} ₺ </Text>
          </View>
        </View>
      </View>
      <View style={{}}>
        <View style={[styles.card, { paddingLeft: 10, paddingRight: 10 }]}>
          <Text style={{ fontWeight: "700" }}>Satıcı Bilgileri:</Text>
          <Text>{data?.invoice?.order?.store?.name}</Text>
          <Text>{data?.invoice?.order?.store?.email}</Text>
          <Text>Vergi No: {data?.invoice?.order?.store?.taxNumber}</Text>
          <Text>İletişim No: {data?.invoice?.order?.store?.phone}</Text>
          <Button title="Download Invoice" onPress={downloadPDF} />
        </View>
      </View>
    </ScrollView>
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

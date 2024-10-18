import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
import { useRoute } from "@react-navigation/native";
import { Platform } from "react-native";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { apiUrl } from "../../components/methods/apiRequest";

export default function Invoice() {
  const [user, setUser] = useState({});
  const route = useRoute();
  const { OrderId } = route.params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const [data, setData] = useState([]);
  console.log(OrderId);
  const fetchData = async () => {
    setLoading(true);
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `${apiUrl}institutional/invoice/${OrderId}`,
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
  console.log(OrderId);
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            <View style={styles.cardContainer}>
              <View style={{ paddingHorizontal: 20 }}>
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
                <>
                  <View style={{ gap: 1 }}>
                    <Text style={styles.textTitle}>
                      Cevizli, Çanakkale Cad.
                    </Text>
                    <Text style={styles.textTitle}>
                      No:103A, 34865 Kartal/İstanbul
                    </Text>
                  </View>
                  <View style={{ gap: 6, marginTop: 6 }}>
                    <Text style={styles.textTitle}>
                      Müşteri Hizmetleri: 444 3 284
                    </Text>
                    <Text style={styles.textTitle}>
                      E-posta: info@test.emlaksepette.com
                    </Text>
                  </View>
                </>
              </View>

              <View style={styles.seperator} />

              <View
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 20,
                  gap: 8,
                }}
              >
                <Text style={styles.textBold}>Fatura Bilgileri</Text>
                <Text style={styles.textTitle}>
                  Fatura No: {""}
                  <Text style={[styles.textSemiBold, { fontSize: 12 }]}>
                    {data?.invoice?.invoice_number}{" "}
                  </Text>{" "}
                </Text>
                <Text style={styles.textTitle}>
                  Fatura Tarihi:{" "}
                  <Text style={[styles.textSemiBold, { fontSize: 12 }]}>
                    {formattedDate}{" "}
                  </Text>{" "}
                </Text>
                <Text style={styles.textTitle}>
                  İlan No:{" "}
                  <Text style={[styles.textSemiBold, { fontSize: 12 }]}>
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
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 4,
                          }}
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
                        <View style={{ width: "100%", gap: 2 }}>
                          <Text style={styles.textTitle}>
                            {parsedData.item.title}
                          </Text>
                          <Text style={styles.textTitle}>
                            {data?.project?.city?.title}
                          </Text>
                          <Text style={styles.textTitle}>
                            {data?.project?.housing_type.title}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <Text>Veri yüklenemedi</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.seperator} />

              <View style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}>
                <Text style={{ fontWeight: "700", fontSize: 14 }}>
                  Ödeme Bilgileri
                </Text>
                <Text style={{ marginTop: 5 }}>
                  {`${data?.invoice?.order?.bank?.receipent_full_name} - ${data?.invoice?.order?.bank?.iban}`}
                </Text>
                <Text style={{ marginTop: 5 }}>
                  <Text style={styles.textSemiBold}>
                    {`Kapora: ${addDotEveryThreeDigits(
                      data?.invoice?.order?.amount
                    )} ₺`}
                  </Text>
                </Text>
                <Text style={styles.textSemiBold}>
                  {`Toplam Fiyat: ${addDotEveryThreeDigits(
                    parsedData?.item?.price
                  )} ₺`}
                </Text>
              </View>

              <View style={styles.seperator} />
              <View style={{ paddingHorizontal: 20, gap: 8 }}>
                <Text style={styles.textBold}>Alıcı Bilgileri</Text>
                <Text style={styles.textTitle}>
                  {data?.invoice?.order?.user?.name}
                </Text>
                <Text style={styles.textTitle}>
                  {data?.invoice?.order?.user?.email}
                </Text>
                <Text style={styles.textTitle}>
                  {data?.invoice?.order?.user?.phone}
                </Text>
              </View>

              <View style={styles.seperator} />

              <View style={{ paddingHorizontal: 20, gap: 8 }}>
                <Text style={styles.textSemiBold}>Satıcı Bilgileri</Text>
                <Text style={{ marginTop: 5 }}>
                  <Text style={styles.textTitle}>
                    {data?.invoice?.order?.store?.name}
                  </Text>
                </Text>
                <Text style={styles.textTitle}>
                  {data?.invoice?.order?.store?.email}
                </Text>
                <Text style={styles.textTitle}>
                  İletişim No: {data?.invoice?.order?.store?.phone}
                </Text>
                <>
                  <Text style={styles.textTitle}>
                    {`Vergi No: ${data?.invoice?.order?.store?.taxNumber}`}
                  </Text>
                </>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={styles.downloadBtn} onPress={() => null}>
                <AntDesign
                  name="download"
                  size={18}
                  color="#EA2B2E"
                  style={{ paddingRight: 8 }}
                />
                <Text style={{ color: "#EA2B2E", fontSize: 16 }}>
                  PDF Olarak İndir
                </Text>
              </TouchableOpacity>
            </View>
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
  seperator: {
    width: "94%",
    height: 1,
    backgroundColor: "#77777738",
    marginVertical: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#FFF",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 14,
  },
  textTitle: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14,
  },
  textSemiBold: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 14,
    lineHeight: 18,
  },
  textBold: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 14,
    lineHeight: 17,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    flex: 1,
  },
  downloadBtn: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EA2B2E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

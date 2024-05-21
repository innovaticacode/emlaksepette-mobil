import { View, Text, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

export default function Invoice() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          backgroundColor: "#0879FB",
          position: "relative",
          height: "20%",
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
            <View style={{ width: "40%", backgroundColor: "red" }}>
              <Text>logo</Text>
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
            backgroundColor: "##F5F6FA",
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
          <Text>Hayrına Ev234</Text>
          <Text>emlaksepettetest@gmail.com</Text>
          <Text>İş: 232323</Text>
        </View>
        <View style={{ gap: 3 }}>
          <Text>Fatura No:</Text>
          <Text style={{ fontWeight: "700" }}>FTR-171682839823</Text>
          <Text>Tarih</Text>
          <Text style={{ fontWeight: "700" }}>2024-05-21 09:04:43</Text>
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
            <View style={{ width: "25%" }}>
              <Text>Image</Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                width: "75%",
              }}
            >
              <Text>
                MASTER REALTOR'DEN YAKUTLAR RESİDENCE ' DE YATIRIMLIK 3.5 +1
              </Text>
              <Text style={{ fontWeight: "700" }}>İSTANBUL / KARTAL</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{}}>
        <View style={[styles.card, { paddingLeft: 10, paddingRight: 10 }]}>
          <Text style={{ fontWeight: "700" }}>Ödeme Bilgileri:</Text>
          <Text>
            Master Girişim bilgileri Teknolojileri Gayrimenkul Yatırım ve
            Pazarlama AŞ - TR16 0001 0020 9997 7967 8350 01
          </Text>
          <Text>Kapora: 408,000,00 ₺</Text>
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
            <Text> 10,200,000,00 ₺ </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "700" }}> Kapora </Text>
            <Text> 408,000,00 ₺ </Text>
          </View>
        </View>
      </View>
      <View style={{}}>
        <View style={[styles.card, { paddingLeft: 10, paddingRight: 10 }]}>
          <Text style={{ fontWeight: "700" }}>Satıcı Bilgileri:</Text>
          <Text>Master Realtor</Text>
          <Text>masterrealtorturkiye@gmail.com</Text>
          <Text>Vergi No: 39291212</Text>
          <Text>İletişim No: 4423562</Text>
        </View>
      </View>
    </View>
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

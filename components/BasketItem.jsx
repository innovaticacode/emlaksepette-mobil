import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
export default function BasketItem() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          height: 300,
          top: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{ width: "50%", height: 130, alignItems: "center", top: 10 }}
        >
          <Image
            source={require("../images/home.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: 130 }}
          />
        </View>

        <View
          style={{
            backgroundColor: "grey",
            width: "100%",
            height: 0.4,
            top: 18,
          }}
        ></View>
        <View
          style={{
            alignItems: "center",
            width: 300,
            height: 80,
            top: 25,
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>İlan No:0000000</Text>
          <Text style={{ fontSize: 15 }}>
            MASTER REALTOR'DEN KURUÇEŞME HATİPKÖYDE 2+1 0 DAİRE
          </Text>
          <View
            style={{
              backgroundColor: "grey",
              width: 400,
              height: 0.4,
              top: 18,
            }}
          ></View>
          <Text
            style={{
              fontSize: 17,
              top: 15,
              fontWeight: "bold",
              color: "#3A811D",
            }}
          >
            2.400.000₺
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 300,
            top: 150,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              height: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Icon name="star" size={20} />
              </View>
              <View>
                <Text>Sepet Özeti</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: 0.4,
                bottom: 5,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                height: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>İlan Fiyatı</Text>
              </View>
              <View>
                <Text>2.500.000 TL</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>Toplam Fiyat</Text>
              </View>
              <View>
                <Text>2.500.000 TL</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>Toplam Fiyatın %2 Kaporası</Text>
              </View>
              <View>
                <Text>53.000 TL</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 120,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <TextInput
                placeholder="Kupon Kodu"
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 0.3,
                  height: 50,
                  padding: 5,
                  width: "75%",
                  fontSize: 20,
                }}
              />
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#274ABB",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                >
                  Uygula
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "#274ABB",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                >
                  53.000₺ Kapora Öde
                </Text>
              </TouchableOpacity>
            </View>
            <View></View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

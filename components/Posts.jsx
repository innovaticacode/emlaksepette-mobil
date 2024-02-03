import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { React } from "react";
import { useNavigation } from "@react-navigation/native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Bookmark from "react-native-vector-icons/Feather";

export default function Posts() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details")}>
      <View
        style={{
          width: "100%",
          top: 30,
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            height: 120,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Image
              source={require("../images/home.jpg")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View>
            <View style={{ width: 150, overflow: "hidden" }}>
              <Text>Master Realtor'den Kuruçeşme Hatip Köyde 2+1 daire</Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#264ABB",
                padding: 6,
                width: 130,
                alignItems: "center",
                top: 22,
              }}
            >
              <Text
                style={{
                  color: "white",
                  width: "100%",
                  textAlign: "center",
                  padding: 6,
                  backgroundColor: "#274abb",
                  fontWeight: "bold",
                }}
              >
                Sepete Ekle
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 43 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E8E8E8",
                  height: 36,
                  width: 36,
                  padding: 6,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                <Bookmark name="bookmark" style={{ fontSize: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E8E8E8",
                  height: 35,
                  width: 36,
                  padding: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                <EntypoIcon name="heart-outlined" style={{ fontSize: 20 }} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ color: "#27ABB", fontWeight: "bold" }}>
                2.550.000
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#E8E8E8",
            height: 40,
            bottom: 20,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 200,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <EntypoIcon
                name="dot-single"
                style={{
                  color: "red",
                  top: -2,
                  fontSize: 20,
                }}
              />
              <Text>60 m2</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <EntypoIcon
                name="dot-single"
                style={{
                  color: "red",
                  top: -2,
                  fontSize: 20,
                }}
              />
              <Text>1+1</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <EntypoIcon
                name="dot-single"
                style={{
                  color: "red",
                  top: -2,
                  fontSize: 20,
                }}
              />
              <Text>60 m2</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              paddingRight: 10,
            }}
          >
            <Text>KOCAELİ/İZMİT</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

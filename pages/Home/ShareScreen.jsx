import { View, Text, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
export default function ShareScreen({navigation}) {
  return (
    <View style={{ alignItems: "center", gap: 50 }}>
      <View
        style={{
          width: "90%",
          height: 310,
          backgroundColor: "#FEF5E0",
          top: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <View style={{ width: "100%", alignItems: "center", top: 4 }}>
          <Image
            source={require("./proje.png")}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", bottom: 10 }}>
            Proje İlanı Ekle
          </Text>
        </View>
        <View style={{ width: 250, bottom: 20, left: 10 }}>
          <Text style={{ fontSize: 18 }}>
            Kendi proje ilanınızı ekleyin ve hayalinizdeki projenizi
            paylaşın.Binlerce kişiye ulaşın!
          </Text>
        </View>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Proje')}
          style={{
            width: 250,
            height: 55,
            backgroundColor: "#F5A941",
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Icon
              name="pluscircleo"
              size={30}
              style={{ left: 15, bottom: 2, color: "red" }}
            />
          </View>
          <View
            style={{
              height: 30,
              width: 0.4,
              backgroundColor: "white",
              top: 10,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: "white",
                fontWeight: "bold",
                bottom: 3,
                right: 10,
              }}
            >
              Proje İlanı Ekle
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "90%",
          height: 310,
          backgroundColor: "#FEF5E0",
          top: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <View style={{ width: "100%", alignItems: "center", top: 4 }}>
          <Image
            source={require("./emlak.png")}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", bottom: 10 }}>
            Emlak İlanı Ekle
          </Text>
        </View>
        <View style={{ width: 250, bottom: 20, left: 10 }}>
          <Text style={{ fontSize: 18 }}>
            Kendi emlak ilanınızı ekleyin ve ev, daire veya arsa satışınızı
            hızlandırın. Hemen ilan verin!
          </Text>
        </View>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Emlak')}
          style={{
            width: 250,
            height: 55,
            backgroundColor: "#F5A941",
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Icon
              name="pluscircleo"
              size={30}
              style={{ left: 15, bottom: 2, color: "red" }}
            />
          </View>
          <View
            style={{
              height: 30,
              width: 0.4,
              backgroundColor: "white",
              top: 10,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: "white",
                fontWeight: "bold",
                bottom: 3,
                right: 10,
              }}
            >
              Emlak İlan Ekle
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

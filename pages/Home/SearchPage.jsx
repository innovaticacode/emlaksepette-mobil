import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import SearchItem from "../../components/SearchItem";
import { useNavigation } from "@react-navigation/native";
export default function SearchPage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HomePage");
              }}
            >
              <Icon name="arrowleft" size={23} color={"#333"} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%" }}>
            <TextInput
              style={styles.Input}
              placeholder="Emlak, Proje veya Mağaza ara"
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 11,
        }}
      >
        <Text style={{ color: "#333", fontSize: 14, fontWeight: "500" }}>
          Geçmiş Aramalar
        </Text>
        <TouchableOpacity style={{}}>
          <Text style={{ color: "#EA2C2E", fontSize: 12, fontWeight: "500" }}>
            Tümünü Temizle
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <View
          style={[
            styles.card,
            { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0 },
          ]}
        >
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <View style={{ padding: 15 }}>
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#E70A12",
                  fontSize: 14,
                }}
              >
                Daha Fazla Göster
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  Input: {
    backgroundColor: "#EDEFF7",
    padding: 8,
    width: "100%",
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    paddingTop: width < 400 ? 30 : 70,
    paddingHorizontal: 15,
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
  },
});

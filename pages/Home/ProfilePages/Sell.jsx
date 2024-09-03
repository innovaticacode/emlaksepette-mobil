import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import Icon from "react-native-vector-icons/Ionicons";
import Order from "./profileComponents/Order";
import { getValueFor } from "../../../components/methods/user";
import { Platform } from "react-native";
import axios from "axios";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator } from "react-native-paper";
export default function Sell() {
  const [search, setSearch] = useState("");
  const [Tabs, setTabs] = useState(0);
  const updateSearch = (search) => {
    setSearch(search);
  };
  const route = useRoute();
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const fetchData = async () => {
    setloading(true);
    try {
      if (user?.access_token) {
        const response = await axios.get(
          "https://emlaksepette.com/api/institutional/get_solds",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setproducts(response.data.solds);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  const nav = useNavigation();
  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator color="#333" />
        </View>
      ) : products.length == 0 ? (
        <>
          <View
            style={{
              height: "90%",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <View
              style={[
                style.card,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <Icon2 name="basket-plus" size={50} color={"#EA2A28"} />
            </View>
            <View>
              <Text style={{ color: "grey", fontSize: 16, fontWeight: "600" }}>
                Satılan İlan Bulunmamaktadır
              </Text>
              <Text></Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2A28",
                  width: "90%",
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setloading(true);
                  setTimeout(() => {
                    nav.goBack();
                    setloading(false);
                  }, 700);
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Geri
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={style.container} onTouchStart={() => Keyboard.dismiss()}>
          <View style={style.Navbar}>
            <View style={style.SearchInput}>
              <SearchBar
                placeholder="Ara..."
                onChangeText={updateSearch}
                value={search}
                containerStyle={{
                  backgroundColor: "transparent",
                  width: "100%",
                  borderTopColor: "white",
                  borderBottomColor: "white",
                  height: 30,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                searchIcon={{ size: 20 }}
                inputContainerStyle={{
                  backgroundColor: "#e5e5e5",
                  borderRadius: 7,
                  height: "100%",
                  marginTop: 0,
                }}
                inputStyle={{ fontSize: 15 }}
                showCancel="false"
                placeholderTextColor={"grey"}
              />
            </View>
            <View style={style.ListIcon}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#e5e5e5",
                  padding: 5,
                  borderRadius: 6,
                }}
              >
                <View style={{}}>
                  <Icon name="swap-vertical" size={18} color={"#333"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <View style={style.orders}>
              {products.map((item, index) => (
                <Order item={item} />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Navbar: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFF",
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
  SearchInput: {
    flex: 1.7 / 2,
    padding: 5,
  },
  ListIcon: {
    flex: 0.3 / 2,

    borderBottomColor: "#e5e5e5",

    alignItems: "center",
    justifyContent: "center",
  },
  TabBar: {
    alignItems: "center",
    justifyContent: "center",
  },
  TabBarBtn: {
    backgroundColor: "red",

    borderRadius: 4,
  },
  orders: {
    width: "100%",
    padding: 5,
    gap: 15,
  },
});

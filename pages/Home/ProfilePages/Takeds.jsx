import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import Icon from "react-native-vector-icons/Ionicons";
import Order from "./profileComponents/Order";
import { getValueFor } from "../../../components/methods/user";
import { Platform } from "react-native";
import axios from "axios";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator } from "react-native-paper";
export default function Takeds() {
  const [search, setSearch] = useState("");
  const [Tabs, setTabs] = useState(0);
  const updateSearch = (search) => {
    setSearch(search);
  };
  const route = useRoute();

  const [products, setProducts] = useState([
    { id: 1, date: "2023-01-15" },
    { id: 2, date: "2023-03-10" },
    { id: 3, date: "2022-12-05" },
  ]);

  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  console.log(user);
  const [takeds, setTakeds] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        if (user.access_token) {
          const response = await axios.get(
            `https://private.emlaksepette.com/api/institutional/get_boughts`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setTakeds(response.data.boughts);
        }
      } catch (error) {
        console.error("eror", error);
      } finally {
        setloading(false);
      }
    };
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
      ) : takeds.length == 0 ? (
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
              <Text style={style.noCommentsText}>
                Siparişiniz bulunmamaktadır.
              </Text>
              <Text></Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={style.returnButton}
                onPress={() => {
                  setloading(true);
                  setTimeout(() => {
                    nav.navigate("HomePage");
                    setloading(false);
                  }, 700);
                }}
              >
                <Text style={style.returnButtonText}>İlanlara Göz At</Text>
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
              {takeds?.map((taked, i) => (
                <Order key={i} item={taked} />
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
  noCommentsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 8,
  },
  returnButton: {
    backgroundColor: "#EA2B2E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,

    borderRadius: 50,

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

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import Icon from "react-native-vector-icons/Ionicons";
import Order from "./profileComponents/Order";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator } from "react-native-paper";

export default function Sell() {
  const [search, setSearch] = useState("");
  const [Tabs, setTabs] = useState(0);
  const nav = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState({});

  const updateSearch = (search) => {
    console.log("Search Input: ", search);  // Arama girişini kontrol et
    setSearch(search);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      if (user?.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/institutional/get_solds",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setProducts(response.data.solds);
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

  useEffect(() => {
    console.log("Products: ", products); // Ürünlerin doğru şekilde geldiğini kontrol et
  }, [products]);

// Filtrelenmiş ürünleri hesaplamak için bir yardımcı fonksiyon
const filteredProducts = products.filter(product => {
  const parsedCart = product.cart ? JSON.parse(product.cart) : {};
  const title = parsedCart["item"]["title"] ? parsedCart["item"]["title"].toLowerCase() : "";
  const houseId = parsedCart["item"]["id"] ? parsedCart["item"]["id"].toString().toLowerCase() : "";

  return (
    title.includes(search.toLowerCase()) ||
    houseId.includes(search.toLowerCase())
  );
});


  console.log("Filtered Products: ", filteredProducts);  // Filtrelenmiş ürünleri kontrol et
  console.log(user.access_token)
  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator color="#333" />
        </View>
      ) : products.length == 0 ? (
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
              Sattığınız İlan Bulunmamaktadır.
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={style.returnButton}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  nav.goBack();
                  setLoading(false);
                }, 700);
              }}
            >
              <Text style={style.returnButtonText}>İlanlara Göz At</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={style.container}>
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
                <View>
                  <Icon name="swap-vertical" size={18} color={"#333"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={style.container}>
            <View style={style.orders}>
              {filteredProducts.length === 0 ? (
                <View style={style.noResultsContainer}>
                  <Icon2 name="emoticon-sad-outline" size={50} color="#EA2B2E" />
                  <Text style={style.noResultsText}>Arama sonucu bulunamadı.</Text>
                  <Text style={style.noResultsSubText}>Lütfen başka bir terim deneyin.</Text>
                </View>
              ) : (
                filteredProducts.map((item, index) => (
                  <Order item={item} key={index} />
                ))
              )}
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
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  noResultsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  noResultsSubText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
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
    marginTop: 8,
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
        shadowColor: "#e6e6e6",
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

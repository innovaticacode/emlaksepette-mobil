import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import Order from "./profileComponents/Order";

import { Platform } from "react-native";

import NoDataScreen from "../../../components/NoDataScreen";
import { RadioFilter } from "../../../components";
import { apiUrl } from "../../../components/methods/apiRequest";

export default function Sell() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setIndex] = useState(0);
  const [sortListModal, setSortListModal] = useState(false);
  const searchLower = search.toLowerCase();
  const nav = useNavigation();

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user?.access_token) {
          const response = await axios.get(apiUrl + "institutional/get_solds", {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          });
          setProducts(response.data.solds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const filterProducts = () => {
      const searchLower = search.toLowerCase();
      return products.filter((product) => {
        const parsedCart = product.cart ? JSON.parse(product.cart) : {};
        const title = parsedCart["item"]["title"]
          ? parsedCart["item"]["title"].toLowerCase()
          : "";
        const houseId = parsedCart["item"]["id"]
          ? parsedCart["item"]["id"].toString().toLowerCase()
          : "";

        return title.includes(searchLower) || houseId.includes(searchLower);
      });
    };

    const filtered = filterProducts();
    setFilteredProducts(filtered);
  }, [search, products]);

  // Fiyata göre (önce en düşük)
  const sortByPriceLowToHigh = () => {
    const sorted = [...products].sort((a, b) => {
      const amountA = parseFloat(a.amount); // amount değerini sayıya çevir
      const amountB = parseFloat(b.amount); // amount değerini sayıya çevir
      return amountA - amountB;
    });
    setFilteredProducts(sorted);
  };

  // Fiyata göre (önce en yüksek)
  const sortByPriceHighToLow = () => {
    const sorted = [...products].sort((a, b) => {
      const amountA = parseFloat(a.amount); // amount değerini sayıya çevir
      const amountB = parseFloat(b.amount); // amount değerini sayıya çevir
      return amountB - amountA;
    });
    setFilteredProducts(sorted);
  };

  // Tarihe göre (önce en eski)
  const sortByDateOldest = () => {
    const sorted = [...products].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setFilteredProducts(sorted);
  };

  // Tarihe göre (önce en yeni)
  const sortByDateNewest = () => {
    const sorted = [...products].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilteredProducts(sorted);
  };

  // A'dan Z'ye sıralama
  const sortByNameAZ = () => {
    const sorted = [...products].sort((a, b) => {
      const nameA = JSON.parse(a.cart).item.title.toLowerCase();
      const nameB = JSON.parse(b.cart).item.title.toLowerCase();
      return nameA.localeCompare(nameB);
    });
    setFilteredProducts(sorted);
  };

  // Z'den A'ya sıralama
  const sortByNameZA = () => {
    const sorted = [...products].sort((a, b) => {
      const nameA = JSON.parse(a.cart).item.title.toLowerCase();
      const nameB = JSON.parse(b.cart).item.title.toLowerCase();
      return nameB.localeCompare(nameA);
    });
    setFilteredProducts(sorted);
  };

  // Radio seçildiğinde tetiklenen fonksiyon
  const handleRadio = (index) => {
    setIndex(index);

    switch (index) {
      case 0:
        sortByPriceLowToHigh();
        break;
      case 1:
        sortByPriceHighToLow();
        break;
      case 2:
        sortByDateOldest();
        break;
      case 3:
        sortByDateNewest();
        break;
      case 4: // A'dan Z'ye sıralama
        sortByNameAZ();
        break;
      case 5: // Z'den A'ya sıralama
        sortByNameZA();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator color="#333" />
        </View>
      ) : products.length === 0 ? (
        <NoDataScreen
          message="Sattığınız ilan bulunmamaktadır."
          iconName="basket-plus"
          buttonText="İlanlara Göz At"
          navigateTo="HomePage"
        />
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
                <View>
                  <TouchableOpacity
                    onPress={() => setSortListModal(!sortListModal)}
                  >
                    <Icon2 name="swap-vertical" size={23} color={"#333"} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={style.container}
          >
            <View style={style.orders}>
              {filteredProducts.length === 0 ? (
                <View style={style.noResultsContainer}>
                  <Icon2
                    name="emoticon-sad-outline"
                    size={50}
                    color="#EA2B2E"
                  />
                  <Text style={style.noResultsText}>
                    Arama sonucu bulunamadı.
                  </Text>
                  <Text style={style.noResultsSubText}>
                    Lütfen başka bir terim deneyin.
                  </Text>
                </View>
              ) : (
                filteredProducts.map((item, index) => (
                  <Order item={item} key={index} />
                ))
              )}
            </View>
          </ScrollView>
          <RadioFilter
            selectedIndex={selectedIndex}
            sortListModal={sortListModal}
            setSortListModal={setSortListModal}
            handleRadio={handleRadio}
          />
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
  orders: {
    width: "100%",
    padding: 5,
    gap: 15,
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    backgroundColor: "#0c03033d",
    padding: 20,
  },
  modalContent: {
    gap: 5,
    paddingBottom: 25,
    backgroundColor: "#f8f8ff",
    padding: 10,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Input: {
    backgroundColor: "#ebebeb",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
});

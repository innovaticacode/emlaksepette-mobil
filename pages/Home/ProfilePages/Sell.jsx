import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator } from "react-native-paper";
import Order from "./profileComponents/Order";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";

export default function Sell() {
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState(0);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const nav = useNavigation();
  const route = useRoute();

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
    fetchData();
  }, [user]);

  useEffect(() => {
    const filterProducts = () => {
      const searchLower = search.toLowerCase();
      return products.filter(product => {
        const parsedCart = product.cart ? JSON.parse(product.cart) : {};
        const title = parsedCart["item"]["title"] ? parsedCart["item"]["title"].toLowerCase() : "";
        const houseId = parsedCart["item"]["id"] ? parsedCart["item"]["id"].toString().toLowerCase() : "";

        return (
          title.includes(searchLower) ||
          houseId.includes(searchLower)
        );
      });
    };

    const sortProducts = (products) => {
      switch (sortOption) {
        case "name-asc":
          return products.sort((a, b) => {
            const titleA = JSON.parse(a.cart)["item"]["title"].toLowerCase();
            const titleB = JSON.parse(b.cart)["item"]["title"].toLowerCase();
            return titleA.localeCompare(titleB);
          });
        case "name-desc":
          return products.sort((a, b) => {
            const titleA = JSON.parse(a.cart)["item"]["title"].toLowerCase();
            const titleB = JSON.parse(b.cart)["item"]["title"].toLowerCase();
            return titleB.localeCompare(titleA);
          });
        case "price-asc":
          return products.sort((a, b) => {
            const priceA = parseFloat(JSON.parse(a.cart)["item"]["price"] || 0);
            const priceB = parseFloat(JSON.parse(b.cart)["item"]["price"] || 0);
            return priceA - priceB;
          });
        case "price-desc":
          return products.sort((a, b) => {
            const priceA = parseFloat(JSON.parse(a.cart)["item"]["price"] || 0);
            const priceB = parseFloat(JSON.parse(b.cart)["item"]["price"] || 0);
            return priceB - priceA;
          });
        default:
          return products;
      }
    };

    const filtered = filterProducts();
    const sorted = sortProducts(filtered);
    setFilteredProducts(sorted);
  }, [search, products, sortOption]);

  const handleSort = (option) => {
    setSortOption(option);
    setModalVisible(false);
  };

  return (
    <>
      {loading ? (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <ActivityIndicator color="#333" />
        </View>
      ) : products.length === 0 ? (
        <View style={{ height: "90%", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Icon2 name="basket-plus" size={50} color={"#EA2A28"} />
          </View>
          <View>
            <Text style={style.noCommentsText}>Sattığınız İlan Bulunmamaktadır.</Text>
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
                onPress={() => setModalVisible(true)}
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
          {/* Modal */}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={style.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={style.modalContent}>
                    <Text style={style.modalTitle}>Sıralama Seçenekleri</Text>
                    <TouchableOpacity onPress={() => handleSort("name-asc")}>
                      <Text style={style.modalOption}>İsme Göre (A-Z)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSort("name-desc")}>
                      <Text style={style.modalOption}>İsme Göre (Z-A)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSort("price-asc")}>
                      <Text style={style.modalOption}>Fiyata Göre (Küçükten Büyüğe)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSort("price-desc")}>
                      <Text style={style.modalOption}>Fiyata Göre (Büyükten Küçüğe)</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  SearchInput: {
    flex: 1,
  },
  ListIcon: {
    padding: 5,
  },
  orders: {
    flex: 1,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  noCommentsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  returnButton: {
    backgroundColor: "#e5e5e5",
    padding: 10,
    borderRadius: 5,
  },
  returnButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

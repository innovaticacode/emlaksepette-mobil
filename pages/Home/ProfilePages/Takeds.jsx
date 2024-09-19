import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import { SearchBar } from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import Order from './profileComponents/Order';
import axios from 'axios';
import { getValueFor } from '../../../components/methods/user';

export default function Takeds() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({});
  const [takeds, setTakeds] = useState([]);
  const [filteredTakeds, setFilteredTakeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getValueFor('user', setUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user.access_token) {
          const response = await axios.get(
            'https://private.emlaksepette.com/api/institutional/get_boughts',
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          );
          setTakeds(response.data.boughts);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const filterTakeds = () => {
      if (!search.trim()) {
        // Arama terimi boşsa, tüm takeds listesini göster
        return takeds;
      }

      const searchLower = search.toLowerCase();

      return takeds.filter((item) => {
        try {
          const parsedCart = JSON.parse(item.cart);
          const Title = parsedCart["item"]["title"]?.toLowerCase() || "";
          const HouseId = parsedCart["item"]["id"]?.toString().toLowerCase() || "";

          // Arama terimini Title, HouseId üzerinde ara
          return (
            Title.includes(searchLower) ||
            HouseId.includes(searchLower)
          );
          
        } catch (error) {
          console.error('Error parsing cart:', error);
          return false;  // Bu durumda filtreleme yapma
        }
      });
    };

    const filtered = filterTakeds();
    console.log('Filtered Takeds:', filtered);  // Log for debugging
    setFilteredTakeds(filtered);
  }, [search, takeds]);

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  const handleGoToHomePage = () => {
    setLoading(true);
    setTimeout(() => {
      nav.navigate('HomePage');
      setLoading(false);
    }, 700);
  };

  return (
    <>
      {loading ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator color="#333" />
        </View>
      ) : takeds.length === 0 ? (
        <View style={{ height: '90%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon2 name="basket-plus" size={50} color={"#EA2A28"} />
          </View>
          <View>
            <Text style={styles.noCommentsText}>Siparişiniz bulunmamaktadır.</Text>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity style={styles.returnButton} onPress={handleGoToHomePage}>
              <Text style={styles.returnButtonText}>İlanlara Göz At</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
          <View style={styles.Navbar}>
            <View style={styles.SearchInput}>
              <SearchBar
                placeholder="Ara..."
                onChangeText={handleSearchChange}
                value={search}
                containerStyle={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  borderTopColor: 'white',
                  borderBottomColor: 'white',
                  height: 30,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                searchIcon={{ size: 20 }}
                inputContainerStyle={{
                  backgroundColor: '#e5e5e5',
                  borderRadius: 7,
                  height: '100%',
                  marginTop: 0,
                }}
                inputStyle={{ fontSize: 15 }}
                showCancel="false"
                placeholderTextColor={"grey"}
              />
            </View>
            <View style={styles.ListIcon}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#e5e5e5',
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <View style={styles.orders}>
              {filteredTakeds.length == 0 ? (
                <View style={styles.noResultsContainer}>
                  <Icon2 name="emoticon-sad-outline" size={50} color="#EA2B2E" />
                  <Text style={styles.noResultsText}>Arama sonucu bulunamadı.</Text>
                  <Text style={styles.noResultsSubText}>Lütfen başka bir terim deneyin.</Text>
                </View>
              ) : (
                filteredTakeds.map((taked, i) => (
                  <Order key={i} item={taked} />
                ))
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  returnButton: {
    backgroundColor: '#EA2B2E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Navbar: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFF',
    borderColor: '#e6e6e6',
    ...Platform.select({
      ios: {
        shadowColor: '#e6e6e6',
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
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orders: {
    width: '100%',
    padding: 5,
    gap: 15,
  },
});

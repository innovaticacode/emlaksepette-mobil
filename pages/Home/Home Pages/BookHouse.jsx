import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,

  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import RealtorPost from "../../../components/RealtorPost";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
const PAGE_SIZE = 10;

const BookHouse = ({index}) => {
     const navigation = useNavigation()
    const apiUrl = "https://mobil.emlaksepette.com/";
    const [featuredEstates, setFeaturedEstates] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
  
    const fetchFeaturedEstates = async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://mobil.emlaksepette.com/api/real-estates?page=${reset ? 1 : page}&limit=${PAGE_SIZE}`
        );
        const newEstates = response.data;
  
        if (reset) {
          setFeaturedEstates(newEstates);
          setPage(2);
          setHasMore(true);
        } else {
          if (newEstates.length > 0) {
            setFeaturedEstates((prevEstates) => {
              const newUniqueEstates = newEstates.filter(
                (estate) => !prevEstates.some((prevEstate) => prevEstate.id === estate.id)
              );
              return [...prevEstates, ...newUniqueEstates];
            });
            setPage((prevPage) => prevPage + 1);
          } else {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    useEffect(() => {
        if (index==5) {
            fetchFeaturedEstates();
        }else{
            setFeaturedEstates([])
        }
 
    }, [index]);
  
    const filteredHomes = featuredEstates.filter((estate) => estate.step2_slug === "gunluk-kiralik");
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchFeaturedEstates(true);
    };
  
    const renderFooter = () => {
      if (!loading) return null;
      return <ActivityIndicator style={{ margin: 20 }} size="small" color="#000000" />;
    };
    const [ModalForAddToCart, setModalForAddToCart] = useState(false);
    const [selectedCartItem, setselectedCartItem] = useState(0);
    const GetIdForCart = (id) => {
      setselectedCartItem(id);
      setModalForAddToCart(true);
    };
    const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append("isShare", null);
    formData.append("numbershare", null);
    formData.append("qt", 1);
    formData.append("type", "housing");
    formData.append("project", null);
    formData.append("clear_cart", "no");

    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://mobil.emlaksepette.com/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        
        setModalForAddToCart(false);
        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingBottom: 3,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 700 }}>
          ÖNE ÇIKAN TATİL EVLERİ
        </Text>

        <TouchableOpacity style={styles.allBtn}>
          <Text style={{ color: "white", fontSize: 11 ,fontWeight:'bold'}}>
            Tüm Konutları Gör
          </Text>
        </TouchableOpacity>
      </View>
      {refreshing &&  (
        <View style={{ padding: 10, backgroundColor: 'white', alignItems: 'center' }}>
          <ActivityIndicator animating={true} size="small" color="#000000" />
        </View>
      )}
          
      <FlatList
        data={filteredHomes}
        renderItem={({ item }) => (
          <RealtorPost
            GetId={GetIdForCart}
            HouseId={item.id}
            price={`${JSON.parse(item.housing_type_data)["price"]} `}
            housing={item}
            title={item.housing_title}
            loading={loading}
            location={item.city_title + " / " + item.county_title}
            image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
            column1_name={`${JSON.parse(item.housing_type_data)[item.column1_name]} `}
            column1_additional={item.column1_additional}
            column2_name={`${JSON.parse(item.housing_type_data)[item.column2_name]} `}
            column2_additional={item.column2_additional}
            column3_name={`${JSON.parse(item.housing_type_data)[item.column3_name]} `}
            column3_additional={item.column3_additional}
            column4_name={`${JSON.parse(item.housing_type_data)[item.column4_name]} `}
            column4_additional={item.column4_additional}
            bookmarkStatus={true}
            dailyRent={false}
          />
        )}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        onEndReached={() => fetchFeaturedEstates()}
        onEndReachedThreshold={0.1}
       
      />

     
<Modal
          isVisible={ModalForAddToCart}
          onBackdropPress={() => setModalForAddToCart(false)}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
          transparent={true}
          useNativeDriver={true}
          style={styles.modal4}
        >
         
          <View style={styles.modalContent4}>
          {
              user.access_token  ?
              <> 
              <View style={{ padding: 10, gap: 10 }}>
              <Text style={{ textAlign: "center" }}>
                #1000{selectedCartItem} No'lu Konutu Sepete Eklemek İsteiğinize
                Eminmisiniz?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    addToCard();
                  }}
                >
                  <Text style={{ color: "white" }}>Sepete Ekle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#e44242",
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setModalForAddToCart(false);
                  }}
                >
                  <Text style={{ color: "white" }}>Vazgeç</Text>
                </TouchableOpacity>
              </View>
            </View>
              </>:
            <>
                 <View style={{gap:10}}>
                      
                        <View>
                          <Text style={{textAlign:'center',color:'#4C6272',fontWeight:'bold',fontSize:16}}>Üyeliğiniz Bulunmamaktadır!</Text>
                        </View>
                        <View style={{width:'100%'}}>
                          <Text style={{textAlign:'center',color:'#7A8A95'}}>Sepetinize konut ekleyebilmeniz için giriş yapmanız gerekmektedir</Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#F65656',width:'100%',padding:10}}
                           onPress={()=>{
                            setModalForAddToCart(false)
                            navigation.navigate('Login')
                        }}
                        >
                      <Text style={{color:'#FFFFFF',textAlign:'center'}}>Giriş Yap</Text>
                    </TouchableOpacity>
                    </View>
            </>
            }
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  allBtn: {
    backgroundColor: "#EA2C2E",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
  }, 
   modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
  },
});

export default BookHouse;

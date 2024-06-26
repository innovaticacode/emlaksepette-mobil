import { View, Text, StyleSheet, ScrollView, RefreshControl,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import RealtorPostFavorited from "../../components/RealtorPostFavorited";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
export default function Favorites() {
  const navigation=useNavigation()
  const [user,setUser] = useState({});
  const [favorites,setFavorites] = useState([]);
  const focused = useIsFocused();
  const [loading,setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getValueFor('user',setUser)
  },[])

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` }
    };
    axios.get('https://mobil.emlaksepette.com/api/favorites',config).then((res) => {
      setFavorites(Object.values(res.data.mergedFavorites));
      setLoading(false);
    })
  },[user,focused])



  const changeFavorites = (type , housingId, projectId) => {
    if(type == 1){
      setFavorites(favorites.filter(favorite => {if(favorite?.project?.id == projectId && favorite?.housing_id == housingId){}else{return favorite}}))
    }else{
      setFavorites(favorites.filter(favorite => {if(favorite?.housing && favorite?.housing_id == housingId){}else{return favorite}}))  
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    setFavorites([]);
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` }
    };
    // Yenileme işlemi burada yapılır
    setTimeout(() => {
      axios.get('https://mobil.emlaksepette.com/api/favorites',config).then((res) => {
        setFavorites(Object.values(res.data.mergedFavorites));
        setRefreshing(false);
      })
      // Yenileme işlemi tamamlandıktan sonra state'i false yapın
    }, 1000); // 2 saniye bekleme simülasyonu
  };


  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const [selectedRoomID, setselectedRoomID] = useState(0)
  const [type, settype] = useState(0)

  const GetIdForCart = (id,roomId,type) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
    setselectedRoomID(roomId)
    settype(type)
  };

  const addToCardForHousing = async () => {
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

  const addToCardForProject = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append(
      "isShare",
      
      data.projectHousingsList[selectedCartItem]["share_sale[]"]
    );
    formData.append(
      "numbershare",
      data.projectHousingsList[selectedCartItem]["number_of_shares[]"]
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", data.project.id);
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

        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
console.log(user)
  return (
    
    <View style={styles.container}>
      <AlertNotificationRoot>
        <GestureHandlerRootView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
          >
            {
              loading ? 
                <ActivityIndicator size="small" color={"red"} />
              : 
                favorites?.map((favorite) => {
                  if(favorite?.project){
                    var image = favorite?.project_housing?.find((projectHousing) => {if(projectHousing.room_order == favorite?.housing_id && projectHousing.name == 'image[]' && projectHousing.project_id == favorite?.project?.id){return projectHousing}})?.value;
                    var column1 = favorite?.project_housing?.find((projectHousing) => {if(projectHousing.room_order == favorite?.housing_id && projectHousing.name == favorite?.project?.list_item_values?.column1_name+'[]' && projectHousing.project_id == favorite?.project?.id){return projectHousing}})?.value;
                    var column2 = favorite?.project_housing?.find((projectHousing) => {if(projectHousing.room_order == favorite?.housing_id && projectHousing.name == favorite?.project?.list_item_values?.column2_name+'[]' && projectHousing.project_id == favorite?.project?.id){return projectHousing}})?.value;
                    var column3 = favorite?.project_housing?.find((projectHousing) => {if(projectHousing.room_order == favorite?.housing_id && projectHousing.name == favorite?.project?.list_item_values?.column3_name+'[]' && projectHousing.project_id == favorite?.project?.id){return projectHousing}})?.value;
                    if(column1){
                      column1 = column1 + ' ' + (favorite?.project?.list_item_values?.column1_additional ? favorite?.project?.list_item_values?.column1_additional : '')
                    }
                    if(column2){
                      column2 = column2 + ' ' + (favorite?.project?.list_item_values?.column2_additional ? favorite?.project?.list_item_values?.column2_additional : '')
                    }
                    if(column3){
                      column3 = column3 + ' ' + (favorite?.project?.list_item_values?.column3_additional ? favorite?.project?.list_item_values?.column3_additional : '')
                    }
                    var no = 1000000 + favorite?.project.id
                    return(
                      <RealtorPostFavorited changeFavorites={changeFavorites} type={1} projectId={favorite?.project?.id} housingId={favorite?.housing_id} no={no} column1={column1} column2={column2} column3={column3} image={'https://mobil.emlaksepette.com/project_housing_images/'+image} title={favorite?.project?.project_title + " adlı projede "+favorite?.housing_id+" No'lu konut"} price={favorite?.project_housing?.find((projectHousing) => {if(projectHousing.room_order == favorite?.housing_id && projectHousing.name == 'price[]'){return projectHousing}})?.value} m2="20"  GetId={GetIdForCart}/>
                    )
                  }else{
                    if(favorite?.housing){
                      var housingData = JSON.parse(favorite?.housing?.housing_type_data);
                    }else{
                      housingData = {};
                    }
                    return(
                      <RealtorPostFavorited changeFavorites={changeFavorites} type={2} HouseId={favorite?.housing?.id} no={favorite?.housing?.id + 2000000} image={'https://mobil.emlaksepette.com/housing_images/'+housingData?.image} title={favorite?.housing?.title} price={housingData && housingData.price ? housingData.price : "0"} column1={housingData[favorite?.housing?.list_items?.column1_name] ? housingData[favorite?.housing?.list_items?.column1_name] +" "+(favorite?.housing?.list_items?.column1_additional ? favorite?.housing?.list_items?.column1_additional : '') : ''} column2={housingData[favorite?.housing?.list_items?.column2_name] ? housingData[favorite?.housing?.list_items?.column2_name] +" "+ (favorite?.housing?.list_items?.column2_additional ? favorite?.housing?.list_items?.column2_additional : '') : ''} column3={ housingData[favorite?.housing?.list_items?.column3_name] ? housingData[favorite?.housing?.list_items?.column3_name] +" "+ (favorite?.housing?.list_items?.column3_additional ? favorite?.housing?.list_items?.column3_additional : '') : ''}  location={favorite?.housing?.city?.title + ' / ' + favorite?.housing?.county?.title} GetId={GetIdForCart}  />
                    )
                  }
                
                })
            }
          </ScrollView>
        </GestureHandlerRootView>
      </AlertNotificationRoot>
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
                {
                  type == 1 &&
                  <Text style={{ textAlign: "center" }}>
           
                  #1000{selectedCartItem} No'lu Projenin {selectedRoomID} Numaralı Konutunu Sepete Eklemek İsteiğinize
                  Eminmisiniz?
                </Text>
                }
                    {
                  type == 2 &&
                  <Text style={{ textAlign: "center" }}>
           
                  #2000{selectedCartItem} No'lu Konutu Sepete Eklemek İsteiğinize
                  Eminmisiniz?
                </Text>
                }
          
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
                    type==2 ?
                 addToCardForHousing()
                 :addToCardForProject()
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
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    padding: 1,
    height: "100%",
    paddingTop:20
  },
  leftAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 10,
    color:'#fff',
    width : 40
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

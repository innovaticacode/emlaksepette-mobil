import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import RealtorPostFavorited from "../../components/RealtorPostFavorited";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useIsFocused } from "@react-navigation/native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function Favorites() {
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

  console.log(favorites);

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
                <ActivityIndicator size="large" color={"red"} />
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
                      <RealtorPostFavorited changeFavorites={changeFavorites} type={1} projectId={favorite?.project?.id} housingId={favorite?.housing_id} no={no} column1={column1} column2={column2} column3={column3} image={'https://mobil.emlaksepette.com/project_housing_images/'+image} title={favorite?.project?.project_title + " adlı projede "+favorite?.housing_id+" No'lu konut"} price={favorite?.project_housing?.find((projectHousing) => {if(projectHousing.room_order == favorite?.housing_id && projectHousing.name == 'price[]'){return projectHousing}})?.value} m2="20" />
                    )
                  }else{
                    if(favorite?.housing){
                      var housingData = JSON.parse(favorite?.housing?.housing_type_data);
                    }else{
                      housingData = {};
                    }
                    return(
                      <RealtorPostFavorited changeFavorites={changeFavorites} type={2} housingId={favorite?.housing?.id} no={favorite?.housing?.id + 2000000} image={'https://mobil.emlaksepette.com/housing_images/'+housingData?.image} title={favorite?.housing?.title} price={housingData && housingData.price ? housingData.price : "0"} column1={housingData[favorite?.housing?.list_items?.column1_name] ? housingData[favorite?.housing?.list_items?.column1_name] +" "+(favorite?.housing?.list_items?.column1_additional ? favorite?.housing?.list_items?.column1_additional : '') : ''} column2={housingData[favorite?.housing?.list_items?.column2_name] ? housingData[favorite?.housing?.list_items?.column2_name] +" "+ (favorite?.housing?.list_items?.column2_additional ? favorite?.housing?.list_items?.column2_additional : '') : ''} column3={ housingData[favorite?.housing?.list_items?.column3_name] ? housingData[favorite?.housing?.list_items?.column3_name] +" "+ (favorite?.housing?.list_items?.column3_additional ? favorite?.housing?.list_items?.column3_additional : '') : ''} />
                    )
                  }
                
                })
            }
          </ScrollView>
        </GestureHandlerRootView>
      </AlertNotificationRoot>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    padding: 1,
    height: "100%",
  },
  leftAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 10,
    color:'#fff',
    width : 40
  },
});

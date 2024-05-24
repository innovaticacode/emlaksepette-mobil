import { View, Text, StyleSheet, ScrollView, Image, Modal, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import RealtorPostFavorited from "../../components/RealtorPostFavorited";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { apiUrl, frontEndUri } from "../../components/methods/apiRequest";
import { Toast } from "react-native-alert-notification";
import { useIsFocused } from "@react-navigation/native";
import SadEmoji from 'react-native-vector-icons/Entypo';
import HousingSkeletion from "../../components/SkeletonComponents/HousingSkeletion";
import CloseIcon from 'react-native-vector-icons/AntDesign';

export default function Favorites() {
  const isFocused = useIsFocused();

  const [favorites,setFavorites] = useState([]);
  const [user,setUser] = useState({});
  const [loadingFavorite,setLoadingFavorite] = useState(false);
  const [showAlert,setShowAlert] = useState(false);
  const [dataLoading,setDataLoading] = useState(false);
  const [removeHouseId,setRemoveHouseId] = useState(0);
  const [removeProjectId,setRemoveProjectId] = useState(0);
  const [isProject,setIsProject] = useState(false);
  useEffect(() => {
    getValueFor('user',setUser);
  },[])

  

  const removeItemCollection2 = () => {
    setLoadingFavorite(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+user.access_token
    }
    axios.post(apiUrl+'add_project_to_favorites/'+removeHouseId,{
      project_id : removeProjectId,
      housing_id : removeHouseId
    },{
      headers : headers
    }).then((res) => {
      setShowAlert(false);
      setLoadingFavorite(false);
      if(res.data.status == "added"){
        Toast.show({
          type : ALERT_TYPE.SUCCESS,
          title : "Başarılı",
          textBody : "Başarıyla ilanı favorilere eklediniz"
        })
      }else if(res.data.status == "removed"){
        const newFavorites = favorites.filter((favorite) => {if(removeHouseId != favorite.housing_id){return favorite;}else{if(removeProjectId != favorite.project_id){return favorite;}}} )
        setFavorites(newFavorites);
        setLoadingFavorite(false);
        Toast.show({
          type : ALERT_TYPE.SUCCESS,
          title : "Başarılı",
          textBody : "Başarıyla ilanı favorilerden kaldırdınız"
        })
      }
    })
  }

  const removeHousingToFavorites = () => {
    setLoadingFavorite(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+user.access_token
    }
    axios.post(apiUrl+'add_housing_to_favorites/'+removeHouseId,{},{
      headers : headers
    }).then((res) => {
      console.log(res);
      setShowAlert(false);
      setLoadingFavorite(false);
      if(res.data.status == "added"){
        Toast.show({
          type : ALERT_TYPE.SUCCESS,
          title : "Başarılı",
          textBody : "Başarıyla ilanı favorilere eklediniz"
        })
      }else if(res.data.status == "removed"){
        console.log("asd");
        const newFavorites = favorites.filter((favorite) => {if(removeHouseId != favorite.housing_id){console.log(favorite); return favorite;}})
        console.log(newFavorites);
        setFavorites(newFavorites);
        setLoadingFavorite(false);
        Toast.show({
          type : ALERT_TYPE.SUCCESS,
          title : "Başarılı",
          textBody : "Başarıyla ilanı favorilerden kaldırdınız"
        })
      }
    })
  }

  useEffect(() => {
    setDataLoading(true);
    axios.get(apiUrl+'favorites',{
      headers : {
        Authorization : 'Bearer '+user.access_token
      }
    }).then((res) => {
      setDataLoading(false);
      setFavorites(Object.values(res.data.mergedFavorites));
    })
  },[user,isFocused])

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        {
          dataLoading ? 
            <View>
              <HousingSkeletion/>
              <HousingSkeletion/>
              <HousingSkeletion/>
              <HousingSkeletion/>
              <HousingSkeletion/>
              <HousingSkeletion/>
            </View>
          : 
            favorites.length > 0 ?
              favorites.map((favorite) => {
                if(!favorite.project_id){
                  var housingData = JSON.parse(favorite.housing.housing_type_data);
                  return(
                    <RealtorPostFavorited setIsProject={setIsProject} isProject={false} setRemoveHouseId={setRemoveHouseId} location={favorite.housing.city.title+' / '+favorite.housing.county.title+ ' / '+favorite.housing.neighborhood.mahalle_title} showAlert={showAlert} setShowAlert={setShowAlert} HouseId={favorite.housing.id} loadingFavorite={loadingFavorite} setLoadingFavorite={setLoadingFavorite} removeHousingToFavorites={removeHousingToFavorites} title={favorite.housing.title} image={frontEndUri+'housing_images/'+housingData.image} no={2000000+favorite.housing.id} price={housingData.price} column1={housingData[favorite.housing.list_items.column1_name]+' '+favorite.housing.list_items.column1_additional} column2={housingData[favorite.housing.list_items.column2_name]+' '+(favorite.housing.list_items.column2_additional ? favorite.housing.list_items.column2_additional : '')} column3={housingData[favorite.housing.list_items.column3_name] ? housingData[favorite.housing.list_items.column3_name]+' '+(favorite.housing.list_items.column3_additional ? favorite.housing.list_items.column3_additional : '') : ''} />
                  )
                }else{
                  return(
                    <RealtorPostFavorited setIsProject={setIsProject} setRemoveProjectId={setRemoveProjectId} setRemoveHouseId={setRemoveHouseId} data={favorite} favorites={favorites} setFavorites={setFavorites} isProject={true} projectId={favorite.project.id} location={favorite.project.city.title+' / '+favorite.project.county.ilce_title+ ' / '+favorite.project.neighbourhood.mahalle_title} showAlert={showAlert} setShowAlert={setShowAlert} HouseId={favorite.housing_id} loadingFavorite={loadingFavorite} setLoadingFavorite={setLoadingFavorite} removeHousingToFavoritesx={() => {removeProjectToFavorites(favorite.housing_id,favorite.project_id)}} title={favorite.project.project_title + ' Projesinde '+ favorite.housing_id+' No\'lu Konut'} image={frontEndUri+'project_housing_images/'+favorite.project.listHousing[favorite.housing_id]['image[]']} no={'No : '+favorite.housing_id} price={favorite.project.listHousing[favorite.housing_id]['price[]']} column1={favorite.project.listHousing[favorite.housing_id][favorite.project.list_item_values.column1_name+'[]']+' '+favorite.project.list_item_values.column1_additional} column2={favorite.project.listHousing[favorite.housing_id][favorite.project.list_item_values.column2_name+'[]']+' '+favorite.project.list_item_values.column2_additional} column3={favorite.project.listHousing[favorite.housing_id][favorite.project.list_item_values.column3_name+'[]']+' '+favorite.project.list_item_values.column3_additional}/>
                  )
                }
              })
            : 
              <View style={styles.empty}>
                <SadEmoji style={styles.empty_icon} size={150} name="emoji-sad"/>
                <Text style={styles.empty_text}>Favorilerinizde ilan bulunamadı</Text>
              </View>
        }
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAlert}
        style={{width:'100%',height:'100%'}}
      >
        <View style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',height:'100%',backgroundColor:'#333',opacity:'.9'}}>
          <View style={{backgroundColor:'red',padding:20,borderRadius:10}}>
            <Text style={{zIndex:999,color:'#fff'}}>İlanı favorilerden kaldırmak istediğinize emin misiniz?</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:10}}>
              <Pressable onPress={() => {setShowAlert(false)}} style={{backgroundColor:'white',paddingTop:5,paddingBottom:5,display:'flex',flexDirection : 'row',justifyContent:'center',marginTop:20, flex : 1,borderRadius:5}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
                  <CloseIcon name="close" style={{fontSize:15,marginRight:3,fontWeight:'bold',display:'block',color:'#EA2B2E'}}/>
                  <Text style={{color:'#EA2B2E',fontWeight:'bold',fontSize:12}}>İptal</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => {isProject ? removeItemCollection2() : removeHousingToFavorites()}} style={{backgroundColor:'white',paddingTop:5,paddingBottom:5,display:'flex',flexDirection : 'row',justifyContent:'center',marginTop:20, flex : 1,borderRadius:5}}>
                {
                  loadingFavorite ? 
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
                      <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                  : 
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
                      <CloseIcon name="check" style={{fontSize:15,marginRight:3,fontWeight:'bold',display:'block',color:'#22bb33'}}/>
                      <Text style={{color:'#22bb33',fontWeight:'bold',fontSize:12}}>EVET</Text> 
                    </View>
                }
              </Pressable>
            </View>
          </View>
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
  },
  empty : {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    marginTop : 20,
    height:'100%'
  },
  empty_icon : {
    color : '#EA2B2E'
  },
  empty_text :{ 
    fontSize : 20,
    marginTop:20,
    fontWeight:'bold'
  }
});

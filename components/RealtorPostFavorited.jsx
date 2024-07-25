import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Trash from "react-native-vector-icons/Entypo";
import Info from "./Info";
import { Platform } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { getValueFor } from "./methods/user";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign'
export default function RealtorPostFavorited({
  title,
  loading,
  type,
  price,
  image,
  location,
  column1,
  column2,
  column3,
  HouseId,
  projectId,
  housingId,
  no,
  changeFavorites,
  GetId,
  fetchData,
  selectFavorite,
  isChoosed,
  SelectFavoriteProject
}) {
  const [user,setUser] = useState({});
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [showAlert,setShowAlert] = useState(false);
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };

  useEffect(() => {
    getValueFor("user",setUser);
  },[])

  const removeItem = () => {
    if(type == 1){
      fetchData()
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` }
      };
      axios.post('https://private.emlaksepette.com/api/add_project_to_favorites/'+housingId,{
        project_id : projectId,
        housing_id : housingId
      },config).then((res) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarılı',
          textBody: res.data.message,
          button: 'Tamam',
        })
        changeFavorites(1,housingId,projectId)
        
      })
      setShowAlert(false);
    }else{
      fetchData()
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` }
      };
      axios.post('https://private.emlaksepette.com/api/add_housing_to_favorites/'+HouseId,{
        housing_id : HouseId
      },config).then((res) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarılı',
          textBody: res.data.message,
          button: 'Tamam',
        })
        changeFavorites(1,housingId)
      })
      setShowAlert(false);
    }
  }

  const formattedPriceZero = parseFloat(price).toLocaleString("tr-TR");
  const formattedPrice = formattedPriceZero.replace(/,00$/, "");
  

  const LeftAction = () => {
    return (
      <TouchableOpacity onPress={() => {setShowAlert(true);}}  style={styles.leftAction}>
        <View >
          <Text style={styles.actionText}><Icon name="delete" size={20} color={'#fff'}/></Text>
        </View>
      </TouchableOpacity>
    );
  };

  const goToPostDetail=()=>{
    if (isChoosed==true) {
      selectFavorite(housingId)
      setIsHighlighted(!isHighlighted)
    }else{
      navigation.navigate('PostDetails',{ HomeId:housingId,projectId:projectId})
    }
   
  }
  const goToRealtorDetails=()=>{
    if (isChoosed==true) {
      selectFavorite(HouseId)
      setIsHighlighted(!isHighlighted)
    }else{
      navigation.navigate('Realtor details',{  houseId:HouseId,})
    }
   
  }
  const [isHighlighted, setIsHighlighted] = useState(false);
  return (
    
    <Swipeable renderRightActions={LeftAction}>
      <TouchableOpacity
      style={{ borderWidth: isHighlighted?1:0,borderColor:'red'}}
        onPress={() =>{
       
          if (type==1) {
            goToPostDetail()
          }else{
            goToRealtorDetails()
          }

        //  if (isChoosed==true) {
        //   setIsHighlighted(!isHighlighted)
        //   if (type==1) {
            
        //     alert('dsff')
        //     selectFavorite(housingId)
        //   }else{

        //     selectFavorite(HouseId)
        //   }
        //  }
          
          // navigation.navigate("Realtor details", { houseId: HouseId })
        }}
      >
        <View style={styles.container}>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={"Favorilerden Çıkar"}
            message={"Bu konutu favorilerden çıkarmak istediğinize emin misiniz?"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Hayır"
            confirmText="Evet"
            cancelButtonColor="#1d8027"
                confirmButtonColor="#ce4d63"
            onCancelPressed={() => {
              setShowAlert(false);
            }}
            onConfirmPressed={() => {
              removeItem();
            }}
          />
          <View style={styles.İlan}>
            <View style={{ width: "30%",height:80 }}>
             
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: '100%'}}
              />
            </View>

            <View style={styles.container2}>
              <View style={styles.captionAndIcons}>
                <View style={styles.caption}>
                <Text style={{ fontSize: 9, color: "black" }}>
                    İlan No: {2000000 + HouseId}
                  </Text>
                  <Text style={{ fontSize: 10,fontWeight: 700  }} numberOfLines={3}>
                    {title}
                  </Text>
                </View>
              </View>

              <View style={styles.PriceAndButtons}>
                <View style={{ flex: 1 / 2, alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#264ABB",
                      fontWeight: "600",
                      fontSize: 12,
                      left: 20,
                    }}
                  >
                    {formattedPrice}₺
                  </Text>
                </View>
                <View style={styles.btns}>
                  <TouchableOpacity style={styles.addBasket}
                      onPress={()=>{
                        GetId(type==1 ? projectId : HouseId , type==1 ? housingId: null , type)
                      }}
                  >
                    <Text
                      style={{ color: "white", fontWeight: "500", fontSize: 12 }}
                    >
                      Sepete Ekle
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#E8E8E8",
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              {
                column1 ? 
                  <Info text={column1} />
                : ''
              }
              {
                column2 ? 
                  <Info text={column2} />
                : ''
              }
              {
                column3 ? 
                  <Info text={column3} /> 
                : ''
              }
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.InformationText}>{location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "100%",
  

    marginTop: 10,

    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  İlan: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    flex: 1,
   
    gap:8,
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,

    display: "flex",
    flexDirection: "column",
  },
  captionAndIcons: {
 
    display: "flex",
    flexDirection: "row",
  },
  PriceAndButtons: {
    paddingTop: 10,
    alignItems: "center",
    flexDirection: "row-reverse",

    justifyContent: "center",
  },
  caption: {
    width: "70%",
  },
  ıcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight : 20,
    gap: width > 400 ? 13 : 15,
    flex : 1,
    bottom: 5,
    paddingLeft: width > 400 ? 5 : 3,
    padding: width > 400 ? 0 : 3,
    left: width > 400 ? 18 : 11,
  },
  btns: {
    flex: 1 / 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#264ABB",
  },

  ıconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
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
  InformationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  leftAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 10,
    color:'#fff',
    width : 40
  },
});

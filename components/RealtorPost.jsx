import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Trash from "react-native-vector-icons/Entypo";
import Info from "./Info";
import CloseIcon from 'react-native-vector-icons/AntDesign'
import axios from "axios";
import { apiUrl } from "./methods/apiRequest";
import { getValueFor } from "./methods/user";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Platform } from "react-native";
export default function RealtorPost({
  title,
  loading,
  price,
  image,
  location,
  m2,
  roomCount,
  floor,
  HouseId,
  isHousingFavorite
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [showAlert,setShowAlert] = useState(false);
  const [user,setUser] = useState({});
  const [color,setColor] = useState("black");
  const [loadingFavorite,setLoadingFavorite] = useState(false);

  useEffect(() => {
    if(isHousingFavorite){
      setHeart("heart");
      setColor("red");
    }else{
      setHeart("hearto");
      setColor('black');
    }
  },[isHousingFavorite])

  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const formattedPriceZero = parseFloat(price).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  useEffect(() => {
    getValueFor('user',setUser);
  },[])

  const formattedPrice = formattedPriceZero.replace(/,00$/, "");

  const addHousingToFavorites = () => {
    setLoadingFavorite(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+user.access_token
    }
    axios.post(apiUrl+'add_housing_to_favorites/'+HouseId,{},{
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
        setHeart("heart")
        setColor('red');
      }else if(res.data.status == "removed"){
        Toast.show({
          type : ALERT_TYPE.SUCCESS,
          title : "Başarılı",
          textBody : "Başarıyla ilanı favorilerden kaldırdınız"
        })
        setHeart("hearto")
        setColor('black');
      }
    })
  }
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAlert}
        style={{width:'100%',height:'100%'}}
      >
        <View style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',height:'100%',backgroundColor:'#333',opacity:'.7'}}>
          <View style={{backgroundColor:'red',padding:20,borderRadius:10}}>
            <Text style={{zIndex:999,color:'#fff'}}>İlanı favorilere eklemek istediğinize emin misiniz?</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:10}}>
              <Pressable onPress={() => {setShowAlert(false)}} style={{backgroundColor:'white',paddingTop:5,paddingBottom:5,display:'flex',flexDirection : 'row',justifyContent:'center',marginTop:20, flex : 1,borderRadius:5}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
                  <CloseIcon name="close" style={{fontSize:15,marginRight:3,fontWeight:'bold',display:'block',color:'#EA2B2E'}}/>
                  <Text style={{color:'#EA2B2E',fontWeight:'bold',fontSize:12}}>İptal</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => {addHousingToFavorites()}} style={{backgroundColor:'white',paddingTop:5,paddingBottom:5,display:'flex',flexDirection : 'row',justifyContent:'center',marginTop:20, flex : 1,borderRadius:5}}>
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Realtor details", { houseId: HouseId })
        }
      >
        <View style={styles.container}>
          <View style={styles.İlan}>
            <View style={{ width: "35%" }}>
              <View
                style={{ backgroundColor: "#E54242", padding: 2, width: "90%" }}
              >
                <Text style={{ fontSize: 9, color: "white" }}>42342343243</Text>
              </View>
              <Image
                source={{ uri: image }}
                style={{ width: "90%", height: "90%" }}
              />
            </View>

            <View style={styles.container2}>
              <View style={styles.captionAndIcons}>
                <View style={styles.caption}>
                  <Text style={{ fontSize: 11 }} numberOfLines={3}>
                    {title}
                  </Text>
                </View>
                <View style={styles.ıcons}>
                  <TouchableOpacity onPress={changeBookmark}>
                    <View style={styles.ıconContainer}>
                      <Bookmark
                        name={bookmark}
                        size={15}
                        color={bookmark == "bookmark-o" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowAlert(true)
                    }}
                  >
                    <View style={styles.ıconContainer}>
                      <Heart
                        name={heart}
                        size={15}
                        color={color}
                      />
                    </View>
                  </TouchableOpacity>
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
                  <TouchableOpacity style={styles.addBasket}>
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
              <Info text={m2 + "m2"} />
              <Info text={roomCount} />
              <Info text={floor + "Katlı"} />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.InformationText}>{location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,

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

    justifyContent: "space-between",
  },
  container2: {
    flex: 1,

    display: "flex",
    flexDirection: "column",
  },
  captionAndIcons: {
    height: "50%",

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
    width: "60%",
  },
  ıcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: width > 400 ? 13 : 15,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

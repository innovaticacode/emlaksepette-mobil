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
import Info from "./Info";
import CloseIcon from 'react-native-vector-icons/AntDesign';
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { addDotEveryThreeDigits } from "./methods/merhod";
import { getValueFor } from "./methods/user";
import axios from "axios";
import { apiUrl } from "./methods/apiRequest";
import { Platform } from "react-native";
export default function RealtorPostFavorited({
  title,
  price,
  image,
  location,
  column1,
  column2,
  column3,
  no,
  HouseId,
  setShowAlert,
  projectId,
  setRemoveHouseId,
  setRemoveProjectId,
  isProject,
  setIsProject
}) {
  const navigation = useNavigation();
  const formattedPrice = parseFloat(price);
  const [user,setUser] = useState({});

  const removeItemCollection = () => {
    setShowAlert(true);

    if(isProject){
      setRemoveHouseId(HouseId);
      setRemoveProjectId(projectId);
    }else{
      setRemoveHouseId(HouseId)
    }
  }

  useEffect(() => {
    getValueFor('user',setUser)
  },[])

  

  return (
    <View>
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
                <Text style={{ fontSize: 9, color: "white" }}>{no}</Text>
              </View>
              <Image
                source={{ uri: image }}
                style={{ width: "90%", height: "67%",objectFit:'cover' }}
              />
            </View>

            <View style={styles.container2}>
              <View style={styles.captionAndIcons}>
                <View style={styles.caption}>
                  <Text style={{ fontSize: 13 }} numberOfLines={3}>
                    {title}
                  </Text>
                </View>
                <View style={styles.ıcons}>
                  <TouchableOpacity onPress={() => {removeItemCollection(); if(isProject){setIsProject(true);}else{setIsProject(false)}}} style={{width:'100%'}}>
                    <View style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
                      <View style={styles.removeButton}><CloseIcon style={{color:'#fff'}} size={25} name="close"/></View>
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
                    {addDotEveryThreeDigits(formattedPrice)}₺
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
              <Info text={column1} />
              <Info text={column2} />
              <Info text={column3} />
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
  removeButton: {
    width:35,
    height:35,
    backgroundColor:'red',
    color:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    display:'flex'
  },  
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
});

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { React, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Star from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../../../components/Map";
import ShopComment from "./ShopComment";
import ProfileMap from "./ProfileMap";
import { Skeleton } from "@rneui/themed";
import CommentItem from "../RealtorPages/CommentItem";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
export default function ShopInfo({ data, loading }) {
  const { width, height } = Dimensions.get("window");
  const dateTimeString = data?.data?.created_at;
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Months are zero-based, so we add 1
  const year = dateTime.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  console.log(data?.data.latitude);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleGetDirections = () => {
    // Harita uygulamasını açmak ve seçilen konuma yönlendirme yapmak için openMap fonksiyonunu kullanıyoruz
    if (data?.data?.latitude && data?.data?.longitude) {
      openMap({
        latitude: parseFloat(data?.data?.latitude),
        longitude: parseFloat(data?.data?.longitude),
        query:
          data?.data?.town?.sehir_title +
          "/" +
          data?.data?.district?.ilce_title,
      });
    } else {
      Alert.alert("Hata", "Konum bilgisi bulunamadı.");
    }
  };
  const openWebsite = () => {
    const url = data?.data?.website;
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  
  return (
    <ScrollView
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "#D7D7D7",
            borderRadius: 12,
            gap: 7,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.2 / 2, alignItems: "center" }}>
              <Icon name="infocirlce" size={16} />
            </View>
            <View style={{ flex: 1.6 / 2 }}>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Mağaza Bilgisi
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.2 / 2, alignItems: "center" }}>
              <Star name="verified" size={19} color={"#0275FF"} />
            </View>

            <View style={{ flex: 1.6 / 2 }}>
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: "#0275FF" }}
              >
                Onaylanmış Kurumsal Mağaza
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.2 / 2, alignItems: "center" }}></View>
            <View style={{ flex: 1.6 / 2 }}>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Hesap Oluşturma Tarihi: {formattedDate}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "#D7D7D7",
            borderRadius: 12,
            gap: 7,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.2 / 2, alignItems: "center" }}>
              <Icon2 name="mail" size={17} />
            </View>
            <View style={{ flex: 1.7 / 2 }}>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                E-posta Adresi
              </Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <View style={{ paddingLeft: 9 }}>
              <Text style={{ fontSize: 13, fontWeight: "400" }}>
                {data?.data?.email}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1.5 / 2,
              padding: 9,
              borderWidth: 1,
              borderColor: "#D7D7D7",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              paddingLeft: 17,
              gap: 7,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "600" }}>
              Telefon Numarası
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "400" }}>
              {data?.data?.mobile_phone
                ? data?.data?.mobile_phone
                : "Telefon Numarası Bulunmuyor"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={{}}
            style={{
              flex: 0.5 / 2,
              backgroundColor: "#EA2C2E",
              padding: 11,
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              alignItems: "center",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View style={{ alignItems: "center", gap: 5 }}>
              <Icon name="phone" color={"#fff"} size={15} />
              <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>
                Ara
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1.5 / 2,
              padding: 9,
              borderWidth: 1,
              borderColor: "#D7D7D7",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              paddingLeft: 17,
              gap: 7,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "600" }}>Konum</Text>
            <Text style={{ fontSize: 13, fontWeight: "400" }}>
              {data?.data?.town?.sehir_title +
              "/" +
              data?.data?.district?.ilce_title +
              "/" +
              data?.data?.neighborhood?.mahalle_title
                ? data?.data?.town?.sehir_title +
                  "/" +
                  data?.data?.district?.ilce_title +
                  "/" +
                  data?.data?.neighborhood?.mahalle_title
                : "Konum Bilgisi Bulunmuyor"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleGetDirections}
            style={{
              flex: 0.5 / 2,
              backgroundColor: "#EA2C2E",
              padding: 11,
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              alignItems: "center",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View style={{ alignItems: "center", gap: 5 }}>
              <Icon3 name="map-marker-multiple" color={"#fff"} size={15} />
              <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>
                Yol Tarifi Al
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1.5 / 2,
              padding: 10,
              borderWidth: 1,
              borderColor: "#D7D7D7",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              paddingLeft: 17,
              gap: 7,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "600" }}>Web Sitesi</Text>
            <Text style={{ fontSize: 10, fontWeight: "400" }}>
              {data?.data.website}
            </Text>
          </View>
          <TouchableOpacity
            onPress={openWebsite}
            style={{
              flex: 0.5 / 2,
              backgroundColor: "#EA2C2E",
              padding: 11,
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              alignItems: "center",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View style={{ alignItems: "center", gap: 5 }}>
              <Icon3 name="web" color={"#fff"} size={15} />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Web'e git
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", height: 250, borderRadius: 10 }]}>
          <MapView
            initialRegion={{
              latitude:
                parseFloat(
                  data?.data?.latitude == null ? 38.9637 : data?.data?.latitude
                ) || 0,
              longitude:
                parseFloat(
                  data?.data?.longitude == null
                    ? 35.2433
                    : data?.data?.longitude
                ) || 0,
              latitudeDelta: data?.data?.latitude == null ? 8.0 : 0.0922,
              longitudeDelta: data?.data?.lingitude == null ? 8.0 : 0.0421,
              altidute: 50.03281021118164,
            }}
            style={{ flex: 1, borderRadius: 12 }}
          >
            <Marker
              coordinate={{
                latitude:
                  parseFloat(
                    data?.data?.latitude == null || undefined
                      ? ""
                      : data?.data?.latitude
                  ) || 0,
                longitude:
                  parseFloat(
                    data?.data?.longitude == null || undefined
                      ? ""
                      : data?.data?.longitude
                  ) || 0,
              }}
              title={data?.name}
              description="Proje Konumu"
            />
          </MapView>
        </View>
        {/* <View style={{flexDirection:'row',width:'100%'}}>
   <View style={{borderWidth:1,borderColor:'#D7D7D7',borderRadius:12,gap:7,flexDirection:'row'}}>
         
         <View style={{flexDirection:'row'}}>
         
           <View style={{flex:1.4/2,gap:7,paddingLeft:17,paddingTop:10,paddingBottom:10}}>
               <Text style={{fontSize:13,fontWeight:'600'}}>Telefon Numarası</Text>
               <Text style={{fontSize:13,fontWeight:'600'}}>444 3 278</Text>
           </View>
         
         </View>
        
       
</View>
<View style={{flex:0.6/2}}>
                <TouchableOpacity style={{backgroundColor:'red',height:60,borderTopRightRadius:12,borderBottomRightRadius:12,alignItems:'center',justifyContent:'center'}}>
                  <View>
                    <Icon name="phone" color={'#fff'} size={17}/>
                  </View>
                   <Text style={{color:'#fff'}}>Ara</Text> 
                </TouchableOpacity>
            </View>
   </View> */}

        {/* <View
          style={{
            gap: 8,
          }}
        >
          <View
            style={[
              styles.ınformation,
              { borderRadius: 5 },
              styles.commentArea,
            ]}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "#E92C2A",
                width: width > 400 ? "10%" : "11%",
                left: 10,
                alignItems: "center",
                borderRadius: 100,
              }}
            >
              <Icon name="calendar" size={20} color={"white"} />
            </View>
            <View style={{ gap: 5, left: 20 }}>
              <Text>Katılma Tarihi</Text>
              <Text style={{ fontWeight: "600" }}>{formattedDate}</Text>
            </View>
          </View>

          <View
            style={[
              styles.ınformation,
              { borderRadius: 5 },
              styles.commentArea,
            ]}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "#E92C2A",
                width: width > 400 ? "10%" : "12%",
                height: "70%",
                left: 10,
                alignItems: "center",
                borderRadius: 100,
              }}
            >
              <Icon name="phone" size={20} color={"white"} />
            </View>
            <View style={{ gap: 5, left: 20 }}>
              <Text>İletişim</Text>
              <Text style={{ fontWeight: "600" }}>
                Telefon : {data?.data?.phone} {data?.data?.mobile_phone}
              </Text>
              <Text style={{ fontWeight: "600" }}>
                E-Mail : {data?.data?.email}{" "}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.ınformation,
              { borderRadius: 5 },
              styles.commentArea,
            ]}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "#E92C2A",
                width: width > 400 ? "10%" : "12%",
                height: "100%",
                left: 10,
                alignItems: "center",
                borderRadius: 100,
              }}
            >
              <Icon name="map-pin" size={20} color={"white"} />
            </View>
            <View style={{ gap: 5, left: 20 }}>
              <Text>Konum</Text>
              <Text style={{ fontWeight: "600" }}>
                {data?.data?.town?.sehir_title}/{" "}
                {data?.data?.district?.ilce_title}/{" "}
                {data?.data?.neighborhood?.mahalle_title}
              </Text>
            </View>
          </View>
          <View style={{padding:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:30}}>
          <TouchableOpacity style={{backgroundColor:'#027BFF',padding:10,borderRadius:5,width:'45%'}} 
            onPress={()=>{
              handleGetDirections()
            }}
          >
            <Text style={{textAlign:'center',color:'#fff',fontWeight:'600'}}>Yol Tarifi Al</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#027BFF',padding:10,borderRadius:5,width:'45%'}}
            onPress={openWebsite}
          >
            <Text style={{textAlign:'center',color:'#fff',fontWeight:'600'}}>Web Siteye Git</Text>
          </TouchableOpacity>
          </View>
         

          <View
          style={[
            { width: "100%", height: 250, borderRadius: 10 },
            styles.shadow,
          ]}
        >
          <MapView
            initialRegion={{
              latitude:
                parseFloat(
                  data?.data?.latitude == null ? 38.9637 : data?.data?.latitude
                ) || 0,
              longitude:
                parseFloat(
                  data?.data?.longitude == null
                    ? 35.2433
                    : data?.data?.longitude
                ) || 0,
              latitudeDelta: data?.data?.latitude == null ? 8.0 : 0.0922,
              longitudeDelta: data?.data?.lingitude == null ? 8.0 : 0.0421,
              altidute: 50.03281021118164,
            }}
            style={{ flex: 1 }}
          >
            <Marker
              coordinate={{
                latitude:
                  parseFloat(
                    data?.data?.latitude == null || undefined
                      ? ""
                      : data?.data?.latitude
                  ) || 0,
                longitude:
                  parseFloat(
                    data?.data?.longitude == null || undefined
                      ? ""
                      : data?.data?.longitude
                  ) || 0,
              }}
              title={data?.name}
              description="Proje Konumu"
            />
          </MapView>
       
        </View>
        </View> */}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    height: "auto",
    gap: 10,
  },
  ınformation: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,

    paddingHorizontal: 10,
    width: "100%",

    flexDirection: "row",

    alignItems: "center",
  },
  comment: {
    width: "100%",
    padding: 10,
  },
  commentArea: {
    backgroundColor: "#FFFFFF",

    paddingVertical: 17,
    paddingHorizontal: 5,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
  },
  shadow: {
    backgroundColor: "#FFFFFF",

    paddingVertical: 5,
    paddingHorizontal: 5,
    width: "100%",

    borderWidth: 0.7,
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
  commentPoint: {
    width: "100%",
    backgroundColor: "#ececec",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    borderRadius: 5,
  },
  point: {
    flex: 0.8 / 2,

    display: "flex",
  },
  stars: {
    flex: 1.2 / 2,

    gap: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
  },
  progressText: {
    position: "absolute",
    alignSelf: "center",
    lineHeight: 30,
    color: "white",
  },

  star: {
    top: 3,
  },
});

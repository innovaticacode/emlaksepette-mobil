import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import StarIcon from "react-native-vector-icons/FontAwesome";
import Warning from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
export default function Order({ item }) {
  const date = new Date(item.created_at);
  // Ay isimleri dizisi
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  // Günü, ay ismini ve yılı al
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const cartString = `${item.cart}`;
  // JSON stringini nesneye dönüştür
  const cartObject = JSON.parse(cartString);
  // Image URL'sine eriş
  const imageUrl = cartObject.item.image;

  const navigation = useNavigation();
  const PhotoUrl = "http://192.168.18.31:8000/storage/profile_images/";
  console.log(JSON.parse(item.cart)["item"]["id"]);
  const HouseId = item && item.cart && JSON.parse(item.cart)["item"]["id"];
  const Type = item && item.cart && JSON.parse(item.cart)["type"];
  const Title = item && item.cart && JSON.parse(item.cart)["item"]["title"];
  console.log(Type);
  const { width, height } = Dimensions.get("window");
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() =>
        navigation.navigate("OrderDetail", { OrderId: item.id, id: HouseId })
      }
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: width > 400 ? "24%" : "28%", padding: 2 }}>
          <View style={{ width: 85, height: 85, borderRadius: 1 }}>
            <ImageBackground
              source={{ uri: imageUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
              borderRadius={1}
            />
          </View>
        </View>
        <View style={{ width: "40%", padding: 2 }}>
          <View style={{ gap: 4 }}>
            <Text
              style={{ fontSize: 12, fontWeight: "600", color: "#333" }}
              numberOfLines={1}
            >
              {Title}
            </Text>
            <Text style={{ fontSize: 11, fontWeight: "500", color: "#333" }}>
              Toplam: {item.amount} ₺
            </Text>
            <Text style={{ fontSize: 11, fontWeight: "500", color: "#333" }}>
              {formattedDate}
            </Text>
            <Text style={{ fontSize: 11, fontWeight: "500", color: "#333" }}>
              Sipariş No:{item.id}
            </Text>
            {Type == "project" ? (
              <Text style={{ fontSize: 11, color: "#333" }}>
                İlan No: 1000{HouseId}
              </Text>
            ) : (
              <Text style={{ fontSize: 11, color: "#333" }}>
                İlan No: 2000{HouseId}
              </Text>
            )}
          </View>
        </View>
        <View style={{ width: "35%", padding: 2, gap: 10 }}>
          {item.status == 0 && item.refund == null && (
            <View
              style={{
                backgroundColor: "#FFCE86",
                borderRadius: 20,
                padding: 7,
                flexDirection: "row",
                width: "100%",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeatherIcon name="clock" color={"#FF9908"} size={13} />
              <Text
                style={{
                  color: "#FF9908",
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: "600",
                }}
              >
                Onay Bekliyor
              </Text>
            </View>
          )}
          {item.status == 1 && item.refund == null && (
            <View
              style={{
                backgroundColor: "#70D367",
                flexDirection: "row",
                borderRadius: 20,
                padding: 5,
                flexDirection: "row",
                justifyContent: "center",
                gap: 3,
                alignItems: "center",
              }}
            >
              <FeatherIcon name="check" color={"#4B8F3C"} size={16} />
              <Text
                style={{
                  color: "#4B8F3C",
                  textAlign: "center",
                  fontSize: 11,
                }}
              >
                Onaylandı
              </Text>
            </View>
          )}
          {item.status == 1 && item?.refund?.status == 0 && (
            <View
              style={{
                backgroundColor: "#FFEFCA",
                borderWidth: 1,
                borderColor: "#BEE8B4",
                padding: 2,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "#BC3913",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                İade Onayda
              </Text>
              <FeatherIcon name="clock" color={"#BC3913"} size={16} />
            </View>
          )}
          {item.status == 2 && item?.refund?.status == 1 && (
            <View
              style={{
                backgroundColor: "#D9F9D0",
                borderWidth: 1,
                borderColor: "#BEE8B4",
                padding: 2,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "#4B8F3C",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                İade Edildi
              </Text>
              <FeatherIcon name="check" color={"#4B8F3C"} size={16} />
            </View>
          )}
          {item.status == 1 && item?.refund?.status == 2 && (
            <View
              style={{
                backgroundColor: "#FFE0DB",
                borderWidth: 1,
                borderColor: "#FABCB3",
                paddingLeft: 6,
                paddingRight: 6,
                padding: 4,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  color: "#B81911",
                  textAlign: "center",
                  fontSize: 11,
                }}
              >
                İade reddedildi
              </Text>
              <StarIcon name="close" color={"#B81911"} />
            </View>
          )}

          {item.status == 2 && item.refund == null && (
            <View
              style={{
                backgroundColor: "#FFE0DB",
                borderWidth: 1,
                borderColor: "#FABCB3",
                paddingLeft: 6,
                paddingRight: 6,
                padding: 4,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                overflow: "hidden",
              }}
            >
              <StarIcon name="close" color={"#B81911"} />
              <Text
                style={{
                  color: "#B81911",
                  textAlign: "center",
                  fontSize: 11,
                }}
              >
                Ödeme reddedildi
              </Text>
            </View>
          )}
          <View>
            {item.status == 1 && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#404040",
                  borderRadius: 12,
                  padding: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("Invoice", { OrderId: item.id })
                }
              >
                <Icon4 name="file-invoice" size={12} color={"#404040"} />
                <Text style={{ color: "#404040", fontSize: 11 }}>
                  Faturanız
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
    //     <TouchableOpacity style={style.container}
    //     onPress={() => navigation.navigate("OrderDetail", { OrderId: item.id , id:HouseId})}
    //     >
    //         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    //             <View style={{flexDirection:'row',gap:9}}>

    // <View style={{justifyContent:'space-between'}}>

    // </View>
    //             </View>

    //          <View style={{width:width<400?'30%': '32%',gap:10}}>

    //             <View>

    //             </View>

    //          </View>

    //         </View>
    //     </TouchableOpacity>

    // eski tasarım
    // <TouchableOpacity
    //   onPress={() => navigation.navigate("OrderDetail", { OrderId: item.id , id:HouseId})}
    // >
    //   <View style={style.container}>
    //     <View style={style.InfoDateButton}>
    //       <View style={style.Info}>
    //         <Text style={{color:'grey'}}>{formattedDate} </Text>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text>Toplam: </Text>
    //           <Text style={{ color: "green" }}> {item.amount} ₺ </Text>

    //         </View>
    //       </View>
    //       <View style={style.Button}>
    //         <Text style={{ color: "green", fontSize: 13 }}>Detaylar</Text>
    //         <Icon name="arrow-right" color={"green"} size={10} />
    //       </View>
    //     </View>

    //     <View style={style.PhotoAndComment}>
    //       <View
    //         style={{
    //           display: "flex",
    //           width: "100%",
    //         }}
    //       >
    //         <View
    //           style={{ flexDirection: "row", justifyContent: "space-between" }}
    //         >
    //           <View style={{flexDirection:'row',gap:10}}>
    //           <View style={{ height: 80, width: 80 ,flexDirection:'row'}}>

    //           </View>
    //           <View style={{gap:5}}>
    //             <Text style={{fontSize:12,color:'#333'}}>Sipariş No: {item.id}</Text>

    //           </View>
    //           </View>

    // <View
    //   style={{
    //     gap: 10,
    //     width: "35%",
    //     justifyContent: "space-between",
    //   }}
    // >

    //             <View
    //               style={{
    //                 flexDirection: "row",
    //                 gap: 10,
    //                 alignItems: "center",
    //                 justifyContent: "flex-end",
    //               }}
    //             >
    //               <Text style={{ fontSize: 13, color: "#333" }}>
    //                 {item?.user?.name}
    //               </Text>
    //               <View style={{ width: 35, height: 35 }}>
    //                 <ImageBackground
    //                   source={{
    //                     uri: `${PhotoUrl}${item?.user?.profile_image}`,
    //                   }}
    //                   style={{ width: "100%", height: "100%" }}
    //                   borderRadius={20}
    //                 />
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //       </View>

    //       <View
    //         style={{
    //           gap: 9,
    //           marginTop: 5,
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         {/* <View style={{justifyContent:'flex-end'}} >

    //         </View> */}
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",

    padding: 10,
    borderWidth: 1.5,
    borderRadius: 5,
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
  InfoDateButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  PhotoAndComment: {
    padding: 10,
    display: "flex",
  },
  Info: {
    gap: 5,
  },
  Button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";
import { Platform } from "react-native";
export default function EditCollectionPost({ item }) {
  console.log(item);

  if (item.item_type == 1) {
    console.log(item);
    var itemData = {
      price: addDotEveryThreeDigits(item.project_values["price[]"]),
      advertise_title: item.project_values["advertise_title[]"],
      image: item.project_values["image[]"],
      earning: parseInt(item.project_values["price[]"]) / 100,
    };
  } else {
    if (item?.housing?.housing_type_data) {
      var itemData = {
        price: addDotEveryThreeDigits(
          JSON.parse(item.housing.housing_type_data).price
        ),
        advertise_title: item.housing.title,
        image: JSON.parse(item.housing.housing_type_data).image,
        earning:
          parseInt(JSON.parse(item.housing.housing_type_data).price) / 100,
      };
    } else {
      var itemData = {
        price: 0,
        advertise_title: "",
      };
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <View style={{ flex: 0.5 / 2, padding: 1, height: 90 }}></View>
        <View style={{ flex: 1.1 / 2, padding: 1 }}>
          <View style={{ flex: 1 / 2 }}>
            <Text style={{ fontSize: 13 }} numberOfLines={2}>
              {itemData.advertise_title}
            </Text>
          </View>
          <View
            style={{
              flex: 1 / 2,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "50%", gap: 4 }}>
              <Text
                style={{ fontSize: 13, textAlign: "center", color: "#333" }}
              >
                Fiyat
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 13, color: "#298A1D" }}
              >
                {itemData.price}₺
              </Text>
            </View>

            <View style={{ width: "50%", gap: 4 }}>
              <Text
                style={{ fontSize: 13, textAlign: "center", color: "#333" }}
              >
                Kazanç
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 13, color: "#32B31F" }}
              >
                {addDotEveryThreeDigits(itemData.earning)}₺
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.4 / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#E54242",
              width: "100%",
              padding: 8,
              borderRadius: 6,
            }}
          >
            <Text style={{ textAlign: "center", color: "#ffffff" }}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 10,
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
  post: {
    flexDirection: "row",
    padding: 10,
    height: "100%",
  },
});

{
  /* <View style={styles.post}>
<View style={{flex:0.6/2,padding:5}}>
   <Image source={{uri: `https://test.emlaksepette.com/project_housing_images/${itemData.image}`}} style={{width:'100%',height:'100%'}}/>
</View>


<View style={{flex:1.4/2 ,padding:5}}>
   <View style={{flex:1.6/2,padding:0, flexDirection:'row'}}>
        <View style={{flex:1.4,}}>
            <Text style={{}}  numberOfLines={3}>
                <Text>{itemData.advertise_title}</Text>
            </Text>
        </View>
        <TouchableOpacity style={{flex:0.6/2,alignItems:"center",justifyContent:"center"}}>
        <View>
                <Icon name='trash' size={23} color={'#ED2000'}/>
        </View>
        </TouchableOpacity>
   </View>
   <View style={{flex:0.4,padding:0,flexDirection:'row',justifyContent:'space-evenly'}}>
            <View style={{paddingLeft:7,paddingRight:7,padding:4,borderRadius:5}} >
                <Text style={{textAlign:'center',fontWeight:'500',color:'#008001',}}>{itemData.price}₺</Text>
            </View>
            <View style={{paddingLeft:7,paddingRight:7,padding:4,borderRadius:5}}>
                <Text style={{textAlign:'center',fontWeight:'500',color:'#387F2A'}}>{addDotEveryThreeDigits(itemData.earning)}₺</Text>
            </View>
   </View>
</View>




</View> */
}

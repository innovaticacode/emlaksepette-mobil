import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Dot from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
export default function CollectionsItem({
  openBottom,
  projectItems,
  disabled,
  shareWp,
  copy,
  item,
  getId,
  name
}) {
  const navigation = useNavigation();
  const [collectionItems,setCollectionItems] = useState([]);
  const getCollectionItems = () => {
    var collectionItemsTemp = [];
    for(var i = 0 ; i < projectItems.length; i++){
      if(projectItems[i].collection_id == item.id){
        collectionItemsTemp.push(projectItems[i]);
      }
    }
    setCollectionItems(collectionItemsTemp);
  }

  useEffect(() => {
    getCollectionItems()
  },[projectItems])

  return (
    <View style={{ alignItems: "center" }}>
      <View style={style.container}>
        <View style={style.header}>
          <View
            style={{
              flex: 1 / 2,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Dot name="eye" size={17} color={"#EA6361"} />
            <Text style={{ color: "#EA6361" }}>{item.clicks.length} Görüntülenme</Text>
          </View>
          <View style={{ flex: 1 / 2, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={()=>{
              openBottom()
              getId(item.id,item.name)
            }} >
              <Dot name="dots-three-vertical" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ padding: 20, gap: 10,flex:1/2 }}>
            <View style={{ flexDirection:'row', gap: 5 }}>
              <Text>Koleksiyon Adı:</Text>
              <Text style={{ color: "#EA6361" }} numberOfLines={2}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text>İlan Sayısı:</Text>
              <Text style={{ color: "#EA6361" }}>{item.links.length}</Text>
            </View>
          </View>
        
        </View>
        <View style={{ gap: 10 }}>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#FFEFCA",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
              onPress={() => {
                navigation.navigate("EditColection",{collectionItems:collectionItems});
              }}
            >
              <Icon name="pencil" size={15} color={"#BD3803"} />
              <Text
                style={{
                  textAlign: "center",
                  color: "#BD3803",
                  fontWeight: "500",
                }}
              >
                DÜZENLE
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#C7EBFF",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                navigation.navigate("SeeColleciton");
              }}
            >
              <Dot
                name="eye"
                size={15}
                style={{ textAlign: "center" }}
                color={"#025787"}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "#025787",
                  fontWeight: "500",
                }}
              >
                ÖNİZLE
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#DAFBD0",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                copy();
              }}
            >
              <Icon2 name="copy" size={15} color={"#1F6F11"} />
              <Text
                style={{
                  textAlign: "center",
                  color: "#1F6F11",
                  fontWeight: "600",
                }}
              >
                LİNKİ KOPYALA
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#DAFBD0",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                shareWp();
              }}
            >
              <Icon3 name="whatsapp" size={15} color={"#1F6F11"} />
              <Text
                style={{
                  textAlign: "center",
                  color: "#1F6F11",
                  fontWeight: "600",
                }}
              >
                WHATSAPPTA PAYLAŞ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",

    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "95%",
    marginVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    // ...Platform.select({
    //   ios: {
    //     shadowColor: " #e6e6e6",
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 5,
    //   },
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    padding: 10,
  },
});

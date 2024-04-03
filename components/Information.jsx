import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SettingsItem from "./SettingsItem";
import { useRoute } from "@react-navigation/native";
import ShoppinInfo from "./ShoppinInfo";
import CheckIcon from "react-native-vector-icons/AntDesign";
import { CheckBox } from "react-native-elements";
import CheckSetting from "./CheckSetting";
export default function Information({ settings }) {
  const route = useRoute();
  const { itemId, otherParam, konum } = route.params;
  console.log(settings.projectHousingsList[1]["price[]"]);

  function veriParseEt(veri) {
    try {
      // Veriyi JSON olarak parse et
      var jsonVeri = JSON.parse(veri);
      return true;
    } catch (hata) {
      // Eğer veri JSON formatında değilse, hata alırız
      return false;
      // Burada başka bir işlem yapabiliriz, örneğin orijinal veriyi geri döndürebiliriz
      // veya hiçbir işlem yapmayabiliriz.
    }
  }

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
      <View style={[styles.card, styles.shadowProp]}>
        {settings.projectHousingSetting.map((setting,index) => {
          if (!setting.is_array) {
            if (settings.projectHousingsList[1][setting.column_name + "[]"]) {
              return (
              
                  <SettingsItem
                  key={index}
                    info={setting.label}
                    numbers={
                      settings.projectHousingsList[1][
                        setting.column_name + "[]"
                      ]
                    }
                  />
             
              );
            }
          } else {
          }
        })}
        <View>
          {settings.projectHousingSetting.map((setting,index) => {
            if (setting.is_array) {
              if (settings.projectHousingsList[1][setting.column_name + "[]"]) {
                if (
                  veriParseEt(
                    settings.projectHousingsList[1][setting.column_name + "[]"]
                  )
                ) {
                  var arrayData = JSON.parse(
                    settings.projectHousingsList[1][setting.column_name + "[]"]
                  );

                  if (arrayData.length > 0) {
                    return (
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View key={setting.id} style={{}}>
                          <Text>{setting.label}</Text>
                        <View key={setting.id} style={{marginTop:10,display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                        
                          {arrayData.map((arrayD,index2)=> {
                            return (
                              <View style={{ display: "flex" }}>
                                <CheckSetting text={arrayD} />
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  }
                }
              }
            } else {
            }
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 6,
    width: "100%",

    height: "auto",
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
});

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { React } from "react";
import { useRoute } from "@react-navigation/native";
import SettingsItem from "../../../components/SettingsItem";
import ShoppinInfo from "../../../components/ShoppinInfo";
import CheckSetting from "../../../components/CheckSetting";

export default function Settings({ data }) {
  const route = useRoute();
  console.log(data?.housingSetting['is_array'] + "dsfdsfdgdfgd");
  return (
    <View style={{ paddingRight: 8, paddingLeft: 8 }}>
      <View style={[styles.card, styles.shadowProp]}>
      {
        data.housingSetting.map((housingS) => {
          if(housingS.is_array){
            return Object.keys(data.labels).map((label, index) => {
                if(housingS.label == label){
                  return(
                    <View key={index}>
                      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
                      <View>
                        { data.labels[label].map((item, idx) => (
                          <CheckSetting text={item} key={idx}/>
                      
                        ))}
                      </View>
                    </View>
                  )
                }
              })
            
          }
        })
      }

        {/* <SettingsItem info='Kullanım Durumu' numbers='Boş'/>
        <SettingsItem info='m2 (Brüt:)' numbers='90'/>
        <SettingsItem info='m2 (Net):' numbers='90'/>
        <SettingsItem info='Bina Yaşı:' numbers='0'/>
        <SettingsItem info='Isıtma:' numbers='Doğalgaz Sobası'/>
        <SettingsItem info='Banyo Sayısı:' numbers='1'/>
        <SettingsItem info='Eşyalı:' numbers='Hayır'/>
        <SettingsItem info='Krediye Uygun:' numbers='Evet'/>
        <SettingsItem info='Tapı Durumu:' numbers='Hisseli Tapu'/>
        <SettingsItem info='Bahçe Metrekaresi:' numbers='100'/>
        <SettingsItem info='Eşyalı' numbers='Evet'/>
        <SettingsItem info='Banyo Sayısı' numbers='1'/>
        <SettingsItem info='Kullanım Durumu' numbers='Boş' border='0'/> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    paddingVertical: 8,
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
  Info: {
    width: "100%",
    bottom: 20,
  },
});

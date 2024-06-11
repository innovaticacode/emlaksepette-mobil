import { View, Text, ScrollView, StyleSheet } from "react-native";
import { React } from "react";
import { useRoute } from "@react-navigation/native";
import SettingsItem from "../../../components/SettingsItem";
import ShoppinInfo from "../../../components/ShoppinInfo";
import CheckSetting from "../../../components/CheckSetting";
import { Shadow } from 'react-native-shadow-2';
import { Platform } from "react-native";
export default function Settings({ data }) {
  const route = useRoute();

  return (
    <View style={{  }}>
    <Shadow style={{width:'100%'}}>
      <View key={0}>
  <SettingsItem info="İlan No" numbers={parseInt(data.housing.id) + 2000000}/>
</View>

        {Object.keys(data.labels).map((item, idx) => {
          if (data.labels[item].length == 1 && item != "Peşin Fiyat" && item != "Fiyat" && item != "Günlük Fiyat") {
            return(
              <View key={idx}>
              <SettingsItem info={item} numbers={data.labels[item]} />
            </View>
            )
           
          }

         
          
    
        })}

      

        {data.housingSetting.map((housingS) => {
          if (housingS.is_array) {
            return Object.keys(data.labels).map((label, index) => {
              if (housingS.label == label) {
                return (
                  <View key={index} style={{ margin: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>{label}</Text>
                    <View style={{}}>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          width: "100%",
                          marginTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        {data.labels[label].map((item, idx) => (
                          <View key={idx} style={{ width: "50%" }}>
                            <CheckSetting text={item} />
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                );
              }
            });
          }
        })}

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
    </Shadow>
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

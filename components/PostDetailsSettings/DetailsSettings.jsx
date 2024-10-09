import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import SettingsItem from "../SettingsItem";
import { useRoute } from "@react-navigation/native";
import CheckSetting from "../CheckSetting";
import { Platform } from "react-native";
export default function DetailsSettings({ data, HomeId }) {
  const route = useRoute();
  const {} = route.params;
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
  } const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <View style={[styles.card, styles.shadowProp]}>
       <SettingsItem info={'İlan No'} numbers={'1000'+data?.project?.id + '-' + HomeId} fontWeight={500}/>
       <SettingsItem info={'İlan Tarihi'} numbers={formatDate(data?.project?.created_at)} fontWeight={500}/>
       <SettingsItem info={'İş'} numbers={data?.project?.user?.phone} fontWeight={500}/>
       <SettingsItem info={'Cep'} numbers={data?.project?.user?.mobile_phone} fontWeight={500}/>
       <SettingsItem info={'E-Posta'} numbers={data?.project?.user?.email} fontWeight={500}/>
       <SettingsItem info={'Mağaza'} numbers={data?.project?.user?.name} fontWeight={500}/>
      {data.projectHousingSetting.map((setting, index) => {
        if (!setting.is_array) {
          if (
            data.projectHousingsList[HomeId ? HomeId : 1][
              setting.column_name + "[]"
            ]
            && 
            data.projectHousingsList[HomeId ? HomeId : 1][
              setting.column_name + "[]"] !=='[]'
            
          ) {
            return (
              <SettingsItem
                key={index}
                info={setting.label}
                numbers={
                  setting.label=='Krediye Uygun'?
                  JSON.parse(data.projectHousingsList[HomeId][setting.column_name + "[]"]):
                  data.projectHousingsList[HomeId][setting.column_name + "[]"]
                }
                fontWeight={500}
              />
            );
          }
        } else {
        }
      })}
     <SettingsItem info={'Ada'} numbers={data?.project?.island} fontWeight={500}/>
      <SettingsItem info={'Parsel'} numbers={data?.project?.parcel} fontWeight={500}/>
      <SettingsItem info={'Başlangıç tarihi'} numbers={formatDate(data?.project?.start_date)} fontWeight={500}/>
      <SettingsItem info={'Bitiş Tarihi'} numbers={formatDate(data?.project?.project_end_date)} fontWeight={500}/>
      <SettingsItem info={'Toplam Proje Alanı m2'} numbers={data.project.total_project_area ?data.project.total_project_area :'Belirtilmedi' } fontWeight={500}/>
      <View>
        {data.projectHousingSetting.map((setting, index) => {
          if (setting.is_array) {
            if (
              data.projectHousingsList[HomeId ? HomeId : 1][
                setting.column_name + "[]"
              ]
            ) {
              if (
                veriParseEt(
                  data.projectHousingsList[HomeId ? HomeId : 1][
                    setting.column_name + "[]"
                  ]
                )
              ) {
                var arrayData = JSON.parse(
                  data.projectHousingsList[HomeId ? HomeId : 1][
                    setting.column_name + "[]"
                  ]
                );

                if (arrayData.length > 0) {
                  return (
                    <View style={{ margin: 10, marginTop: 20 }} key={index}>
                      <Text style={{ color: "black", fontWeight: "700", fontSize: 12 }}>
                        {setting.label}
                      </Text>
                      <View
                        key={setting.id}
                        style={{
                          marginTop: 10,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        {arrayData.map((arrayD, index2) => {
                          return (
                            <View
                              style={{
                                width: "50%",
                                marginTop: 10,
                                display: "flex",
                              }}
                              key={index2}
                            >
                              <View>
                                <CheckSetting text={arrayD} />
                              </View>
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

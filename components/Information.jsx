import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SettingsItem from "./SettingsItem";
import { useRoute } from "@react-navigation/native";
import CheckIcon from "react-native-vector-icons/AntDesign";
import { CheckBox } from "react-native-elements";
import CheckSetting from "./CheckSetting";
import { Platform } from "react-native";
export default function Information({ settings }) {
  const route = useRoute();
  const { itemId, otherParam, konum } = route.params;

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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const formatPhoneNumber = (phoneNumber) => {
    // Sadece sayıları alır
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
    // Eğer numara yeterince uzun değilse olduğu gibi döner
    if (cleaned.length !== 10 && cleaned.length !== 11) {
      return phoneNumber;
    }
  
    // 0 ile başlayan 10 haneli numara için
    if (cleaned.length === 10) {
      return `0 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
    }
  
    return phoneNumber; // Şartlar sağlanmazsa orijinal numarayı döner
  };
  return (
    <View style={[styles.card, styles.shadowProp]}>
       <SettingsItem info={'İlan No'} numbers={'1000'+settings?.project?.id} fontWeight={500}/>
       <SettingsItem info={'İlan Tarihi'} numbers={formatDate(settings?.project?.created_at)} fontWeight={500}/>
       <SettingsItem info={'Kimden'} numbers={settings?.project?.user?.name} fontWeight={500}/>
       <SettingsItem info={'İş'} numbers={settings?.project?.user?.phone} fontWeight={500}/>
       <SettingsItem info={'Cep'} numbers={settings?.project?.user?.mobile_phone} fontWeight={500}/>
       <SettingsItem info={'Mağaza'} numbers={settings?.project?.user?.name} fontWeight={500}/>
      {settings.projectHousingSetting.map((setting, index) => {
        if (!setting.is_array) {
          if (settings.projectHousingsList[1][setting.column_name + "[]"] && settings.projectHousingsList[1][setting.column_name + "[]"] !=='[]') {
            return (
              setting.label!=='Krediye Uygun' &&
              <SettingsItem
                key={index}
                info={setting.label}
                numbers={
                  
                  settings.projectHousingsList[1][setting.column_name + "[]"] 
                 
                  
                }
                fontWeight={500}
              />
            );
          }
        } else {
        }
      })}
    
      <SettingsItem info={'İl-İlçe-Mahalle'} numbers={settings?.project?.city?.title + ' / ' + settings?.project?.county?.ilce_title + ' / ' + settings?.project?.neighbourhood?.mahalle_title} fontWeight={500}/>
      <SettingsItem info={'Yapımcı Firma'} numbers={settings?.project?.create_company} fontWeight={500}/>
      <SettingsItem info={'Ada'} numbers={settings?.project?.island} fontWeight={500}/>
      <SettingsItem info={'Parsel'} numbers={settings?.project?.parcel} fontWeight={500}/>
      <SettingsItem info={'Başlangıç tarihi'} numbers={formatDate(settings?.project?.start_date)} fontWeight={500}/>
      <SettingsItem info={'Bitiş Tarihi'} numbers={formatDate(settings?.project?.project_end_date)} fontWeight={500}/>
      <SettingsItem info={'Toplam Konut Sayısı'} numbers={settings?.toplamSayi} fontWeight={500}/>
      <SettingsItem info={'Satışa Açık Konut Sayısı'} numbers={settings?.satisaAcikSayi} fontWeight={500}/>
      <SettingsItem info={'Satılan Konut Sayısı'} numbers={settings?.satilanSayi} fontWeight={500}/>
      <SettingsItem info={'Satışa Kapalı Konut Sayısı'} numbers={settings?.satisaKapali} fontWeight={500}/>
      <SettingsItem info={'Toplam Proje Alanı m2'} numbers={settings.project.total_project_area ?settings.project.total_project_area :'Belirtilmedi' } fontWeight={500}/>
     
      <View>
        {settings.projectHousingSetting.map((setting, index) => {
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
                    <View style={{ margin: 10, marginTop: 20 }} key={index}>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontSize: 12,
                        }}
                      >
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

import { View, Text , StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import SettingsItem from '../SettingsItem'
import ShoppinInfo from '../ShoppinInfo'
import { useRoute } from '@react-navigation/native';
import CheckSetting from '../CheckSetting';
export default function DetailsSettings({data,roomOrder}) {
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
    }
  return (
    <View style={{padding:8}}>
   
 
    <View style={[styles.card, styles.shadowProp]}>
        {data.projectHousingSetting.map((setting,index) => {
          if (!setting.is_array) {
            if (data.projectHousingsList[roomOrder ? roomOrder : 1][setting.column_name + "[]"]) {
              return (
              
                  <SettingsItem
                  key={index}
                    info={setting.label}
                    numbers={
                 data.projectHousingsList[1][
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
          {data.projectHousingSetting.map((setting,index) => {
            if (setting.is_array) {
              if (data.projectHousingsList[roomOrder ? roomOrder : 1][setting.column_name + "[]"]) {
                if (
                  veriParseEt(
                  data.projectHousingsList[roomOrder ? roomOrder : 1][setting.column_name + "[]"]
                  )
                ) {
                  var arrayData = JSON.parse(
                   data.projectHousingsList[roomOrder ? roomOrder : 1][setting.column_name + "[]"]
                  );

                  if (arrayData.length > 0) {
                    return (
                      
                      <View style={{margin:10}} key={index}>
                          <Text>{setting.label}</Text>
                        <View key={setting.id} style={{marginTop:10,display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                        
                          {arrayData.map((arrayD,index2)=> {
                            return (
                              <View style={{width:'50%',marginTop:10,display:'flex',}}key={index2}>
                                <View>
                                  <CheckSetting text={arrayD} />
                                
                                </View>
                              </View>
                            ) 
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
  )
  
}
const styles=StyleSheet.create({
  card: {  
      
    backgroundColor: '#FFFFFF',  
     top:-20,
    paddingVertical: 10,  
    paddingHorizontal: 5,  
    width: '100%',  
    marginVertical: 10,  
    height:'auto',
    borderWidth:0.7,
    borderColor:'#e6e6e6',
    ...Platform.select({
        ios: {
          shadowColor: ' #e6e6e6',
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
        
      width: '100%',
      top: -35,
    
    }
  })
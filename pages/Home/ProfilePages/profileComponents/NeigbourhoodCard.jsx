import { View, Text,StyleSheet, TouchableOpacity,Linking, ImageBackground } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
export default function NeigbourhoodCard({NeigBourHoodInfo,project,projectInfo}) {
    const handleOpenPhone = () => {
        // Telefon uygulamasını açmak için
        Linking.openURL(`tel:+90${NeigBourHoodInfo.mobile_phone}`);
      };
      const formatPhoneNumber = (value) => {
        // Sadece rakamları al
        const cleaned = ("" + value).replace(/\D/g, "");
    
        // 0 ile başlıyorsa, ilk karakteri çıkar
        const cleanedWithoutLeadingZero = cleaned.startsWith("0")
          ? cleaned.substring(1)
          : cleaned;
    
        let formattedNumber = "";
    
        for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
          if (i === 0) formattedNumber += "(";
          if (i === 3) formattedNumber += ") ";
          if (i === 6 || i === 8) formattedNumber += " ";
          formattedNumber += cleanedWithoutLeadingZero[i];
        }
    
        return formattedNumber;
      };
      const apiUrl = "https://private.emlaksepette.com";
      console.log(project)
      const navigation =useNavigation()
  return (
    <View style={styles.contain}>
        <View style={{padding:17,gap:20}}>
        <View style={{flexDirection:'row',gap:13,alignItems:'center'}}>
            <View style={{width:90,height:90,backgroundColor:'red',borderRadius:5}}>
                    <ImageBackground 
                            source={{uri:`${apiUrl}/${projectInfo.image.replace(
                                "public/",
                                "storage/"
                              )}`}}
                              style={{width:'100%',height:'100%'}}
                              borderRadius={5}
                    />
            </View>
            <View style={{gap:4}}>
                    <View style={{gap:1}}>
                        <Text style={styles.header}>Mülk Sahibi Adı</Text>
                        <Text style={styles.Text}>{NeigBourHoodInfo.name}</Text>
                    </View>
                    <View style={{gap:1}}>
                        <Text style={styles.header}>Mülk Sahibi Telefonu</Text>
                        <Text style={styles.Text}> { formatPhoneNumber(NeigBourHoodInfo.mobile_phone)}</Text>
                    </View>
                    <View style={{gap:1}}>
                        <Text style={styles.header}>Konut Bilgisi</Text>
                        <Text style={styles.Text}>{
                            NeigBourHoodInfo && project &&
                            JSON.parse(project)['item']['title'] + ' '+
                            JSON.parse(project)['item']['housing'] 
} {""}No'lu İlan </Text>
                    </View>
            </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity
                onPress={()=>{
                    handleOpenPhone()
                }}
            style={{
                backgroundColor:'#10A958',
                width:'45%',
                padding:6,
                borderRadius:6,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',gap:10
            }}>
                <Icon name='phone' color={'#fff'}/>
                <Text style={{color:'#FFFFFF',textAlign:'center'}}>
                    Komşumu Ara
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('PostDetails',{HomeId: JSON.parse(project)['item']['housing'] , projectId:projectInfo.id})
                }}
            style={{
                backgroundColor:'#000000',
                width:'45%',
                padding:6,
                borderRadius:6,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',gap:10
            }}>
                     <Icon name='eye' color={'#fff'}/>
                <Text style={{color:'#FFFFFF',textAlign:'center'}}>
                    İlanı Görüntüle 
                </Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    contain:{
    
      
        backgroundColor: '#FFFFFF',  
        borderRadius: 12,  
        
        width: '100%',  
     
       
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
    Text:{
        color:'#333',
        fontSize:11,
        fontWeight:'600'
    },
    header:{
        fontSize:12,
        fontWeight:'300'
    }
})
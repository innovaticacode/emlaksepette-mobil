import { View, Text ,TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import CategoryAdverts from '../ProjectAdvertsAdd/CategoryAdverts'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
export default function AdvertType() {
 const navigation=useNavigation()
 const route=useRoute()
 const {name,previousName}=route.params;
    const businessTypes = [
        "Büro & Ofis",
        "Dükkan Mağaza",
        "Fabrika",
        "İmalathane",
        "Atölye",
        "İş Hanı",
        "Avm",
        "Komple Bina",
        "Plaza",
        "Depo & Antrepo",
        "Kantin",
        "Pastane & Fırın",
        "Düğün Salonu",
        "Çiftlik",
        "Otopark",
        "Restoran & Lokanta",
        "Büfe"
      ]
  return (
    <View style={[{backgroundColor:'white',flex:1}]}>
         <View style={[styles.Card,{paddingVertical:11,paddingHorizontal:15,flexDirection:'row',alignItems:'center',gap:10}]}>
            <View style={{backgroundColor:'#ebebeb4d',padding:10,borderRadius:'50%'}}>
            <Icon name='home' color={'red'} size={17}/>
            </View>
          
            <Text style={{fontWeight:'bold',fontSize:12}}>{previousName + ' > ' + name}</Text>
        </View>

      
      <FlatList
      data={businessTypes}
      renderItem={({ item,index }) => (
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('RealtorAdd',{name:item ,beforeName:previousName,antesName:name})}>
        <CategoryAdverts text={item} key={index}/>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  )
}
const styles=StyleSheet.create({
    Card:{
        backgroundColor: '#FFFFFF',  
        borderRadius: 10,  
        paddingVertical: 22,  
        paddingHorizontal: 5,  
        width: '100%',  
        marginVertical: 10,  
      
        borderWidth:0.7,
        borderColor:'#CED4DA',
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
   
})
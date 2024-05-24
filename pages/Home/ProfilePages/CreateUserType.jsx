import { View, Text, StyleSheet ,TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { useRoute  } from '@react-navigation/native';
import Checkbox from './profileComponents/Checkbox';
import Users from './profileComponents/Users';
import { Platform } from "react-native";
export default function CreateUserType() {
  const route = useRoute();
  const { header,hidden,hidden2} = route.params;

    const ızın=[
        {
          'title':'Satış Temsilcisi'
        },
        {
          'title':'Satış Departmanı'
        },
        {
          'title':'Satış Danışmanı'
        },
      
     



    ]

  return (
    <ScrollView style={{backgroundColor:'white',}}>
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={[styles.InputArea,{display:hidden }]}>
        <Text style={[styles.label]}>Kullanıcı Rolü Belirle</Text>
      <TextInput style={styles.Input} placeholder= 'Rol'/>
      </View>
      <View style={{display:hidden }}>
        <Text style={styles.label}>İzinler</Text>
        <View style={{gap:10}}>
          {ızın.map((item,index)=>(
         <Checkbox title={item.title} key={index}/>
          ))}
      
        </View>
       
       
      </View>
      <View style={{width:'100%',alignItems:'center',display:hidden }}>
      <TouchableOpacity style={{backgroundColor:'#EA2A29',padding:13,width:'50%',borderRadius:10}}>
                <Text style={[styles.label2,{color:'white',textAlign:'center',fontSize:16}]}>Kaydet</Text>
      </TouchableOpacity>
      </View>
      <View style={[styles.userContainer,{display:hidden2}]}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>
          <Text>Kullanıcı Tipi</Text>
          <Text>İşlemler</Text>
        </View>
      {ızın.map((item,index)=>(
           <Users name={item.title} key={index}/>
          ))}
    
      </View>
    
    </View>
    </TouchableWithoutFeedback>
   
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      padding:16,
      backgroundColor:'white',
      gap:20
    },
    InputArea:{
      width:'100%',
        gap:10,
      padding:10
    },
    Input:{
      padding:15,
      backgroundColor:'transparent',
      borderRadius:20,
      fontSize:15,
      borderWidth:2,
      borderColor:'#ebebeb'
    },
    label:{
      fontSize:14,
      bottom:5,
      left:6,
      fontWeight:'300',
      letterSpacing:0.5,
    
    },
    label2:{
      fontSize:14,
     
      fontWeight:'300',
      letterSpacing:0.5,
    
    },
    userContainer:{
      backgroundColor: '#FFFFFF',  
      borderRadius: 10,  
      paddingVertical: 22,  
      paddingHorizontal: 10,  
      width: '100%',  
      marginVertical: 10,  
      gap:10,
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

    }
})
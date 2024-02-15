import { View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
export default function ProjectPost({caption,ımage,location}) {
    const navigation = useNavigation();
   
  return (
    <TouchableOpacity style={{marginTop:10}} onPress={() =>  navigation.navigate('Details', { 
       otherParam: caption,
       konum:location ,
       ımage:ımage})}>

        
    <View style={styles.container}>
      <View style={styles.ProjectPost}>
                <View style={styles.ımageBackground}>
                        <ImageBackground source={ımage} 
                         style={{ width: '100%', height: '100%' }}/>
                </View>
                <View style={styles.captionArea}>
                    <View>
                      <Text style={{fontSize:12,fontWeight:'500' }}>{caption}</Text>
                      </View>
                    <View>
                        <Text style={{fontSize:11,fontWeight:'300'}}>{location}</Text>
                    </View>
                </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    container:{
            width:'100%',
            height:90,
            alignItems:'center',
            top:8,
            marginTop:10,
          
    },
    ProjectPost:{
        width:'95%',
        height:'100%',
        borderWidth:1,
          
           
            borderColor:'#EBEBEB',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    ımageBackground:{
        width:'35%',
        height:'100%'
    },
    captionArea:{
        display:'flex',
        flexDirection:'column',
         width:'60%',
        gap:10,
         justifyContent:'center'
    },
  
})
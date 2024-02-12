import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
export default function ProjectPost({caption,ımage,location}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate("Details")}>
    <View style={styles.container}>
      <View style={styles.ProjectPost}>
                <View style={styles.ımageBackground}>
                        <ImageBackground source={ımage} 
                         style={{ width: '100%', height: '100%' }}/>
                </View>
                <View style={styles.captionArea}>
                    <View><Text>{caption}</Text></View>
                    <View>
                        <Text>{location}</Text>
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
            
            top:8,
            marginTop:10,
            borderWidth:2,
            padding:5,
            borderColor:'#EBEBEB'
    },
    ProjectPost:{
        width:'90%',
        height:'100%',
      
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
       
         justifyContent:'center'
    }
})
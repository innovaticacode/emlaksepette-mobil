import { View, Text, StyleSheet,Image,Dimensions} from 'react-native'
import React from 'react'
import ShoppinInfo from '../ShoppinInfo'

export default function PostFloorPlan() {
  return (
    <View style={{padding:7}}>
    <View style={styles.container}>
      <View style={{
        width:'100%',
        
        backgroundColor:'#EA2C2E',
        paddingLeft:15,
        padding:10,
        justifyContent:'center'
      }}>
        <Text style={{
            color:'white',
            fontSize:12,
            fontWeight:'600'
        }}>Vaziyet planı belirtilmedi</Text>
      </View>
      <View style={styles.ImageDiv}>
            <Image source={require('../images/KatPlanı.jpeg')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>
      </View>
    </View>
    <View style={{bottom:15}}>
      <ShoppinInfo/>
        
        </View>
    </View>
  )
}
const { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
        width:'100%',
      
        top:-10,
                
        backgroundColor: '#FFFFFF',  
       
        paddingVertical: 10,  
        paddingHorizontal: 5,  
        width: '100%',  
       
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
    ImageDiv:{
        width:width>400?'100%':'100%',
        height:width>400 ?'60%':'60%',
        bottom:width>400?0:20
    }
})
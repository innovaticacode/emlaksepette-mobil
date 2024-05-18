import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/Entypo';
export default function SubUser({setModalVisible, item,GetId}) {
  return (
    <View style={styles.card} >
        <View style={{flexDirection:'column'}}>
    
            <View style={{padding:3,width:'100%',flexDirection:'row',gap:10,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',gap:10}}>
                <View style={{backgroundColor:'#E54242',width:60,height:60,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#ffffff',textAlign:'center'}}>{item.name[0].toUpperCase()}</Text>
</View>
<View style={{paddingTop:2,gap:4}}>

    <Text style={{fontSize:13,color:'#333',fontWeight:'500'}}>{item.name}</Text>
    <Text style={{fontSize:10,color:'grey'}}>{item.email}</Text>
    <Text style={{fontSize:12,color:'#333'}}>{item.title}</Text>
</View>
                </View>
              

                <View style={{padding:3,alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=>{
                setModalVisible(true)
                GetId(item.id,item.name)
            }} >
            <Icon name='dots-three-vertical' size={25} color={'#333'}/>
            </TouchableOpacity>
    
</View>
            </View> 

            <View style={{padding:3,width:'100%',alignItems:'flex-end',paddingLeft:15}}>
                {item.status==1  &&  <Text style={{color:'green',fontSize:13}}>Hesap Doğrulandı</Text>}
                {item.status==0  &&  <Text style={{color:'#E5781E',fontSize:13}}>Hesap Doğrulanmadı</Text>}
                {item.status==5  &&  <Text style={{color:'#bc260f',fontSize:13}}>Hesap Engellendi</Text>}
         
         
</View>
            
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    card: {  
        
        backgroundColor: '#FFFFFF',  
        borderRadius: 5,  
        paddingVertical: 5,  
        paddingHorizontal: 5,  
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
})
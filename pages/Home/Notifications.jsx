import { View, Text, StyleSheet ,TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { Swipeable,GestureHandlerRootView } from "react-native-gesture-handler";
import Notificate from '../../components/Notificate'

export default function Notifications() {
    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={()=>{
          
        }}>
          <Text style={styles.deleteButtonText}>Sil</Text>
         
        </TouchableOpacity>
      );
  

        const Notifications=[
            {
                NotificateDescription:'#200 kodlu İlanınızı Onaylandı ',
                time:'15:30 Çarşamba'
            },
            {
                NotificateDescription:'#200 kodlu İlanınızı Onaylandı',
                time:'13:20 Salı'
            }
        ]

  return (
    <View style={styles.container}>
        <View style={{paddingBottom:5}}>
            <Text style={{color:'grey'}}>Bugün</Text>
        </View>
        <ScrollView style={{}}>
            <View style={{gap:15}}>
        {
            Notifications.map((item,index)=>(
                <GestureHandlerRootView key={index} >
                <Swipeable renderRightActions={renderRightActions}>
                <Notificate key={index} name={item.NotificateDescription} time={item.time} />
           
                </Swipeable>
    </GestureHandlerRootView>
            ))
        }
        </View>
        </ScrollView>
      
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:10,
        flex:1,
       
    },

    deleteButton:{
        paddingLeft:30,
        paddingRight:30,
          backgroundColor:'#ea2b2e',
         
          flexDirection:'row',
          alignItems:'center',
          
        },
        deleteButtonText:{
          color:'white',
          fontSize:15
        }
  
})
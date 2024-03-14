import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { React, useState } from 'react'
import Ablok from "./Bloks/Ablok"
import Bblok from "./Bloks/Bblok"
import ShoppinInfo from './ShoppinInfo';
export default function OtherHomeInProject({openmodal}) {
    const [tabs, setTabs] = useState(0);
    return (
        <View >
        <SafeAreaView>
            <View style={{padding:10}}>
            <View style={styles.container}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        onPress={() => setTabs(0)}
                        style={{
                            width: '30%',
                            height: '100%',
                            backgroundColor:'#EFEFEF',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: tabs===0? 1:0
                        }}>
                        <Text style={{
                            fontSize: 12,
                            color:'black',
                            fontWeight:  tabs === 0 ? 'bold' : 'normal'
                        }}>A BLOK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTabs(1)}
                        style={{
                            width: '30%',
                            height: '100%',
                            backgroundColor:'#EFEFEF',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth:tabs===1? 1:0
                        }}>
                        <Text style={{
                            fontSize: 12,
                            color:'black',
                            fontWeight:  tabs === 1 ? 'bold' : 'normal'
                        }}>B BLOK</Text>
                    </TouchableOpacity>
                            
                </View>
                {tabs === 0 && <Ablok openmodal={openmodal}/>}
                {tabs === 1 && <Bblok />}
         
            </View>
           
            </View>
          
        </SafeAreaView>
         <View style={styles.Info}>
        <ShoppinInfo/>
        
        </View> 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        
        
        padding:10,
        top: 0,
     
        backgroundColor: '#FFFFFF',  
      
         marginTop:0,
        
       
       
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
    tabBar: {
        width: '100%',
        height: 40,
        
        top: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        backgroundColor: '#EFEFEF',
    },
    
    Info: {
        position:'absolute',
        bottom:-470,
        
       left:10,
       right:10
      }
})
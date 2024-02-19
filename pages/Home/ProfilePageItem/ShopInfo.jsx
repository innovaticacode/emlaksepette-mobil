import { View, Text, SafeAreaView, StyleSheet, Image,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
export default function ShopInfo() {
    const { width, height } = Dimensions.get('window');
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={[styles.ınformation,{top:10},styles.commentArea]}>

                    <View style={{ padding: 10, backgroundColor: '#E92C2A', width: width>400?  '10%':'11%', left: 10, alignItems: 'center', borderRadius: '50%' }}>
                        <Icon name='calendar' size={20} color={'white'}  />
                    </View>

                    <View style={{ gap: 5 }}>
                        <Text>Katılma Tarihi</Text>
                        <Text style={{ fontWeight: '600' }}>28/11/2023</Text>

                    </View>
                </View>
                <View style={[styles.ınformation,styles.commentArea]}>

                    <View style={{ padding: 10, backgroundColor: '#E92C2A', width: width>400?  '10%':'12%', height: '70%', left: 10, alignItems: 'center', borderRadius: '50%', }}>
                        <Icon name='phone' size={20} color={'white'} />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text>İletişim</Text>
                        <Text style={{ fontWeight: '600' }}>Telefon : Belirtilmedi</Text>
                        <Text style={{ fontWeight: '600' }}>E-Mail : masterrealtortürkiye@gmail.com </Text>

                    </View>

                </View>
                <View style={[styles.ınformation,{top:50},styles.commentArea]}>

                    <View style={{ padding: 10, backgroundColor: '#E92C2A', width: width>400?  '10%':'12%', height: '100%', left: 10, alignItems: 'center', borderRadius: '50%', }}>
                        <Icon name='map-pin' size={20} color={'white'} />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text>Konum</Text>
                        <Text style={{ fontWeight: '600' }}>İSTANBUL / KARTAL / CEVİZLİ </Text>
                        

                    </View>

                </View>
                   
            </View>
           <View style={styles.comment}>
                <View style={{padding:10,width:'30%'}}>
                    <Text style={{fontSize:18,fontFamily:'Verdana'}}>Yorumlar</Text>
                    <View style={{width:'100%',height:1,backgroundColor:'red'}}/>
                </View>
                <View style={styles.commentArea}>
                        <Text style={{color:'#666666',fontWeight:'600'}}>Bu mağaza için henüz yorum yapılmadı</Text>
                </View>
           </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        display: 'flex',
        justifyContent: 'space-around'
    },
        ınformation:{
            borderBottomWidth: 1,
             padding: 5, 
             display: 'flex', 
             flexDirection: 'row',
              top: 30, 
              gap: 30 
        },
        comment:{
            top:50,
            width:'100%',
            padding:10
           
        },
        commentArea:{
          
            backgroundColor: '#FFFFFF',  
            
            paddingVertical: 17,  
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
          
            
          }
        


})
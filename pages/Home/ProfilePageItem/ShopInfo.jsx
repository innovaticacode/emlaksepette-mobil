import { View, Text, SafeAreaView, StyleSheet, Image,Dimensions, ScrollView } from 'react-native'
import {React,useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/Feather'
import Star from 'react-native-vector-icons/FontAwesome'
import Map from '../../../components/Map';
import ShopComment from './ShopComment';
export default function ShopInfo({progress,map,maplo}) {
    const { width, height } = Dimensions.get('window');
  
    return (
        <ScrollView contentContainerStyle={{height:900}}>
            <View style={styles.container}>
                <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
                <View style={[styles.ınformation,{top:10},styles.commentArea]}>

                    <View style={{ padding: 10, backgroundColor: '#E92C2A', width: width>400?  '10%':'11%', left: 10, alignItems: 'center',  }}>
                        <Icon name='calendar' size={20} color={'white'}  />
                    </View>

                    <View style={{ gap: 5 }}>
                        <Text>Katılma Tarihi</Text>
                        <Text style={{ fontWeight: '600' }}>28/11/2023</Text>

                    </View>
                </View>
                <View style={[styles.ınformation,styles.commentArea]}>

                    <View style={{ padding: 10, backgroundColor: '#E92C2A', width: width>400?  '10%':'12%', height: '70%', left: 10, alignItems: 'center',  }}>
                        <Icon name='phone' size={20} color={'white'} />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text>İletişim</Text>
                        <Text style={{ fontWeight: '600' }}>Telefon : Belirtilmedi</Text>
                        <Text style={{ fontWeight: '600' }}>E-Mail : masterrealtortürkiye@gmail.com </Text>

                    </View>

                </View>
               
                <View style={[styles.ınformation,{top:50},styles.commentArea]}>

                    <View style={{ padding: 10, backgroundColor: '#E92C2A', width: width>400?  '10%':'12%', height: '100%', left: 10, alignItems: 'center', }}>
                        <Icon name='map-pin' size={20} color={'white'} />
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text>Konum</Text>
                        <Text style={{ fontWeight: '600' }}>İSTANBUL / KARTAL / CEVİZLİ </Text>
                        

                    </View>
                       
                </View>
              
              
             
                </View>
                <View style={[{width:'100%',height:150,top:60},styles.shadow]}>
                       
                </View> 
            </View>
           <View style={styles.comment}>
               
                <View style={styles.commentArea}>
                        <Text style={{color:'#666666',fontWeight:'600',display:'none'}}>Bu mağaza için henüz yorum yapılmadı</Text>
                        <View style={{padding:10}}>
                            <View>
                                <Text style={{fontSize:14,fontWeight:'bold',bottom:10}}>Tüm yorumlar</Text>
                            </View>
                            <View style={styles.commentPoint}>
                                        <View style={styles.point}>
                                            <View style={{alignItems:'center',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                            <Text style={{fontSize:25,fontWeight:'bold'}}>4.6</Text>
                                            <Text style={{top:5,color:'grey',fontWeight:'400'}}>/5</Text>
                                            </View>
                                                <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                                        <Star name='star-o' size={18}/>
                                                        <Star name='star-o' size={18}/>
                                                        <Star name='star-o' size={18}/>
                                                        <Star name='star-o' size={18}/>
                                                        <Star name='star-o' size={18}/>
                                                </View>
                                                <Text style={{fontSize:12,textAlign:'center'}}>Ortalama</Text>
                                                <Text style={{fontSize:12,textAlign:'center'}}>(1 Yorum)</Text>
                                        </View>
                                        <View style={styles.stars}>
                                                <View style={{flex:1.9/2,justifyContent:'space-around'}}>
                                                <View>
                                                <View style={{width:'100%',height:4,backgroundColor:'blue',borderRadius:20}}/>
                                            </View>  
                                            <View>
                                                <View style={{width:'90%',height:4,backgroundColor:'blue',borderRadius:20}}/>
                                            </View>        
                                            <View>
                                                <View style={{width:'70%',height:4,backgroundColor:'blue',borderRadius:20}}/>
                                            </View>
                                            <View>
                                                <View style={{width:'60%',height:4,backgroundColor:'blue',borderRadius:20}}/>
                                            </View>
                                            <View>
                                                <View style={{width:'50%',height:4,backgroundColor:'blue',borderRadius:20}}/>
                                            </View>

                                                </View>
                                           <View style={{display:'flex',gap:3}}>
                                            <View>
                                                <View style={{display:'flex',flexDirection:'row',gap:3}}>
                                                    <Text>5</Text>
                                                    <Star name='star-o' size={10} style={styles.star}/>
                                                    </View>
                                            </View>
                                            <View>
                                            <View style={{display:'flex',flexDirection:'row',gap:3}}>
                                                    <Text>4</Text>
                                                    <Star name='star-o' size={10} style={styles.star}/>
                                                    </View>
                                            </View>
                                            <View>
                                            <View style={{display:'flex',flexDirection:'row',gap:3}} >
                                                    <Text>3</Text>
                                                    <Star name='star-o' size={10} style={styles.star}/>
                                                    </View>
                                            </View>
                                            <View>
                                            <View style={{display:'flex',flexDirection:'row',gap:3}}>
                                                    <Text>2</Text>
                                                    <Star name='star-o' size={10} style={styles.star}/>
                                                    </View>
                                            </View>
                                            <View>
                                            <View style={{display:'flex',flexDirection:'row',gap:3}}>
                                                    <Text>1</Text>
                                                    <Star name='star-o' size={10} style={styles.star}/>
                                                    </View>
                                            </View>
                                           </View>

                                            
                                            
                                        </View>
                            </View>
                           

                               
                        </View>

                </View>
                <View style={{width:'100%',height:2,backgroundColor:'grey',top:3}}></View>
                <View style={[{top:5},styles.shadow]}>
                                    <ShopComment/>
                                </View>
           </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        height:'auto'
       
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
          
            
          },
          shadow:{
            backgroundColor: '#FFFFFF',  
            
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
          commentPoint:{
            width:'100%',
           backgroundColor:'#ececec',
            padding:10,
            display:'flex',
            flexDirection:'row',
            gap:5,
            borderRadius:10
          },
          point:{
                flex:0.8/2,
               
                display:'flex',

          },
          stars:{
            flex:1.2/2,
           
            gap:8,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
          },
          progressBar: {
            height: '100%',
            backgroundColor: 'blue',
          },
          progressText: {
            position: 'absolute',
            alignSelf: 'center',
            lineHeight: 30,
            color: 'white',
          },
      
        star:{
            top:3,
          
        }

})
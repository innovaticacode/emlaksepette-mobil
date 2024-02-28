import { View, Text, StyleSheet,TouchableOpacity,ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/FontAwesome5'
import {useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
export default function OrderDetails() {
    const route = useRoute();
  const {display}=route.params;
  return (
    <ScrollView style={{backgroundColor:'white'}}>
     
    <View style={style.container}>
   <View style={style.orderInfo}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>İlan No: </Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'grey'}}>#12345678</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Sipariş Tarihi: </Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'grey'}}>28 Şubat 2024</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Sipariş Özeti: </Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'grey'}}>
                <Text style={{color:'green'}}>1 Onay, </Text>
                <Text>1 Ürün</Text>
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Sipariş Detayı: </Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'green'}}>1 Ürün Onaylandı</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Toplam: </Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'green'}}>2.500.100</Text>
        </View>
   </View>
   <View style={style.orderDetail}>
        <View style={{gap:10}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Tahmini Teslimat:</Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'grey'}}>
                <Text style={{color:'green'}}> 8 Mart</Text>
                
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Teslimat No: </Text>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'green'}}>12314343</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
            <Text style={{fontWeight:'400',fontFamily:'Verdana',fontSize:13}}>Satıcı:</Text>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:5}}>
            <Text style={{fontFamily:'Verdana',fontSize:13,color:'green'}}>Maliyetine Ev</Text>
            <Icon name='arrow-right' size={10} color={'green'} style={{top:1}}/>
            </TouchableOpacity>
           

        </View>
        </View>
        <View style={{flexDirection:'row',gap:20,borderBottomWidth:1,borderBottomColor:'#ebebeb', paddingBottom:7}}>
                <TouchableOpacity style={{backgroundColor:'#EA2C2E',padding:5,borderRadius:2,flexDirection:'row',gap:6,alignItems:'center'}}>
                    <Icon3 name='store-edit-outline' size={20} color={'white'}/>
                    <Text style={{color:'white',fontSize:12}}>İlanı Değerlendir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'transparent', borderWidth:1,borderColor:'#EA2C2E',padding:5,borderRadius:2,flexDirection:'row',gap:10,alignItems:'center'}}>
                    <Icon2 name='shopping-store' color={'#EA2C2E'}/>
                    <Text style={{color:'#EA2C2E',fontSize:12}}>Mağazayı Gör</Text>
                </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingTop:5}}>
                <FeatherIcon name='check' color={'green'} size={20}/>
                <Text style={{color:'green',fontSize:14,fontWeight:'500'}}>Onaylandı</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingTop:5,width:'80%'}}>
                <FeatherIcon name='info' color={'green'} size={17}/>
                <Text style={{fontSize:13}}>
                    <Text>Aşşağıdaki 1 ürün </Text>
                    <Text style={{fontWeight:'bold'}}>28 Şubat Çarşamba </Text>
                    <Text>günü Satın alınmıştır.</Text>
                </Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingTop:20,paddingLeft:10,paddingRight:10,alignItems:'center'}}>
                    <View>
                        <Text style={{fontSize:13}}>İstanbul / Kartal / Cevizli</Text>
                    </View>
                    <View style={{borderWidth:1,padding:8,borderColor:'#ebebeb'}}>
                        <Text style={{fontSize:13,color:'#EA2C2E'}}>Taksitli Ödeme</Text>
                    </View>
            </View>
            <View style={style.OrderPost}>
                    <View style={style.Image}>
                    <ImageBackground source={require('./profileComponents/home.jpg')} style={{width:'100%',height:'100%'}} resizeMode='cover'/>
                    </View>
                    <View style={style.caption}>
                        <Text style={{fontWeight:'500'}}>Master Sonsuz Tatil Köyü</Text>
                        <Text>Master Sonsuz Tati̇l Köyü Vi̇lla Projesinde 1 No'lu konut</Text>
                        <View style={{paddingTop:5,backgroundColor:'#DAFBD0',width:'50%',padding:5,borderRadius:5}}>
                            <Text style={{textAlign:'center',color:'#3E8330',fontWeight:'bold'}}>120.000 ₺</Text>
                        </View>
                    </View>
                   
            </View>
            <View style={{gap:14}}>
            <TouchableOpacity style={{paddingTop:10,flexDirection:'row',gap:10,alignItems:'center'}}>
                <Icon3 name='comment-question' size={21} color={'red'}/>
                <Text>Canlı Destek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop:10,flexDirection:'row',gap:12,alignItems:'center'}}>
                <Icon4 name='file-invoice' size={20} color={'red'}/>
             <Text>Faturayı Görüntüle</Text>
            </TouchableOpacity>
            </View>
   </View>
   <View style={[style.PersonalInfoArea,{display:display}]}>
    <Text style={{textAlign:'center'}}>Alıcı Bilgileri</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          
        <View>
            <Text>İsim Soyisim</Text>
        </View>
        <View>
            <Text>Jonathan Elcott</Text>
        </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5}}>
        <View>
            <Text>E-Mail:</Text>
        </View>
        <View>
            <Text>jElcott@gmail.com</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5,}}>
        <View>
            <Text>Telefon No:</Text>
        </View>
        <View>
            <Text>553*****74</Text>
        </View>
        </View>
     
    </View>
    <View style={style.paymentArea}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View>
            <Text>Ödeme Bilgileri</Text>
        </View>
        <View>
            <Text>**********3434 Tek Çekim</Text>
        </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15}}>
        <View>
            <Text>Toplam Konut Fiyatı:</Text>
        </View>
        <View>
            <Text>2.500.000 ₺</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5,borderBottomWidth:1,paddingBottom:7,borderBottomColor:'#ebebeb'}}>
        <View>
            <Text>Kapora:</Text>
        </View>
        <View>
            <Text>120.000 ₺</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5,}}>
        <View>
            <Text>Ödenen Tutar:</Text>
        </View>
        <View>
            <Text style={{color:'green',fontWeight:'bold'}}>120.000 ₺</Text>
        </View>
        </View>
    </View>
    <TouchableOpacity style={style.orderInfo}>
        <Text style={{textAlign:'center',textDecorationLine:'underline',fontWeight:'bold',color:'red'}}>Mesafeli Satış Sözleşmesi</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
  )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:10,
        paddingLeft:7,
        paddingRight:7,
        gap:11,
        paddingBottom:20,
    },
    orderInfo:{
        padding:10,
        width:'100%',
        backgroundColor: '#FFFF',  
        borderWidth:1,
        borderColor:'#ebebeb',
        gap:10,
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
          })
    },
    orderDetail:{
        padding:10,
        width:'100%',
        backgroundColor: '#FFFF',  
        borderWidth:1,
        borderColor:'#ebebeb',
        gap:10,
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
          })
    },
    OrderPost:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:1,
        borderTopColor:'#ebebeb',
        paddingTop:5,
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb',
        paddingBottom:5
    },
    Image:{
        flex:0.5/2,
       
        padding:2,
        height:90
    },
    caption:{
        flex:1.4/2,
       
        padding:2,
        gap:4
    },
    paymentArea:{
       
      
        padding:10,
        width:'100%',
        backgroundColor: '#FFFF',  
        borderWidth:1,
        borderColor:'#ebebeb',
        gap:10,
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
          })
    },
    PersonalInfoArea:{

        padding:10,
        width:'100%',
        backgroundColor: '#FFFF',  
        borderWidth:1,
        borderColor:'#ebebeb',
        gap:10,
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
          })
    }
})
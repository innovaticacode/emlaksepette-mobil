import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import IconCheck from 'react-native-vector-icons/AntDesign'
import CopyIcon from 'react-native-vector-icons/FontAwesome5'
import IconApartment from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { useRoute, useNavigation } from '@react-navigation/native';
export default function RentOrderDetails() {
    const route = useRoute();
    const {display } = route.params;
  return (
    <ScrollView style={{backgroundColor:'white'}}>
       
    <View style={styles.container}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5,}}>
            <IconCheck name='check' size={15} color={'green'}/>
            <Text style={{color:'green'}}>Tamamlandı</Text>
          </View>
          <View style={styles.Header}>
                <Text style={{fontSize:20,fontFamily:'Verdana',color:'#264ABB'}}>{display==='none'? 'Rezervasyon Bilgileri':'Rezervasyonunuz'}</Text>
               <View style={styles.Codes}>
                    <View style={{flexDirection:'row',gap:4,alignItems:'center'}}>
                        <Text style={{color:'white'}}>Onay Numarası: </Text>
                        <Text style={{fontWeight:'bold',color:'white'}}>234324324</Text>
                        <TouchableOpacity>
                        <CopyIcon name='copy' size={15} color={'white'}/>
                        </TouchableOpacity>
                       
                    </View>
                    <View style={{flexDirection:'row',gap:4,alignItems:'center'}}>
                        <Text style={{color:'white'}}>PİN Kodu: </Text>
                        <Text style={{fontWeight:'bold',color:'white'}}>2343</Text>
                        <TouchableOpacity>
                        <CopyIcon name='copy' size={15} color={'white'}/>
                        </TouchableOpacity>
                    </View>
               </View>
               <TouchableOpacity style={{flexDirection:'row',alignItems:'center',paddingTop:10,gap:5,display:display}}>
                    <IconApartment name='apartment' size={20} />
                    <Text style={{fontSize:13}}>Tekrar Rezervasyon Yap</Text>
               </TouchableOpacity>
          </View>
          <View style={{gap:30,borderBottomWidth:1,paddingBottom:10,borderBottomColor:'#ebebeb'}}>
          <View style={{paddingTop:15,gap:20,}}>
            <Text style={{fontSize:17,fontFamily:'Verdana',color:'#264ABB',fontWeight:'400',}}>MASTER ORMAN KÖY PROJE ARSALARI</Text>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:0.2/2,}}>
                    <CopyIcon name='calendar' size={19}/>
                </View>
                <View style={{flex:1.5/2,justifyContent:'center',gap:6}}>
                        <Text>29 Şubat 2024 Çar - 2 Mart 2024 Cmt</Text>
                        <Text>Giriş Saati : 12:00</Text>
                        <Text>Çıkış Saati : 12:00</Text>
                </View>
            </View>
          </View>
          <View style={{gap:20,}}>
          
            <View style={{flexDirection:'row',gap:0}}>
                <View style={{flex:0.2/2,}}>
                <IconApartment name='location-on' size={19}/>
                </View>
                <View style={{flex:1.5/2,justifyContent:'center',gap:10}}>
                    <Text style={{fontSize:15,fontWeight:'500'}}>Konut Adresi</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia, ullam numquam, harum quibusdam cumque</Text>
                        
                       
                </View>
            </View>
          </View>
          </View>

            <View style={{paddingTop:15,gap:20,borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:15}}>
                    <Text style={{fontSize:15,fontFamily:'Verdana',color:'#264ABB',fontWeight:'400'}}>{display==='none'?'Müşteri İle İletişime Geçin':'Acente İle iletişime geçin'}</Text>
                    <Text>Rezervasyonun değişiklikleriyle ilgili görüşün ya da ödemeler ve iadeler hakkında soru sorun</Text>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}}>
                        <CopyIcon name='phone-alt' size={13}/>
                        <Text style={{fontSize:13,fontWeight:'500'}}>+90 5537064474 Numaralı telefonu ara</Text>
                    </TouchableOpacity>
            </View>

            <View style={{paddingTop:20,gap:20,borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:20}}>
                <Text style={{fontSize:15,color:'#264ABB',fontFamily:'Verdana',}}>{display=='none'? '32432432 No lu konutunuz rezerve edildi':'32423423 No lu Konutu rezerve ettiniz'}</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:0.2/2}}>
                    <CopyIcon name='user-alt' size={16}/>
                    </View>
                    <View style={{gap:7}}>
                    <Text style={{fontSize:13}}>Konuklar</Text>
                    <Text style={{fontSize:12}}>Jonathan Elcott</Text>
                    </View>
                   
               
                </View>
                <View style={{flexDirection:'row',gap:10}}>
                    <View style={{flex:0.1/2}}>
                    <IconCheck name='infocirlceo' size={18}/>
                    </View>
                    <View style={{gap:5, flex:1.9/2}}>
                    <Text style={{fontSize:15,fontWeight:'500'}}>İade Durumu</Text>
                    {
                        display==='none'?
                            <View style={{flexDirection:'row',gap:10,paddingTop:10}}>
                                <IconCheck name='check' size={15} color={'green'}/>
                                <Text>Param Güvende</Text>
                            </View>
                        
                        
                        :
                        <Text style={{fontSize:14}}>Ödeme Param Güvende ile yapılmışsa kaporanızın tamamı iade edilir eğer param güvende ile yapılmamışsa kaporanın 50%'si kesilir. </Text>
                        
                    }
                   
                    </View>
                   
               
                </View>
                
            </View>
            <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',padding:15,gap:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>1 Gece Konaklama:</Text>
                    <Text>2500 ₺</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Param Güvende:</Text>
                    <Text>1000 ₺</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>
                    <Text style={{fontSize:18}}>Toplam:</Text>
                    <Text style={{fontSize:18,fontWeight:'500'}}>3500 ₺</Text>
                </View>
                {
                    display=='none'?
                    <>
                     <TouchableOpacity style={{width:'100%',backgroundColor:'#264ABB',padding:12,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>
                    <Icon name='earphones-alt' size={20} color={'white'}/>
                        <Text style={{color:'white',fontSize:14}}>İptal İçin Emlak Sepette ile görüşün</Text>
                </TouchableOpacity>
                    </>:
                    <>
                     <TouchableOpacity style={{width:'100%',backgroundColor:'#264ABB',padding:12,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>
                 
                        <Text style={{color:'white',fontSize:14}}>Rezervasyonu İptal Et</Text>
                </TouchableOpacity>
                    </>
                }
               
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
        container:{
                flex:1,
                backgroundColor:'white',
                padding:15,
                
        },
        Header:{
               paddingTop:25,
               gap:10,
               borderBottomWidth:1,
               paddingBottom:20,
               borderBottomColor:'#ebebeb'
        },
        Codes:{
            borderWidth:0.4,
            borderColor:'grey',
            backgroundColor:'#EA2C2E',
            padding:10,
            gap:5
        }
})
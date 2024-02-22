import { View, Text, SafeAreaView, StyleSheet,Image, ImageBackground,Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import LogOut from 'react-native-vector-icons/Entypo'
import Categories from '../../components/Categories';
import SettingsItem from '../../components/SettingsItem';
import BackIcon from "react-native-vector-icons/MaterialIcons"
import ProfileSettingsItem from '../../components/ProfileSettingsItem';
import { useRoute, useNavigation } from '@react-navigation/native';
export default function ShoppingProfile({İsLoggedIn}) {
  const { width, height ,fontScale} = Dimensions.get('window');
  const route = useRoute();
  const navigation = useNavigation();
  // const { isLoggedIn,setisLoggedIn } = route.params;
  // const [isLoggedIn, setisLoggedIn] = useState(false)
  return (
   <View style={style.container}>
        <View style={style.header}>
          <View style={{position:'absolute',zIndex:2,top:'20%',left:15, backgroundColor:'#FFFFFF3b',paddingLeft:5,paddingRight:5,padding:1,borderRadius:4}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <BackIcon name='arrow-back-ios' size={23} color={'white'} style={{left:5}}/>
            </TouchableOpacity>
              
          </View>
          <View style={style.opacity}></View>
          
               <ImageBackground source={require('./profilePhoto.jpg')}  style={{width:'100%',height:'100%',}} imageStyle={{borderBottomLeftRadius:30,borderBottomRightRadius:30}} />
              <View style={style.UserInfo}>
                <View style={{display:'flex',flexDirection:'row',}}>
                  <View style={{gap:8}}>
                  <Text style={{color:'white',fontSize:18}}>John Doe</Text>
                <Text style={{color:'white',fontSize:11}}>Bireysel Hesap</Text>

               
                  </View>
               
                <View style={{width:22,height:22,left:10,}}>
            <ImageBackground source={require('./BadgeYellow.png')} style={{flex:1}}/>
         
            <Icon name='check'style={{position:'absolute',left:3.5,top:3}} size={15}/>
           </View>
         
                </View>
                
          </View>
          
              <View style={{width: width>400?90:80,position:'absolute',bottom:-45,zIndex:1,left:'40%'}}>
          <View style={style.profileImage}>
              <Image source={require('./profil.jpg')} style={{width:'100%', height:'100%'}} borderRadius={'50%'}/>
          </View>


        </View>

        </View>
        <View style={style.body}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{height:İsLoggedIn? 1650:1200}}>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity style={{borderRadius:5,paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10 ,backgroundColor:'#264ABB',}}>
                <Text style={{color:'white',fontWeight:'500'}}>Profili Düzenle</Text>
                </TouchableOpacity>
              
              </View>
              <View style={style.Settings}>
                <View>
                  <Text style={style.headerText}>Emlak Kulüp</Text>
                  {İsLoggedIn?
                   <TouchableOpacity onPress={()=>navigation.navigate('Collecitons')}>
                   <ProfileSettingsItem text='Koleksiyonlarım' ıconName='bookmark-border'/>
                   </TouchableOpacity>:
                     <TouchableOpacity onPress={()=>navigation.navigate('RealtorClub')}>
                     <ProfileSettingsItem text='Emlak Kulüp Başvurusu' />
                     </TouchableOpacity>
                  }
                  
                
                </View>
                <View>
                  <Text style={style.headerText}>Mağazam Emlak Sepette</Text>
                 
                   <TouchableOpacity onPress={()=>navigation.navigate('DashBord')}>
                   <ProfileSettingsItem text='Gösterge Paneli' ıconName='home-work'/>
                   </TouchableOpacity>
                  
                        

                   {İsLoggedIn? 
                   <TouchableOpacity onPress={()=>navigation.navigate('MyProject')}>
                   <ProfileSettingsItem text='Proje İlanlarım' ıconName='home-work' IconType={true}/>
                   </TouchableOpacity>:''}
                 
                  {İsLoggedIn? 
                   <TouchableOpacity onPress={()=>navigation.navigate('MyRealtor')}>
                   <ProfileSettingsItem text='Emlak İlanlarım'  IconType={true}/>
                   </TouchableOpacity>:''}
                 
                  {İsLoggedIn? '':  <TouchableOpacity onPress={()=>navigation.navigate('Forms')}>
                  <ProfileSettingsItem text='Sat Kirala Formlarım' ıconName='info-outline'/>
                  </TouchableOpacity>}
               

                  <TouchableOpacity onPress={()=>navigation.navigate('Sell')}>
                  <ProfileSettingsItem text='Satış' ıconName='shopping-bag' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>navigation.navigate('Rent')}>
                  <ProfileSettingsItem text='Kiralık' ıconName='shopping-bag' />
                  </TouchableOpacity>
                  {İsLoggedIn? 
                  <TouchableOpacity onPress={()=>navigation.navigate('Offer')}>
                  <ProfileSettingsItem text='İlanda Kampanya Yap' ıconName='arrow-downward' />
                  </TouchableOpacity>:''}
                  
                </View>
                <View>

                  <Text style={style.headerText}>Hesabım & Yardım</Text>
                  <TouchableOpacity onPress={()=>navigation.navigate('UpdateProfile')}>
                  <ProfileSettingsItem text='Profili Güncelle' ıconName='edit'/>
                  </TouchableOpacity>
                  
               <TouchableOpacity onPress={()=>navigation.navigate('ChangePas')}>
               <ProfileSettingsItem text='Şifreyi Değiştir' ıconName='lock'/>
               </TouchableOpacity>
                  
               {İsLoggedIn? 
                  <TouchableOpacity onPress={()=>navigation.navigate('CreateUserType')}>
                  <ProfileSettingsItem text='Kullanıcı Tipi Oluştur' ıconName='person-add-alt-1' />
                  </TouchableOpacity> : ''}
                  {İsLoggedIn? 
                  <TouchableOpacity onPress={()=>navigation.navigate('CreateUser')}>
                  <ProfileSettingsItem text='Alt Kullanıcı Oluştur' ıconName='person-add-alt-1' />
                  </TouchableOpacity> : ''}
                  {İsLoggedIn? 
                  <TouchableOpacity onPress={()=>navigation.navigate('AdsPicture')}>
                  <ProfileSettingsItem text='Reklam Görselleri' ıconName='image' />
                  </TouchableOpacity> : ''}
                 
              
                </View>

              </View>
              <TouchableOpacity style={{top:50,padding:10,alignItems:'center'}} >
              <View style={{width:'90%',backgroundColor:'#EA2A29',padding:15,borderRadius:4}}>
                  <Text style={{textAlign:'center',color:'white',fontSize:15}}>Çıkış Yap</Text>
              </View>
              </TouchableOpacity>
              </View>
            </ScrollView>
        </View>
   </View>
  )
}
const { width, height ,fontScale} = Dimensions.get('window');
const style=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    header:{
      width:'100%',
     height:'23%',

     borderBottomLeftRadius:30,
     borderBottomRightRadius:30
    },
    opacity:{
      width:'100%',
      height:'100%',
      backgroundColor:'#DE4241E6',
      position:'absolute',
      zIndex:1,
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30
    },
    profileImage:{
      width:'100%',
      height: width>400?90:80,
      borderRadius:'50%',
      backgroundColor:'blue'
    },
    UserInfo:{
      width:'50%',
    
      position:'absolute',
      zIndex:1,
      top:'40%',
      left:15
     
    },
    body:{
      width:'100%',
    height:'150%',
      top:55,
     paddingLeft:20,
     paddingRight:20
   
    },
    Settings:{
     gap:40,
     top:30,
      width:'100%',
      backgroundColor: '#FFFF',  
      borderColor:'#e6e6e6',
      
    },
    headerText:{
      fontSize:16,
      color:'grey'
    }
})
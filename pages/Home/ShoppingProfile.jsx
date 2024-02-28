import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import LogOut from 'react-native-vector-icons/Entypo'
import Categories from '../../components/Categories';
import SettingsItem from '../../components/SettingsItem';
import BackIcon from "react-native-vector-icons/MaterialIcons"
import ProfileSettingsItem from '../../components/ProfileSettingsItem';
import { useRoute, useNavigation } from '@react-navigation/native';
export default function ShoppingProfile({ İsLoggedIn }) {
  const { width, height, fontScale } = Dimensions.get('window');
  const route = useRoute();
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState('ScreenA');
  const translateY = useRef(new Animated.Value(400)).current;
  const translateY2 = useRef(new Animated.Value(400)).current;
  // const { isLoggedIn,setisLoggedIn } = route.params;
  // const [isLoggedIn, setisLoggedIn] = useState(false)
  const [display, setdisplay] = useState(false)

  const openSheet = () => {
    setdisplay(true)

    Animated.timing(translateY, {

      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  const closeSheet = () => {
    setdisplay(false)
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const [isSelected, setisSelected] = useState(false)

  const handlePres = (text) => {
    setisSelected(text)
    openSheet()
 
  }


  return (
    <View style={{ flex: 1 }} >
      <View style={style.container} onTouchStart={() => closeSheet()}>
        <View style={style.header}>
          <View style={{ position: 'absolute', zIndex: 2, top: '20%', left: 15, backgroundColor: '#FFFFFF3b', paddingLeft: 5, paddingRight: 5, padding: 1, borderRadius: 4 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon name='arrow-back-ios' size={23} color={'white'} style={{ left: 5 }} />
            </TouchableOpacity>

          </View>
          <View style={style.opacity}></View>

          <ImageBackground source={require('./profilePhoto.jpg')} style={{ width: '100%', height: '100%', }} imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
          <View style={style.UserInfo}>
            <View style={{ display: 'flex', flexDirection: 'row', }}>
              <View style={{ gap: 8 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>John Doe</Text>
                <Text style={{ color: 'white', fontSize: 11 }}>Bireysel Hesap</Text>


              </View>

              <View style={{ width: 22, height: 22, left: 10, }}>
                <ImageBackground source={require('./BadgeYellow.png')} style={{ flex: 1 }} />

                <Icon name='check' style={{ position: 'absolute', left: 3.5, top: 3 }} size={15} />
              </View>

            </View>

          </View>

          <View style={{ width: width > 400 ? 90 : 80, position: 'absolute', bottom: -45, zIndex: 1, left: '40%' }}>
            <View style={style.profileImage}>
              <Image source={require('./profil.jpg')} style={{ width: '100%', height: '100%' }} borderRadius={'50%'} />
            </View>


          </View>

        </View>
        <View style={style.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: İsLoggedIn ? 1650 : 1200 }}>

              <View style={style.Settings}>
                <View>
                  <Text style={style.headerText}>Emlak Kulüp</Text>
                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => navigation.navigate('Collecitons')}>
                      <ProfileSettingsItem text='Koleksiyonlarım' ıconName='bookmark-border' />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => navigation.navigate('RealtorClub')}>
                      <ProfileSettingsItem text='Emlak Kulüp Başvurusu' />
                    </TouchableOpacity>
                  }


                </View>
                <View>
                  <Text style={style.headerText}>Mağazam Emlak Sepette</Text>

                  <TouchableOpacity onPress={() => navigation.navigate('DashBord')}>
                    <ProfileSettingsItem text='Gösterge Paneli' ıconName='home-work' />
                  </TouchableOpacity>



                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => navigation.navigate('MyProject',{header2:'Proje İlanları'})}>
                      <ProfileSettingsItem text='Proje İlanlarım' ıconName='home-work' IconType={true} />
                    </TouchableOpacity> : ''}

                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => navigation.navigate('MyRealtor',{header:'Emlak İlanları',hidden:'none'})}>
                      <ProfileSettingsItem text='Emlak İlanlarım' IconType={true} />
                    </TouchableOpacity> : ''}

                  {İsLoggedIn ? '' : <TouchableOpacity onPress={() => navigation.navigate('Forms')}>
                    <ProfileSettingsItem text='Sat Kirala Formlarım' ıconName='info-outline' />
                  </TouchableOpacity>}


                  <TouchableOpacity onPress={() => {
                     handlePres('MyBasket')

                  }}>
                    <ProfileSettingsItem text='Satış' ıconName='shopping-bag' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    handlePres('Rent')
                  }}
                  
                  >
                    <ProfileSettingsItem text='Kiralık' ıconName='shopping-bag' />
                  </TouchableOpacity>
                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => {
                      handlePres('Offer')
                    }}>
                      <ProfileSettingsItem text='İlanda Kampanya Yap' ıconName='arrow-downward' />
                    </TouchableOpacity> : ''}

                </View>
                <View>

                  <Text style={style.headerText}>Hesabım & Yardım</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
                    <ProfileSettingsItem text='Profili Güncelle' ıconName='edit' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('ChangePas')}>
                    <ProfileSettingsItem text='Şifreyi Değiştir' ıconName='lock' />
                  </TouchableOpacity>

                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => {
                      handlePres('userType')


                    }}>
                      <ProfileSettingsItem text='Kullanıcı Tipi Oluştur' ıconName='person-add-alt-1' />
                    </TouchableOpacity> : ''}

                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => {
                      handlePres('createUser')

                    }}>
                      <ProfileSettingsItem text='Alt Kullanıcı Oluştur' ıconName='person-add-alt-1' />
                    </TouchableOpacity> : ''}
                  {İsLoggedIn ?
                    <TouchableOpacity onPress={() => {
                      handlePres('Ads')
                    }}>
                      <ProfileSettingsItem text='Reklam Görselleri' ıconName='image' />
                    </TouchableOpacity> : ''}


                </View>

              </View>
              <TouchableOpacity style={{ top: 50, padding: 10, alignItems: 'center' }} >
                <View style={{ width: '90%', backgroundColor: '#EA2A29', padding: 15, borderRadius: 4 }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Çıkış Yap</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 1, position: 'absolute', bottom: 0, width: '100%', display: display == false ? 'none' : 'flex' }}>

        <Animated.View
          style={[style.animatedView, { transform: [{ translateY }], }]}>

          <View style={{ width: '100%', }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ width: 40, height: 7, backgroundColor: '#ebebeb', borderRadius: 10 }} onPress={closeSheet}>

              </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 10,  }}>

              {
                isSelected == "userType" ?
                  <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                        onPress={()=>navigation.navigate('CreateUserType',{header:'Listeleden geldi',hidden:'none',name:'Kullanıcılar'})}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2 }}>Listele</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                        onPress={()=>navigation.navigate('CreateUserType',{header:'yeni ekleden geldi',name:'Kullanıcı Ekle',hidden2:'none'})}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Yeni Ekle</Text>

                      </View>
                    </TouchableOpacity></> :''
               
                  

              }
              {
                isSelected=="createUser"?
                <>
                <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                  onPress={()=>navigation.navigate('CreateUser',{header:'Listeleden  geldi',hidden3:'none',name:'Kullanıcılar',changeSlectedState:'false'})}
                >
                  <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                    <Text style={{ textAlign: 'center', top: 2, }}>Listele</Text>

                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                  onPress={()=>navigation.navigate('CreateUser',{header:'Yeni Ekleden geldi',name:'Kullanıcı Oluştur',hidden4:'none',})}
                >
                  <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3,hidden4:'none'}}>

                    <Text style={{ textAlign: 'center', top: 2, }}>Yeni Ekle</Text>

                  </View>
                </TouchableOpacity>

              </> :''
              }




              {
                isSelected == "MyBasket"?
                <>
                <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                  onPress={()=>navigation.navigate('Sell',{displayInfo:'none'})}
                >
                  <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                    <Text style={{ textAlign: 'center', top: 2, }}>Gayrimenkul Alış</Text>

                  </View>
                </TouchableOpacity>
                {İsLoggedIn ?
 <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
 onPress={()=>navigation.navigate('Sell',{})}
>
<View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3,hidden4:'none'}}>

  <Text style={{ textAlign: 'center', top: 2, }}>Gayrimenkul Satış</Text>

</View>
</TouchableOpacity>:''
                }
               

              </>:''
               
              }
              
                {
                  isSelected=="Rent"?
                  <>

                  {
                    İsLoggedIn?
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                        onPress={()=>navigation.navigate('Rent',{text:'Kiraya Verdiklerim'})}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>
    
                        <Text style={{ textAlign: 'center', top: 2, }}>Kiraya Verdiklerim</Text>
    
                      </View>
                    </TouchableOpacity>:''
                  }
                 
                  <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                     onPress={()=>navigation.navigate('Rent',{text:'Kiraladıklarım'})}
                  >
                    <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3,hidden4:'none'}}>
  
                      <Text style={{ textAlign: 'center', top: 2, }}>Kiraladıklarım</Text>
  
                    </View>
                  </TouchableOpacity>
  
                </>:''
                }

                  {
                    isSelected=="Offer"?
                    <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>
    
                        <Text style={{ textAlign: 'center', top: 2, }}>Oluştur</Text>
    
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3,hidden4:'none'}}>
    
                        <Text style={{ textAlign: 'center', top: 2, }}>Listele</Text>
    
                      </View>
                    </TouchableOpacity>
    
                  </>:''
                  }
                    {
                    isSelected=="Ads"?
                    <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>
    
                        <Text style={{ textAlign: 'center', top: 2, }}>Oluştur</Text>
    
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3,hidden4:'none'}}>
    
                        <Text style={{ textAlign: 'center', top: 2, }}>Listele</Text>
    
                      </View>
                    </TouchableOpacity>
                        
                  </>:''
                  }


            </View>
          </View>


        </Animated.View>
      </View>

    </View>
  )
}
const { width, height, fontScale } = Dimensions.get('window');
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    height: '23%',

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  opacity: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DE4241E6',
    position: 'absolute',
    zIndex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  profileImage: {
    width: '100%',
    height: width > 400 ? 90 : 80,
    borderRadius: '50%',
    backgroundColor: 'blue'
  },
  UserInfo: {
    width: '50%',

    position: 'absolute',
    zIndex: 1,
    top: '40%',
    left: 15

  },
  body: {
    width: '100%',
    height: '150%',
    top: 55,
    paddingLeft: 20,
    paddingRight: 20

  },
  Settings: {
    gap: 40,
    top: 30,
    width: '100%',
    backgroundColor: '#FFFF',
    borderColor: '#e6e6e6',

  },
  headerText: {
    fontSize: 16,
    color: 'grey'
  },
  animatedView: {


    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: '#FFFF',
    borderColor: '#e6e6e6',
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
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
})
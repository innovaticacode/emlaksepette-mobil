import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Text
} from "react-native";
import Categories from "./Categories"; // Bu import, Categories bileşeninizi temsil eden dosyaya göre değişebilir
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "./methods/user";
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { color } from "@rneui/base";
import Search from "../pages/Home/Search";
import axios from "axios";
const { width, height } = Dimensions.get("window");

const DrawerMenu = ({ setIsDrawerOpen }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false);
  };
  const [namFromGetUser, setnamFromGetUser] = useState([]);
 
  const GetUserInfo = async () => {
   
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
     
    }
  };

  useEffect(() => {
    GetUserInfo()
  }, [user])
  
  return (
    <SafeAreaView style={{}}>
      <ScrollView contentContainerStyle={{gap:15}}>
        <View style={{alignItems:'flex-end',paddingRight:15}}>
          <TouchableOpacity 
           onPress={()=>{
          
            setIsDrawerOpen(false)
          }}
          >
          <IconAntDesign name="close" size={22} color={'#333'}/>
          </TouchableOpacity>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
          <View style={{width:'90%',flexDirection:'row',alignItems:'center',gap:7,}}> 
          <View style={{width:60,height:60,backgroundColor:'green',borderRadius:50}}>

          </View>
              <View style={{gap:6}}>
                <TouchableOpacity disabled={user.access_token? true:false} 
                  onPress={()=>{
                    navigation.navigate('Login')
                    setIsDrawerOpen(false)
                  }}
                >
                <Text style={{color:'#333',fontWeight:'600',fontSize:13}}>{user.access_token ? namFromGetUser.name:'Giriş Yap'}</Text>
                </TouchableOpacity>
            
                <TouchableOpacity>
                  <Text style={{fontSize:12}}>Hesabım</Text>
                </TouchableOpacity>
              </View>
          </View>
        
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
          <View style={{width:'85%',backgroundColor:'#C4C4C4',padding:0.5}}/>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
        <View style={{width:'80%'}}>
          <Search   setIsDrawerOpen={setIsDrawerOpen}/>
        </View>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
          <View style={{width:'85%',backgroundColor:'#C4C4C4',padding:0.5}}/>
        </View>
        <View style={{width:'100%',alignItems:'center',gap:10}}>
         
        <View style={{backgroundColor:'#F7F7F7',padding:10,width:'85%',borderRadius:8}}>
        <Categories category={'Emlak Kulüp'} ıconName={'home-account'}/>
        <Categories category={'Gayrimenkul Ligi'} ıconName={'human-capacity-increase'}/>
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
              <TouchableOpacity style={{backgroundColor:'#EA2C2E',width:'85%',padding:10,borderRadius:10,flexDirection:'row',gap:8,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{
                      setIsDrawerOpen(false)
                      navigation.navigate('ShareAdvert')
                    }}
              >
                <IconAntDesign name="plus" color={'white'} size={18}/>
                <Text style={{color:'white',fontWeight:'600'}}>İlan Ver</Text>
              </TouchableOpacity>
        </View>

        </View>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#FFF3F2',flexDirection:'row',alignItems:'center',width:'85%',justifyContent:'center',gap:10,padding:8,borderRadius:8}}>
              <View>
                <Icon name="headset-mic" size={30} color={'#EA2C2E'}/>
              </View>
              <View style={{gap:5}}>
                <Text style={{color:'#EA2C2E',fontWeight:'400',letterSpacing:1}}>Müşteri Hizmetleri</Text>
                <Text style={{color:'#EA2C2E',fontWeight:'400',letterSpacing:1}}>444 3 284 </Text>
              </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
    // <>

    //   <SafeAreaView
    //     style={{
    //       flex: 1,
    //       zIndex: 1,
    //       height: height * 1,
    //     }}
    //   >
    //     <ScrollView showsVerticalScrollIndicator={false}>

    //       <TouchableOpacity onPress={() => navigateToScreen("HomePage")}>
    //         <Categories
    //           category="Ana Sayfa"
    //           bordernone="none"
    //           iconName="home"
    //         />
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={() => navigateToScreen("Hesabım")}>
    //         {user.access_token ? (
    //           <Categories
    //             category="Hesabım"
    //             bordernone="none"
    //             iconName="user"
    //           />
    //         ) : (
    //           <Categories
    //             category="Giriş Yap"
    //             bordernone="none"
    //             iconName="user"
    //           />
    //         )}
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={() => navigateToScreen("RealtorClubExplore")}
    //       >
    //         <Categories
    //           category="Emlak Kulüp"
    //           bordernone="none"
    //           showImage={true}
    //         />
    //       </TouchableOpacity>

    //       {user.role == "Kurumsal Hesap" && (
    //         <TouchableOpacity
    //           onPress={() => {
    //             navigation.navigate("ShareAdvert");
    //             setIsDrawerOpen(false);
    //           }}
    //         >
    //           <Categories
    //             category="İlan Ver"
    //             bordernone="none"
    //             iconName="plus"
    //           />
    //         </TouchableOpacity>
    //       )}

    //       {user.role == "Bireysel Hesap" && (
    //         <TouchableOpacity
    //           onPress={() => {
    //             navigation.navigate("Emlak", { name: "İlan Ver" });
    //             setIsDrawerOpen(false);
    //           }}
    //         >

    //           <Categories
    //             category="Sat Kirala"
    //             bordernone="none"
    //             iconName="search-plus"
    //           />
    //         </TouchableOpacity>

    //       )}
    //     </ScrollView>

    //   </SafeAreaView>
    //   <ImageBackground
    //     source={require("../pages/Home/MenuBg.jpg")}
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       position: "absolute",
    //       opacity: 0.2,
    //     }}
    //     resizeMode="cover"
    //     borderBottomLeftRadius={30}
    //     borderBottomRightRadius={30}
    //   />
    // </>
  );
};

export default DrawerMenu;

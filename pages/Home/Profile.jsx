import { View, Text, StyleSheet, SafeAreaView ,Image, ImageBackground, ScrollView, TouchableOpacity,Dimensions, TextInput, TouchableWithoutFeedback, Keyboard,Animated} from 'react-native'
import{ React ,useState,useRef}from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import ShopInfo from './ProfilePageItem/ShopInfo'
import ProjectAdverts from './ProfilePageItem/ProjectAdverts'
import RealtorAdverts from './ProfilePageItem/RealtorAdverts'
import LinkIcon3 from "react-native-vector-icons/Feather"
import LinkIcon4 from "react-native-vector-icons/Fontisto"
import LinkIcon2 from "react-native-vector-icons/FontAwesome"
import LinkIcon from "react-native-vector-icons/Entypo"
import Arrow from "react-native-vector-icons/MaterialIcons"
import Team from './ProfilePageItem/Team'
import { useNavigation,useRoute } from '@react-navigation/native'
export default function Profile() {
  const route=useRoute();
  const {name}=route.params
  const [tab, settab] = useState(0)
  const { width, height ,fontScale} = Dimensions.get('window');
  const translateY = useRef(new Animated.Value(400)).current;
  const navigation=useNavigation();
  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{flex:1}}>
    <View style={styles.container} onTouchStart={()=>{
      Keyboard.dismiss()
     closeSheet()
    }} >
      <TouchableOpacity style={{position:'absolute',zIndex:2,top:width>400? 50 :25 ,left:20, backgroundColor:'#FFFFFF3b',paddingLeft:6,paddingRight:6,padding:2,alignItems:'center',borderRadius:4}} onPress={()=>navigation.goBack()}>
      <View>
        <Arrow name='arrow-back-ios' size={width>400?25:20} color={'white'} style={{left:4}}/>
      </View>
      </TouchableOpacity>
         <SafeAreaView style={styles.ProfileInfoDiv}>
       
      <View style={{display:'flex',flexDirection:'column',top:35,width:'60%'}}>
      <Text style={{fontSize:width>400?12:11,color:'white',fontWeight:'400',bottom:10,left:10,top:5}}>Gayrimenkul Ofisi</Text>
     
          <View style={styles.ProfileName}>
          
            <Text style={{fontSize:width>400?25:18 ,color:'white',fontWeight:'500'}}>{name}</Text>
            <View style={{width:26,height:26,left:10}}>
            <ImageBackground source={require('./BadgeYellow.png')} style={{flex:1}}/>
            <View style={{display:'flex',flexDirection:'column'}}></View>
            <Icon name='check'style={{position:'absolute',left:7,top:6}} size={15}/>
           </View>
         
          </View>
          <View style={{left:10,width:'100%',justifyContent:'center',flexDirection:'row'}}>
           <TextInput placeholder='Mağazda Ara...'
            style={{
            backgroundColor:'#FFFFFF3b',
            padding:10,
            borderRadius:50,
            width:'100%',
           }}/>
         
          </View>
          </View>


            <View style={styles.ProfileImageAndIcon}>
            <View style={styles.ProfileImage}>
              <Image source={require('./home.jpg')} style={{width:'100%',height:'100%'}} borderRadius={20} />
        </View> 
        <View>
        <TouchableOpacity onPress={openSheet}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                width: 35,
                height: 35,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Icon name="sharealt" size={17} />
            </View>
          </TouchableOpacity>
        </View>
            </View>

              
        </SafeAreaView>
      <View style={[styles.headerProfile]}>
        <View style={{width:'100%',height:'100%',backgroundColor:'#DE4241E6',position:'absolute',zIndex:1,borderBottomLeftRadius:50,borderBottomRightRadius:50,overflow:'hidden'}}></View>
      <ImageBackground source={require('./profilePhoto.jpg')} style={{width:'100%',height:'100%'}} imageStyle={{borderBottomLeftRadius:50,borderBottomRightRadius:50}} />

       
       
      
       
      </View>
      <View>
      <ScrollView horizontal style={{padding:10}} showsHorizontalScrollIndicator={false}>
      <View style={styles.tabBar}>
        

          <TouchableOpacity style={[styles.TabBarBtn,{  borderBottomWidth:tab===0? 3:0 ,borderBottomColor:tab===0?'#264ABB':'transparent',top:2}]}
          onPress={()=>settab(0)}
          >
            <Entypo name='shop' size={16}/>
            <Text style={{color:tab ===0 ? 'black':'grey', fontWeight:tab===0?'500':'normal'}}>Mağaza profili</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.TabBarBtn,{ borderBottomWidth:tab===1? 3:0 ,borderBottomColor:tab===1?'#264ABB':'transparent',top:2}]}
          onPress={()=>settab(1)}>         
          <Text style={{color:tab ===1 ? 'black':'grey', fontWeight:tab===1?'500':'normal', bottom:width>400? 0:1}}>Proje İlanları(0)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.TabBarBtn,{ borderBottomWidth:tab===2? 3:0 ,borderBottomColor:tab===2?'#264ABB':'transparent',top:2}]}
        onPress={()=>settab(2)}>
          <Text style={{color:tab ===2 ? 'black':'grey', fontWeight:tab===2?'500':'normal'}}>Emlak İlanları(0)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.TabBarBtn,{  borderBottomWidth:tab===3? 3:0 ,borderBottomColor:tab===3?'#264ABB':'transparent',top:2}]}
        onPress={()=>settab(3)}>
          <Icon name='team' size={16}/>
          <Text style={{color:tab ===3 ? 'black':'grey', fontWeight:tab===3?'500':'normal',} }>Ekip</Text>
        </TouchableOpacity>

       </View>
      
      </ScrollView>
    
      
      </View>
      {tab===0 && <ShopInfo/>}
      {tab===1 && <ProjectAdverts/>}
      {tab===2 && <RealtorAdverts/>}
      {tab===3 && <Team/>}
  
    </View>
    <View style={{ flex: 1, position:'absolute',bottom:0 }}>
     
     <Animated.View
       style={{
        
         zIndex:1,
         backgroundColor: '#eeeeee',
         borderTopLeftRadius: 20,
         borderTopRightRadius: 20,
        paddingTop:20,
        paddingBottom:30,
        paddingLeft:10,
         paddingRight:10,
         
         transform: [{ translateY }],
       }}
     >
    
         <ScrollView horizontal  style={{padding:5}}   showsHorizontalScrollIndicator={false}>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',gap:27}}>
           <TouchableOpacity style={{alignItems:'center'}}>
           <View style={styles.shareIcons}>
            <LinkIcon name="link" size={23}/>
           
           </View>
           <Text>Kopyala</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={styles.shareIcons}>
            <LinkIcon2 name="whatsapp" size={23}/>
           </View>
           <Text>Whatsapp</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={styles.shareIcons}>
            <LinkIcon name="instagram" size={23}/>
           </View>
           <Text>İnstagram</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={styles.shareIcons}>
            <LinkIcon2 name="facebook" size={23}/>
           </View>
           <Text>Facebook</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={styles.shareIcons}>
            <LinkIcon3 name="message-circle" size={23}/>
           </View>
           <Text>Mesajlar</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={styles.shareIcons}>
            <LinkIcon4 name="messenger" size={23}/>
           </View>
           <Text>Messenger</Text>
         </TouchableOpacity>
           </View>
         </ScrollView>
   
      
     </Animated.View>
   </View>
    </View>
  )
}
const { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
  container:{
  flex:1,
 backgroundColor:'white'
  

  },
  headerProfile:{
    width:'100%',
    height:width>400? 220:170,
  
  
   borderBottomLeftRadius:50,
   borderBottomRightRadius:50,
   
  
   
  },
  ProfileInfoDiv:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute',
  top:width>400? 50:20,
  zIndex:1,
    left:20,
    
  
    
  },  
  ProfileImage:{
    width:35,
    height:35,
   
  
  },
  ProfileName:{
    alignItems:'center',
    justifyContent:'left',
    padding:10,
    display:'flex',
    flexDirection:'row',
   
   
    bottom:2,
    
    
  },
  tabBar:{
  
    padding:3,
// height:width>400? '90%':'60%',
// height:height>300?'90%':'70%',

    display:'flex',
    flexDirection:'row',  
    justifyContent:'space-around',
    gap:30,
    borderBottomWidth:1,
    borderColor:'#ebebeb',
    top:5,

   paddingRight:25
  
  },

  TabBarBtn:{
    justifyContent:'center',
   display:'flex',
   flexDirection:'row',
   gap:10,
   
  
   padding:4
  
 
  },
  ProfileImageAndIcon:{
  gap:10,
  right:40,
  

  },
  shareIcons:{
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    bottom:2
  }

})
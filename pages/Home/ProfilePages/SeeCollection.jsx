import { View, Text, StyleSheet, Image,TouchableOpacity ,ImageBackground,Dimensions, ScrollView,Animated,SafeAreaView,TextInput, Keyboard} from 'react-native'
import {useRef} from 'react'
import Posts from '../../../components/Posts'
import LinkIcon3 from "react-native-vector-icons/Feather"
import LinkIcon4 from "react-native-vector-icons/Fontisto"
import LinkIcon2 from "react-native-vector-icons/FontAwesome"
import LinkIcon from "react-native-vector-icons/Entypo"
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import BackIcon from "react-native-vector-icons/MaterialIcons"
import { Platform } from "react-native";
export default function SeeCollection() {
    const { width, height ,fontScale} = Dimensions.get('window');
    const navigation = useNavigation();
    const translateY = useRef(new Animated.Value(400)).current;
 
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
    <View style={style.container} onTouchStart={()=>{{
        closeSheet()
        Keyboard.dismiss()
    }}}>
       <View style={style.header}>
          <View style={{position:'absolute',zIndex:3,top:'20%',left:15, backgroundColor:'#FFFFFF3b',paddingLeft:5,paddingRight:5,padding:1,borderRadius:4}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <BackIcon name='arrow-back-ios' size={23} color={'white'} style={{left:5}}/>
            </TouchableOpacity>
              
          </View>
          <SafeAreaView style={style.ProfileInfoDiv}>
       
       <View style={{display:'flex',flexDirection:'column',top:35,width:'60%'}}>
       <Text style={{fontSize:width>400?13:12,color:'white',fontWeight:'400',bottom:10,left:10,top:5}}>Koleksiyon Adı:</Text>
      
           <View style={style.ProfileName}>
           
             <Text style={{fontSize:width>400?25:18 ,color:'white',fontWeight:'500'}}>Master Realtor</Text>
        
          
           </View>
           <View style={{left:10,width:'100%',justifyContent:'center'}}>
            <TextInput placeholder='Mağazda Ara...'
             style={{
             backgroundColor:'#FFFFFF3b',
             padding:10,
             borderRadius:50,
             width:'100%',
            }}/>
            <TouchableOpacity>
            <View style={{
             position:'absolute',
             right:5,
            bottom:4,
             backgroundColor: "#FFFFFF",
             justifyContent: "center",
             width: 30,
             height: 30,
             alignItems: "center",
             borderRadius: 20,
            }}>
            <Icon name='search1'  size={15}/>
            </View>
            </TouchableOpacity>
           </View>
           </View>
 
 
             <View style={style.ProfileImageAndIcon}>
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
              <Image source={require('../home.jpg')} style={{width:'100%',height:'100%'}}/>
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
         <View>
      
           
           
         </View>
             </View>
 
               
         </SafeAreaView>
          <View style={style.opacity}></View>
          
               <ImageBackground source={require('../profilePhoto.jpg')}  style={{width:'100%',height:'100%',}} imageStyle={{borderBottomLeftRadius:30,borderBottomRightRadius:30}} />
            
          
        
            
        </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}}>
            <View style={style.PostContainer}>
                    <Posts/>

            </View>
          </ScrollView>
    
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
           <View style={style.shareIcons}>
            <LinkIcon name="link" size={23}/>
           
           </View>
           <Text>Kopyala</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={style.shareIcons}>
            <LinkIcon2 name="whatsapp" size={23}/>
           </View>
           <Text>Whatsapp</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={style.shareIcons}>
            <LinkIcon name="instagram" size={23}/>
           </View>
           <Text>İnstagram</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={style.shareIcons}>
            <LinkIcon2 name="facebook" size={23}/>
           </View>
           <Text>Facebook</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={style.shareIcons}>
            <LinkIcon3 name="message-circle" size={23}/>
           </View>
           <Text>Mesajlar</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{alignItems:'center'}}>
           <View style={style.shareIcons}>
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
      },
      PostContainer:{
        height:1000,
        backgroundColor: '#FFFFFF',  
        borderRadius: 10,  
        paddingVertical: 22,  
        paddingHorizontal: 10,  
        width: '100%',  
        marginVertical: 10,  
      
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
      ProfileInfoDiv:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        position:'absolute',
      top:width>400? 50:20,
      zIndex:2,
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
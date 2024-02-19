import { View, Text, StyleSheet, SafeAreaView ,Image, ImageBackground, ScrollView, TouchableOpacity,Dimensions, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import{ React ,useState}from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import ShopInfo from './ProfilePageItem/ShopInfo'
import ProjectAdverts from './ProfilePageItem/ProjectAdverts'
import RealtorAdverts from './ProfilePageItem/RealtorAdverts'
import { SearchBar } from '@rneui/themed';
import Team from './ProfilePageItem/Team'
export default function Profile() {
  const [tab, settab] = useState(0)
  const { width, height ,fontScale} = Dimensions.get('window');
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
    <View style={styles.container} >
         <View style={styles.ProfileInfoDiv}>
      
      <View style={{display:'flex',flexDirection:'column',top:20,}}>
      <Text style={{fontSize:width>400?12:11,color:'white',fontWeight:'400',bottom:10,left:10}}>Gayrimenkul Ofisi</Text>
          <View style={styles.ProfileName}>
          
            <Text style={{fontSize:width>400?22:15,color:'white',fontWeight:'500'}}>Master Realtor</Text>
            <View style={{width:28,height:28,left:10}}>
            <ImageBackground source={require('./BadgeYellow.png')} style={{flex:1}}/>
            <View style={{display:'flex',flexDirection:'column'}}></View>
            <Icon name='check'style={{position:'absolute',left:7,top:6}} size={15}/>
           </View>
           <View style={{width:28,height:28,left:10}}>
            <ImageBackground source={require('./BadgeYellow.png')} style={{flex:1}}/>
            <View style={{display:'flex',flexDirection:'column'}}></View>
            <Text style={{position:'absolute',fontSize:10,left:10,top:5}}>6</Text>
            <Text style={{position:'absolute',fontSize:10, bottom:3,left:9}}>yıl</Text>
           </View>
          </View>
          <View style={{left:10,width:'95%',justifyContent:'center'}}>
           <TextInput placeholder='Mağazda Ara...'
            style={{
            backgroundColor:'#FFFFFF3b',
            padding:10,
            borderRadius:50,
            width:'100%',
           }}/>
           <View style={{
            position:'absolute',
            right:5,
           
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            width: 30,
            height: 30,
            alignItems: "center",
            borderRadius: 20,
           }}>
           <Icon name='search1'  size={15}/>
           </View>
         
          </View>
          </View>


            <View style={styles.ProfileImageAndIcon}>
            <View style={styles.ProfileImage}>
              <Image source={require('./home.jpg')} style={{width:'100%',height:'100%'}} borderRadius={'50%'} />
        </View> 
        <View>
        <TouchableOpacity>
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

              
        </View>
      <View style={[styles.headerProfile]}>
        <View style={{width:'100%',height:'100%',backgroundColor:'#DE4241E6',position:'absolute',zIndex:1,borderBottomLeftRadius:50,borderBottomRightRadius:50}}></View>
      <ImageBackground source={require('./profilePhoto.jpg')} style={{width:'100%',height:'100%'}} imageStyle={{borderBottomLeftRadius:50,borderBottomRightRadius:50}} />

       
       
      
       
      </View>
      <View style={{height: width>400?'6%':'8%'}}>
      <ScrollView horizontal style={{padding:10}} indicatorStyle='white'>
      <View style={styles.tabBar}>
        

          <TouchableOpacity style={[styles.TabBarBtn,{  borderBottomWidth:tab===0? 3:0 ,borderBottomColor:tab===0?'#264ABB':'transparent',}]}
          onPress={()=>settab(0)}
          >
            <Entypo name='shop' size={16}/>
            <Text style={{color:tab ===0 ? 'black':'grey', fontWeight:tab===0?'500':'normal'}}>Mağaza profili</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.TabBarBtn,{ borderBottomWidth:tab===1? 3:0 ,borderBottomColor:tab===1?'#264ABB':'transparent',}]}
          onPress={()=>settab(1)}>         
          <Text style={{color:tab ===1 ? 'black':'grey', fontWeight:tab===1?'500':'normal'}}>Proje İlanları(0)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.TabBarBtn,{ borderBottomWidth:tab===2? 3:0 ,borderBottomColor:tab===2?'#264ABB':'transparent',}]}
        onPress={()=>settab(2)}>
          <Text style={{color:tab ===2 ? 'black':'grey', fontWeight:tab===2?'500':'normal'}}>Emlak İlanları(0)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.TabBarBtn,{  borderBottomWidth:tab===3? 3:0 ,borderBottomColor:tab===3?'#264ABB':'transparent',}]}
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
    </View>
    </TouchableWithoutFeedback>
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
    height:'23%',
  
  
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
    justifyContent:'center',
    padding:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    gap:10,
    bottom:15
    
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
 
  },
  ProfileImageAndIcon:{
  gap:10,
  right:30,
  

  }

})
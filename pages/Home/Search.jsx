import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView,StyleSheet,  Keyboard,Image,Platform } from "react-native";
import {React,useState,useEffect}from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import Categories from "../../components/Categories";
import Header from "../../components/Header";
import { SearchBar } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


export default function Search() {
  const navigation=useNavigation();
  const [search, setSearch] = useState("");

const updateSearch = (search) => {
  setSearch(search);

}


const [menuItems, setMenuItems] = useState([]);

const fetchmenuItems = async () => {
  try {
    const response = await axios.get('https://emlaksepette.com/api/menu-list');
    setMenuItems(response.data)
    const submenus = response.data[0].submenus;
    console.log(response.data[3].submenus);
    
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
fetchmenuItems()

}, []);

  return (
    <SafeAreaView onTouchStart={()=>Keyboard.dismiss()} style={{top:30}}>
         <Header/>
    <ScrollView>

    <View style={{flex:1}}>
      <View style={styles.Input}>
      
        <SearchBar
          placeholder="Ara..."
          onChangeText={updateSearch}
          value={search}
        containerStyle={{
          backgroundColor:'transparent',
          width:'100%',
          borderTopColor:'#e5e5e5',
          borderBottomColor:'#e5e5e5',
          height:60
          }}
          searchIcon={{size:25}}
         inputContainerStyle={{backgroundColor:'#e5e5e5',borderRadius:7,height:'100%'}}
          inputStyle={{fontSize:15}}
         showCancel='false'
         placeholderTextColor={'grey'}
         />
      </View>
       </View>


         <View>
           
            {/* {
            menuItems.map((item,index)=>(
                <TouchableOpacity 
                onPress={()=>navigation.navigate('Public',{name:item.text,data:menuItems,id:item.parent_id})}
           key={index}>
                <Categories category={item.text}/>
                </TouchableOpacity>
              ))
            } */}
          
            {
              menuItems.map((item,index)=>(
                <TouchableOpacity 
                onPress={()=>navigation.navigate('Public',{name:item.text,data:item.submenus,})}
           key={index}>
                <Categories category={item.text}/>


                </TouchableOpacity>
              ))
            }
            

         </View>


      
          <TouchableOpacity 
            onPress={()=>{
              navigation.navigate('RealtorClubExplore')
            }}
          >
          <View style={styles.RealtorClub}>
            <Image source={require('./emlakkulüplogo.png')} style={{position:'absolute',width:50,height:30,top:4}}/>
              <Text style={{fontWeight:'500',color:'white'}}>EMLAK KULÜP</Text>
              <Text style={{color:'white'}}>Hemen Keşfet</Text>
          </View>
          </TouchableOpacity>
    
  
  
   


    </ScrollView>
    </SafeAreaView>
  );
}
const styles=StyleSheet.create({
  Input:{
    alignItems:'center',
    height:'30%',
    bottom:8,
    zIndex:1
  },
  RealtorClub:{
    width:'100%',
    padding:15,
   
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
   
    backgroundColor: 'black',  
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
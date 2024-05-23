import { View, Text, StyleSheet, TouchableOpacity, Keyboard,ScrollView } from 'react-native'
import {useState,useEffect} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/base';
import Icon from "react-native-vector-icons/AntDesign"
import Order from './profileComponents/Order';
import { getValueFor } from '../../../components/methods/user';
import axios from 'axios';
export default function Sell() {
  const [search, setSearch] = useState("");
  const [Tabs, setTabs] = useState(0)
  const updateSearch = (search) => {
    setSearch(search);
  };
  const route = useRoute();
  const [user, setuser] = useState({})
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

const [products, setproducts] = useState([])

  const fetchData = async () => {
    try {
      if(user?.access_token){
        const response = await axios.get(
          "https://test.emlaksepette.com/api/institutional/get_solds",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setproducts(response.data.solds)
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);

    console.log(products,'dfsdfsfsd')

  return ( 
    <View style={style.container} onTouchStart={()=>Keyboard.dismiss()}>

        <View style={style.Navbar}>
            <View style={style.SearchInput}>
              <SearchBar
                 placeholder="Ara..."
                 onChangeText={updateSearch}
                 value={search}
               containerStyle={{
                 backgroundColor:'transparent',
                 width:'100%',
                 borderTopColor:'white',
                 borderBottomColor:'white',
                 height:60,
                 
                 }}
                 searchIcon={{size:25}}
                inputContainerStyle={{backgroundColor:'#e5e5e5',borderRadius:7,height:'100%'}}
                 inputStyle={{fontSize:15}}
                showCancel='false'
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={style.ListIcon}>
              <TouchableOpacity style={{backgroundColor:'#e5e5e5',padding:10,borderRadius:6}}>
                 <View style={{flexDirection:'row',gap:-7}}>
                  <Icon name='arrowup' size={20} style={{bottom:6}} color={'grey'}/>
                  <Icon name='arrowdown' size={20} style={{top:3}} color={'grey'}/>
                 </View>  
                 </TouchableOpacity>
            </View>
        </View>
      
        <ScrollView>
        <View style={style.orders}>
          {
            products.map((item,index)=>(
              <Order item={item}/>
            ))
          }
                 
          
                 

        </View>
        </ScrollView>
    </View>
  )
}
const style=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    Navbar:{
      width:'100%',
      borderBottomWidth:1,
      borderBottomColor:'#ebebeb',
      padding:2,
      display:"flex",
      flexDirection:'row',
      backgroundColor: '#FFFF',  
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
        })
      
    },
    SearchInput:{
      flex:1.7/2,
     
      padding:2
    },
    ListIcon:{
      flex:0.3/2,
   
      borderBottomColor:'#e5e5e5',
      padding:2,
      alignItems:'center',
      justifyContent:'center'
    },
    TabBar:{
      padding:10,
   
      alignItems: "center",
      justifyContent: "center",
    
     
    },
    TabBarBtn:{
      backgroundColor:'red',
      padding:10,
      borderRadius:4,
      
    },
    orders:{
      width:'100%',
      padding:15,
      gap:15
    }
})
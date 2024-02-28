import { View, Text, StyleSheet, TouchableOpacity, Keyboard,ScrollView } from 'react-native'
import {useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/base';
import Icon from "react-native-vector-icons/AntDesign"
import Order from './profileComponents/Order';
export default function Sell() {
  const [search, setSearch] = useState("");
  const [Tabs, setTabs] = useState(0)
  const updateSearch = (search) => {
    setSearch(search);
  };
  const route = useRoute();
  const {displayInfo} = route.params;

  const [products, setProducts] = useState([
    { id: 1,  date: '2023-01-15' },
    { id: 2,  date: '2023-03-10' },
    { id: 3,  date: '2022-12-05' }
  ])

 const date = new Date();
 const dayName = date.toLocaleDateString('tr-TR', { weekday: 'long' });
 const monthName = date.toLocaleDateString('tr-TR', { month: 'long' });
  
 console.log("Gün: ", dayName);

 

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
        <View style={style.TabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{display:'flex',flexDirection:'row',gap:20}}>
            <TouchableOpacity style={[style.TabBarBtn,{backgroundColor:Tabs==0? '#ebebeb':'#E54242',borderWidth:Tabs==0? 1:0, borderColor:'#E54242'}]}
              onPress={()=>setTabs(0)}
            >
              <Text style={[style.tabBarText,{color:Tabs===0? '#E54242':'white',fontWeight:Tabs===0?'600':'normal'}]}>Tümü</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.TabBarBtn,{backgroundColor:Tabs==1? '#ebebeb':'#E54242',borderWidth:Tabs==1? 1:0, borderColor:'#E54242'}]}
            onPress={()=>setTabs(1)}
            >
              <Text style={[style.tabBarText,{color:Tabs===1? '#E54242':'white',fontWeight:Tabs===1?'600':'normal'}]}>Onay Bekleyenler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.TabBarBtn,{backgroundColor:Tabs==2? '#ebebeb':'#E54242',borderWidth:Tabs==2? 1:0, borderColor:'#E54242'}]}
              onPress={()=>setTabs(2)}
            >
              <Text style={[style.tabBarText,{color:Tabs===2? '#E54242':'white',fontWeight:Tabs===2?'600':'normal'}]}>İptaller</Text>
            </TouchableOpacity>
                 
            </View>
        </ScrollView>
        </View>
        <ScrollView>
        <View style={style.orders}>
                  <Order display={displayInfo}/>
                  <Order display={displayInfo}/>
                  <Order display={displayInfo}/>
                  <Order display={displayInfo}/>
                  <Order display={displayInfo}/>
                  <Order display={displayInfo}/>
                  <Order display={displayInfo}/>
                 

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
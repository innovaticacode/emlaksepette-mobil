import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView,StyleSheet,  Keyboard,Image,Platform } from "react-native";
import {React,useState}from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import Categories from "../../components/Categories";
import Header from "../../components/Header";
import { SearchBar } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const navigation=useNavigation();
  const [search, setSearch] = useState("");

const updateSearch = (search) => {
  setSearch(search);
};

const searchData = {
  "propertyTypes": [
    {
      "name": "Projeler",
      "categories": [
        {
          "name": "Topraktan",
          "subcategories": ["Konut", "İş yeri", "Turizm"]
        },
        {
          "name": "Devam Eden",
          "subcategories": ["Konut", "İş yeri", "Turizm"]
        },
        {
          "name": "Tamamlanan",
          "subcategories": {
            "Konut":[""], 
            "İş yeri":[],
             "Turizm":[]}
        },
        {
          "name": "Tüm Projeler",
          "subcategories": ["Konut", "İş yeri", "Turizm"]
        }
      ]
    },
    {
      "name": "Konut",
      "categories": [
        {
          "name": "Satılık",
          "subcategories": ["Dükkan", "Ofis Binasi"]
        },
        {
          "name": "Kiralık",
          "subcategories": ["Dükkan", "Ofis Binasi"]
        }
      ]
    },
    {
      "name": "İş yeri",
      "categories": [
        {
          "name": "Satılık",
          "subcategories": ["Dükkan", "Ofis Binasi"]
        },
        {
          "name": "Kiralık",
          "subcategories": ["Dükkan", "Ofis Binasi"]
        }
      ]
    },
    {
      "name": "Arsa",
      "categories": [
        {
          "name": "Satılık",
          "subcategories": ["İmarlı", "İmarsız"]
        },
        {
          "name": "Kiralık",
          "subcategories": ["İmarlı", "İmarsız"]
        }
      ]
    },
    {
      "name": "Prefabrik",
      "categories": [
        {
          "name": "Satılık",
          "subcategories": ["İmarlı", "İmarsız"]
        },
        {
          "name": "Kiralık",
          "subcategories": ["İmarlı", "İmarsız"]
        }
      ]
    },
    {
      "name": "Tatilini Kirala",
      "categories": [
        {
          "name": "Satılık",
          "subcategories": ["İmarlı", "İmarsız"]
        },
        {
          "name": "Kiralık",
          "subcategories": ["İmarlı", "İmarsız"]
        }
      ]
    }
  ]
};
const goToPublicPage = (category) => {
  navigation.navigate('PublicPage', { category });
};
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
            {
              searchData.propertyTypes.map((item,index)=>(
                <TouchableOpacity 
                onPress={()=>navigation.navigate('Public',{name:item.name, categories: item.categories })} key={index}>
                <Categories category={item.name}/>
                </TouchableOpacity>
              ))
            }
       

         </View>


       {/* <View style={{bottom:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Public',{name:'Projeler', })}>
        <Categories category='Projeler'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Public',{name:'Konut'})}>
        <Categories category='Konut'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Public',{name:'İş Yeri'})}>
        <Categories category='İş Yeri'/>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Public',{name:'Arsa'})}>
          <Categories category='Arsa'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Public',{name:'Prefabrik'})}>
          <Categories category='Prefabrik'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Public',{name:'Müstakil Tatil'})}>
          <Categories category='Müstakil Tatil'/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Categories category='Al Sat Acil' ıconDisplay='none'/> 
          </TouchableOpacity>
        
          </View>  */}
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
import { View,  ScrollView,StyleSheet,Text, TouchableOpacity } from 'react-native'
import React ,{useState,useEffect} from 'react'
import { CheckBox } from "@rneui/themed";
import Advert from './EditComponents/Advert'
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from "react-native-vector-icons/AntDesign";
import { useRoute } from '@react-navigation/native';
import { getValueFor } from '../../../../../components/methods/user';
import axios from 'axios';

export default function EditAdvert() {
  const route =useRoute()
const {Project_Id, Project_name}=route.params
    const [checked, setchecked] = useState(false)
    const toggleCheked=()=>{
        setchecked(!checked)
    }
    const [housings, sethousings] = useState({})
    const [start,setStart] = useState(1);
    const [take,setTake] = useState(10);
    const [user,setUser] = useState({})
  const [end, setend] = useState(20)
    useEffect(() => {
      getValueFor("user",setUser)
    },[]);
    useEffect(() => {
      axios.get(`https://mobil.emlaksepette.com/api/project_housings/${Project_Id}?start=${start}&end=${end}`+start+'&take='+take,{ headers: { Authorization: 'Bearer ' + user.access_token } }).then((res) => {
        sethousings(res.data.housings + 'evler');
      }).catch((e) => {
        console.log(e);
      })
    },[user]);
  return (
  <ScrollView horizontal contentContainerStyle={{padding:7}} bounces={false}>
  {/* <Text>{Project_Id}</Text> */}

    <View style={{}}> 
<View style={{backgroundColor:'#E54242',padding:10}} >
<Text style={{color:'white'}}> Proje İlanlarım / {Project_name} Adlı Projenin Konutları</Text>

</View>
{/* {
    Array.from({
      length:housings.length
    }).map((item,index)=>{
      return <Text>fdsfd {index +1}</Text>
    })
 } */}
    <View style={styles.table}>
  
         <View style={[styles.row,{borderBottomWidth:1,borderBottomColor:'#333'}]}>
             <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}>
            <CheckBox
            checked={checked}
            onPress={toggleCheked}
            Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E54242"
            containerStyle={{ padding: 0, backgroundColor:'transparent', borderRadius: 5 }}
            size={25}
          />
            </View> 

            <View style={[styles.cell,{width:50}]}><Text>No</Text></View>
            <View style={[styles.cell]}><Text>İlan Resmi</Text></View>
            <View style={[styles.cell,{width:150}]}><Text>İlan Adı</Text></View>
            <View style={[styles.cell,{width:150}]}><Text>Fiyat</Text></View>
            <View style={[styles.cell ,{width:150}]}><Text>Taksitli Fiyat</Text></View>
            <View style={[styles.cell,{width:200}]}><Text>Ara Ödemeler</Text></View>
            <View style={[styles.cell,]}><Text>Taksit Sayısı</Text></View>
            <View style={[styles.cell,{width:150}]}><Text>Peşinat</Text></View>
            <View style={[styles.cell,{width:150}]}><Text>Satış Durumu</Text></View>
            <View style={[styles.cell,{width:120}]}><Text>İşlemler</Text></View>
         </View>
         <ScrollView>
         <View style={styles.row}>
         <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}>
            <CheckBox
            checked={checked}
            onPress={toggleCheked}
            Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E54242"
            containerStyle={{ padding: 0, backgroundColor:'transparent', borderRadius: 5 }}
            size={25}
          />
            </View> 
            <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}><Text>2</Text></View>
            <View style={[styles.cell]}>
              <View style={{width:70,height:70,backgroundColor:'red'}}>

              </View>
            </View>
            <View style={[styles.cell,{width:150,height:70}]}><Text style={{fontSize:12}} numberOfLines={3}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laboriosam impedit consectetur harum consequatur qui ratione nobis, minima, iure eaque in ad, amet officia ab. Ipsum maxime vero et fugiat.</Text></View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}><Text style={{fontSize:12}}>10.000.000₺</Text>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}>
              <Text style={{fontSize:12}}>15.000.000₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:200,height:70}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>Ara ödemeleri güncelle
0 Adet ara ödeme bulunmakta</Text>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text>1</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
              <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text style={{fontSize:12}}>10.000.000 ₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <View style={{backgroundColor:'#DAFBD0',padding:5,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:12,color:'#1B6C0A'}}>Satışa Açık</Text>
              </View>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:120,gap:5}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>İlanı Düzenle</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[{backgroundColor:'#FFE0DB',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#B81B01'}}>İlanı Sil</Text>
         </TouchableOpacity>
            </View>
         
         </View>
         <View style={styles.row}>
         <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}>
            <CheckBox
            checked={checked}
            onPress={toggleCheked}
            Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E54242"
            containerStyle={{ padding: 0, backgroundColor:'transparent', borderRadius: 5 }}
            size={25}
          />
            </View> 
            <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}><Text>1</Text></View>
            <View style={[styles.cell]}>
              <View style={{width:70,height:70,backgroundColor:'red'}}>

              </View>
            </View>
            <View style={[styles.cell,{width:150,height:70}]}><Text style={{fontSize:12}} numberOfLines={3}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laboriosam impedit consectetur harum consequatur qui ratione nobis, minima, iure eaque in ad, amet officia ab. Ipsum maxime vero et fugiat.</Text></View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}><Text style={{fontSize:12}}>10.000.000₺</Text>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}>
              <Text style={{fontSize:12}}>15.000.000₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:200,height:70}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>Ara ödemeleri güncelle
0 Adet ara ödeme bulunmakta</Text>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text>1</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
              <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text style={{fontSize:12}}>10.000.000 ₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <View style={{backgroundColor:'#DAFBD0',padding:5,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:12,color:'#1B6C0A'}}>Satışa Açık</Text>
              </View>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:120,gap:5}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>İlanı Düzenle</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[{backgroundColor:'#FFE0DB',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#B81B01'}}>İlanı Sil</Text>
         </TouchableOpacity>
            </View>
         
         </View>
         <View style={styles.row}>
         <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}>
            <CheckBox
            checked={checked}
            onPress={toggleCheked}
            Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E54242"
            containerStyle={{ padding: 0, backgroundColor:'transparent', borderRadius: 5 }}
            size={25}
          />
            </View> 
            <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}><Text>1</Text></View>
            <View style={[styles.cell]}>
              <View style={{width:70,height:70,backgroundColor:'red'}}>

              </View>
            </View>
            <View style={[styles.cell,{width:150,height:70}]}><Text style={{fontSize:12}} numberOfLines={3}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laboriosam impedit consectetur harum consequatur qui ratione nobis, minima, iure eaque in ad, amet officia ab. Ipsum maxime vero et fugiat.</Text></View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}><Text style={{fontSize:12}}>10.000.000₺</Text>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}>
              <Text style={{fontSize:12}}>15.000.000₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:200,height:70}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>Ara ödemeleri güncelle
0 Adet ara ödeme bulunmakta</Text>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text>1</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
              <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text style={{fontSize:12}}>10.000.000 ₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <View style={{backgroundColor:'#DAFBD0',padding:5,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:12,color:'#1B6C0A'}}>Satışa Açık</Text>
              </View>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:120,gap:5}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>İlanı Düzenle</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[{backgroundColor:'#FFE0DB',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#B81B01'}}>İlanı Sil</Text>
         </TouchableOpacity>
            </View>
         
         </View>
         <View style={styles.row}>
         <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}>
            <CheckBox
            checked={checked}
            onPress={toggleCheked}
            Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E54242"
            containerStyle={{ padding: 0, backgroundColor:'transparent', borderRadius: 5 }}
            size={25}
          />
            </View> 
            <View style={[styles.cell,{width:50,justifyContent:'center',alignItems:'center'}]}><Text>1</Text></View>
            <View style={[styles.cell]}>
              <View style={{width:70,height:70,backgroundColor:'red'}}>

              </View>
            </View>
            <View style={[styles.cell,{width:150,height:70}]}><Text style={{fontSize:12}} numberOfLines={3}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laboriosam impedit consectetur harum consequatur qui ratione nobis, minima, iure eaque in ad, amet officia ab. Ipsum maxime vero et fugiat.</Text></View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}><Text style={{fontSize:12}}>10.000.000₺</Text>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',gap:10}]}>
              <Text style={{fontSize:12}}>15.000.000₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:200,height:70}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>Ara ödemeleri güncelle
0 Adet ara ödeme bulunmakta</Text>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text>1</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
              <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <Text style={{fontSize:12}}>10.000.000 ₺</Text>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
              </View>
            <View style={[styles.cell,{width:150,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
              <View style={{backgroundColor:'#DAFBD0',padding:5,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:12,color:'#1B6C0A'}}>Satışa Açık</Text>
              </View>
              <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
            </View>
            <View style={[styles.cell,{width:120,gap:5}]}>
            <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#003cc7'}}>İlanı Düzenle</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[{backgroundColor:'#FFE0DB',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Text style={{fontSize:12,color:'#B81B01'}}>İlanı Sil</Text>
         </TouchableOpacity>
            </View>
         
         </View>
         
         </ScrollView>
       
         {/* Add more rows as needed */}
      </View>
        

    

    </View>

  </ScrollView>
            
   
  )
}
const styles = StyleSheet.create({
  table: {
    borderWidth: 0,
    
    borderColor: "#333",
 
 },
 row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth:1,
    borderColor:'#333'
 },
 cell: {
    flex: 1,
    padding: 10,

  width:100,
 
    ViewAlign: "center",

    color: "black",
    borderColor: "black",
 },
  });
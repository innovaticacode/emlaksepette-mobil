import { View, Text,ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';

export default function SliderMenu({goToSlide,tab,settab}) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://emlaksepette.com/api/menu-list');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);
  return (
    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
        

      }}>

      <View style={{padding:10,flexDirection:'row',gap:10}}>
        {
          menuItems.map((item,index)=>(
            <TouchableOpacity
              key={index}
            style={[styles.tabBtn,{
              backgroundColor:tab==index ?'#EA2C2E':'white',
              borderWidth:tab==index ? 0 :1
            }]} 
              onPress={()=>{
                goToSlide(index)
               
              }}
            >
              <Text style={{textAlign:'center',color:tab==index?'white':'#333',fontSize:12}}>{item.text}</Text>
             </TouchableOpacity>
          ))
        }
    
       {/* <TouchableOpacity style={[styles.tabBtn,{
         backgroundColor:tab==1 ?'#EA2C2E':'white',
         borderWidth:tab==1 ? 0 :1
       }]}
        onPress={()=>{
          goToSlide(1)
      
        }}
       >
        <Text style={{textAlign:'center',color:tab==1?'white':'#333',fontSize:12}}>Konut</Text>
       </TouchableOpacity>
       <TouchableOpacity style={[styles.tabBtn,{
          backgroundColor:tab==2 ?'#EA2C2E':'white',
          borderWidth:tab==2 ? 0 :1
       }]}
       onPress={()=>{
        goToSlide(2)
       }}>
        <Text style={{textAlign:'center',color:tab==2?'white':'#333',fontSize:12}}>İş Yeri</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#333',fontSize:12}}>Arsa</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#333',fontSize:12}}>Prefabrik</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#333',fontSize:12}}>Tatilini Kirala</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#333',fontSize:12}}>Al Sat Acil</Text>
       </TouchableOpacity>
      */}

      </View>
     
      
  
      
      
      
      </ScrollView> 
  )
}
const styles=StyleSheet.create({
    tabBtn:{
        backgroundColor:'white',
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        alignItems:'center',
        padding:6,
          borderRadius:15,
          borderWidth:1,
          borderColor:'#ebebeb'
    },
    text:{
      fontSize:12
    }
})
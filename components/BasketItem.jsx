import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native";
import {useState} from "react";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { addDotEveryThreeDigits } from "./methods/merhod";

export default function BasketItem({name,shopName,price,shopPoint,hisse, roomOrder, type,  ımage , share, update, minus, counter,  storeName}) {
  
  const navigation=useNavigation()

  const [chechked, setchechked] = useState(false)
// Ürün sayısı
// Toplam fiyat

  // Ürün sayısını arttırma işlevi


  const formatAmount = (amount) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
   
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   <View style={styles.container}>
      <View style={styles.CartItem}>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,paddingBottom:8,borderBottomColor:'#ebebeb'}}>
        <View style={{width:'55%'}}>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',gap:9,}}
          onPress={()=>navigation.navigate('Profile',{id:storeName.id})}
        >
          <TouchableOpacity
            style={{borderWidth:0.9,borderColor:'grey',padding:2,backgroundColor:chechked? '#EA2C2E':'white',borderRadius:20}}
            onPress={()=>setchechked(!chechked)}
          >
            <Icon name="check" size={12} color={'white'} />

          </TouchableOpacity>
          <View>
            <Text>{storeName?.name}</Text>
          </View>
          <View style={{backgroundColor:'#6ce24f',padding:1,paddingLeft:8,paddingRight:8,borderRadius:5}}>
            <Text style={{color:'white'}}>{shopPoint}</Text>
          </View>
          <View>
            <Icon2 name="arrow-right" size={10}/>
          </View>
         
        </TouchableOpacity>
        </View>
       <TouchableOpacity>
        <Icon3 name="trash" size={20} color={'#EA2A29'}/>
       </TouchableOpacity>
        </View>


          <View style={{flexDirection:'row',gap:10}}>
            <View style={{justifyContent:'center'}}>
            <TouchableOpacity
            style={{borderWidth:0.9,borderColor:'grey',padding:2,backgroundColor:chechked? '#EA2C2E':'white',borderRadius:20}}
            onPress={()=>setchechked(!chechked)}
          >
            <Icon name="check" size={12} color={'white'} />

          </TouchableOpacity>
            </View>
         
            <View style={{flex:0.6/2,height:90}}>
              <Image source={{uri:ımage}} style={{width:'100%',height:'100%'}}/>

            </View>
            <View style={{flex:1.4/2,padding:7,flexDirection:'column'}}>
              <View style={{flex:1.5/2,}}>
                {
                   type=='housing'?
                   <Text style={{fontSize:12,color:'#333'}}>{name}</Text>
                   :   <Text style={{fontSize:12,color:'#333'}}>{name} Projesinde {roomOrder} No'lu Konut </Text>
                }
           
              </View>
              
                 
                  <View style={{flex:0.7/2,flexDirection:'row',justifyContent:  share=='Var' ?'space-between':'flex-end'}}>
                  <View style={{ borderWidth:0,borderColor:'#ebebeb', paddingLeft:7,paddingRight:7,borderRadius:10,display: share=='Var' ? 'flex':'none',flexDirection:'row',alignItems:'center',gap:10}}>
                   <TouchableOpacity onPress={()=>{
                    minus()
                   }} >
                    <Icon3 name="minus" color={'grey'}/>
                   </TouchableOpacity>
                   <View style={{backgroundColor:'#efbdbd',paddingLeft:8,paddingRight:8, paddingTop:4, paddingBottom:4,borderRadius:20}}>
                    <Text style={{fontSize:12,fontWeight:'bold',color:'#FFF'}}>{counter}</Text>
                   </View>
                   <TouchableOpacity onPress={()=>{
                     update()
                    }}>
                    <Icon3 name="plus" color={'red'}/>
                   </TouchableOpacity>
                  </View>
                  <View style={{paddingLeft:0,paddingRight:0,justifyContent:'center',alignItems:'flex-end'}}>
                    <Text style={{fontSize:13,color:'green',fontWeight:'bold'}}>{formatAmount(price)} ₺</Text>
                    <View style={{backgroundColor:'green',padding:5,display:hisse?'flex':'none'}}>
                    <Text style={{fontSize:10,color:'white'}}> Hisse Satın Aldınız</Text>
                    </View>
                   
                  </View>
                </View>
              
               


            </View>
          </View>

      </View>
   </View>
    </TouchableWithoutFeedback>
   
  );
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:'white',
  
  },
  CartItem:{
  
    
      gap:8,
      backgroundColor: '#FFFFFF',  
      borderRadius: 4,  
      paddingVertical: 15,  
      paddingHorizontal: 10,  
      width: '100%',  
  
    
      borderWidth:0.7,
      borderColor:'#CED4DA',
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

})

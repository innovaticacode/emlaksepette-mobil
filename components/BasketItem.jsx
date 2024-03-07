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
export default function BasketItem() {
  const [chechked, setchechked] = useState(false)
  const [CountHome, setCountHome] = useState(1)
  const [price, setprice] = useState(2500000)
  const formattedNumber = price.toLocaleString('tr-TR')
  const decrement = () => {
    // Sıfırın altına düşmesini önlemek için, sayaç sıfır değerini aşağı inemeyecek şekilde kontrol edin
    if (CountHome > 0) {
      setCountHome(prevCount => prevCount - 1);
      setprice(price-CountHome)
    }}
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   <View style={styles.container}>
      <View style={styles.CartItem}>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',gap:9,borderBottomWidth:1,paddingBottom:8,borderBottomColor:'#ebebeb'}}>
          <TouchableOpacity
            style={{borderWidth:0.9,borderColor:'grey',padding:2,borderRadius:'50%',backgroundColor:chechked? '#EA2C2E':'white'}}
            onPress={()=>setchechked(!chechked)}
          >
            <Icon name="check" size={12} color={'white'} />

          </TouchableOpacity>
          <View>
            <Text>Maliyetine Ev</Text>
          </View>
          <View style={{backgroundColor:'#6ce24f',padding:1,paddingLeft:8,paddingRight:8,borderRadius:5}}>
            <Text style={{color:'white'}}>8.4</Text>
          </View>
          <View>
            <Icon2 name="arrow-right" size={10}/>
          </View>
         
        </TouchableOpacity>
          <View style={{flexDirection:'row',gap:10}}>
            <View style={{justifyContent:'center'}}>
            <TouchableOpacity
            style={{borderWidth:0.9,borderColor:'grey',padding:2,borderRadius:'50%',backgroundColor:chechked? '#EA2C2E':'white'}}
            onPress={()=>setchechked(!chechked)}
          >
            <Icon name="check" size={12} color={'white'} />

          </TouchableOpacity>
            </View>
         
            <View style={{flex:0.6/2,height:90}}>
              <Image source={require('./images/home.jpg')} style={{width:'100%',height:'100%'}}/>

            </View>
            <View style={{flex:1.4/2,padding:7,flexDirection:'column'}}>
              <View style={{flex:1.1/2,}}>
              <Text style={{fontSize:13}}>MASTER SONSUZ TATİL KÖYÜ VİLLA</Text>
              </View>
                <View style={{flex:0.9/2,flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{ borderWidth:1,borderColor:'#ebebeb', paddingLeft:10,paddingRight:10,borderRadius:10,display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
                   <TouchableOpacity onPress={decrement}>
                    <Icon3 name="minus" color={'grey'}/>
                   </TouchableOpacity>
                   <View style={{backgroundColor:'#ebebeb',paddingLeft:10,paddingRight:10, paddingTop:5, paddingBottom:5,borderRadius:'50%',}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>{CountHome}</Text>
                   </View>
                   <TouchableOpacity onPress={()=>{
                    setCountHome(CountHome+1)
                      setprice(price*CountHome)
                    }}>
                    <Icon3 name="plus" color={'red'}/>
                   </TouchableOpacity>
                  </View>
                  <View style={{paddingLeft:20,paddingRight:20,justifyContent:'center'}}>
                    <Text style={{fontSize:13,color:'green',fontWeight:'bold'}}>{formattedNumber}</Text>
                    <View style={{backgroundColor:'green',padding:5}}>
                    <Text style={{fontSize:11,color:'white'}}>{CountHome} Hisse Satın Aldınız</Text>
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
    flex:1
  },
  CartItem:{
  
    
      gap:8,
      backgroundColor: '#FFFFFF',  
      borderRadius: 4,  
      paddingVertical: 12,  
      paddingHorizontal: 10,  
      width: '100%',  
      marginVertical: 5,  
    
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

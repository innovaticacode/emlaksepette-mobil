import { View, Text ,SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import{ React,useState }from 'react'
import Personal from './Personal';
import Company from './Company';

export default function Register() {
  const [tabs, setTabs] = useState(0);
  return (
   <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.TabBar}>
              <TouchableOpacity
                onPress={() => setTabs(0)}
              style={{
                width:'40%',
               
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:tabs==0? 'white':'#F2F2F2'
              }}>
                <Text style={{
                  fontSize:20,
                  fontWeight:'600'
                }}>Bireysel</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => setTabs(1)}
              style={{
                 width:'40%',
                 
                  backgroundColor:tabs==1? 'white':'#F2F2F2',
                 alignItems:'center',
                 justifyContent:'center'
              }}>
                <Text style={{
                  fontSize:20,
                  fontWeight:'600'
                }}>Kurumsal</Text>
              </TouchableOpacity>
            </View>
            {tabs === 0 && <Personal/>}
            {tabs === 1 && <Company/>}
        </View>
   </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  container:{
      width:'100%',
      height:'100%',
      backgroundColor:'white',  
      
  },
    TabBar:{
      width:'100%',
      height:'7%',
      justifyContent:'center',
      display:'flex',
      flexDirection:'row',
      gap:42,
      marginTop:10
    },
  
  
    
})
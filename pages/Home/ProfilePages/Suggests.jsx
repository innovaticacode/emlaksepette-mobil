import { View, Text, StyleSheet ,TouchableOpacity,ScrollView } from 'react-native'
import {useState} from 'react'
import { useRoute } from '@react-navigation/native'
import SuggestItem from './profileComponents/SuggestItem';

export default function Suggests() {
    const route = useRoute();
    const { header,name} = route.params;
    const [Tabs, setTabs] = useState(0)
  return (
    
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{display:'flex',flexDirection:'row',gap:20}}>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==0? '#ebebeb':'#E54242'}]}
              onPress={()=>setTabs(0)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===0? 'red':'white',fontWeight:Tabs===0?'600':'normal'}]}>Alınan Teklifler (1)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==1? '#ebebeb':'#E54242'}]}
            onPress={()=>setTabs(1)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===1? 'red':'white',fontWeight:Tabs===1?'600':'normal'}]}>Yanıtlanan Teklifler (0)</Text>
            </TouchableOpacity>
           
          
            </View>
        </ScrollView>
      </View>
    <ScrollView>
        <View style={{padding:15}}>
            <SuggestItem/>
            <SuggestItem/>
          
        </View>
    </ScrollView>

    </View>
 
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    tabBar:{
        paddingLeft:20,
        padding:10,
        borderBottomWidth:1,
      
      
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
          }),
      },
      TabBarBtn:{
        backgroundColor:'red',
        padding:10,
        borderRadius:4,
        
      },
      tabBarText:{
        color:'white',
        fontWeight:'500'
      }
})
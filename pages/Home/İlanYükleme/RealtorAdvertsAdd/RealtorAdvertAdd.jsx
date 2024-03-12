import { View, Text, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard,Switch } from 'react-native'
import  {useState} from 'react'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'

export default function RealtorAdvertAdd() {
    const route=useRoute()
    const {name,beforeName,antesName}=route.params

  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch2 = () => {
  
    setIsEnabled2(previousState => !previousState)
   
  };
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={styles.container}>
        <View style={[styles.Card,{paddingVertical:11,paddingHorizontal:15,flexDirection:'row',alignItems:'center',gap:10}]}>
            <View style={{backgroundColor:'#ebebeb4d',padding:10,}}>
            <Icon name='home' color={'red'} size={17}/>
            </View>
          
        <Text style={{fontWeight:'bold',fontSize:12}}>{  beforeName +' > '+antesName+' > '+ name}</Text>
        </View>

        <View style={{padding:8}}>
           
        <View style={styles.Card}>
            <View style={{padding:8,gap:10}}>
                <Text>
                    <Text style={styles.label}>İlan Başlığı</Text>
                    <Text style={{color:'red'}}> *</Text>
                </Text>
                <TextInput style={styles.Input}/>
            </View>
            <View style={{padding:8,gap:10}}>
                <Text>
                    <Text style={styles.label}>İlan Açıklaması</Text>
                    <Text style={{color:'red'}}> *</Text>
                </Text>
                <TextInput style={[styles.Inputarea,{height:150,}]}
                multiline
                />
            </View>
            <View style={{padding:8}}>
            <View style={{borderWidth:1,borderColor:'#CED4DA',borderRadius:5,padding:5}}>
            <View style={{padding:8,gap:10}}>
                <Text>
                    <Text style={styles.label}>Peşin Fiyat</Text>
                    <Text style={{color:'red'}}> *</Text>
                </Text>
                <TextInput style={styles.Input}/>
            </View>
            </View>
        </View>
        <View style={{gap:13,padding:10}}>
        <Text style={[{}]}>Taksitli Satış</Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <Switch
              
              trackColor={{ false: 'red', true: '#E54242' }}
              thumbColor={isEnabled2 ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#9FA6BC"
              
              onValueChange={()=>{
                toggleSwitch2()
            
              } }
              value={isEnabled2}
            />
            <Text style={{}}>Var</Text>
        </View>
           
         
          </View>
        </View>
       
        </View>
        
    </View> 
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    Card:{
        backgroundColor: '#FFFFFF',  
        borderRadius: 10,  
        paddingVertical: 22,  
        paddingHorizontal: 5,  
        width: '100%',  
        marginVertical: 10,  
      
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
    Input:{
        borderWidth:1,
        borderColor:'#CED4DA',
        padding:15,
        borderRadius:5
    },
    Inputarea:{
        borderWidth: 1,
        borderColor: '#CED4DA',
        padding:15,
        height:180,
        paddingTop:20,
        borderRadius: 10,
        fontSize: 15,
        color: '#495057',
        fontWeight: '400',
    
      
    },
    label:{
        fontSize:13
    }
})
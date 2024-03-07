import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryAdverts from './CategoryAdverts'
import { useRoute , useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/AntDesign'
export default function CategoryChoose() {
  const navigation=useNavigation()
    const  route = useRoute();
    const { name,previousName} = route.params;
    const categories = [
      { title: 'Konut' },
      { title: 'İş Yeri' },
      { title: 'Arsa' },
      { title: 'Bina' },
      { title: 'Turistik Tesis' },
      { title: 'Müstakil Tatil' },
      { title: 'Turizm' },
      { title: 'Prefabrik' }
    ];
    

  return (
    <View style={style.container}>
    <View style={style.categoryContainer}>
    <View style={[style.card,{}]}>
      <View style={{backgroundColor:'#ebebeb4d',padding:10,borderRadius:'50%'}}>
            <Icon2 name='home' color={'red'} size={17}/>
            </View>
            <Text style={{fontWeight:'bold',fontSize:12}}>{ previousName +' > ' +name}</Text>
      </View>
     
   {
    categories.map((item,index)=>(
      <TouchableOpacity key={index} onPress={()=>navigation.navigate('CategorieStatu',{name:item.title ,previousName:previousName ,beforName:name })}>
        <CategoryAdverts key={index} text={item.title} navigationRoute={true} DisplayParams='none' />
        </TouchableOpacity>
    ))
   }
       
      </View>
    </View>
  )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    card:{
      flexDirection:'row',
      alignItems:'center',
      gap:8,
      backgroundColor: '#FFFFFF',  
      borderRadius: 10,  
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
    }
})
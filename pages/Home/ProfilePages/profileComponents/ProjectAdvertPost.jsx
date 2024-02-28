import { View, Text, StyleSheet, TouchableOpacity, ImageBackground,Dimensions} from 'react-native'
import {useState}from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
export default function ProjectAdvertPost({Onpress}) {
    const [İsPasive, setİsPasive] = useState(true)

    const {width,height}=Dimensions.get('window')
  return (
    <TouchableOpacity onPress={()=>setİsPasive(!İsPasive)}>
    <View style={style.container}>
     <View style={style.Post}>
            <View style={style.Image}>
               
               
                <ImageBackground source={require('./home.jpg')} style={{width:'100%',height:'100%'}} resizeMode='cover' />
            </View>

            <View style={style.CaptionAndInfo}>
            <View style={{position:'absolute',zIndex:1,right:0,}}>
                <Text style={{fontSize:10}}>İlan No: 1212121212</Text>
               
                </View>
                <View style={{position:'absolute',zIndex:1,right:0,top:20}}> 
                <TouchableOpacity onPress={Onpress}>
                 <Icon2 name='dots-three-vertical' size={18}/>
                 </TouchableOpacity>       
                </View> 
                    <View style={style.Caption}>
                        <Text style={{
                            fontSize:16,
                            color:'#141824',
                            fontWeight:'400',
                            fontFamily:'Verdana'
                        }}>Master Sonsuz Tatil Evleri</Text>
                        <View style={{flexDirection:'row'}}>
                            <Icon name='location' size={11}/>
                            <Text style={{fontSize:10}}>İstanbul / Kartal / Cevizli</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:12,bottom:5}}>İlan Sayısı 1</Text>
                        {
                            İsPasive?
                            <Text style={{bottom:10,fontSize:13,color:'#27B006'}}>Yayında</Text>:
                            <Text style={{bottom:10,fontSize:13,color:'#B81900',fontWeight:'500'}}>Pasif</Text>
                        }
                       
                        </View>
                       
                    </View>
                   

               
            </View>
     </View>
    </View>
    </TouchableOpacity>
  )
}
const {width,height}=Dimensions.get('window')
const style=StyleSheet.create({
        container:{
            width:'100%',
            padding:10,
           
            paddingLeft:20,
            paddingRight:20,
            borderRadius:5,
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
        Post:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            height:width>400? 100:100,
            overflow:'hidden'
        },
        Image:{
            flex:0.6/2,
           
         
        },
        CaptionAndInfo:{
            flex:1.3/2,
         
            padding:2,
            display:'flex'
        },
        Caption:{
            flex:1/2,
            gap:10,
            paddingTop:15
        },
      
})
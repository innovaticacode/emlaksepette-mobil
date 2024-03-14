import { View, Text, StyleSheet, ScrollView ,Animated,TouchableOpacity} from 'react-native'
import {useState,useRef} from 'react'
import ProjectAdvertPost from '../profileComponents/ProjectAdvertPost'

export default function ActiveAdverts({header,header2,hidden}) {
    const translateY = useRef(new Animated.Value(400)).current;
    const [display, setdisplay] = useState(false)
    const openSheet = () => {
        setdisplay(true)
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const closeSheet = () => {
        setdisplay(false)
      Animated.timing(translateY, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }; 
   
  return (
    <View style={{flex:1}}>
    <ScrollView>
    <View style={styles.container} onTouchStart={closeSheet}>
        <View style={{
            paddingTop:20,
            paddingLeft:20
        }}>
            <Text style={styles.headerText}>{header}{header2}(1)</Text>
        </View>
        <View style={styles.Adverts}>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
          <ProjectAdvertPost Onpress={openSheet}/>
        
        </View>
       
    </View>
   
    </ScrollView>
    <View style={{ flex: 1, position: 'absolute', bottom: 0, width: '100%', display: display == false ? 'none' : 'flex'  }}>
     
     <Animated.View
       style={[styles.animatedView,{ transform: [{ translateY }], }]}
     >
    
      
           <View style={{display:'flex',justifyContent:'space-around',gap:10,width:'100%',bottom:0,padding:10}}>
        
      <View >
            <TouchableOpacity style={{width:'100%',backgroundColor:'#DAFBD0',padding:8,flexDirection:'row',justifyContent:'center',gap:6}}
            
            >
                
                <Text style={{textAlign:'center',color:'#1B6C0A',fontWeight:'500'}}>{hidden=='none'?'Düzenle':'Genel Düzenleme'}</Text>
            </TouchableOpacity>
        </View>
        <View >
            <TouchableOpacity style={{width:'100%',backgroundColor:'#DAFBD0',padding:8,flexDirection:'row',justifyContent:'center',gap:6,}}
            
            >
                
                <Text style={{textAlign:'center',color:'#1B6C0A',fontWeight:'500'}}>{hidden=='none'?'Resimler':'İlanları Düzenle'}</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{width:'100%',backgroundColor:'#FFE0DB',padding:8,flexDirection:'row',justifyContent:'center',}}
            
            >
                
                <Text style={{textAlign:'center',color:'#B81900',fontWeight:'500'}}>Pasife Al</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{width:'100%',backgroundColor:'#FFE0DB',padding:8,flexDirection:'row',justifyContent:'center',}}
            
            >
                
                <Text style={{textAlign:'center',color:'#B81900',fontWeight:'500'}}>Sil</Text>
            </TouchableOpacity>
        </View>
       
        
           </View>
     
   
      
     </Animated.View>
   </View>
    </View>
  )
}
const styles=StyleSheet.create({
        container:{
            flex:1,
            
        },
        headerText:{
            fontSize:20,
            color:'#141824',
            fontWeight:'600'
        },
        Adverts:{
            width:'100%',
            
          paddingTop:20,
          paddingLeft:10,
          paddingRight:10,
            gap:10,
           
        },
        animatedView: {
           
            paddingBottom:10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            backgroundColor: '#FFFF',
            borderColor: '#e6e6e6',
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
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 20,
          },
})
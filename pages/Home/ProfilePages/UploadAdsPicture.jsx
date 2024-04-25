import { View, Text ,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import UploadIcon from 'react-native-vector-icons/AntDesign'
import AdsPictureItem from './profileComponents/AdsPictureItem'

export default function UploadAdsPicture() {

    
  return (
    <View style={styles.container}>
        <View>
            <View style={styles.uploadArea}>
                <View style={{alignItems:'center',justifyContent:'center',gap:15}}>
                    <TouchableOpacity>
                    <UploadIcon name='upload'size={50} color={'grey'}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:14,color:'#333'}}>Mağazanızın profili için bir reklam resmi yükleyin</Text>
                    <TouchableOpacity style={styles.UploadBtn}>
                        <Text style={{color:'white',textAlign:'center',fontWeight:'500'}}>Resim Seçin</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </View>
        <ScrollView contentContainerStyle={{padding:10}} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
            <View style={{backgroundColor:'#F5F5F7',paddingBottom:10,paddingTop:10}}>
            <Text style={{color:'#333',fontSize:15}}>Resimler</Text>
            </View>
                <View style={{gap:10}}>
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                </View>
              
        </ScrollView>
        <View style={{paddingBottom:40}}>
            <TouchableOpacity style={[styles.UploadBtn,{width:'100%'}]} >
                <Text style={{color:'white',textAlign:'center',fontWeight:'500'}}>Resmi Yükle</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#F5F5F7",
        padding:15,
       justifyContent:'space-between'
    },
    uploadArea:{
        justifyContent:'center',
        height:200,
        borderRadius:5,
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:'grey'
    },
    UploadBtn:{
        backgroundColor:'#EA2B2E',
        padding:10,
        borderRadius:7,
        width:'50%'
    }
})
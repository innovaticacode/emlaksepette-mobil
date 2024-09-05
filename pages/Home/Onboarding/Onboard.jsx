import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform ,Image, ImageBackground} from 'react-native'
import React, { useRef, useState } from 'react'
import PagerView from 'react-native-pager-view';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import Arrow from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
export default function Onboard() {
    const pagerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0); // Mevcut sayfa durumunu tutar
    const navigation = useNavigation()
    // Bir sonraki sayfaya geçiş fonksiyonu
    const goToNextPage = () => {
      if (pagerRef.current) {
        pagerRef.current.setPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Bir önceki sayfaya geçiş fonksiyonu
    const goToPreviousPage = () => {
      if (pagerRef.current) {
        pagerRef.current.setPage(currentPage - 1);
        setCurrentPage(currentPage - 1);
      }
    };
    const goToPage = (pageIndex) => {
        if (pagerRef.current) {
          pagerRef.current.setPage(pageIndex);
          setCurrentPage(pageIndex);
        }
      };
  const FirstPage=({content,ımage})=>{
    return(
        <View style={{width:'100%',height:'100%',backgroundColor:'#FFFFFF'}}>
          
            <View style={{width:'100%',height:'50%',backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center'}}>
                
                        <View style={{width:300,height:200,justifyContent:'center',alignItems:'center',marginLeft:30,marginTop:20}}>
                           {ımage}
                        </View>
            </View>
            <View style={{width:'100%',height:'50%',backgroundColor:'#EA2C2E',alignItems:'center'}}>
                    <View style={{width:'70%',height:'70%',justifyContent:'center',}}>
                       {content}
                       
                    </View>
            </View>
            
        </View>
    )
  }
  return (
    <View style={{flex:1}}>
          <PagerView
    style={styles.pagerView}
    initialPage={0}
    ref={pagerRef}
    onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} // Sayfa değişikliklerini dinle
  >
    <View style={styles.page} key="1">
            <FirstPage content={
                <Text style={{fontSize:22,color:'white',fontWeight:'600',textAlign:'center'}}>Emlak Sepette'ye Hoş Geldiniz! Evinizi Kolayca Bulun.</Text>
            } ımage={  <ImageBackground source={require('./onboarding.png')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>} />
    </View>
    <View style={styles.page} key="2">
        <FirstPage content={
            <View style={{gap:10}}>
            <Text style={{fontSize:22,color:'white',fontWeight:'600',textAlign:'center'}}>Tek Tıkla Al, Sat, Kirala!</Text>
            <Text style={{fontSize:15,color:'white',fontWeight:'400',textAlign:'center'}}>Tek tıkla aradığınız evi bulabileceğiniz veya satıp, kiralayabileceğniz yepyeni bir platform, Emlak Sepette.</Text>
            </View>
        } ımage={<ImageBackground source={require('./onboarding2.png')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>}/>
    </View>
    <View style={styles.page} key="3">
    <FirstPage 
     content={
        <View style={{gap:10}}>
        <Text style={{fontSize:22,color:'white',fontWeight:'600',textAlign:'center'}}>Emlak Sepette, en uygun alıcıları en hızlı şekilde sizlerle buluşturur.</Text>
        <Text style={{fontSize:15,color:'white',fontWeight:'400',textAlign:'center'}}>Hızlı Sat seçeneği ile Emlak Sepette sizin için alıcıları çok daha hızlı bir şekilde bulur.</Text>
        </View>
    }
    ımage={<ImageBackground source={require('./onboarding3.png')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>}
    />
    </View>
    <View style={styles.page} key="4">
    <FirstPage
     content={
        <View style={{gap:10}}>
        <Text style={{fontSize:22,color:'white',fontWeight:'600',textAlign:'center'}}>Hemen Üye Ol ve İlan vermeye başla!</Text>
        <Text style={{fontSize:15,color:'white',fontWeight:'400',textAlign:'center'}}>Tek tıkla bireysel ilanını yayınla. Kendi ilan koleksiyonunu oluştur. Emlak Sepette ile sende kazan!</Text>
        </View>
    }
    ımage={<ImageBackground source={require('./onboarding4.png')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>}
    />
    </View>
    <View style={styles.page} key="5">
    <FirstPage
     content={
        <View>
        <View style={{gap:10}}>
        <Text style={{fontSize:22,color:'white',fontWeight:'600',textAlign:'center'}}>Emlak Kulüp İle Kazan!</Text>
        <Text style={{fontSize:15,color:'white',fontWeight:'400',textAlign:'center'}}>Emlak Kulüp’e Üye ol kendi ilan koleksiyonu oluştur, sosyal medya hesaplarında paylaş! Paylaştığın koleksiyondan satılan ilanla sende kazan!</Text>
        </View>

</View>
    }
    ımage={<ImageBackground source={require('./onboarding5.png')} style={{width:'100%',height:'100%'}} resizeMode='contain'/>}
    />
    </View>
  </PagerView>
  {
     currentPage!==4 &&
     <View style={{alignItems:'center'}}>
     <View style={styles.pagination}>
           {[0, 1, 2,3,4].map((pageIndex) => (
             <TouchableOpacity
               key={pageIndex}
               style={[
                 styles.dot,
                 currentPage === pageIndex ? styles.activeDot : styles.inactiveDot,
               ]}
               onPress={() => goToPage(pageIndex)}
             />
           ))}
         </View>
     </View>
  }


  {
    currentPage!==4 &&
    <View style={{position:'absolute',bottom:40,right:20}}>
    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:8}} onPress={()=>{
     goToNextPage()
    }}>
   
     <Arrow name='arrow-right' color={'white'} size={15}/>
     
    </TouchableOpacity>
 </View>

  }
  {
    currentPage==4 &&
    <View style={{paddingTop:15,width:'100%',alignItems:'center',gap:10,position:'absolute',bottom:40}}>
    <View style={{width:'70%'}}>
        <TouchableOpacity style={{
            backgroundColor:'white',
            padding:9,
            borderRadius:8,
            width:'100%',
            alignItems:'center'
        }}
            onPress={()=>{
                navigation.navigate('Register')
            }}
        >
            <Text style={{alignItems:'center',color:'#EA2C2E',fontWeight:'600'}}>Üye Ol</Text>
        </TouchableOpacity>
    </View>
    <View style={{width:'70%'}}>
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('Home')
            
        }} 
        style={{
            backgroundColor:'transparent',
            borderWidth:1,
            borderColor:'white',
            padding:9,
            borderRadius:8,
            width:'100%',
            alignItems:'center'
        }}
        
        >
            <Text style={{color:'white',fontWeight:'600'}}>Atla</Text>
        </TouchableOpacity>
    </View>
</View>
  }

 
    </View>
  
  )
}
const styles = StyleSheet.create({
    pagerView: {
      width: width,
      height: height,
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
     
        position:'absolute',
        bottom:110
      },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: "#FFFFFF",
      
       
        borderWidth: 0.7,
        borderColor: "#e6e6e6",
        ...Platform.select({
          ios: {
            shadowColor: "#e6e6e6",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
      },
      activeDot: {
        backgroundColor: "#FFFFFF",
        padding:6,
        borderRadius:50,
        borderWidth: 1,
        borderColor: "#e6e6e6",
        ...Platform.select({
          ios: {
            shadowColor: "#e6e6e6",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
      },
      inactiveDot: {
        backgroundColor: '#ccc',
      },
  });
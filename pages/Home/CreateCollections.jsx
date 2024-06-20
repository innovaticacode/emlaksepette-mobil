import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Platform } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getValueFor } from '../../components/methods/user'
import axios from 'axios'
import AddCollection from '../../components/AddCollection'
import { ActivityIndicator } from 'react-native-paper'
export default function CreateCollections() {
    const route=useRoute()
    const {HouseID}= route.params
    const [CollectionName, setCollectionName] = useState('')
    const [user, setUser] = useState({});
  const [collections, setcollections] = useState([])
   
    useEffect(() => {
      getValueFor("user", setUser);
    }, []);
const [loading, setloading] = useState(false)
    const fetchData = async () => {
        setloading(true)
      try {
        if (user.access_token) {
          const response = await axios.get('https://mobil.emlaksepette.com/api/client/collections',{
            headers: {
              'Authorization': `Bearer ${user.access_token}`
            }
          });
        
          setcollections(response?.data.collections);
        }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
          setloading(false)
      }
    };
    useEffect(() => {
      fetchData();
    }, [user]);


    const [selectedCollectionId, setselectedCollectionId] = useState(0)
const [selectedCollectionName2, setselectedCollectionName2] = useState('')
const getCollectionId=(id,name)=>{
    setselectedCollectionId(id)
    setselectedCollectionName2(name)
} 
const [disabledTrue, setdisabledTrue] = useState(false)
    const addCollectionPost=()=>{
     
      const collectionData = {
        collection_name: CollectionName,
        cart: {
          id:HouseID,
          type:null,
          project: null,
          clear_cart: "no",
          selectedCollectionId: null
        }
      };
    
    
      axios.post('https://mobil.emlaksepette.com/api/add/collection', collectionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
          
         
        },
      })
      .then(response => {
             
              fetchData()
        // Başarılı yanıtı işleyin
        // setselectedCollectionName(response.data.collection.name)
        setCollectionName('')
        setdisabledTrue(true) 
        setTimeout(() => {
            setdisabledTrue(false)
        }, 2000);
      })
      .catch(error => {
        // Hata durumunu işleyin
        console.error('Error:', error);
      })
    
    
    }
    const [showAlert, setshowAlert] = useState(false)
    const [showDeleteAlert, setshowDeleteAlert] = useState(false)
    const addSelectedCollection=(id,name)=>{
      const collectionData = {
        collection_name:name,
        clear_cart: "no",
        id: HouseID,
        project:null,
        selectedCollectionId: id,
        type:2
      };
    
    
      axios.post('https://mobil.emlaksepette.com/api/addLink', collectionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
          
         
        },
      })
      .then(response => {
        setshowAlert(true)
        setTimeout(() => {
          setshowAlert(false)
        }, 2000);
        var newCollections = collections.map((collection) => {
          if (collection.id ==id) {
            return {
              ...collection,
              links: [
                ...collection.links,
                {
                  collection_id: id,
                  room_order: null,
                  item_id: HouseID,
                  user_id: user?.id,
                  item_type: 2,
                },
              ],
            };
          } else {
            return collection;
          }
        });
        setcollections(newCollections);
       
      })
      .catch(error => {
        // Hata durumunu işleyin
        console.error('Error:', error);
      });
    
    }

const ıtemOnCollection = (collectionId) => {
  let check = false;
  collections.map((collection) => {
    for (var i = 0; i < collection?.links?.length; i++) {
      if (
        (collection.links[i].item_type =
          2 &&
          collection.links[i].item_id == HouseID &&
        
          collection.links[i].collection_id == collectionId)
      ) {
        check = true;
      }
    }
  });

  return check;
};
const removeItemOnCollection = (collectionId) => {
  const collectionData = {
    item_type: 2,
   
    item_id: HouseID,
    collection_id: collectionId,
  };

  axios
    .post(
      "https://mobil.emlaksepette.com/api/remove_item_on_collection",
      collectionData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    )
    .then((response) => {
      setshowDeleteAlert(true)
      setTimeout(() => {
          setshowDeleteAlert(false)
      }, 2000);
      var newCollections = collections.map((collection) => {
        if (collection.id == collectionId) {
          var newLinks = collection.links.filter((link) => {
            if (
              link.collection_id == collectionId &&
              link.item_id == HouseID&&
              link.room_order == null
            ) {
            } else {
              return link;
            }
          });

          return {
            ...collection,
            links: newLinks,
          };
        } else {
          return collection;
        }
      });

      setcollections(newCollections);
    })
    .catch((error) => {
      // Hata durumunu işleyin
      console.error("Error:", error);
    });
};
const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  const navigation =useNavigation()
  return (
    
   <>
          {
            user.access_token  && user.has_club == 1
            ?
                <>
                
                <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:50}}>
            <View style={{gap:5,paddingTop:10}}> 
              <Text style={{fontSize:13,color:'#333',fontWeight:'bold'}}>Koleksiyon İsmi</Text>
              <TextInput style={styles.Input} value={CollectionName} onChangeText={(value)=>setCollectionName(value)}/>
              <View style={{paddingTop:10,alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#EA2B2E',padding:9,borderRadius:5,width:'90%',opacity:disabledTrue == true ? 0.3:1}} 
                    onPress={addCollectionPost}
                    disabled={disabledTrue}
                >
                  <Text style={{color:'#ffffff',fontSize:13,fontWeight:'bold',textAlign:'center'}}>Koleksiyon Ekle</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{paddingTop:45}}>
              <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Koleksiyonlarım</Text>
            </View>
              <View style={{gap:5,padding:10}}>
         
              {
                      loading== true ?
                        <ActivityIndicator/>:
                        collections.map((item,index)=>(

                          <AddCollection  checkFunc={ıtemOnCollection} key={index} item={item} getCollectionId={getCollectionId} addLink={addSelectedCollection}   removeItemOnCollection={removeItemOnCollection}    setPopUpForRemoveItem={setsetPopUpForRemoveItem}/> 
                        ))

                      }
              </View>
                        
    </ScrollView>
                </>:
                <>
                <View style={{padding:5}}>
                      {
                        !user.access_token && 
                        <View style={styles.card}>
                   
                        <View style={{paddingTop:10}}>
                          <Text style={{textAlign:'center',color:'#4C6272',fontWeight:'bold',fontSize:16}}>Üyeliğiniz Bulunmamaktadır!</Text>
                        </View>
                        <View style={{width:'80%'}}>
                          <Text style={{textAlign:'center',color:'#7A8A95'}}>Koleksiyonunuza konut ekleyebilmeniz için giriş yapmanız gerekmektedir</Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#F65656',width:'100%',padding:10}}
                           onPress={()=>{
                            navigation.navigate('Login')
                        }}
                        >
                      <Text style={{color:'#FFFFFF',textAlign:'center'}}>Giriş Yap</Text>
                    </TouchableOpacity>
                    </View>
                      }
                  {
                    user.access_token && user.has_club == 0 &&
                    <View style={styles.card}>
                 
                    <View style={{paddingTop:10}}>
                      <Text style={{textAlign:'center',color:'#4C6272',fontWeight:'bold',fontSize:16}}> Emlak Kulüp Üyeliğiniz Bulunmamaktadır!</Text>
                    </View>
                    <View style={{width:'80%'}}>
                      <Text style={{textAlign:'center',color:'#7A8A95'}}>Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#F65656',width:'100%',padding:10}}
                       onPress={()=>{
                        navigation.navigate('Collecitons')
                    }}
                    >
                  <Text style={{color:'#FFFFFF',textAlign:'center'}}>Emlak Kulüp Üyesi Ol </Text>
                </TouchableOpacity>
                </View>
                  }
                      
                </View>
            
                <View style={{alignItems:'center'}}>
                {/* {
                    user.has_club == 0 ?
                    <TouchableOpacity style={{backgroundColor:'#EA2B2E',padding:9,borderRadius:5,width:'90%',opacity:disabledTrue == true ? 0.3:1}} 
                    onPress={()=>{
                        navigation.navigate('Collections')
                    }}
              >
                <Text style={{color:'#ffffff',fontSize:13,fontWeight:'bold',textAlign:'center'}}>Emlak Kulüp Üyesi OL</Text>
              </TouchableOpacity>
                    : 
                    <TouchableOpacity style={{backgroundColor:'#EA2B2E',padding:9,borderRadius:5,width:'auto'}} 
                 
              >
                <Text style={{color:'#ffffff',fontSize:13,fontWeight:'bold',textAlign:'center'}}>Giriş Yap</Text>
              </TouchableOpacity>
                   
                  } */}
                   
                      </View>
                </>
          }
          <View style={{position:'absolute',bottom:50,width:'100%',padding:10,display:showAlert==true? 'flex':'none'}} >
          <View style={{backgroundColor:'#1a842f',padding:15,borderRadius:10}}>
        <View>
          <Text style={{textAlign:'center',color:'#ffffff',fontSize:12,fontWeight:'bold'}}>Konutunuz {selectedCollectionName2} Adlı Koleksiyonuza Başarıyla Eklendi</Text>
        </View>
      </View>
          </View>
          <View style={{position:'absolute',bottom:50,width:'100%',padding:10,display:showDeleteAlert==true? 'flex':'none'}} >
          <View style={{backgroundColor:'#d64d4d',padding:15,borderRadius:10}}>
        <View>
          <Text style={{textAlign:'center',color:'#ffffff',fontSize:12,fontWeight:'bold'}}>Konutunuz {selectedCollectionName2} Adlı Koleksiyonunuzdan Kaldırıldı</Text>
        </View>
      </View>
          </View>
 
   </>
  
   
  
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7f7',
        padding:10,
      
    },
      Input:{
        backgroundColor:'#ebebebeb',
        padding:9,
        borderRadius:5
      },
      card: {
        backgroundColor: "#ffffff",
        alignItems:'center',
     gap:10,
        width: "100%",
       
        borderWidth: 0.7,
        borderColor: "#e6e6e6",
        ...Platform.select({
          ios: {
            shadowColor: " #e6e6e6",
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
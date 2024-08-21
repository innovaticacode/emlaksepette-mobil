import { View, Text, StyleSheet, ScrollView,TouchableOpacity, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { Platform } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import { getValueFor } from '../../components/methods/user';
import axios from 'axios';
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
export default function MyComments() {
    const [user, setuser] = useState({});

    useEffect(() => {
      getValueFor("user", setuser);
    }, []);
   const [comments, setcomments] = useState([])
    const fetchData = async () => {
      try {
        if (user?.access_token &&user ) {
         
          const response = await axios.get(
            `https://private.emlaksepette.com/api/user/${user?.id}/comments`,
          );
              setcomments(response.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      
      }
    };
  useEffect(() => {
      fetchData()
  }, [user])
    const MycommentItem=({ProjectInfo,comment,EditComment})=>{
        const API_URL='https://private.emlaksepette.com/'
        const numStars = Math.round(comment?.rate);
        return(
         <TouchableOpacity style={[styles.card,{
            width:'100%',
           
            padding:10,
            borderRadius:5
         }]}>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:70,height:70,backgroundColor:'blue'}}>
                            <ImageBackground
                                source={{uri:`${API_URL}${ProjectInfo?.image.replace(
                                    "public/",
                                    "storage/"
                                  )}`}}
                                  style={{width:'100%',height:'100%'}}
                            />
                        </View>   
                        <View style={{width:'76%',paddingLeft:7,paddingRight:7,gap:7}}>
                            <View>
                            <Text style={{color:'#333',fontSize:12}} numberOfLines={2}>{ProjectInfo?.project_title}</Text>
                            </View>
                                <View style={{gap:5}}>
                                    <View style={{flexDirection:'row'}}>
                                    {[...Array(numStars)].map((_, index) => (
               <Ionicons key={index} name="star" size={12} color="gold" />
            ))}
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                      <View style={{width:'80%'}}>
                                      <Text style={{fontSize:12,color:'#333'}} numberOfLines={1}>{comment?.comment}</Text>
                                      </View>
                                     <View>
                                     {
                                          comment?.status==0 &&
                                          <Text style={{fontSize:10,color:'#FF9908'}}>Onay Bekliyor</Text>
                                        }
                                          {
                                          comment?.status==1 &&
                                          <Text style={{fontSize:10,color:'#00D21A'}}>Onaylandı</Text>
                                        }
                                           {
                                          comment?.status==2 &&
                                          <Text style={{fontSize:10,color:'red'}}>Reddedildi</Text>
                                        }
                                     </View>
                                      
                                       
                                    </View>
                                    </View> 
                         </View>    
                         <View style={{}}>
                                <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }} style={{}}
                                        onPress={()=>{
                                                EditComment(comment?.id, ProjectInfo.id,comment,comment.status)
                                        }}
                                >
                                            <Icon name='dots-three-vertical' size={20} color={'#333'}/>
                                </TouchableOpacity>
                            </View>   
                </View>
         </TouchableOpacity>
        )
    }
    const [choose, setchoose] = useState(false)
    const [selectedCommentID, setselectedCommentID] = useState(0)
    const [selectedProjectID, setselectedProjectID] = useState(0)
    const [selectcommentInfo, setselectcommentInfo] = useState({})
    const [selectedCommentStatus, setselectedCommentStatus] = useState(null)
    const EditComment=(id,ProjecId,comment,status)=>{
        setchoose(true)
        setselectedCommentID(id)
        setselectedProjectID(ProjecId)
        setselectcommentInfo(comment)
        setselectedCommentStatus(status)
        console.log(comment)
    }
    const nav =useNavigation()
    const goToEditComment=()=>{
                nav.navigate('EditProjectComment',{projectId:selectedProjectID ,commentInfo:selectcommentInfo, commentID:selectedCommentID})
                setchoose(false)
    }
    const DeleteComment = async () => {
        
     
  
        try {
          if (user?.access_token ) {
            const response = await axios.post(
              `https://private.emlaksepette.com/api/delete/comment/${selectedCommentID}`,
                
              {
                headers: {
                  Authorization: `Bearer ${user?.access_token}`,
                  
                },
              }
            );
                fetchData()
                setchoose(false)
          } else {
            alert("yorum boş");
          }
        } catch (error) {
          console.error("post isteği olmadı", error);
        }
      };
  return (
    
<ScrollView contentContainerStyle={{gap:10,padding:10}} style={{flex:1,backgroundColor:'#fff'}}>

    {
        comments?.map((item,index)=>(
                 <MycommentItem key={index} ProjectInfo={item?.project} comment={item?.comment} EditComment={EditComment} goToEditComment={goToEditComment}/>
        ))
    }
    
       <Modal
              isVisible={choose}
              style={styles.modal2}
              animationIn={"fadeInDown"}
              animationOut={"fadeOutDown"}
              onBackdropPress={()=>setchoose(false)}
              swipeDirection={['down']}
              onSwipeComplete={()=>setchoose(false)}
            >
              <View style={styles.modalContent2}>
                <View style={{padding:10,alignItems:'center'}}>
                  <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>
    
                  </TouchableOpacity>
                </View>
               
                <View style={{padding:20,gap:35}}>
                {
                  selectedCommentStatus == 1   &&
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={goToEditComment}>
                  <Icon3 name="edit-note" size={29} color={'#333'}/>
                  <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Yorumu Düzenle</Text>
          </TouchableOpacity>
                }
                   {
                  selectedCommentStatus == 2   &&
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={goToEditComment}>
                  <Icon3 name="edit-note" size={29} color={'#333'}/>
                  <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Yorumu Düzenle</Text>
          </TouchableOpacity>
                }
             
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={DeleteComment}>
                          <Icon3 name="delete" size={21} color={'#EA2A28'}/>
                          <Text style={{fontSize:14,color:'#EA2A28',fontWeight:'700'}}>Yorumu Sil</Text>
                  </TouchableOpacity>
                  
                </View>
                
              </View>
            </Modal>
</ScrollView>
  )
}
const styles=StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
      
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
      modal2: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent2: {
        gap: 10,
      
        backgroundColor: "#F8F7F4",
        padding: 10,
        height: "30%",
    
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        ...Platform.select({
          ios: {
            shadowColor: "white",
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
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  ActivityIndicator,
} from "react-native";
import { React, useState, useRef ,useEffect} from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import ShopInfo from "./ProfilePageItem/ShopInfo";
import ProjectAdverts from "./ProfilePageItem/ProjectAdverts";
import RealtorAdverts from "./ProfilePageItem/RealtorAdverts";
import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon4 from "react-native-vector-icons/Fontisto";
import LinkIcon2 from "react-native-vector-icons/FontAwesome";
import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import { Skeleton } from '@rneui/themed'
import Team from "./ProfilePageItem/Team";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiRequestGet } from "../../components/methods/apiRequest";
import SliderItemSkeleton from "../../components/SkeletonComponents/SliderItemSkeleton";
export default function Profile() {
  const route = useRoute();
  const [Housings, setHousings] = useState([])
  const { name,id } = route.params;
  const [tab, settab] = useState(0);
  const { width, height, fontScale,} = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(400)).current;
  const navigation = useNavigation();
  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const [loading, setloading] = useState(false)
  const [storeData, setstoreSata] = useState([])
  useEffect(() => {
    apiRequestGet("brand/" + id ).then((res) => {
      setloading(true +'true oldu')
     setstoreSata(res.data)
     setHousings(res.data.data.housings)
    });

  }, [])
  console.log(Housings[0]?.title + 'sdfsdf')
  const ApiUrl='https://test.emlaksepette.com/'
  console.log(storeData?.data?.name)
  
  return (
    <View style={{ flex: 1 }}>
      <View
        style={styles.container}
        onTouchStart={() => {
          Keyboard.dismiss();
          closeSheet();
        }}
      >

        { 
          loading? 
          <>

           <View style={{ width: "100%", height:storeData?.data?.name?.length>30 ? width<400?  '' :240 : width<400 ?200:220 }}>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              backgroundColor:storeData?.data?.banner_hex_code +94 ,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <View style={styles.InfoContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ebebeb94",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  justifyContent: "center",
                  width: 45,
                  height: 30,
                  alignItems: "center",
                }}
                onPress={() => navigation.goBack()}
              >
                <Arrow
                  name="arrow-back-ios"
                  size={20}
                  style={{ left: 3 }}
                  color={"white"}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareIcons} onPress={openSheet}>
                <Icon name="sharealt" size={18} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                   
                    gap: 10,
                  }}
                >
                
                  <View style={{ width: 40, height: 40, borderRadius: 20 }}>
                    <Image
                      source={{uri:`${ApiUrl}storage/profile_images/${storeData?.data?.profile_image}`}}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <View style={{width:'90%'}}>
                    <Text style={{ fontSize: 17, color: "white" }} >
                    {storeData?.data?.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 11 }}>
                 {storeData?.data?.activity} Şirketi
                    </Text>
                  </View>
                        
                </View>
              </View>
              <View style={{ width: "60%", paddingTop: 10 }}>
                <TextInput
                  style={{
                    padding: 9,
                    backgroundColor: "#f5f5f53d",
                    borderWidth: 0,
                    borderColor:'#ebebeb',
                    borderRadius: 10,
                  }}
                  placeholder="Ara..."
                  placeholderTextColor={"#333"}
                />
              </View>
            </View>
          </View>

          <ImageBackground
            source={require("./profilePhoto.jpg")}
            style={{ width: "100%", height: "100%" }}
            imageStyle={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
        </View>
     
          </>
          
          :<>
           
           <View style={{ width: "100%", height: 220 }}>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              backgroundColor:'#e7ebee',
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <View style={styles.InfoContainer}>
              <Skeleton width={45}height={30} style={{borderRadius:5}}
              skeletonStyle={{backgroundColor:'#ced4da' , borderRadius:5}}
              children={
                  <TouchableOpacity
                  style={{
                    backgroundColor: "#ebebeb94",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    width: 45,
                    height: 30,
                    alignItems: "center",
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Arrow
                    name="arrow-back-ios"
                    size={20}
                    style={{ left: 3 }}
                    color={"white"}
                  />
                </TouchableOpacity>
              }/>
             
            
             <Skeleton style={styles.shareIcons} skeletonStyle={{backgroundColor:'#ced4da'}}/>
              {/* <TouchableOpacity style={styles.shareIcons} onPress={openSheet}>
                <Icon name="sharealt" size={18} />
              </TouchableOpacity> */}

            </View>


            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                   
                    gap: 10,
                  }}
                >
                <Skeleton width={40} height={40} circle={true} skeletonStyle={{backgroundColor:'#ced4da'}}/>
                  <View>
                    <Skeleton width={100} skeletonStyle={{backgroundColor:'#ced4da'}} children={
                       <Text style={{ fontSize: 19, color: "white" }} numberOfLines={1}>
                       {storeData?.data?.name}
                       </Text>
                    }/>
                   <Skeleton width={45} style={{top:5}} skeletonStyle={{backgroundColor:'#ced4da'}} children={
                       <Text style={{ color: "white", fontSize: 11 }}>
                       {storeData?.data?.activity} Şirketi
                          </Text>
                   }/>
                 
                  </View>
                    <Skeleton width={22} height={22} style={{bottom:7}} circle skeletonStyle={{backgroundColor:'#ced4da'}}/>
                 
                </View>
              </View>
              <Skeleton width={'60%'} height={30} style={{top:20,}} skeletonStyle={{backgroundColor:'#ced4da'}} />
              {/* <View style={{ width: "60%", paddingTop: 10 }}>
                <TextInput
                  style={{
                    padding: 9,
                    backgroundColor: "#f5f5f53d",
                    borderWidth: 0,
                    borderColor:'#ebebeb',
                    borderRadius: 10,
                  }}
                  placeholder="Ara..."
                  placeholderTextColor={"#333"}
                />
              </View> */}
            </View>
          </View>

     
        </View>

          </>
        }
       

        <View>
          <ScrollView
            horizontal
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {
              loading ? 
              <>
                 <View style={styles.tabBar}>
              <TouchableOpacity
                style={[
                  styles.TabBarBtn,
                  {
                    borderBottomWidth: tab === 0 ? 3 : 0,
                    borderBottomColor: tab === 0 ? "#264ABB" : "transparent",
                    top: 2,
                  },
                ]}
                onPress={() => settab(0)}
              >
                <Entypo name="home" size={16} />
                <Text
                  style={{
                    color: tab === 0 ? "black" : "grey",
                    fontWeight: tab === 0 ? "500" : "normal",
                  }}
                >
                  Ana Sayfa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.TabBarBtn,
                  {
                    borderBottomWidth: tab === 1 ? 3 : 0,
                    borderBottomColor: tab === 1 ? "#264ABB" : "transparent",
                    top: 2,
                  },
                ]}
                onPress={() => settab(1)}
              >
                <Text
                  style={{
                    color: tab === 1 ? "black" : "grey",
                    fontWeight: tab === 1 ? "500" : "normal",
                    bottom: width > 400 ? 0 : 1,
                  }}
                >
                  Proje İlanları({storeData?.data?.projects?.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.TabBarBtn,
                  {
                    borderBottomWidth: tab === 2 ? 3 : 0,
                    borderBottomColor: tab === 2 ? "#264ABB" : "transparent",
                    top: 2,
                  },
                ]}
                onPress={() => settab(2)}
              >
                <Text
                  style={{
                    color: tab === 2 ? "black" : "grey",
                    fontWeight: tab === 2 ? "500" : "normal",
                  }}
                >
                  Emlak İlanları({storeData?.data?.housings?.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.TabBarBtn,
                  {
                    borderBottomWidth: tab === 3 ? 3 : 0,
                    borderBottomColor: tab === 3 ? "#264ABB" : "transparent",
                    top: 2,
                  },
                ]}
                onPress={() => settab(3)}
              >
                <Icon name="team" size={16} />
                <Text
                  style={{
                    color: tab === 3 ? "black" : "grey",
                    fontWeight: tab === 3 ? "500" : "normal",
                  }}
                >
                  Ekip
                </Text>
              </TouchableOpacity>
            </View>
              </>:
              <>
                 <View style={styles.tabBar}>

                  <Skeleton width={150} height={14} skeletonStyle={{backgroundColor:'#ced4da'}}/>
                  <Skeleton width={150} height={14} skeletonStyle={{backgroundColor:'#ced4da'}}/>
                  <Skeleton width={150} height={14} skeletonStyle={{backgroundColor:'#ced4da'}}/>
                  <Skeleton width={150} height={14} skeletonStyle={{backgroundColor:'#ced4da'}}/>

            </View>
              </>
            }
         
          </ScrollView>
        </View>
        {tab === 0 && <ShopInfo data={storeData} loading={loading}/>}
        {tab === 1 && <ProjectAdverts data={storeData} />}
        {tab === 2 && <RealtorAdverts housingdata={Housings} />}
        {tab === 3 && <Team />}
      </View>
      <View style={{ flex: 1, position: "absolute", bottom: 0 }}>
        <Animated.View
          style={{
            zIndex: 1,
            backgroundColor: "#eeeeee",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            paddingBottom: 30,
            paddingLeft: 10,
            paddingRight: 10,

            transform: [{ translateY }],
          }}
        >
          <ScrollView
            horizontal
            style={{ padding: 5 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 27,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={styles.shareIcons}>
                  <LinkIcon name="link" size={23} />
                </View>
                <Text>Kopyala</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={styles.shareIcons}>
                  <LinkIcon2 name="whatsapp" size={23} />
                </View>
                <Text>Whatsapp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={styles.shareIcons}>
                  <LinkIcon name="instagram" size={23} />
                </View>
                <Text>İnstagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={styles.shareIcons}>
                  <LinkIcon2 name="facebook" size={23} />
                </View>
                <Text>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={styles.shareIcons}>
                  <LinkIcon3 name="message-circle" size={23} />
                </View>
                <Text>Mesajlar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={styles.shareIcons}>
                  <LinkIcon4 name="messenger" size={23} />
                </View>
                <Text>Messenger</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerProfile: {
    width: "100%",
    height: width > 400 ? 220 : 170,

    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  tabBar: {
    padding: 3,
    // height:width>400? '90%':'60%',
    // height:height>300?'90%':'70%',

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 30,
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    top: 5,

    paddingRight: 25,
  },

  TabBarBtn: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,

    padding: 4,
  },
  ProfileImageAndIcon: {
    gap: 10,
    right: 40,
  },
  shareIcons: {
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 40,
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    bottom: 2,
  },
  InfoContainer: {
    paddingTop: width < 400 ? 30 : 50,
    padding: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

import { View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import ColorPicker from 'react-native-wheel-color-picker'
import Icon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from "expo-image-picker";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import  Modal from 'react-native-modal'
const UpdateProfileImage = () => {
  const [currentColor, setCurrentColor] = useState(null);
  const [choose, setchoose] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
        }
      }
    })();
  }, []);
  //Profil Resmi İçin
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Seçilen fotoğrafı state'e kaydediyoruz
      setchoose(false); // Modal'ı kapatıyoruz
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Çekilen fotoğrafı state'e kaydediyoruz
      setchoose(false); // Modal'ı kapatıyoruz
    }
  };
  return (
    <View>
     <View style={[styles.profileImageContainer,{backgroundColor:currentColor}]}>
          <TouchableOpacity style={{width:80,height:80,backgroundColor:'#E4E4E8',borderRadius:50,alignItems:'center',justifyContent:'center'}}
              onPress={()=>{
                setchoose(true)
              }}
          >
                {
                  image ?
                  <ImageBackground source={{uri:image?.uri}} style={{width:'100%',height:'100%'}} borderRadius={50}/>:
                  <Icon name='adduser' size={30} color={'#737373'} />
                }
                  
            
          </TouchableOpacity>
     </View>
     <View style={{paddingLeft:30,paddingRight:30,paddingTop:20}}>
     <ColorPicker
                color={currentColor}
                swatchesOnly={false}
                onColorChange={(color)=>setCurrentColor(color)}
              
                thumbSize={50}
                sliderSize={20}
                noSnap={true}
                gapSize={0}
                sliderHidden={true}
                row={false}
                swatchesLast={false}
                swatches={true}
                discrete={false}
                useNativeDriver={true}
                useNativeLayout={false}
              />
     </View>
     
     <Modal
              isVisible={choose}
              style={styles.modal2}
              animationIn={"fadeInDown"}
              animationOut={"fadeOutDown"}
              onBackdropPress={() => setchoose(false)}
              swipeDirection={["down"]}
              onSwipeComplete={() => setchoose(false)}
            >
              <View style={[styles.modalContent2, { paddingBottom: 10 }]}>
                <View style={{ paddingTop: 10, alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      width: "15%",
                      backgroundColor: "#c2c4c6",
                      padding: 4,
                      borderRadius: 50,
                    }}
                  ></TouchableOpacity>
                </View>
                <View style={{ padding: 20, gap: 35, marginBottom: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={pickImage}
                  >
                    <Icon3 name="photo" size={23} color={"#333"} />
                    <Text
                      style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                    >
                      Kütüphaneden Seç
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={takePhoto}
                  >
                    <Icon3 name="add-a-photo" size={21} color={"#333"} />
                    <Text
                      style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                    >
                      Fotoğraf Çek
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={()=>{
                      setchoose(false)
                      setImage(null)
                    }} // Yalnızca yerelde kaldırmak isterseniz bu işlevi kullanın
                    // onPress={removeProfileImageFromServer} // Sunucudan da kaldırmak isterseniz bu işlevi kullanın
                  >
                    <Icon3
                      name="restore-from-trash"
                      size={22}
                      color={"#d83131"}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#d83131",
                        fontWeight: "700",
                      }}
                    >
                      Fotoğrafı Kaldır
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

    </View>
  )
}

export default UpdateProfileImage
const styles=StyleSheet.create({
  profileImageContainer:{
    width:'100%',
    height:200,
    alignItems:'center',
    justifyContent:'center'

  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,
    paddingBottom: 20,
    backgroundColor: "#F8F7F4",
    padding: 10,

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
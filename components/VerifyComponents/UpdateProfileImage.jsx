import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import ColorPicker from "react-native-wheel-color-picker";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import { getValueFor } from "../methods/user";
import { apiUrl, frontEndUriBase } from "../methods/apiRequest";

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import axios from "axios";
import NextAndPrevButton from "./NextAndPrevButton";
const UpdateProfileImage = ({ nextStep, prevStep }) => {
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
      UploadProfile(result.assets[0]);
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
      UploadProfile(result.assets[0]);
      setchoose(false); // Modal'ı kapatıyoruz
    }
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const UploadProfile = async (imageUpload) => {
    const formData = new FormData();
    formData.append(
      `profile_image`,
      imageUpload
        ? {
            uri:
              Platform.OS === "android"
                ? imageUpload.uri
                : imageUpload.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: imageUpload?.mimeType,
            name:
              imageUpload.name == null
                ? "İmage.jpeg"
                : imageUpload?.name?.slice(-3) == "pdf"
                ? imageUpload?.name
                : imageUpload?.fileName, // Sunucuya gönderilecek dosya adı
          }
        : null
    );

    try {
      if (user?.access_token) {
        const response = await axios.post(
          `${apiUrl}upload-profile-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: `Profil Fotoğrafınız Başarıyla Eklendi`,
            button: "Tamam",
          });
        }, 500);
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  const SetStep = async () => {
    const formData = new FormData();
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
        if (user.type == 1) {
          formData.append("step", 2);
        } else {
          formData.append("step", 3);
        }

        const response = await axios.post(
          `${apiUrl}set_first_register_step`,
          formData, // JSON verisi doğrudan gönderiliyor
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "multipart/form-data", // Raw format için Content-Type
            },
          }
        );
        nextStep();
      }
    } catch (error) {
      console.error("Post isteği başarısız dsfdsf", error);
    }
  };
  const UploadBannerHexCode = async () => {
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
        const payload = {
          column_name: "banner_hex_code",
          value: currentColor,
        };

        const response = await axios.post(
          `https://private.emlaksepette.com/api/change-profile-value-by-column-name`,
          payload, // JSON verisi doğrudan gönderiliyor
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "application/json", // Raw format için Content-Type
            },
          }
        );
        SetStep();
      }
    } catch (error) {}
  };
  const [loading, setloading] = useState(false);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(`${apiUrl}users/` + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
        setCurrentColor(userData?.banner_hex_code);
        setImage(userData?.profile_image);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
    }
  };
  useEffect(() => {
    GetUserInfo();
  }, [user]);

  return (
    <AlertNotificationRoot>
      <View
        style={[
          styles.profileImageContainer,
          { backgroundColor: currentColor },
        ]}
      >
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#E4E4E8",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setchoose(true);
          }}
        >
          {image || image?.uri ? (
            image?.uri ? (
              <ImageBackground
                source={{
                  uri: image.uri,
                }}
                style={{ width: "100%", height: "100%" }}
                borderRadius={50}
              />
            ) : (
              <ImageBackground
                source={{
                  uri: `${frontEndUriBase}storage/profile_images/${image}`,
                }}
                style={{ width: "100%", height: "100%" }}
                borderRadius={50}
              />
            )
          ) : (
            <Icon name="adduser" size={30} color={"#737373"} />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          height: 200,
        }}
      >
        <ColorPicker
          color={currentColor}
          swatchesOnly={false}
          onColorChange={(color) => setCurrentColor(color)}
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
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
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
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                Fotoğraf Çek
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
              onPress={() => {
                setchoose(false);
                setImage(null);
              }} // Yalnızca yerelde kaldırmak isterseniz bu işlevi kullanın
              // onPress={removeProfileImageFromServer} // Sunucudan da kaldırmak isterseniz bu işlevi kullanın
            >
              <Icon3 name="restore-from-trash" size={22} color={"#d83131"} />
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

      <NextAndPrevButton
        nextButtonPress={nextStep}
        prevButtonPress={prevStep}
        PrevButtonDisabled={true}
        NextButtonDisabled={image && currentColor ? true : false}
        step={user.type == 1 ? 2 : 1}
        SendInfo={UploadBannerHexCode}
      />
    </AlertNotificationRoot>
  );
};

export default UpdateProfileImage;
const styles = StyleSheet.create({
  profileImageContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
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
  butonChoose: {
    backgroundColor: "#EA2C2E",
    padding: 10,
    width: "70%",
    borderRadius: 10,
  },
  butonChooseText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});

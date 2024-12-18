import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import AdsPictureItem from "./profileComponents/AdsPictureItem";
import { useNavigation } from "@react-navigation/native";
import {
  apiRequestGetWithBearer,
  apiRequestPostWithBearer,
} from "../../../components/methods/apiRequest";

import AwesomeAlert from "react-native-awesome-alerts";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";

import Icon3 from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import NoDataScreen from "../../../components/NoDataScreen";
import { checkFileSize } from "../../../utils";
export default function AdsPictureList({ StoreBanners, getStoreBanner }) {
  const navigation = useNavigation();
  const [choose, setchoose] = useState(false);
  const [ımage, setImage] = useState(null);

  const [deleteAlert, setdeleteAlert] = useState(false);

  const getIdForDelete = (id) => {
    setSelectedPictureId(id);

    setTimeout(() => {
      setdeleteAlert(true);
    }, 200);
  };
  const [SelectedPictureId, setSelectedPictureId] = useState(null);
  const [selectedPictureOrder, setselectedPictureOrder] = useState(null);
  const [resMessage, setresMessage] = useState([]);
  const [IsSelectImage, setIsSelectImage] = useState(false);
  const deleteStoreBanner = () => {
    apiRequestPostWithBearer(
      `institutional/store_banner/${SelectedPictureId}`,
      {
        _method: "DELETE",
      }
    )
      .then((res) => {
        getStoreBanner();
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: res?.data?.message,
            button: "Tamam",
          });
        }, 200);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const SelectPictureAndOpenSheet = (id, order) => {
    setchoose(true);
    setSelectedPictureId(id);
    setselectedPictureOrder(order);
  };
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [updateAlert, setupdateAlert] = useState(false);
  const UpdatePictureToApı = () => {
    setloadingUpdate(true);
    var dad = new FormData();
    dad.append("image", {
      uri:
        Platform.OS === "android"
          ? ımage.uri
          : ımage?.uri.replace("file://", ""),

      type: ımage.mimeType,
      name: ımage.fileName == null ? "Image.jpeg" : ımage.fileName,
    });
    console.log("image", {
      uri:
        Platform.OS === "android"
          ? ımage.uri
          : ımage?.uri.replace("file://", ""),

      type: ımage.mimeType,
      name: ımage.fileName == null ? "Image.jpeg" : ımage.fileName,
    });
    dad.append("order", selectedPictureOrder);
    dad.append("_method", "PUT");
    apiRequestPostWithBearer(
      `institutional/store_banner/${SelectedPictureId}`,
      dad
    )
      .then((res) => {
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: "Mağaza Görseli Başarıyla güncellendi",
            button: "Tamam",
            onHide: () => {
              getStoreBanner();
            },
          });
          setImage(null);
        }, 200);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setloadingUpdate(false);
      });
  };
  const pickImageFromGallery = async () => {
    // Galeri iznini kontrol et ve iste
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Galeriye erişmek İçin Ayarlardan izin vermeniz gerekmektedir"
      );
      return;
    }

    // Galeriden resim seçme işlemi
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Seçtiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      setImage(result.assets[0]);
      console.log(result.assets[0]);
      setIsSelectImage(true);
      setchoose(false);
      setTimeout(() => {
        setupdateAlert(true);
      }, 600);
    }
  };

  const takePhotoWithCamera = async () => {
    // Kamera iznini kontrol et ve iste
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Kameraya erişim izni reddedildi.");
      return;
    }

    // Kamera ile resim çekme işlemi
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setchoose(false);
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Çektiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {
              setchoose(true);
            },
          });
        }, 800);
        return;
      }
      setImage(result.assets[0]);
      setIsSelectImage(true);
      console.log(result.assets[0].uri); // Çekilen resmin URI'si
      setchoose(false);
    }
  };

  return (
    <AlertNotificationRoot>
      {
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text>Yüklediğim Reklam Görselleri ({StoreBanners.length})</Text>
            </View>
          </View>
          {StoreBanners.length == 0 ? (
            <View style={{ flex: 1, paddingTop: 50 }}>
              <NoDataScreen
                message={"Reklam Görseliniz Bulunmamaktadır"}
                iconName={"image-plus"}
                buttonText={null}
              />
            </View>
          ) : (
            StoreBanners?.map((item, _i) => (
              <AdsPictureItem
                key={_i}
                image={item.image}
                id={item.id}
                order={item.order}
                getIdForDelete={getIdForDelete}
                editBtn={SelectPictureAndOpenSheet}
                NewImage={ımage}
                IsSelectImage={IsSelectImage}
                SelectedPictureId={SelectedPictureId}
              />
            ))
          )}
        </ScrollView>
      }

      <AwesomeAlert
        show={deleteAlert}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={"Mağaza Görselini Sil"}
        messageStyle={{ textAlign: "center" }}
        message={`Mağaza Görselini Silmek İstediğinize Emin misiniz?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Vazgeç"
        confirmText="Sil"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setdeleteAlert(false);
        }}
        onConfirmPressed={() => {
          setdeleteAlert(false);
          setTimeout(() => {
            deleteStoreBanner();
          }, 500);
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <Modal
        isVisible={choose}
        style={styles.modal2}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
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
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              onPress={pickImageFromGallery}
            >
              <Icon3 name="photo" size={23} color={"#333"} />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                Kütüphaneden Seç
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              onPress={takePhotoWithCamera}
            >
              <Icon3 name="add-a-photo" size={21} color={"#333"} />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                Fotoğraf Çek
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <AwesomeAlert
        show={updateAlert}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={"Mağaza Görselini Güncelle"}
        messageStyle={{ textAlign: "center" }}
        message={`Mağaza Görselini Güncellemek İstediğinize Emin misiniz?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="İptal"
        confirmText="Güncelle"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setupdateAlert(false);
          setImage(null);
        }}
        onConfirmPressed={() => {
          setupdateAlert(false);
          setTimeout(() => {
            UpdatePictureToApı();
          }, 500);
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F7",
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
});

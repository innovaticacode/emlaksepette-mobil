import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  apiRequestGet,
  apiUrl,
  frontEndUri,
} from "../../components/methods/apiRequest";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
import { CheckBox } from "react-native-elements";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { ImageBackground } from "expo-image";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { getValueFor } from "../../components/methods/user";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";
import ActionSheet from "react-native-actionsheet";
import ImageViewing from "react-native-image-viewing";
import { checkFileSize } from "../../utils";

export default function AddComment() {
  const [data, setData] = useState({});
  const route = useRoute();
  const nav = useNavigation();
  const { HouseID } = route.params;
  const [loading, setloading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedIndexx, setSelectedIndexx] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [removeImage, setremoveImage] = useState(false);
  const [image, setImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [rate, setrate] = useState(0);
  const [checkedForm, setCheckedForm] = React.useState(false);

  const [user, setUser] = useState({});
  const [comment, setcomment] = useState("");
  const [loadingShare, setloadingShare] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [Deals, setDeals] = useState("");

  useEffect(() => {
    apiRequestGet("housing/" + HouseID).then((res) => {
      setData(res.data.housing);
      setloading(false);
    });
  }, []);

  const showActionSheet = (index) => {
    setSelectedIndexx(index);
    this.ActionSheet.show();
  };

  const handleImagePress = (index) => {
    if (image[index]) {
      const filteredImages = image.filter((img) => img !== null);
      const filteredIndex = filteredImages.indexOf(image[index]);

      if (filteredIndex !== -1) {
        setCurrentImageIndex(filteredIndex);
        setVisible(true);
      }
    } else {
      showActionSheet(index);
    }
  };

  const handleActionSheet = async (buttonIndex) => {
    let result;

    if (buttonIndex == 0) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (buttonIndex == 1) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (buttonIndex == 2) {
      const newImages = [...image];
      newImages[selectedIndexx] = null;
      setImage(newImages);
      return;
    }

    if (!result?.canceled && result?.assets && result?.assets?.length > 0) {
      const imageUri = result?.assets[0].uri;

      // Dosya boyutunu kontrol et
      const isFileSizeValid = await checkFileSize(imageUri);
      if (!isFileSizeValid) {
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: "Seçtiğiniz fotoğraf 5 mb den yüksek olamaz",
            button: "Tamam",
            onHide: () => {},
          });
        }, 800);
        return;
      }
      const uri = result.assets[0].uri;
      const newImages = [...image];

      if (
        selectedIndexx !== null &&
        selectedIndexx >= 0 &&
        selectedIndexx < 3
      ) {
        newImages[selectedIndexx] = uri;
      } else {
        if (newImages.length >= 3) {
          newImages.shift();
        }
        newImages.push(uri);
      }
      setImage(newImages);
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
    const yellowStars = index + 1;
    setrate(yellowStars);
  };

  const toggleCheckboxForm = () => {
    setCheckedForm(!checkedForm);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const shareComment = async () => {
    setloadingShare(true);
    const formData = new FormData();
    formData.append("rate", rate);
    formData.append("comment", comment);

    image.forEach((image, index) => {
      if (image) {
        formData.append(`images[${index}]`, {
          uri: Platform.OS === "android" ? image : image.replace("file://", ""),
          type: "image/jpeg",
          name: `image${index}.jpg`,
        });
      }
    });

    try {
      if (
        user?.access_token &&
        typeof rating === "number" &&
        rating > 0 &&
        typeof comment === "string" &&
        comment.length > 0
      ) {
        const response = await axios.post(
          `${apiUrl}housing/${HouseID}/send-comment`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setcomment("");
        setrate(0);
        setRating(0);
        setImage([null, null, null]);
        nav.navigate("Success", {
          name: "Yorum başarılı",
          message: "Değerlendirmeniz İçin Teşekkürler",
          HouseID: HouseID,
          type: "House",
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata!",
          textBody: "Lütfen Yorum Yapınız.",
          button: "Tamam",
        });
      }
    } catch (error) {
      console.error("Post isteği başarısız oldu:", error);
    } finally {
      setloadingShare(false);
    }
  };

  useEffect(() => {
    fetchDataDeal();
  }, []);
  const fetchDataDeal = async () => {
    const url = `${apiUrl}sayfa/emlaksepette-yorum-yazma-kurallari`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDeals(data.content);
    } catch (error) {
      console.error("İstek hatası:", error);
    }
  };
  const removePhoto = () => {
    const newImages = [...image];
    newImages[selectedIndex] = null;
    setImage(newImages);
    setremoveImage(false);
    setselectedIndex(null);
  };

  return (
    <AlertNotificationRoot>
      <ScrollView
        style={style.container}
        contentContainerStyle={{
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator color="#333" />
          </View>
        ) : (
          <>
            <View style={[style.card, { flexDirection: "row" }]}>
              <View style={style.Image}>
                <ImageBackground
                  source={{
                    uri:
                      data && data.housing_type_data
                        ? `${apiUrl}/housing_images/${
                            JSON.parse(data.housing_type_data)["images"][0]
                          }`
                        : null,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flexDirection: "column", gap: 5, width: "100%" }}>
                <View style={{ paddingLeft: 5, width: "80%" }}>
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: 13, fontWeight: "600" }}
                  >
                    {data?.title}
                  </Text>
                </View>
                <View style={{ paddingLeft: 5, gap: 5, width: "70%" }}>
                  <Text
                    onPress={() => {
                      nav.navigate("Profile", { id: data?.user?.id });
                    }}
                    style={{ fontSize: 12, color: "grey", fontWeight: "600" }}
                    numberOfLines={2}
                  >
                    Satıcı:{data?.user?.name}
                  </Text>

                  <Text
                    style={{ fontSize: 13, color: "green", fontWeight: "600" }}
                  >
                    {data &&
                      data.housing_type_data &&
                      addDotEveryThreeDigits(
                        JSON.parse(data.housing_type_data)["price"]
                          ? JSON.parse(data.housing_type_data)["price"]
                          : JSON.parse(data.housing_type_data)["daily_rent"]
                      )}{" "}
                    TL{" "}
                    {JSON.parse(data.housing_type_data)["daily_rent"] && (
                      <Text style={{ fontSize: 12, color: "#EA2A28" }}>
                        / Gecelik
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[style.card, {}]}>
              <View style={{ padding: 10, paddingBottom: 15 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  İlanı aşağıdan puanlayabilir ve yorum yapabilirsin
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 40,
                }}
              >
                {[...Array(5)].map((_, index) => (
                  <View key={index}>
                    <TouchableOpacity onPress={() => handleStarPress(index)}>
                      <Icon
                        name={index < rating ? "star" : "staro"}
                        size={32}
                        color={index < rating ? "gold" : "gray"}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={{ paddingTop: 30, gap: 0 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 6,
                  }}
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: "#333" }}
                  >
                    İlanı Değerlendir
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        textDecorationLine: "underline",
                        fontSize: 12,
                        color: "grey",
                      }}
                      onPress={() => setModalVisible2(true)}
                    >
                      Yorum Kuralları
                    </Text>
                  </TouchableOpacity>

                  <Modal
                    isVisible={modalVisible2}
                    onBackdropPress={() => setModalVisible2(false)}
                    backdropColor="rgba(0, 0, 0, 0.5)"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <SafeAreaView
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 20,
                        width: "90%",
                        maxHeight: "80%",
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setModalVisible2(false)}
                        >
                          <Icon3 name="close-circle" size={31} color={"red"} />
                        </TouchableOpacity>
                      </View>
                      <ScrollView>
                        {Deals ? (
                          <HTML
                            source={{ html: Deals }}
                            contentWidth={Dimensions.get("window").width * 0.8}
                          />
                        ) : (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              height: 200,
                            }}
                          >
                            <Text>Yükleniyor...</Text>
                          </View>
                        )}
                      </ScrollView>
                    </SafeAreaView>
                  </Modal>
                </View>
                <View>
                  <TextInput
                    style={style.Input}
                    multiline
                    placeholder="İlanı değerlendirin..."
                    placeholderTextColor={"grey"}
                    value={comment}
                    onChangeText={(value) => setcomment(value)}
                  />
                </View>
                <View style={{}}>
                  <View style={{ padding: 6, marginTop: 10, gap: 5 }}>
                    <Text
                      style={{ fontSize: 13, fontWeight: "600", color: "#333" }}
                    >
                      Konut Fotoğrafı Ekle
                    </Text>
                    <Text style={{ fontSize: 13, color: "#333" }}>
                      Basılı Tutarak Resim Çekip Yükleyebilirsiniz!
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                      justifyContent:
                        image == [] ? "space-around" : "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    {image.slice(0, 3).map((image, index) => {
                      console.log(`Image ${index}: `, image); // Resimleri konsola yazdır

                      return (
                        <View style={style.imageContainer} key={index}>
                          <TouchableOpacity
                            onLongPress={() => showActionSheet(index)}
                            onPress={() => handleImagePress(index)}
                            style={[
                              style.Input,
                              {
                                width: 90,
                                height: 90,
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 5,
                              },
                            ]}
                          >
                            {image ? (
                              <View style={{ width: "100%", height: "100%" }}>
                                <Image
                                  source={{ uri: image }}
                                  style={{ width: "100%", height: "100%" }}
                                  resizeMode="cover"
                                />
                                <TouchableOpacity
                                  onPress={() => showActionSheet(index)}
                                  style={style.editIcon}
                                >
                                  <Icon2
                                    name="pencil"
                                    size={20}
                                    color={"#fff"}
                                  />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <Icon2
                                name="camera"
                                size={25}
                                color={"#babbbc"}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    })}

                    {image.length < 3 &&
                      Array.from({ length: 3 - image.length }).map(
                        (_, index) => (
                          <TouchableOpacity
                            key={index + image.length}
                            onPress={() =>
                              showActionSheet(image.length + index)
                            }
                            style={[
                              style.input,
                              {
                                width: 90,
                                height: 90,
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 5,
                              },
                            ]}
                          >
                            <Icon2 name="camera" size={25} color={"#babbbc"} />
                          </TouchableOpacity>
                        )
                      )}

                    <ImageViewing
                      images={image
                        .filter((img) => img)
                        .map((image) => ({ uri: image }))}
                      imageIndex={currentImageIndex}
                      visible={visible}
                      onRequestClose={() => setVisible(false)}
                    />

                    <ActionSheet
                      ref={(o) => (this.ActionSheet = o)}
                      options={[
                        "Fotoğraf çek",
                        "Kütüphaneden seç",
                        "Fotoğrafı kaldır",
                        "İptal",
                      ]}
                      cancelButtonIndex={3}
                      destructiveButtonIndex={2}
                      onPress={handleActionSheet}
                    />
                    <AwesomeAlert
                      show={removeImage}
                      showProgress={false}
                      titleStyle={{
                        color: "#333",
                        fontSize: 13,
                        fontWeight: "700",
                        textAlign: "center",
                        margin: 5,
                      }}
                      title={"Seçili resmi kaldırmak istediğinize eminmisiniz"}
                      messageStyle={{ textAlign: "center" }}
                      closeOnTouchOutside={true}
                      closeOnHardwareBackPress={false}
                      showCancelButton={true}
                      showConfirmButton={true}
                      cancelText="Hayır"
                      confirmText="Evet"
                      cancelButtonColor="#ce4d63"
                      confirmButtonColor="#1d8027"
                      onCancelPressed={() => {
                        setremoveImage(false);
                      }}
                      onConfirmPressed={() => {
                        removePhoto();
                      }}
                      confirmButtonTextStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                      cancelButtonTextStyle={{
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View>
                <CheckBox
                  checked={checkedForm}
                  onPress={toggleCheckboxForm}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checkedColor="red"
                  title={
                    <Text style={{ fontSize: 12, left: 5 }}>
                      Yorum Kurallarını Okudum Kabul Ediyorum
                    </Text>
                  }
                  size={20}
                  containerStyle={{
                    backgroundColor: "white",
                    borderWidth: 0,
                    width: "100%",
                    margin: 4,
                    marginLeft: 0,
                    paddingLeft: 0,
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#EB2B2E",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5,
                  opacity: checkedForm ? 1 : 0.5,
                }}
                onPress={shareComment}
                disabled={!checkedForm}
              >
                {loadingShare ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      fontWeight: "700",
                    }}
                  >
                    Paylaş
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </AlertNotificationRoot>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    width: "100%",

    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Image: {
    width: 80,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  Input: {
    backgroundColor: "#f5f5f5",

    height: 80,
    borderWidth: 0.3,
    borderColor: "#dce1ea",
    borderRadius: 4,
  },
});

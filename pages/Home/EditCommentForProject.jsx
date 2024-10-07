import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  apiRequestGet,
  frontEndUri,
} from "../../components/methods/apiRequest";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
import { CheckBox, Image } from "react-native-elements";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { ImageBackground } from "expo-image";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { getValueFor } from "../../components/methods/user";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSheet from "react-native-actionsheet";
import ImageViewing from "react-native-image-viewing";

import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
import { da } from "date-fns/locale";
import AwesomeAlert from "react-native-awesome-alerts";

export default function EditCommentForProject() {
  const [data, setData] = useState({});
  const route = useRoute();
  const nav = useNavigation();
  const {
    projectId,
    commentInfo,
    commentID,
    info,
    commentss,
    type,
    imageSource,
    store,
  } = route.params;
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [UserImages, setUserImages] = useState([]);
  const [image, setImage] = useState([null, null, null]);
  const [imagesComment, setImagesComment] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedIndexx, setSelectedIndexx] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [removeImage, setremoveImage] = useState(false);
  const [comment, setcomment] = useState(commentInfo.comment || "");
  const API_URL = "http://192.168.18.32:8000/";

  // const imageSource =
  //   type === "project"
  //     ? `${API_URL}${info?.image.replace("public/", "storage/")}`
  //     : `${API_URL}housing_images/${
  //         JSON.parse(info.housing_type_data)?.image ?? ""
  //       }`;

  console.log(commentInfo.id + " iddddd dddd");
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const showActionSheet = (index) => {
    setSelectedIndexx(index);
    this.ActionSheet.show();
  };

  const handleImagePress = (index) => {
    // Eğer resim varsa, ImageViewing'i aç
    if (imagesComment[index]) {
      const filteredImages = imagesComment.filter((img) => img !== null);
      const filteredIndex = filteredImages.indexOf(imagesComment[index]);

      if (filteredIndex !== -1) {
        setCurrentImageIndex(filteredIndex);
        setVisible(true);
      }
    } else {
      // Eğer resim yoksa, eylem sayfasını göster
      showActionSheet(index);
    }
  };
  const handleActionSheet = async (buttonIndex) => {
    console.log("Selected index:", selectedIndexx); // Ekleyin
    let result;

    if (buttonIndex === 0) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (buttonIndex === 1) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (buttonIndex === 2) {
      const newImages = [...imagesComment];
      newImages[selectedIndexx] = null;
      setImagesComment(newImages);
      console.log("Removed image at index:", selectedIndexx);
      return;
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("Selected image URI:", uri);
      const newImages = [...imagesComment];

      if (selectedIndexx < 3) {
        newImages[selectedIndexx] = uri;
      } else {
        if (newImages.length >= 3) {
          newImages.shift();
        }
        newImages.push(uri);
      }

      setImagesComment(newImages);
      console.log("Updated images:", newImages);
    }
  };

  useEffect(() => {
    if (commentInfo?.images && typeof commentInfo.images === "string") {
      try {
        const parsedImages = JSON.parse(commentInfo.images);
        console.log("Parsed Images:", parsedImages); // Ham veriyi kontrol edin
        if (Array.isArray(parsedImages)) {
          const updatedImages = parsedImages.map((img) => {
            const fixedUrl = img.replace("public/", "storage/");
            const fullUrl = `${API_URL}${fixedUrl}`;
            console.log("Image URL:", fullUrl); // URL'yi kontrol edin
            return fullUrl;
          });
          setImagesComment(updatedImages); // Resimleri state'e güncelleyin
        } else {
          console.error("Parsed images is not an array.");
          setImagesComment([]);
        }
      } catch (error) {
        console.error("Invalid image format:", error);
        setImagesComment([]);
      }
    } else {
      setImagesComment([]);
    }
  }, [commentInfo?.images]);

  const takePhoto = async (index) => {
    if (image[index]) {
      // Eğer resim varsa, resmi kaldır
      setselectedIndex(index);
      setremoveImage(true);
    } else {
      // Eğer resim yoksa, kamera aç ve resim çek
      if (image.filter((img) => img).length >= 3) {
        Alert.alert("Limit Reached", "You can only select up to 3 images.");
        return;
      }

      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Denied",
          "You need to allow permission to access the camera."
        );
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = [...image];
        newImages[index] = [result.assets[0]];
        setImage(newImages);
      }
    }
  };

  const removePhoto = () => {
    const newImages = [...image];
    newImages[selectedIndex] = null;
    setImage(newImages);
    setremoveImage(false);
    setselectedIndex(null);
  };

  const pickImage = async (index) => {
    // Eğer resim varsa, resmi kaldır
    if (imagesComment[index]) {
      const newImages = [...imagesComment];
      newImages[index] = null; // Resmi kaldır
      setImagesComment(newImages);
    } else {
      // Eğer resim yoksa, galeri aç ve resim seç
      if (imagesComment.filter((img) => img).length >= 3) {
        Alert.alert("Limit Reached", "You can only select up to 3 images.");
        return;
      }

      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Denied",
          "You need to allow permission to access the library."
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = [...imagesComment];
        newImages[index] = result.assets[0].uri; // URI ile güncelle
        setImagesComment(newImages);
      }
    }
  };

  const shareComment = async () => {
    const formData = new FormData();
    formData.append("rate", rating.toString());
    formData.append("user_id", user?.id.toString());
    formData.append("comment", comment);
    formData.append("owner_id", data?.user?.id.toString());
    formData.append("project_id", projectId.toString());
    formData.append("comment_id", commentID.toString());
    formData.append("type", type);

    // Resimleri ekleyin
    imagesComment.forEach((img, index) => {
      if (img) {
        formData.append(`images[${index}]`, {
          name: `image${index}.jpg`,
          type: "image/jpeg",
          uri: Platform.OS === "android" ? img : img.replace("file://", ""),
        });
      }
    });

    try {
      if (user?.access_token && rating > 0) {
        setloading2(true);
        const response = await axios.post(
          `http://192.168.18.32:8000/api/user/${user.id}/${info.id}/comments/${commentID}/update`,
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

        // Başarılı olduğunda yönlendirme yap
        nav.navigate("Success", {
          name: "Yorum Güncelleme başarılı",
          message: "Değerlendirmeniz İçin Teşekkürler",
          HouseID: projectId,
          type: "Project",
        });
      } else {
        alert("Yorum boş");
      }
    } catch (error) {
      console.error("Post isteği olmadı", error.response?.data || error);
    } finally {
      setloading2(false);
    }
  };

  console.log(comment + "asdsd");
  console.log(commentID + "qweqeqwe");
  console.log(imagesComment); // undefined olup olmadığını kontrol edin
  console.log(type + " type budursdssssssd");
  // useEffect(() => {
  //   apiRequestGet("project/" + projectId).then((res) => {
  //     setData(res.data.project);
  //     setloading(false);
  //     setRating(commentInfo.rate);
  //     setcomment(commentInfo?.comment);
  //     const Images =
  //       projectId &&
  //       commentInfo &&
  //       commentInfo?.images &&
  //       JSON.parse(commentInfo.images);
  //     setImage(Images);
  //   });
  // }, []);
  // const imageSource =
  //   info === "project"
  //     ? `${API_URL}${info?.images.replace("public/", "storage/")}`
  //     : `${API_URL}housing_images/${
  //         JSON.parse(info.housing_type_data)?.image ?? ""
  //       }`;

  console.log(UserImages);
  const [rating, setRating] = useState(commentInfo.rate); // Başlangıçta hiçbir yıldız dolu değil
  const [rate, setrate] = useState(commentInfo.rate);

  const handleStarPress = (index) => {
    // Tıklanan yıldıza kadar olan tüm yıldızları dolu yap
    setRating(index + 1);

    // Sarı yıldızların sayısını hesapla ve konsola yazdır
    const yellowStars = index + 1;
    setrate(yellowStars);
  };
  console.log(rate);
  const [checkedForm, setCheckedForm] = React.useState(false);
  const toggleCheckboxForm = () => {
    setCheckedForm(!checkedForm);
  };
  const apiUrl = "http://192.168.18.32:8000/";
  const [user, setUser] = useState({});

  console.log(user?.id + " asd22222");

  // const imageSource =
  //   type === "project"
  //     ? `${API_URL}${commentInfo.comment.image.replace("public/", "storage/")}`
  //     : (() => {
  //         try {
  //           const imageData = commentInfo.comment.image;
  //           if (
  //             imageData &&
  //             typeof imageData === "string" &&
  //             imageData.startsWith("{")
  //           ) {
  //             const parsedImage = JSON.parse(imageData);
  //             return `${API_URL}housing_images/${parsedImage?.image ?? ""}`;
  //           } else {
  //             return `${API_URL}housing_images/${imageData}`;
  //           }
  //         } catch (error) {
  //           console.error("JSON Parse Error:", error);
  //           return "";
  //         }
  //       })();

  console.log(image);

  const [modalVisible2, setModalVisible2] = useState(false);
  const [Deals, setDeals] = useState("");
  useEffect(() => {
    fetchDataDeal();
  }, []);
  const fetchDataDeal = async () => {
    const url = `http://192.168.18.32:8000/api/sayfa/emlaksepette-yorum-yazma-kurallari`;
    try {
      const response = await fetch(url);
      // const data = await fetchFromURL(url);
      const data = await response.json();
      console.log(data);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };

  return (
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
          {loading2 && (
            <View
              style={{
                position: "absolute", // Ekranda tam konumlandırmak için
                top: 0, // Ekranın üst kısmından başlayacak
                left: 0, // Ekranın solundan başlayacak
                right: 0, // Ekranın sağını kaplayacak
                bottom: 0, // Ekranın altını kaplayacak
                backgroundColor: "#fff", // Yarı saydam siyah arka plan
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000, // Yüksek zIndex ile diğer içeriklerin üstüne çıkar
              }}
            >
              <ActivityIndicator size="large" color="#333" />
            </View>
          )}
          <View style={[style.card, { flexDirection: "row" }]}>
            <View style={style.Image}>
              <ImageBackground
                source={{ uri: imageSource }}
                style={style.image}
              />
            </View>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <View style={{ paddingLeft: 5, width: "100%" }}>
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 13, fontWeight: "600" }}
                >
                  {info.title || info.project_title}

                  {/* {data?.project_title} */}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{ fontSize: 13, fontWeight: "600" }}
                >
                  {/* {data?.project_title} */}
                </Text>
              </View>
              <View style={{ paddingLeft: 5, gap: 5, width: "70%" }}>
                <Text
                  style={{ fontSize: 12, color: "grey", fontWeight: "600" }}
                  numberOfLines={2}
                >
                  Satıcı:
                  <Text style={{ color: "#274ABB" }}>{store?.name}</Text>
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
                      <TouchableOpacity onPress={() => setModalVisible2(false)}>
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
                  style={[style.Input, { padding: 10 }]}
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
                    Basılı tutarak resim ekleyip silebilirsiniz.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {imagesComment.slice(0, 3).map((image, index) => {
                    console.log(`Image ${index}: `, image); // Resimleri konsola yazdır

                    return (
                      <View style={style.imageContainer} key={index}>
                        <TouchableOpacity
                          onLongPress={() => showActionSheet(index)}
                          onPress={() => handleImagePress(index)}
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
                                <Icon2 name="pencil" size={20} color={"#fff"} />
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <Icon2 name="camera" size={25} color={"#babbbc"} />
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  {imagesComment.length < 3 &&
                    Array.from({ length: 3 - imagesComment.length }).map(
                      (_, index) => (
                        <TouchableOpacity
                          key={index + imagesComment.length}
                          onPress={() =>
                            showActionSheet(imagesComment.length + index)
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
                    images={imagesComment
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
                    confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                    cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                  />
                </View>
              </View>
            </View>
            <CheckBox
              checked={checkedForm}
              onPress={toggleCheckboxForm}
              // Use ThemeProvider to make change for all checkbox
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
            <TouchableOpacity
              style={{
                backgroundColor: "#EB2B2E",
                padding: 10,
                borderRadius: 5,
                opacity: checkedForm ? 1 : 0.5,
              }}
              disabled={!checkedForm}
              onPress={shareComment}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontWeight: "700",
                }}
              >
                Paylaş
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
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
    justifyContent: "center", // İçeriği ortalamak için
    alignItems: "center", // İçeriği ortalamak için
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

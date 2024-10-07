import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Icon8 from "react-native-vector-icons/FontAwesome5";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { Button } from "react-native-paper";
import NoDataScreen from "../../components/NoDataScreen";

export default function MyComments() {
  const [user, setuser] = useState({});
  const [comments, setcomments] = useState([]);
  const [choose, setchoose] = useState(false);
  const [selectedCommentID, setselectedCommentID] = useState(0);
  const [selectedProjectID, setselectedProjectID] = useState(0);
  const [selectcommentInfo, setselectcommentInfo] = useState({});
  const [selectedCommentStatus, setselectedCommentStatus] = useState(null);
  const nav = useNavigation();
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedStore, setSelectedStore] = useState([]);

  const [loading, setLoading] = useState(true); // Yüklenme animasyonu için
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü için
  const [modalMessage, setModalMessage] = useState(""); // Başarı veya hata mesajı
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  console.log(user.id);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (user?.access_token) {
        const response = await axios.get(
          `http://192.168.18.32:8000/api/user/${user?.id}/comments`
        );
        const sortedComments = response.data.allComments.sort((a, b) => {
          const dateA = new Date(a.comment.created_at);
          const dateB = new Date(b.comment.created_at);
          return dateB - dateA; // Descending order
        });
        setcomments(sortedComments);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(user?.id + "userrrrrrİDDDDD");

  useEffect(() => {
    fetchData();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true); // Yenileme işlemi başlıyor
    fetchData().then(() => setRefreshing(false)); // Yenileme işlemi bittikten sonra refreshing'i false yap
  }, [user]);

  const MycommentItem = ({ item, EditComment, goToEditComment, store }) => {
    const API_URL = "http://192.168.18.32:8000/";
    const { type, comment } = item;
    const info = type === "project" ? item.project : item.housing;
    const numStars = Math.round(comment?.rate);
    console.log(store + "store budurr");
    console.log(store.name + "store budur assadasads");

    const imageSource =
      type === "project"
        ? `${API_URL}${info?.image.replace("public/", "storage/")}`
        : `${API_URL}housing_images/${JSON.parse(info.housing_type_data)?.image ?? ""
        }`;

    const handleNavigate = () => {
      if (type === "project") {
        nav.navigate("Details", {
          ProjectId: info.id,
        });
      } else if (type === "housing") {
        nav.navigate("Realtor details", {
          houseId: info.id,
        });
      }
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TouchableOpacity style={{ padding: 12 }}>
            <View style={styles.imageTitleContainer}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={handleNavigate}
              >
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={{ uri: imageSource }}
                    style={styles.image}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {info?.project_title || info?.title}
                  </Text>
                  <Text style={styles.listingIdText}>
                    {type === "project"
                      ? `İlan No: ${info.id + 1000000}`
                      : `İlan No: ${info.id + 2000000}`}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
                  style={styles.editButton}
                  onPress={() => {
                    EditComment(
                      comment?.id,
                      info,
                      comment,
                      comment.status,
                      imageSource,
                      type,
                      store
                    );
                  }}
                >
                  <Icon name="dots-three-vertical" size={22} color={"#333"} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
          <View style={styles.commentStarsContainer}>
            <View style={styles.stars}>
              {[...Array(numStars)].map((_, index) => (
                <Ionicons key={index} name="star" size={14} color="gold" />
              ))}
            </View>
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>{comment?.comment}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText(comment?.status)}>
              {comment?.status === 0
                ? "Onay Bekliyor"
                : comment?.status === 1
                  ? "Onaylandı"
                  : "Reddedildi"}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const EditComment = (id, info, comment, status, imageSource, type, store) => {
    setchoose(true);
    setselectedCommentID(id);
    setselectedProjectID(info.id);
    setselectcommentInfo(comment);
    setselectedCommentStatus(status);
    setSelectedInfo(info); // info'yu da state'e ekliyoruz
    setSelectedType(type);
    setSelectedSource(imageSource); //
    setSelectedStore(store); // store'yu da state'e ekliyoruz
  };

  const goToEditComment = (item) => {
    const { type, comment } = item;
    const info = type === "project" ? item.project : item.housing;
    console.log(info);

    nav.navigate("EditProjectComment", {
      projectId: selectedProjectID,
      commentInfo: selectcommentInfo,
      commentID: selectedCommentID,
      type: selectedType,
      commentss: comment, // info'yu da gönderiyoruz
      info: selectedInfo,
      imageSource: selectedSource,
      store: selectedStore,
    });
    setchoose(false);
  };

  const confirmDeleteComment = () => {
    setModalDelete(true);
    setchoose(false);
  };

  const DeleteComment = async () => {
    try {
      if (user?.access_token) {
        const response = await axios
          .delete(
            `http://192.168.18.32:8000/api/delete/comment/${selectedCommentID}/${selectedType}`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
              },
            }
          )
          .then(() => {
            setDeleteSuccess(true);
            setModalMessage("Yorum başarıyla silindi!");
            setchoose(false); // İşlem başarılı olduğunda seçimi kapat
            fetchData(); // Veri çekmeyi çağır
            setModalDelete(false);
            // Başarılı işlemde dialog'u göster
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Başarılı",
              textBody: "Yorum başarıyla silindi!",
              button: "Tamam",
            });
          });
      } else {
        setDeleteSuccess(false);
        setModalMessage("Yorum bulunamadı.");
        setModalDelete(false);
      }
    } catch (error) {
      setDeleteSuccess(false);
      setModalMessage("Yorum silme işlemi başarısız oldu.");
      console.error("Silme işlemi başarısız oldu", error);
      setModalDelete(false);
      // Hata durumunda dialog'u göster
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Yorum silme işlemi başarısız oldu.",
        button: "Tamam",
      });
    }
  };

  console.log(user?.access_token);
  console.log(selectedCommentID + "selectedddd iddddddd ");

  return (
    <AlertNotificationRoot>
      <ScrollView
        contentContainerStyle={{ flex: 1, flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ gap: 10, padding: 10, flex: 1 }}>
          {loading ? (
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : comments?.length > 0 ? (
            comments.map((item, index) => (
              <MycommentItem
                key={index}
                store={item.store}
                item={item}
                EditComment={EditComment}
                goToEditComment={() => goToEditComment(item)} // info'yu prop olarak gönderiyoruz
              />
            ))
          ) : (
            <NoDataScreen
              message="Yorumunuz bulunmamaktadır."
              iconName="comment-off"
              buttonText="Anasayfaya Dön"
              navigateTo="HomePage"
            />
          )}

          <Modal
            isVisible={choose}
            style={styles.modal}
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDown"}
            onBackdropPress={() => setchoose(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setchoose(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalOptions}>
                {(selectedCommentStatus === 1 || selectedCommentStatus === 2) && (
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={goToEditComment}
                  >
                    <Icon3 name="edit-note" size={29} color={"#333"} />
                    <Text style={styles.modalOptionText}>Yorumu Düzenle</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={confirmDeleteComment}
                >
                  <Icon3 name="delete" size={21} color={"#EA2A28"} />
                  <Text style={styles.modalOptionText}>Yorumu Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={modalDelete}
            style={styles.confirmationModal2}
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDown"}
            onBackdropPress={() => setModalDelete(false)}
            swipeDirection={["down"]}
            onSwipeComplete={() => setModalDelete(false)}
          >
            <View style={styles.modalContainer2}>
              <Text style={styles.modalHeader2}>
                Yorumu silmek istediğinizden emin misiniz?
              </Text>
              <View style={styles.modalButtonContainer2}>
                <TouchableOpacity
                  style={styles.confirmButtonStyle2}
                  onPress={DeleteComment}
                >
                  <Text style={styles.confirmButtonTextStyle2}>Evet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButtonStyle2}
                  onPress={() => setModalDelete(false)}
                >
                  <Text style={styles.cancelButtonTextStyle2}>Hayır</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#e6e6e6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  cardContent: {
    padding: 12,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  imageTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  listingIdText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  commentStarsContainer: {
    flexDirection: "column",
    marginBottom: 6,
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
    marginBottom: 8,
    paddingTop: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentText: {
    fontSize: 12,
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: (status) => ({
    fontSize: 12,
    color: status === 1 ? "#28A745" : status === 2 ? "#DC3545" : "#FFC107",
    marginTop: 8,
  }),
  editButton: {
    zIndex: 1,
  },
  modal: {
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  confirmationModal2: {
    // Modal stil ayarları
  },
  modalContainer2: {
    // Modal içeriği stil ayarları
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalHeader2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  modalButtonContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButtonStyle2: {
    backgroundColor: "#ea2a28",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  confirmButtonTextStyle2: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButtonStyle2: {
    backgroundColor: "#ccc",
    color: "#333",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonTextStyle2: {
    color: "#333",
    fontWeight: "bold",
  },
  
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
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

  const [loading, setLoading] = useState(true); // Yüklenme animasyonu için
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü için
  const [modalMessage, setModalMessage] = useState(""); // Başarı veya hata mesajı
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  console.log(user.id);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/user/${user?.id}/comments`
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

  const MycommentItem = ({ item, EditComment, goToEditComment }) => {
    const API_URL = "https://private.emlaksepette.com/";
    const { type, comment } = item;
    const info = type === "project" ? item.project : item.housing;
    const numStars = Math.round(comment?.rate);

    const imageSource =
      type === "project"
        ? `${API_URL}${info?.image.replace("public/", "storage/")}`
        : `${API_URL}housing_images/${
            JSON.parse(info.housing_type_data)?.image ?? ""
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
                      type
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
  const EditComment = (id, info, comment, status, imageSource, type) => {
    setchoose(true);
    setselectedCommentID(id);
    setselectedProjectID(info.id);
    setselectcommentInfo(comment);
    setselectedCommentStatus(status);
    setSelectedInfo(info); // info'yu da state'e ekliyoruz
    setSelectedType(type);
    setSelectedSource(imageSource); //
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
    });
    setchoose(false);
  };

  const DeleteComment = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.delete(
          `https://private.emlaksepette.com/api/delete/comment/${selectedCommentID}/${selectedType}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setDeleteSuccess(true); // İşlemin başarılı olduğunu kaydet
        setModalMessage("Yorum başarıyla silindi!"); // Başarı mesajı
        setchoose(false);
        fetchData();
      } else {
        setLoading(false);
        setDeleteSuccess(false);
        setModalMessage("Yorum bulunamadı.");
      }
    } catch (error) {
      setLoading(false); // Hata durumunda loading'i kapat
      setDeleteSuccess(false); // İşlemin başarısız olduğunu kaydet
      setModalMessage("Yorum silme işlemi başarısız oldu.");
      console.error("Silme işlemi başarısız oldu", error);
    } finally {
      setModalVisible(true); // İşlem bittikten sonra modal açılır
    }
  };

  console.log(user?.access_token);
  console.log(selectedCommentID + "selectedddd iddddddd ");

  return (
    <ScrollView
      contentContainerStyle={{ gap: 10, padding: 10 }}
      style={styles.scrollView}
    >
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
            item={item}
            EditComment={EditComment}
            goToEditComment={() => goToEditComment(item)} // info'yu prop olarak gönderiyoruz
          />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, color: "#555" }}>Henüz yorum yok.</Text>
        </View>
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
              onPress={DeleteComment}
            >
              <Icon3 name="delete" size={21} color={"#EA2A28"} />
              <Text style={styles.modalOptionText}>Yorumu Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Silme işlemi sonuçlandıktan sonra gösterilecek modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Modal kapatılır
        }}
        style={{ margin: 0, padding: 0 }}
      >
        {/* Modalın tam ekranı kaplamasını sağlayan dış View */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* İçerik kutusu */}
          <View
            style={{
              width: "80%", // Genişliği ekranın %80'i
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center", // İçeriği merkezle
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              {modalMessage}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)} // Modalı kapat
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: deleteSuccess ? "green" : "red", // Başarı için yeşil, hata için kırmızı
                borderRadius: 5,
                width: "100%", // Buton genişliği %100
                alignItems: "center", // Buton içeriğini ortala
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
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
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
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

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const fetchData = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/user/${user?.id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const MycommentItem = ({ item, EditComment }) => {
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
        <TouchableOpacity style={{padding: 12}} onPress={handleNavigate}>
          <View style={styles.imageTitleContainer}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{ uri: imageSource }}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {info?.project_title ||
                  info?.description.replace(/<\/?[^>]+(>|$)/g, "")}
              </Text>
              <Text style={styles.listingIdText}>
                {type === "project"
                  ? `İlan No: ${info.id + 1000000}`
                  : `İlan No: ${info.id + 2000000}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            EditComment(comment?.id, info.id, comment, comment.status);
          }}
        >
          <Icon name="dots-three-vertical" size={22} color={"#333"} />
        </TouchableOpacity>

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

  const EditComment = (id, projectId, comment, status) => {
    setchoose(true);
    setselectedCommentID(id);
    setselectedProjectID(projectId);
    setselectcommentInfo(comment);
    setselectedCommentStatus(status);
  };

  const goToEditComment = () => {
    nav.navigate("EditProjectComment", {
      projectId: selectedProjectID,
      commentInfo: selectcommentInfo,
      commentID: selectedCommentID,
    });
    setchoose(false);
  };

  const DeleteComment = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.post(
          `https://private.emlaksepette.com/api/delete/comment/${selectedCommentID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        fetchData();
        setchoose(false);
      } else {
        alert("Yorum boş");
      }
    } catch (error) {
      console.error("Post isteği olmadı", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 10, padding: 10 }}
      style={styles.scrollView}
    >
      {comments?.map((item, index) => (
        <MycommentItem
          key={index}
          item={item}
          EditComment={EditComment}
          goToEditComment={goToEditComment}
        />
      ))}


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

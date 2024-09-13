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
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

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
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const EditComment = (id, info, comment, status, imageSource) => {
    setchoose(true);
    setselectedCommentID(id);
    setselectedProjectID(info.id);
    setselectcommentInfo(comment);
    setselectedCommentStatus(status);
  };

  const DeleteComment = async () => {
    try {
      if (user?.access_token) {
        await axios.post(
          `https://private.emlaksepette.com/api/delete/comment/${selectedCommentID}`,
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
      contentContainerStyle={{ gap: 10, padding: 10, flexGrow: 1 }}
      style={styles.scrollView}
    >
      {comments.length === 0 ? (
        <View style={styles.noCommentsContainer}>
          <FontAwesome5Icon name="comments" size={64} color="#333" style={{ marginBottom: 20 }} />
          <Text style={styles.noCommentsText}>Henüz bir değerlendirme yapmadınız.</Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => nav.navigate('Home')} // Ana sayfaya yönlendirme
          >
            <Text style={styles.returnButtonText}>Anasayfaya Dön</Text>
          </TouchableOpacity>
        </View>
      ) : (
        comments?.map((item, index) => (
          <MycommentItem
            key={index}
            item={item}
            EditComment={EditComment}
          />
        ))
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
                onPress={() => goToEditComment(item)}
              >
                <Icon3 name="edit-note" size={29} color={"#333"} />
                <Text style={styles.modalOptionText}>Yorumu Düzenle</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.modalOption} onPress={DeleteComment}>
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
  noCommentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  noCommentsText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: '#EA2A28',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
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

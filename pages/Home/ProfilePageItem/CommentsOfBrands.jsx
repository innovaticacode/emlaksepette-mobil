import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  EvaluationsCommentCard,
  StarFilter,
  SubjectFilter,
} from "../../../components";
import axios from "axios";
import { Dialog } from "react-native-alert-notification";
import { apiUrl } from "../../../components/methods/apiRequest";

export default function CommentsOfBrands(props) {
  const { id } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [starIndex, setStarIndex] = useState(5);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState({});

  const handleStar = (index) => {
    setStarIndex(index);
  };

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  const fetchComment = async () => {
    console.debug("api isteği başladı");
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}get_brand_comments_by_rate/${id}`
      );
      const commentsObject = response.data?.comments;
      setComments(Object.values(commentsObject));
      return setLoading(false);
    } catch (error) {
      console.error("errr", error);
      setLoading(false);
      return Dialog.show({
        type: "error",
        title: "Hata",
        text: "Bir hata oluştu.",
        onClose: () => {},
      });
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const starFilter = () => {
    const oneStarComments = comments.filter((comment) => comment.rate == 1);
    const twoStarComments = comments.filter((comment) => comment.rate == 2);
    const threeStarComments = comments.filter((comment) => comment.rate == 3);
    const fourStarComments = comments.filter((comment) => comment.rate == 4);
    const fiveStarComments = comments.filter((comment) => comment.rate == 5);

    setCommentsLength({
      oneStar: oneStarComments.length,
      twoStar: twoStarComments.length,
      threeStar: threeStarComments.length,
      fourStar: fourStarComments.length,
      fiveStar: fiveStarComments.length,
    });

    switch (starIndex) {
      case 1:
        return setFilteredComments(oneStarComments);
      case 2:
        return setFilteredComments(twoStarComments);
      case 3:
        return setFilteredComments(threeStarComments);
      case 4:
        return setFilteredComments(fourStarComments);
      case 5:
        return setFilteredComments(fiveStarComments);
      default:
        return setFilteredComments(fiveStarComments);
    }
  };

  useEffect(() => {
    if (comments.length > 0) {
      setLoading(true);
      starFilter();
      setLoading(false);
    }
  }, [comments, starIndex]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subjectArea}>
          <Text style={styles.title}>Filitrele</Text>
          <View style={{ flexDirection: "row" }}>
            <SubjectFilter
              text="Tümü"
              active={activeIndex === 0}
              onPress={() => handleActive(0)}
              count={comments.length}
            />
            <SubjectFilter
              text="Fotoğraflı Yorum"
              active={activeIndex === 1}
              onPress={() => handleActive(1)}
            />
          </View>
          <View style={styles.starArea}>
            <Text style={styles.title}>Puana Göre Filitrele</Text>
            <FlatList
              data={[5, 4, 3, 2, 1]}
              renderItem={({ item }) => {
                return (
                  <StarFilter
                    star={item}
                    active={starIndex === item}
                    onPress={() => handleStar(item)}
                    count={
                      item === 5
                        ? commentsLength.fiveStar
                        : item === 4
                        ? commentsLength.fourStar
                        : item === 3
                        ? commentsLength.threeStar
                        : item === 2
                        ? commentsLength.twoStar
                        : commentsLength.oneStar
                    }
                  />
                );
              }}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <>
            {loading && <ActivityIndicator size="large" color="#000" />}

            {!loading && comments.length >= 1 ? ( // loading false ve yorum varsa render et
              <FlatList
                data={filteredComments}
                renderItem={({ item }) => {
                  const housingData = item?.housing?.housing_type_data
                    ? JSON.parse(item.housing.housing_type_data)
                    : null;

                  const formattedDate = new Date(
                    item?.created_at
                  ).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <EvaluationsCommentCard
                      mainImage={
                        item.project?.image
                          ? item.project.image
                          : housingData?.image
                      }
                      title={
                        item.project?.project_title
                          ? item?.project?.project_title
                          : item?.housing?.title
                      }
                      star={starIndex}
                      desc={item?.comment}
                      info={`${formattedDate} | ${item?.user?.name}`}
                      images={item?.images}
                    />
                  );
                }}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              !loading && <Text>Yorum bulunamadı.</Text> // loading false ve yorum yoksa mesajı göster
            )}
          </>
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 19,
    color: "#0C0C0C",
    lineHeight: 12,
  },
  subjectArea: {
    gap: 6,
  },
  starArea: {
    marginTop: 6,
    gap: 4,
  },
});

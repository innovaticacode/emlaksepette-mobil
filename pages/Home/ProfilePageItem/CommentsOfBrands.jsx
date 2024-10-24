import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
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
  const [starIndex, setStarIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState({});
  const [imagesComments, setImagesComments] = useState({});

  const handleStar = (index) => {
    setLoading(true);

    if (index === starIndex) {
      setTimeout(() => {
        setStarIndex(0);
        return setLoading(false);
      }, 600);
    }
    setTimeout(() => {
      setStarIndex(index);
      setLoading(false);
    }, 500);
  };

  const handleActive = (index) => {
    setLoading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setLoading(false);
    }, 500);
  };

  const fetchComment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}get_brand_comments_by_rate/${id}`
      );

      const commentsObject = response.data?.comments;
      const allComments = Object.values(commentsObject);

      const sortedComments = allComments.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      const filteredImages = sortedComments.filter(
        (comment) =>
          comment.images && comment.images !== "[]" && comment.images.length > 0
      );

      setComments(sortedComments);
      setImagesComments(filteredImages);
      return setLoading(false);
    } catch (error) {
      setLoading(false);
      return Dialog.show({
        type: "error",
        title: "Hata",
        text: "Bir hata oluştu.",
        onClose: () => {},
      });
    }
  };

  const starFilter = () => {
    const targetComments = activeIndex === 1 ? imagesComments : comments;

    const oneStarComments = targetComments.filter(
      (comment) => comment.rate == 1
    );
    const twoStarComments = targetComments.filter(
      (comment) => comment.rate == 2
    );
    const threeStarComments = targetComments.filter(
      (comment) => comment.rate == 3
    );
    const fourStarComments = targetComments.filter(
      (comment) => comment.rate == 4
    );
    const fiveStarComments = targetComments.filter(
      (comment) => comment.rate == 5
    );

    setCommentsLength({
      oneStar: oneStarComments.length,
      twoStar: twoStarComments.length,
      threeStar: threeStarComments.length,
      fourStar: fourStarComments.length,
      fiveStar: fiveStarComments.length,
    });

    let filtered = [];

    // Eğer starIndex 0 ise, tüm yorumları göster
    if (starIndex === 0) {
      filtered = targetComments; // Tüm yorumları göster
    } else {
      switch (starIndex) {
        case 1:
          filtered = oneStarComments;
          break;
        case 2:
          filtered = twoStarComments;
          break;
        case 3:
          filtered = threeStarComments;
          break;
        case 4:
          filtered = fourStarComments;
          break;
        case 5:
          filtered = fiveStarComments;
          break;
        default:
          filtered = fiveStarComments;
      }
    }

    return setFilteredComments(filtered);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  useEffect(() => {
    if (comments.length > 0 || imagesComments.length > 0) {
      starFilter();
    }
  }, [comments, imagesComments, starIndex, activeIndex]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {!loading && (
        <>
          <View style={styles.subjectArea}>
            <Text style={styles.title}>Filtrele</Text>
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
                count={imagesComments.length}
              />
            </View>
            <View style={styles.starArea}>
              <Text style={styles.title}>Puana Göre Filtrele</Text>
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
          </View>

          {filteredComments.length >= 1 ? (
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
                    star={starIndex === 0 ? item?.rate : starIndex}
                    desc={item?.comment}
                    info={`${formattedDate} | ${item?.user?.name}`}
                    images={item?.images}
                  />
                );
              }}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            !loading && <Text>Yorum bulunamadı.</Text>
          )}
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  title: {
    fontSize: 12,
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

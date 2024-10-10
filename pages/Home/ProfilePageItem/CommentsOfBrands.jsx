import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
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
  const handleStar = (index) => {
    setStarIndex(index);
  };

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  const handleComment = async (rateID) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}get_brand_comments_by_rate/${id}/${rateID}`
      );
      setComments(Object.values(response.data.comments));
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

  // `comments` state'i her değiştiğinde log yazdırmak için bu `useEffect`'i kullanabilirsin
  useEffect(() => {
    handleComment(starIndex);
  }, [starIndex]);

  useEffect(() => {
    // console.log("comments>>>>>>>>>>>>>", comments);
  }, [comments]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subjectArea}>
          <Text style={styles.title}>Konuya Göre Filtrele</Text>
          <View style={{ flexDirection: "row" }}>
            <SubjectFilter
              text="Tümü"
              active={activeIndex === 0}
              onPress={() => handleActive(0)}
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
              renderItem={({ item }) => (
                <>
                  <StarFilter
                    star={item}
                    active={starIndex === item}
                    onPress={() => handleStar(item)}
                  />
                </>
              )}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <>
            {loading && <Text>Yükleniyor...</Text>}

            {comments.length >= 1 ? (
              <FlatList
                data={comments}
                renderItem={({ item }) => {
                  // housing_type_data JSON verisini parse ediyoruz
                  const housingData = item?.housing?.housing_type_data
                    ? JSON.parse(item.housing.housing_type_data) // housing varsa
                    : null; // yoksa null

                  // console.debug("item-images", item?.images);

                  return (
                    <EvaluationsCommentCard
                      mainImage={
                        item.project?.image // Eğer project'ten image varsa onu kullan
                          ? item.project.image
                          : housingData?.image // Yoksa housingData'dan image al
                      }
                      title={item?.comment}
                      star={item?.rating || 0} // Rating yoksa 0 kullan
                      desc={item?.comment}
                      info={`${item?.created_at} | ${item?.user?.name}`} // Tarih ve kullanıcı adını gösteriyoruz
                      images={item?.images}
                    />
                  );
                }}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text>Yorum bulunamadı.</Text>
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

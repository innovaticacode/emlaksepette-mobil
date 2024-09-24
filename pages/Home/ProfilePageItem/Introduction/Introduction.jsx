import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { apiRequestGet } from "../../../../components/methods/apiRequest";
import { removeHtmlTags } from "../../../../utils";
import { styles } from "./Introduction.styles";
import { Dialog } from "react-native-alert-notification";
import { CommentCard, TotalStarCard } from "../../../../components";

const Introduction = (props) => {
  const { id } = props;
  const [storeInfo, setStoreInfo] = useState({});
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetStoreInfo = async () => {
    await setLoading(true);
    try {
      const response = await apiRequestGet("brand/" + id);
      setStoreInfo(response.data.data);
      setOwners(response.data.data.owners);
      return await setLoading(false);
    } catch (error) {
      Dialog.show({
        type: "error",
        title: "Hata",
        text: "İşletme bilgileri alınırken bir hata oluştu.",
      });
      return await setLoading(false);
    }
  };
  useEffect(() => {
    handleGetStoreInfo();
  }, [id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <>
            <Text style={styles.title}>
              {storeInfo?.name || "İşletme ismi bulunamadı."}
            </Text>
            <Text style={styles.description}>
              {removeHtmlTags(
                storeInfo?.about || "İşletme hakkında bilgi bulunamadı."
              )}
            </Text>
          </>
          <View style={styles.starArea}>
            <TotalStarCard />
          </View>
          <FlatList
            data={owners}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.list}>
                  <CommentCard
                    rate={item?.rate}
                    comment={item?.comment}
                    created_at={item?.created_at}
                    images={item?.images}
                    title={item?.housing?.title}
                    addres={item?.housing?.address}
                  />
                </View>
              );
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Introduction;

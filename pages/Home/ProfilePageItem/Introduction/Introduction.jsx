import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { apiRequestGet } from "../../../../components/methods/apiRequest";
import { removeHtmlTags } from "../../../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./Introduction.styles";
import { Dialog } from "react-native-alert-notification";

const Introduction = (props) => {
  const { id } = props;

  const [storeInfo, setStoreInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetStoreInfo = async () => {
    await setLoading(true);
    try {
      const response = await apiRequestGet("brand/" + id);
      setStoreInfo(response.data.data);

      return await setLoading(false);
    } catch (error) {
      Dialog.show({
        type: "error",
        title: "Hata",
        text: "İşletme bilgileri alınırken bir hata oluştu.",
      });
      await setLoading(false);
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
          <Text style={styles.title}>
            {storeInfo?.name || "İşletme ismi bulunamadı."}
          </Text>
          <Text style={styles.description}>
            {removeHtmlTags(
              storeInfo?.about || "İşletme hakkında bilgi bulunamadı."
            )}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default Introduction;

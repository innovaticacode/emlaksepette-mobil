import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import {
  apiRequestGet,
  frontEndUriBase,
} from "../../../../components/methods/apiRequest";
import { removeHtmlTags } from "../../../../utils";
import { styles } from "./Introduction.styles";
import { Dialog } from "react-native-alert-notification";
import { CommentCard, TotalStarCard } from "../../../../components";
import ProjectPost from "../../../../components/ProjectPost";
import Swiper from "react-native-swiper";

const Introduction = (props) => {
  const { id } = props;
  const [storeInfo, setStoreInfo] = useState({});
  const [owners, setOwners] = useState([]);
  const [projects, setProjects] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetStoreInfo = async () => {
    setLoading(true);
    try {
      const response = await apiRequestGet("brand/" + id);
      setStoreInfo(response.data.data);
      setProjects(response.data.data.projects);
      setOwners(response.data.data.owners);
      setBanners(response.data.data.banners);
      setLoading(false);
    } catch (error) {
      Dialog.show({
        type: "error",
        title: "Hata",
        text: "İşletme bilgileri alınırken bir hata oluştu.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetStoreInfo();
    }
  }, [id]);

  // Helper to check if any data is available
  const isDataAvailable = () => {
    return (
      storeInfo?.name ||
      storeInfo?.about ||
      owners.length > 0 ||
      banners.length > 0 ||
      projects.length > 0
    );
  };

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
          {isDataAvailable() ? (
            <>
              {storeInfo?.name && (
                <Text style={styles.title}>{storeInfo.name}</Text>
              )}

              {storeInfo?.about && (
                <Text style={styles.description}>
                  {removeHtmlTags(storeInfo.about)}
                </Text>
              )}

              <View style={styles.starArea}>
                <TotalStarCard />
              </View>

              {owners.length > 0 && (
                <FlatList
                  data={owners}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
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
                  )}
                />
              )}

              {banners.length > 0 && (
                <View style={{ height: 245 }}>
                  <Swiper autoplay>
                    {banners.map((banner, index) => (
                      <View key={index} style={styles.imgArea}>
                        <Image
                          source={{
                            uri: `${frontEndUriBase}storage/store_banners/${banner?.image}`,
                          }}
                          style={styles.bannerImage}
                        />
                      </View>
                    ))}
                  </Swiper>
                </View>
              )}

              {projects.length > 0 && (
                <FlatList
                  data={projects}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.flatList}
                  renderItem={({ item, index }) => (
                    <ProjectPost
                      key={index}
                      project={item}
                      caption={item.project_title}
                      ımage={`${frontEndUriBase}/${item.image.replace(
                        "public/",
                        "storage/"
                      )}`}
                      location={item?.city?.title}
                      city={item?.county?.ilce_title}
                      ProjectNo={item.id}
                      user={storeInfo}
                      ProfilImage={`${frontEndUriBase}/storage/profile_images/${storeInfo.profile_image}`}
                      loading={loading}
                    />
                  )}
                />
              )}
            </>
          ) : (
            <Text style={styles.noDataText}>Herhangi bir Bilgi Bulunamadı</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Introduction;

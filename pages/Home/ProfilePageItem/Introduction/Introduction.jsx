import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { apiRequestGet } from "../../../../components/methods/apiRequest";
import { styles } from "./Introduction.styles";
import HTML from "react-native-render-html";
import NoDataScreen from "../../../../components/NoDataScreen";

const Introduction = (props) => {
  const { id, setTab } = props;
  const [storeInfo, setStoreInfo] = useState({});

  const [loading, setLoading] = useState(true);

  const handleGetStoreInfo = async () => {
    setLoading(true);
    try {
      const response = await apiRequestGet("brand/" + id);
      setStoreInfo(response.data.data);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetStoreInfo();
    }
  }, [id]);

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            {storeInfo?.about ? (
              <View style={styles.textArea}>
                <Text style={styles.title}>Hakkımızda</Text>
                <View style={styles.description}>
                  <HTML
                    source={{ html: storeInfo?.about }}
                    contentWidth={100}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <NoDataScreen
                  message="Herhangi bir Bilgi Bulunamadı"
                  iconName="store-off-outline"
                  buttonText="Anasayfaya Git"
                  navigateTo="HomePage"
                />
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </>
    // <View style={styles.container}>
    //   {loading ? (
    //     <View style={styles.loadingContainer}>
    //       <ActivityIndicator size="large" color="#000" />
    //     </View>
    //   ) : (
    //     <ScrollView
    //       showsVerticalScrollIndicator={false}
    //       style={styles.scrollView}
    //     >
    //       {isDataAvailable() ? (
    //         <>
    //           <View style={styles.infoArea}>
    //             {storeInfo?.name && (
    //               <Text style={styles.title}>{storeInfo.name}</Text>
    //             )}

    //             {storeInfo?.about && (
    //               <Text style={styles.description}>
    //                 <HTML
    //                   source={{ html: storeInfo?.about }}
    //                   contentWidth={10}
    //                 />
    //               </Text>
    //             )}
    //           </View>
    //           {ratingCount && (
    //             <View style={styles.starArea}>
    //               <Text style={styles.projectTitle}>
    //                 MAĞAZA DEĞERLENDİRMELERİ
    //               </Text>
    //               <TotalStarCard ratingCounts={ratingCount} />
    //             </View>
    //           )}
    //           {owners.length > 0 && (
    //             <>
    //               <FlatList
    //                 data={owners}
    //                 keyExtractor={(item) => item.id.toString()}
    //                 horizontal
    //                 showsHorizontalScrollIndicator={false}
    //                 contentContainerStyle={{ paddingBottom: 10 }}
    //                 renderItem={({ item }) => (
    //                   <View style={styles.list}>
    //                     <CommentCard
    //                       rate={item?.rate}
    //                       comment={item?.comment}
    //                       created_at={item?.created_at}
    //                       images={item?.images}
    //                       title={item?.housing?.title}
    //                       addres={item?.housing?.address}
    //                     />
    //                   </View>
    //                 )}
    //               />
    //             </>
    //           )}

    //           {banners.length > 0 && (
    //             <>
    //               <View style={styles.seperator} />
    //               <View style={{ height: 245 }}>
    //                 <Swiper autoplay>
    //                   {banners.map((banner, index) => (
    //                     <View key={index} style={styles.imgArea}>
    //                       <Image
    //                         source={{
    //                           uri: `${frontEndUriBase}storage/store_banners/${banner?.image}`,
    //                         }}
    //                         style={styles.bannerImage}
    //                       />
    //                     </View>
    //                   ))}
    //                 </Swiper>
    //               </View>
    //             </>
    //           )}

    //           {projects.length > 0 && (
    //             <FlatList
    //               ListHeaderComponent={() => (
    //                 <>
    //                   <View style={styles.seperator} />
    //                   <View style={styles.titleArea}>
    //                     <Text style={styles.projectTitle}>PROJELER</Text>
    //                     <TouchableOpacity
    //                       style={styles.allProjectsButton}
    //                       onPress={() => setTab(2)}
    //                     >
    //                       <Text style={styles.allProjectsButtonText}>
    //                         Tüm Projeleri Gör
    //                       </Text>
    //                     </TouchableOpacity>
    //                   </View>
    //                 </>
    //               )}
    //               data={projects}
    //               keyExtractor={(item) => item.id.toString()}
    //               contentContainerStyle={styles.flatList}
    //               renderItem={({ item, index }) => (
    //                 <ProjectPost
    //                   key={index}
    //                   project={item}
    //                   caption={item.project_title}
    //                   ımage={`${frontEndUriBase}/${item.image.replace(
    //                     "public/",
    //                     "storage/"
    //                   )}`}
    //                   location={item?.city?.title}
    //                   city={item?.county?.ilce_title}
    //                   ProjectNo={item.id}
    //                   user={storeInfo}
    //                   ProfilImage={`${frontEndUriBase}/storage/profile_images/${storeInfo.profile_image}`}
    //                   loading={loading}
    //                 />
    //               )}
    //             />
    //           )}
    //           {housings.length > 0 && (
    //             <FlatList
    //               ListHeaderComponent={() => (
    //                 <>
    //                   <View style={styles.seperator} />
    //                   <View style={styles.titleArea}>
    //                     <Text style={styles.projectTitle}>İLANLAR</Text>
    //                     <TouchableOpacity
    //                       style={styles.allProjectsButton}
    //                       onPress={() => setTab(3)}
    //                     >
    //                       <Text style={styles.allProjectsButtonText}>
    //                         Tüm İlanları Gör
    //                       </Text>
    //                     </TouchableOpacity>
    //                   </View>
    //                 </>
    //               )}
    //               data={housings}
    //               keyExtractor={(item) => item.id.toString()}
    //               renderItem={({ item }) => (
    //                 <RealtorPost
    //                   HouseId={item.id}
    //                   openSharing={
    //                     JSON.parse(item.housing_type_data)["open_sharing1"]
    //                   }
    //                   price={
    //                     item.step2_slug == "gunluk-kiralik"
    //                       ? JSON.parse(item.housing_type_data)["daily_rent"]
    //                       : JSON.parse(item.housing_type_data)["price"]
    //                   }
    //                   housing={item}
    //                   title={item.title}
    //                   loading={loading}
    //                   location={
    //                     item.city["title"] + " / " + item.county["title"]
    //                   }
    //                   image={`${frontEndUriBase}/housing_images/${
    //                     JSON.parse(item.housing_type_data).image
    //                   }`}
    //                   column1_name={
    //                     JSON.parse(item.housing_type_data)["m2gross"]
    //                       ? JSON.parse(item.housing_type_data)["m2gross"]
    //                       : ""
    //                   }
    //                   column1_additional={item.column1_additional}
    //                   column2_name={
    //                     JSON.parse(item.housing_type_data)["room_count"]
    //                       ? JSON.parse(item.housing_type_data)["room_count"]
    //                       : ""
    //                   }
    //                   column2_additional={item.column2_additional}
    //                   column3_name={
    //                     JSON.parse(item.housing_type_data)["floorlocation"]
    //                       ? JSON.parse(item.housing_type_data)["floorlocation"]
    //                       : ""
    //                   }
    //                   column3_additional={item.column3_additional}
    //                   column4_name={
    //                     JSON.parse(item.housing_type_data)[item.column4_name]
    //                       ? JSON.parse(item.housing_type_data)[
    //                           item.column4_name
    //                         ]
    //                       : ""
    //                   }
    //                   column4_additional={item.column4_additional}
    //                   bookmarkStatus={true}
    //                   dailyRent={false}
    //                 />
    //               )}
    //             />
    //           )}
    //         </>
    //       ) : (
    //         <Text style={styles.noDataText}>Herhangi bir Bilgi Bulunamadı</Text>
    //       )}
    //     </ScrollView>
    //   )}
    // </View>
  );
};

export default Introduction;

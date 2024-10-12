import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import RealtorPostFavorited from "../../components/RealtorPostFavorited";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import Icon2 from "react-native-vector-icons/FontAwesome";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  Dialog,
  ALERT_TYPE,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import NoDataScreen from "../../components/NoDataScreen";
import { SearchBar } from "@rneui/base";
import SortModal from "../../components/SortModal";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import IconFilter from "react-native-vector-icons/MaterialCommunityIcons";
import RadioFilter from "../../components/Filter/RadioFilter/RadioFilter";
import { frontEndUriBase } from "../../components/methods/apiRequest";

export default function Favorites() {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const [selectedRoomID, setselectedRoomID] = useState(0);
  const [type, settype] = useState(0);
  const [modalForDeleteFavorites, setmodalForDeleteFavorites] = useState(false);
  const [isChoosed, setIsChoosed] = useState(false); // Toplu seçim modu
  const [FavoriteRemoveIDS, setFavoriteRemoveIDS] = useState([]); // Silinecek ilanların ID'leri
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [RemoveSelectedCollectionsModal, setRemoveSelectedCollectionsModal] =
    useState(false); // Modal durumu
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user?.access_token}` },
      };
      const response = await axios.get(
        "https://private.emlaksepette.com/api/favorites",
        config
      );
      const reversedFavorites = Object.values(
        response.data.mergedFavorites
      ).reverse();

      return setFavorites(reversedFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      fetchFavorites();
    }
  }, [user, focused]);

  const changeFavorites = (type, housingId, projectId) => {
    if (type == 1) {
      setFavorites(
        favorites.filter((favorite) => {
          if (
            favorite?.project?.id == projectId &&
            favorite?.housing_id == housingId
          ) {
          } else {
            return favorite;
          }
        })
      );
    } else {
      setFavorites(
        favorites.filter((favorite) => {
          if (favorite?.housing && favorite?.housing_id == housingId) {
          } else {
            return favorite;
          }
        })
      );
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchFavorites();
    } finally {
      setRefreshing(false);
    }
  };

  const GetIdForCart = (id, roomId, type) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
    setselectedRoomID(roomId);
    settype(type);
  };
  const addToCardForHousing = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append("isShare", null);
    formData.append("numbershare", null);
    formData.append("qt", 1);
    formData.append("type", "housing");
    formData.append("project", null);
    formData.append("clear_cart", "no");

    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        setModalForAddToCart(false);
        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };

  const addToCardForProject = async () => {
    const formData = new FormData();
    formData.append("id", selectedRoomID);
    formData.append(
      "isShare",
      favorites?.project?.listHousing[selectedRoomID]["share_sale[]"]
        ? favorites?.project?.listHousing[selectedRoomID]["share_sale[]"]
        : "[]"
    );
    formData.append(
      "numbershare",
      favorites?.project?.listHousing[selectedRoomID]
        ? ["number_of_shares[]"]
        : "[]"
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", selectedCartItem);
    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };

  // DELETE ALL FUNCTION START
  const deleteAll = async () => {
    console.debug("Favorite delete requests started");
    setLoading(true);

    const deleteHousingRequest = axios.delete(
      "https://private.emlaksepette.com/api/institutional/housing-favorite",
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );

    const deleteProjectRequest = axios.delete(
      "https://private.emlaksepette.com/api/institutional/project-favorite",
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );

    try {
      const [housingResponse, projectResponse] = await Promise.allSettled([
        deleteHousingRequest,
        deleteProjectRequest,
      ]);

      let successfulRequests = 0;
      let housingSuccessful = false;
      let projectSuccessful = false;
      if (
        housingResponse.status === "fulfilled" &&
        housingResponse.value.status === 200
      ) {
        successfulRequests++;
        housingSuccessful = true;
      }

      if (
        projectResponse.status === "fulfilled" &&
        projectResponse.value.status === 200
      ) {
        successfulRequests++;
        projectSuccessful = true;
      }
      setTimeout(() => {
        if (successfulRequests > 0) {
          let message = "Favorilerden ";

          if (housingSuccessful) {
            message += "konut ";
          }
          if (projectSuccessful) {
            message += (housingSuccessful ? "ve " : "") + "projeler ";
          }

          message += `başarıyla kaldırıldı.`;

          setTimeout(() => {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Başarılı",
              textBody: message,
              button: "Tamam",
              onHide: () => {
                fetchFavorites();
              },
            });
          }, 500);
        }
        setLoading(false);
      }, 300);
      if (
        housingResponse.status === "rejected" &&
        projectResponse.status === "rejected"
      ) {
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Hata!",
            textBody: "Tüm işlemler başarısız oldu.",
            button: "Tamam",
            onHide: () => {
              fetchFavorites();
            },
          });
          setLoading(false);
        }, 300);
      }
    } catch (error) {
      setTimeout(() => {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Hata!",
          textBody: "İşlemler sırasında beklenmeyen bir hata oluştu.",
          button: "Tamam",
          onHide: () => {
            fetchFavorites();
          },
        });
        setLoading(false);
      }, 300);
    } finally {
      setmodalForDeleteFavorites(false);
    }
  };

  const SelectFavorite = (id) => {
    setFavoriteRemoveIDS((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((item) => item !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const handleToggleSelect = () => {
    setIsChoosed(!isChoosed); // Toplu seçim modunu değiştir
    if (!isChoosed) {
      setFavoriteRemoveIDS([]); // Toplu seçim modundan çıkıldığında seçili ID'leri temizle
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (isChoosed) {
        setIsChoosed(false); // Seçimleri sıfırla
      }
    });

    return unsubscribe; // Dinleyiciyi temizlemek için
  }, [navigation, isChoosed]);

  const deleteSelectedFavorite = async () => {
    setLoading(true); // İşlem başladığında yüklenme durumu aktif edilir
    const data = {
      housing_ids: FavoriteRemoveIDS,
    };

    try {
      // Axios DELETE isteği
      const response = await axios({
        method: "delete",
        url: "https://private.emlaksepette.com/api/institutional/favorites/delete",
        data: data,
        headers: {},
      });

      if (response.status === 200) {
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: `${FavoriteRemoveIDS.length} İlan favorilerden kaldırıldı.`,
            button: "Tamam",
            onHide: () => {
              fetchFavorites(); // Fetch favorites after dialog is dismissed
              setFavoriteRemoveIDS([]); // Clear the selected favorites
            },
          });
          setLoading(false); // End loading after showing the dialog
        }, 300);

        // Favori ilanları yeniden yükle
        setFavoriteRemoveIDS([]); // Seçili ilanları temizle
        setRemoveSelectedCollectionsModal(false); // Modal'ı kapat
        setIsChoosed(false); // Toplu seçim modunu kapat
      }
    } catch (error) {
      setRemoveSelectedCollectionsModal(false); // Modal'ı kapat
      setIsChoosed(false); // Toplu seçim modunu kapat
      // Hata durumunda kullanıcıya geri bildirim sağla
      setTimeout(() => {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Hata!",
          textBody: "Silme işlemi başarısız oldu.",
          button: "Tamam",
        });
        setLoading(false); // End loading after showing the dialog
      }, 300);
    } finally {
      setLoading(false); // İşlem tamamlandıktan sonra yüklenme durumunu kapat

      setRemoveSelectedCollectionsModal(false); // Modal'ı kapat
      setIsChoosed(false); // Toplu seçim modunu kapat
    }
  };
  // BATCH SELECTION - DELETE FUNCTION END

  //filter text function
  useEffect(() => {
    const filterFavorites = () => {
      const searchLower = searchText.toLowerCase();

      return favorites.filter((favorite) => {
        if (favorite?.project) {
          return favorite?.project?.project_title
            .toLowerCase()
            .includes(searchLower);
        } else {
          return favorite?.housing?.title.toLowerCase().includes(searchLower);
        }
      });
    };

    if (searchText.length > 0) {
      const filtered = filterFavorites();
      setFilteredFavorites(filtered);
    } else {
      setFilteredFavorites([]);
    }
  }, [searchText]);

  const renderFavorite = (favorite, i) => {
    if (favorite?.project) {
      const { image, column1, column2, column3, no, location, title, price } =
        extractProjectData(favorite);
      return (
        <RealtorPostFavorited
          key={i}
          changeFavorites={changeFavorites}
          type={1}
          projectId={favorite?.project?.id}
          housingId={favorite?.housing_id}
          no={no}
          column1={column1}
          column2={column2}
          column3={column3}
          location={location}
          image={image}
          title={title}
          price={price}
          m2="20"
          GetId={GetIdForCart}
          fetchData={fetchFavorites}
          selectFavorite={SelectFavorite}
          isChoosed={isChoosed}
        />
      );
    } else if (favorite?.housing) {
      const { image, column1, column2, column3, location, title, price, no } =
        extractHousingData(favorite);
      return (
        <RealtorPostFavorited
          key={i}
          changeFavorites={changeFavorites}
          type={2}
          HouseId={favorite?.housing?.id}
          no={no}
          image={image}
          title={title}
          price={price}
          column1={column1}
          column2={column2}
          column3={column3}
          location={location}
          GetId={GetIdForCart}
          fetchData={fetchFavorites}
          selectFavorite={SelectFavorite}
          isChoosed={isChoosed}
        />
      );
    }
  };

  const extractProjectData = (favorite) => {
    const image =
      frontEndUriBase +
      "project_housing_images/" +
      favorite?.project.room_info[0]?.value;

    const column1 = getColumnData(favorite, 1);
    const column2 = getColumnData(favorite, 2);
    const column3 = getColumnData(favorite, 3);

    const no = 1000000 + favorite?.project?.id;
    const location =
      favorite?.project?.city?.title +
      " / " +
      favorite?.project?.county?.ilce_title;
    const title =
      favorite?.project?.project_title +
      " adlı projede " +
      favorite?.housing_id +
      " No'lu konut";

    //data kontrol edilerek yazdırlacak
    const price = favorite?.project.room_info[1]?.value;
    // const price = favorite?.project_housing?.find((projectHousing) => {
    //   if (
    //     projectHousing.room_order === favorite?.housing_id &&
    //     projectHousing.name === "price[]"
    //   ) {
    //     return projectHousing;
    //   }
    // })?.value;

    return { image, column1, column2, column3, no, location, title, price };
  };

  const extractHousingData = (favorite) => {
    const housingData = JSON.parse(
      favorite?.housing?.housing_type_data || "{}"
    );
    const image = housingData?.image
      ? "https://private.emlaksepette.com/housing_images/" + housingData?.image
      : "";
    const column1 =
      housingData[favorite?.housing?.list_items?.column1_name] || "";
    const column2 =
      housingData[favorite?.housing?.list_items?.column2_name] || "";
    const column3 =
      housingData[favorite?.housing?.list_items?.column3_name] || "";
    const no = favorite?.housing?.id + 2000000;
    const location =
      favorite?.housing?.city?.title + " / " + favorite?.housing?.county?.title;
    const title = favorite?.housing?.title;
    const price = housingData?.price || "0";

    return { image, column1, column2, column3, no, location, title, price };
  };

  const getColumnData = (favorite, columnIndex) => {
    return (
      favorite?.project_housing?.find(
        (housing) =>
          housing.room_order === favorite?.housing_id &&
          housing.name ===
            favorite?.project?.list_item_values[`column${columnIndex}_name`] +
              "[]" &&
          housing.project_id === favorite?.project?.id
      )?.value +
      " " +
      (favorite?.project?.list_item_values[`column${columnIndex}_additional`] ||
        "")
    );
  };

  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const shortToLong = () => {
    const shortFilter = favorites.sort((a, b) => {
      return a.created_at < b.created_at ? 1 : -1;
    });
    setFavorites(shortFilter);
    console.debug("shortFilter", shortFilter);
  };

  const longToShort = () => {
    const longFilter = favorites.sort((a, b) => {
      return a.created_at > b.created_at ? 1 : -1;
    });
    setFavorites(longFilter);
    console.debug("longFilter", longFilter);
  };

  const priceLongToShort = () => {
    if (favorites.project) {
      const priceFilter = favorites.sort((a, b) => {});
    }
  };

  useEffect(() => {
    if (selectedSortOption === "date-asc") {
      longToShort();
    } else if (selectedSortOption === "date-desc") {
      shortToLong();
    }
  }, [favorites]);

  return (
    <AlertNotificationRoot>
      <View style={{ flex: 1, paddingHorizontal: 6 }}>
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" color={"#333"} />
          </View>
        ) : (
          <View style={styles.container}>
            {favorites.length === 0 ? (
              <NoDataScreen
                message="Favorilerinizde ilan bulunmamaktadır."
                iconName="heart-plus"
                buttonText="Anasayfaya Dön"
                navigateTo="HomePage"
              />
            ) : (
              <>
                <View style={styles.searchBody}>
                  <SearchBar
                    placeholder="Ara..."
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    containerStyle={styles.searchContainer}
                    searchIcon={{ size: 20 }}
                    inputContainerStyle={styles.inputCont}
                    inputStyle={{ fontSize: 15 }}
                    showCancel="false"
                    placeholderTextColor={"grey"}
                  />

                  <TouchableOpacity style={styles.modalBtn}>
                    <View>
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Icon3 name="swap-vertical" size={23} color={"#333"} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <SortModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSortChange={(value) => {
                      setSelectedSortOption(value); // Seçilen sıralama seçeneğini güncelle
                      if (value === "date-asc") {
                        longToShort();
                      } else if (value === "date-desc") {
                        shortToLong();
                      }
                    }}
                    selectedSortOption={selectedSortOption} // Seçilen sıralama seçeneği
                    type="favorites"
                  />
                </View>

                <View style={styles.btnArea}>
                  <View style={styles.allDel}>
                    <TouchableOpacity
                      style={styles.allDelBtn}
                      onPress={() => {
                        setmodalForDeleteFavorites(true);
                      }}
                    >
                      <Text style={styles.allDelText}>Tümünü Sil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.allSelectBtn}
                      onPress={() => {
                        handleToggleSelect(); // Toplu seçim modunu aç/kapat
                      }}
                    >
                      <Text style={styles.allSelectBtnText}>
                        {isChoosed ? "Seçimi İptal Et" : "Toplu Seç"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {isChoosed && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text>
                        Seçili(
                        {FavoriteRemoveIDS.length})
                      </Text>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.btnRemove,
                            { paddingLeft: 10, paddingRight: 10 },
                          ]}
                          onPress={() => {
                            if (FavoriteRemoveIDS.length === 0) {
                              Dialog.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Hata!",
                                textBody: "Silmek için seçim yapmadınız.",
                                button: "Tamam",
                              });
                            } else {
                              setRemoveSelectedCollectionsModal(true);
                            }
                          }}
                        >
                          <Icon2 name="trash" size={18} color={"white"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>

                <AwesomeAlert
                  show={RemoveSelectedCollectionsModal}
                  showProgress={false}
                  titleStyle={{
                    color: "#333",
                    fontSize: 13,
                    fontWeight: "700",
                    textAlign: "center",
                    margin: 5,
                  }}
                  title={`${FavoriteRemoveIDS.length} Seçili Koleksiyonu silmek istediğinize emin misin`}
                  messageStyle={{ textAlign: "center" }}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="Hayır"
                  confirmText="Evet"
                  cancelButtonColor="#ce4d63"
                  confirmButtonColor="#1d8027"
                  onCancelPressed={() => {
                    setRemoveSelectedCollectionsModal(false);
                  }}
                  onConfirmPressed={() => {
                    deleteSelectedFavorite(true);
                  }}
                  confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                  cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                />

                <AwesomeAlert
                  show={modalForDeleteFavorites}
                  showProgress={false}
                  title={"Tümünü Sil"}
                  message={"Tüm Favorileri Silmek İstediğinize Emin misiniz?"}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="Hayır"
                  confirmText="Evet"
                  cancelButtonColor="#ce4d63"
                  confirmButtonColor="#1d8027"
                  onCancelPressed={() => {
                    setmodalForDeleteFavorites(false);
                  }}
                  onConfirmPressed={() => {
                    deleteAll();
                  }}
                />

                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  contentContainerStyle={{}}
                  showsVerticalScrollIndicator={false}
                >
                  {searchText.length > 0 ? (
                    filteredFavorites.length === 0 ? (
                      <View style={styles.noResultsContainer}>
                        <IconFilter
                          name="emoticon-sad-outline"
                          size={50}
                          color="#EA2B2E"
                        />
                        <Text style={styles.noResultsText}>
                          Arama sonucu bulunamadı.
                        </Text>
                        <Text style={styles.noResultsSubText}>
                          Lütfen başka bir terim deneyin.
                        </Text>
                      </View>
                    ) : (
                      filteredFavorites.map((favorite, i) => {
                        return renderFavorite(favorite, i);
                      })
                    )
                  ) : (
                    favorites.map((favorite, i) => {
                      return renderFavorite(favorite, i);
                    })
                  )}

                  {/* {(filteredFavorites.length > 0
                    ? filteredFavorites
                    : favorites
                  ).map((favorite, i) => {
                    if (favorite?.project) {
                      var image = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order ===
                              favorite?.housing_id &&
                            projectHousing.name === "image[]" &&
                            projectHousing.project_id === favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;

                      var column1 = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order ===
                              favorite?.housing_id &&
                            projectHousing.name ===
                              favorite?.project?.list_item_values
                                ?.column1_name +
                                "[]" &&
                            projectHousing.project_id === favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;

                      var column2 = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order ===
                              favorite?.housing_id &&
                            projectHousing.name ===
                              favorite?.project?.list_item_values
                                ?.column2_name +
                                "[]" &&
                            projectHousing.project_id === favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;

                      var column3 = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order ===
                              favorite?.housing_id &&
                            projectHousing.name ===
                              favorite?.project?.list_item_values
                                ?.column3_name +
                                "[]" &&
                            projectHousing.project_id === favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;

                      if (column1) {
                        column1 =
                          column1 +
                          " " +
                          (favorite?.project?.list_item_values
                            ?.column1_additional || "");
                      }
                      if (column2) {
                        column2 =
                          column2 +
                          " " +
                          (favorite?.project?.list_item_values
                            ?.column2_additional || "");
                      }
                      if (column3) {
                        column3 =
                          column3 +
                          " " +
                          (favorite?.project?.list_item_values
                            ?.column3_additional || "");
                      }

                      var no = 1000000 + favorite?.project.id;
                      return (
                        <RealtorPostFavorited
                          key={i}
                          changeFavorites={changeFavorites}
                          type={1}
                          projectId={favorite?.project?.id}
                          housingId={favorite?.housing_id}
                          no={no}
                          column1={column1}
                          column2={column2}
                          column3={column3}
                          location={
                            favorite?.project?.city?.title +
                            " / " +
                            favorite?.project?.county?.ilce_title
                          }
                          image={
                            "https://private.emlaksepette.com/project_housing_images/" +
                            image
                          }
                          title={
                            favorite?.project?.project_title +
                            " adlı projede " +
                            favorite?.housing_id +
                            " No'lu konut"
                          }
                          price={
                            favorite?.project_housing?.find(
                              (projectHousing) => {
                                if (
                                  projectHousing.room_order ===
                                    favorite?.housing_id &&
                                  projectHousing.name === "price[]"
                                ) {
                                  return projectHousing;
                                }
                              }
                            )?.value
                          }
                          m2="20"
                          GetId={GetIdForCart}
                          fetchData={fetchFavorites}
                          selectFavorite={SelectFavorite}
                          isChoosed={isChoosed}
                        />
                      );
                    } else {
                      if (favorite?.housing) {
                        var housingData = JSON.parse(
                          favorite?.housing?.housing_type_data
                        );
                      } else {
                        housingData = {};
                      }
                      return (
                        <RealtorPostFavorited
                          key={i}
                          changeFavorites={changeFavorites}
                          type={2}
                          HouseId={favorite?.housing?.id}
                          no={favorite?.housing?.id + 2000000}
                          image={
                            "https://private.emlaksepette.com/housing_images/" +
                            housingData?.image
                          }
                          title={favorite?.housing?.title}
                          price={
                            housingData && housingData.price
                              ? housingData.price
                              : "0"
                          }
                          column1={
                            housingData[
                              favorite?.housing?.list_items?.column1_name
                            ]
                              ? housingData[
                                  favorite?.housing?.list_items?.column1_name
                                ] +
                                " " +
                                (favorite?.housing?.list_items
                                  ?.column1_additional || "")
                              : ""
                          }
                          column2={
                            housingData[
                              favorite?.housing?.list_items?.column2_name
                            ]
                              ? housingData[
                                  favorite?.housing?.list_items?.column2_name
                                ] +
                                " " +
                                (favorite?.housing?.list_items
                                  ?.column2_additional || "")
                              : ""
                          }
                          column3={
                            housingData[
                              favorite?.housing?.list_items?.column3_name
                            ]
                              ? housingData[
                                  favorite?.housing?.list_items?.column3_name
                                ] +
                                " " +
                                (favorite?.housing?.list_items
                                  ?.column3_additional || "")
                              : ""
                          }
                          location={
                            favorite?.housing?.city?.title +
                            " / " +
                            favorite?.housing?.county?.title
                          }
                          GetId={GetIdForCart}
                          fetchData={fetchFavorites}
                          selectFavorite={SelectFavorite}
                          isChoosed={isChoosed}
                        />
                      );
                    }
                  })} */}
                </ScrollView>
              </>
            )}
            <Modal
              isVisible={ModalForAddToCart}
              onBackdropPress={() => setModalForAddToCart(false)}
              animationIn={"zoomIn"}
              animationOut={"zoomOut"}
              transparent={true}
              useNativeDriver={true}
              style={styles.modal4}
            >
              <View style={styles.modalContent4}>
                {user.access_token ? (
                  <>
                    <View style={{ padding: 10, gap: 10 }}>
                      {type == 1 && (
                        <Text style={{ textAlign: "center" }}>
                          #1000{selectedCartItem} No'lu Projenin{" "}
                          {selectedRoomID} Numaralı Konutunu Sepete Eklemek
                          İsteiğinize Eminmisiniz?
                        </Text>
                      )}
                      {type == 2 && (
                        <Text style={{ textAlign: "center" }}>
                          #2000{selectedCartItem} No'lu Konutu Sepete Eklemek
                          İsteiğinize Eminmisiniz?
                        </Text>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 20,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            padding: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            type == 2
                              ? addToCardForHousing()
                              : addToCardForProject();
                          }}
                        >
                          <Text style={{ color: "white" }}>Sepete Ekle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            backgroundColor: "#e44242",
                            padding: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            setModalForAddToCart(false);
                          }}
                        >
                          <Text style={{ color: "white" }}>Vazgeç</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={{ gap: 10 }}>
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#4C6272",
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          Üyeliğiniz Bulunmamaktadır!
                        </Text>
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text style={{ textAlign: "center", color: "#7A8A95" }}>
                          Sepetinize konut ekleyebilmeniz için giriş yapmanız
                          gerekmektedir
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#F65656",
                          width: "100%",
                          padding: 10,
                        }}
                        onPress={() => {
                          setModalForAddToCart(false);
                          setTimeout(() => {
                            navigation.navigate("Login");
                          }, 400);
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                          Giriş Yap
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </Modal>
          </View>
        )}
      </View>
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  noResultsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  noResultsSubText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  container: {
    height: "100%",
  },
  leftAction: {
    backgroundColor: "red",
    justifyContent: "center",
    paddingHorizontal: 10,
    color: "#fff",
    width: 40,
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
  },

  btnRemove: {
    backgroundColor: "#EA2A28",
    padding: 7,
    borderRadius: 5,
  },
  searchBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 10,
  },
  searchContainer: {
    backgroundColor: "transparent",
    width: "88%",
    borderTopColor: "white",
    borderBottomColor: "white",
    height: 34,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0, // Soldan margin'i sıfırla
    paddingHorizontal: 0,
  },
  inputCont: {
    backgroundColor: "#e5e5e5",
    borderRadius: 7,
    height: "100%",
    marginTop: 0,
    paddingLeft: 0, // İçeride soldan padding'i sıfırla
  },
  modalBtn: {
    backgroundColor: "#e5e5e5",
    padding: 5,
    borderRadius: 6,
  },
  btnArea: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  allDel: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    paddingBottom: 8,
  },
  allDelBtn: {
    backgroundColor: "#EEEDEB",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  allDelText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  allSelectBtn: {
    backgroundColor: "#EEEDEB",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  allSelectBtnText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
});

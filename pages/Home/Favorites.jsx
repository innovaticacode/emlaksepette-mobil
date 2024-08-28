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
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { Platform } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
export default function Favorites() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
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
      setFavorites(Object.values(response.data.mergedFavorites));
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Hata durumunda kullanıcıya bir mesaj gösterilebilir
    } finally {
      setLoading(false);
    }
  };
  console.log(favorites);

  useEffect(() => {
    if (user.access_token) {
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
      await fetchFavorites(); // Verileri yeniden yükleyin
    } finally {
      setRefreshing(false);
    }
  };
  // İlk renderda verileri yükleyin

  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const [selectedRoomID, setselectedRoomID] = useState(0);
  const [type, settype] = useState(0);

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

  const deleteRequestWithToken = async () => {
    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/housing-favorite",
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      Alert.alert("Başarılı", "Silme işlemi başarılı!");
      fetchFavorites();
      setmodalForDeleteFavorites(false);
      console.log("Delete request successful:", response.data);
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    }
  };
  const deleteRequestWithTokenProject = async () => {
    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/project-favorite",
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      Alert.alert("Başarılı", "Silme işlemi başarılı!");
      fetchFavorites();
      setmodalForDeleteFavorites(false);
      console.log("Delete request successful:", response.data);
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    }
  };
  const [modalForDeleteFavorites, setmodalForDeleteFavorites] = useState(false);

  const [setFavoriteRemoveItem, setsetFavoriteRemoveItem] = useState(0);
  const SelectFavorite = (id) => {
    setFavoriteRemoveIDS((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((item) => item !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const [FavoriteRemoveIDSForProject, setFavoriteRemoveIDSForProject] =
    useState([]);

  console.log(FavoriteRemoveIDS);
  const deleteSelectedFavorite = async () => {
    const data = {
      housing_ids: FavoriteRemoveIDS,
    };
    try {
      const response = await axios.delete(
        "https://private.emlaksepette.com/api/institutional/favorites/delete",
        {
          data: data,
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: `Silme işlemi başarılı`,
        titleStyle: { fontSize: 14 },
        textBody: `${FavoriteRemoveIDS.length} İlan silindi`,
      });
      fetchFavorites();
      setFavoriteRemoveIDS([]);
      setFavoriteRemoveIDSForProject([]);
      setRemoveSelectedCollectionsModal(false);
      console.log("Delete request successful:", response.data);
      setisChoosed(false);
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız oldu!");
      console.error("Error making DELETE request:", error);
    }
  };

  const [RemoveSelectedCollectionsModal, setRemoveSelectedCollectionsModal] =
    useState(false);

  const [isChoosed, setisChoosed] = useState(false);
  const [FavoriteRemoveIDS, setFavoriteRemoveIDS] = useState([]);

  const handleToggleSelect = () => {
    if (isChoosed) {
      // Seçimi iptal et
      setFavoriteRemoveIDS([]); // Seçili ilanları temizle
    }
    setisChoosed(!isChoosed); // Toplu seçimi aç/kapat
  };

  return (
    <>
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
          {favorites.length == 0 ? (
            <>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: 10,
                }}
              >
                <View
                  style={[
                    styles.card,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  <Icon name="heart-plus" size={50} color={"#EA2A28"} />
                </View>
                <View>
                  <Text
                    style={{ color: "grey", fontSize: 16, fontWeight: "600" }}
                  >
                    Favorilerinizde ilan bulunmamaktadır
                  </Text>
                  <Text></Text>
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EA2A28",
                      width: "90%",
                      padding: 8,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      setLoading(true);
                      setTimeout(() => {
                        navigation.navigate("HomePage");
                        setLoading(false);
                      }, 700);
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Ana Sayfa'ya dön
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <AlertNotificationRoot>
              <GestureHandlerRootView>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EEEDEB",
                        padding: 7,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#ebebeb",
                      }}
                      onPress={() => setmodalForDeleteFavorites(true)}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        Tümünü Sil
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#EEEDEB",
                        padding: 7,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#ebebeb",
                      }}
                      onPress={handleToggleSelect} // Burada fonksiyon çağrılıyor
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
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
                          onPress={() =>
                            setRemoveSelectedCollectionsModal(true)
                          }
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
                    deleteSelectedFavorite();
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
                  cancelButtonColor="#1d8027"
                  confirmButtonColor="#ce4d63"
                  onCancelPressed={() => {
                    setmodalForDeleteFavorites(false);
                  }}
                  onConfirmPressed={() => {
                    deleteRequestWithToken();
                    deleteRequestWithTokenProject();
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
                  {favorites?.map((favorite, i) => {
                    if (favorite?.project) {
                      var image = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order == favorite?.housing_id &&
                            projectHousing.name == "image[]" &&
                            projectHousing.project_id == favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;
                      var column1 = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order == favorite?.housing_id &&
                            projectHousing.name ==
                              favorite?.project?.list_item_values
                                ?.column1_name +
                                "[]" &&
                            projectHousing.project_id == favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;
                      var column2 = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order == favorite?.housing_id &&
                            projectHousing.name ==
                              favorite?.project?.list_item_values
                                ?.column2_name +
                                "[]" &&
                            projectHousing.project_id == favorite?.project?.id
                          ) {
                            return projectHousing;
                          }
                        }
                      )?.value;
                      var column3 = favorite?.project_housing?.find(
                        (projectHousing) => {
                          if (
                            projectHousing.room_order == favorite?.housing_id &&
                            projectHousing.name ==
                              favorite?.project?.list_item_values
                                ?.column3_name +
                                "[]" &&
                            projectHousing.project_id == favorite?.project?.id
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
                            ?.column1_additional
                            ? favorite?.project?.list_item_values
                                ?.column1_additional
                            : "");
                      }
                      if (column2) {
                        column2 =
                          column2 +
                          " " +
                          (favorite?.project?.list_item_values
                            ?.column2_additional
                            ? favorite?.project?.list_item_values
                                ?.column2_additional
                            : "");
                      }
                      if (column3) {
                        column3 =
                          column3 +
                          " " +
                          (favorite?.project?.list_item_values
                            ?.column3_additional
                            ? favorite?.project?.list_item_values
                                ?.column3_additional
                            : "");
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
                                  projectHousing.room_order ==
                                    favorite?.housing_id &&
                                  projectHousing.name == "price[]"
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
                                  ?.column1_additional
                                  ? favorite?.housing?.list_items
                                      ?.column1_additional
                                  : "")
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
                                  ?.column2_additional
                                  ? favorite?.housing?.list_items
                                      ?.column2_additional
                                  : "")
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
                                  ?.column3_additional
                                  ? favorite?.housing?.list_items
                                      ?.column3_additional
                                  : "")
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
                  })}
                </ScrollView>
              </GestureHandlerRootView>
            </AlertNotificationRoot>
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
                        #1000{selectedCartItem} No'lu Projenin {selectedRoomID}{" "}
                        Numaralı Konutunu Sepete Eklemek İsteiğinize
                        Eminmisiniz?
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
                        navigation.navigate("Login");
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
          {/* <Modal
    isVisible={modalForDeleteFavorites}
    onBackdropPress={() => setmodalForDeleteFavorites(false)}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    transparent={true}
    useNativeDriver={true}
    style={styles.modal4}
  >
   
    <View style={[styles.modalContent4,{gap:10}]}>
          <View>
            <Text style={{color:'#333',fontWeight:'700',textAlign:'center'}}>
              Tüm ilanları silmek istediğinize eminmisiniz?
            </Text>
          </View>
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
                  deleteRequestWithTokenProject()
                  deleteRequestWithToken()
            }}
          >
            <Text style={{ color: "white" }}>Evet</Text>
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
              setmodalForDeleteFavorites(false);
            }}
          >
            <Text style={{ color: "white" }}>Hayır</Text>
          </TouchableOpacity>
        </View>
    </View>
  </Modal> */}
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    padding: 10,
    height: "100%",
    paddingTop: 10,
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
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,

    borderRadius: 50,

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  btnRemove: {
    backgroundColor: "#EA2A28",
    padding: 7,
    borderRadius: 5,
  },
});

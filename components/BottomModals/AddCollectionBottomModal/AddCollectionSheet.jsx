import { View, Text } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { getValueFor } from "../../methods/user";
import { styles } from "./AddCollectionSheet.styles";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import axios from "axios";
import AddCollection from "../../AddCollection";
import { ScrollView } from "react-native";
import HasClubControl from "./HasClubControl";
import { apiUrl } from "../../methods/apiRequest";
import { TouchableOpacity } from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
export default function AddCollectionSheet({
  setIsVisible,
  isVisible,
  roomOrder,
  ProjectId,
  HousingId,
  type,
}) {
  const actionSheetRef = useRef(null);
  const [user, setuser] = useState({});
  const [collections, setcollections] = useState([]);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const GetUserInfo = async () => {
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(`${apiUrl}users/` + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
    }
  };
  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);
  const fetchData = async () => {
    try {
      if (user.access_token) {
        const response = await axios.get(apiUrl + "client/collections", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        setcollections(response?.data.collections);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);
  useEffect(() => {
    if (isVisible == true) {
      fetchData();
    }
  }, [isVisible]);

  const nav = useNavigation();
  const ıtemOnCollection = (collectionId) => {
    let check = false;
    collections.map((collection) => {
      for (var i = 0; i < collection.links.length; i++) {
        if (ProjectId) {
          if (
            (collection.links[i].item_type =
              1 &&
              collection.links[i].item_id == ProjectId &&
              collection.links[i].room_order == roomOrder &&
              collection.links[i].collection_id == collectionId)
          ) {
            check = true;
          }
        } else {
          if (
            (collection.links[i].item_type =
              2 &&
              collection.links[i].item_id == HousingId &&
              collection.links[i].collection_id == collectionId)
          ) {
            check = true;
          }
        }
      }
    });

    return check;
  };
  const renderCollections = (hasClub) => {
    if (hasClub) {
      if (hasClub == 0) {
        return (
          <HasClubControl
            alert={"Emlak Kulüp Üyeliğiniz Bulunmamaktadır!"}
            type={user?.type}
            corporateType={user?.corporate_type}
            btnText={"Başvur"}
          />
        );
      }
      if (hasClub == 3) {
        return (
          <HasClubControl
            alert={"Emlak Kulüp Üyelik Başvurunuz Reddedildi"}
            type={user?.type}
            corporateType={user?.corporate_type}
            btnText={"Tekrar Başvur"}
          />
        );
      }
      if (hasClub == 2) {
        return (
          <HasClubControl
            alert={"Emlak Kulüp Üyeliğiniz Başvuru Sürecinde"}
            type={user?.type}
            corporateType={user?.corporate_type}
            btnText={null}
          />
        );
      }
      if (hasClub == 1) {
        return (
          <>
            <TouchableOpacity
              style={styles.CreateNewCollectionBtn}
              onPress={() => {
                actionSheetRef.current?.setModalVisible(false);
                setTimeout(() => {
                  nav.navigate("CreateCollections", {
                    HouseID: HousingId ? HousingId : roomOrder,
                    ProjectId: HousingId ? null : ProjectId,
                  });
                }, 200);
              }}
            >
              <View style={styles.IconContainer}>
                <Icon2 name="pluscircleo" size={27} color={"#19181C"} />
              </View>
              <View style={styles.btnTextContainer}>
                <Text style={styles.btnText}>Yeni Oluştur</Text>
              </View>
            </TouchableOpacity>
            {collections.map((item, index) => (
              <AddCollection
                checkFunc={ıtemOnCollection}
                setPopUpForRemoveItem={setsetPopUpForRemoveItem}
                key={index}
                item={item}
                getCollectionId={getCollectionId}
                removeItemOnCollection={removeItemOnCollection}
                addLink={addSelectedCollection}
              />
            ))}
          </>
        );
      }
    }
  };

  const addSelectedCollection = (id, name) => {
    const collectionData = {
      collection_name: name,
      clear_cart: "no",
      id: HousingId ? HousingId : roomOrder,
      item_id: HousingId ? HousingId : ProjectId,
      selectedCollectionId: id,
      type: HousingId ? 2 : 1,
    };

    axios
      .post(apiUrl + "addLink", collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          actionSheetRef.current?.setModalVisible(false);
        }, 700);

        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,

            title:
              user.type == 2 && user.corporate_type == "Emlak Ofisi"
                ? "Portföye ekleme başarılı"
                : "Koleksiyona ekleme başarılı",
            textBody:
              user.type == 2 && user.corporate_type == "Emlak Ofisi"
                ? `${roomOrder} No'lu Konut ${name} Adlı Portöyünüze Eklendi`
                : `${roomOrder} No'lu Konut ${name} Adlı Koleksiyonuza Eklendi`,
            button: "Tamam",
          });
        }, 100);

        // Başarılı yanıtı işleyin
        // setselectedCollectionName(response.data.collection.name)
        var newCollections = collections.map((collection) => {
          if (collection.id == id) {
            return {
              ...collection,
              links: [
                ...collection.links,
                {
                  collection_id: id,
                  room_order: HousingId ? HousingId : roomOrder,
                  item_id: HousingId ? HousingId : ProjectId,
                  user_id: user?.id,
                  item_type: 1,
                },
              ],
            };
          } else {
            return collection;
          }
        });
        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };
  const removeItemOnCollection = (collectionId) => {
    const collectionData = {
      item_type: HousingId ? 2 : 1,
      room_order: HousingId ? null : roomOrder,
      item_id: HousingId ? HousingId : ProjectId,
      collection_id: collectionId,
    };

    axios
      .post(`${apiUrl}remove_item_on_collection`, collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        var newCollections = collections.map((collection) => {
          if (collection.id == collectionId) {
            var newLinks = collection.links.filter((link) => {
              if (
                link.collection_id == collectionId && link.item_id == HousingId
                  ? HousingId
                  : ProjectId && link.room_order == HousingId
                  ? null
                  : roomOrder
              ) {
              } else {
                return link;
              }
            });

            return {
              ...collection,
              links: newLinks,
            };
          } else {
            return collection;
          }
        });

        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const getCollectionId = (id, name) => {
    // setselectedCollectionId(id);
    // setselectedCollectionName2(name);
  };
  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={() => setIsVisible(false)}
      closable={true}
      animated={true}
      defaultOverlayOpacity={0.3}
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.container}
    >
      <View>
        <View style={styles.header}>
          <Text style={styles.addCollectionText}>
            {user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? "Portföye Ekle"
              : "Koleksiyona Ekle"}
          </Text>
          <Text style={styles.caption}>
            {user.type == 2 && user.corporate_type == "Emlak Ofisi"
              ? "Konutu portföylerinden birine ekleyebilir veya yeni bir portföy oluşturabilirsin"
              : "Konutu koleksiyonlarından birine ekleyebilir veya yeni bir koleksiyon oluşturabilirsin"}
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 5 }}>
          {renderCollections(namFromGetUser.has_club)}
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import RealtorAdvertPost from "./profileComponents/RealtorAdvertPost";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import { ActivityIndicator } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import { Stack } from "@react-native-material/core";
import { apiUrl } from "../../../components/methods/apiRequest";
export default function RejectRealtorAdverts() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [housings, sethousings] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [totalAdverts, setTotalAdverts] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [EditModalVisible, setEditModalVisible] = useState(false);
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const openSheet = (id) => {
    setSelectedProject(id);
    setEditModalVisible(!EditModalVisible);
  };
  const [loading, setloading] = useState(false);
  const [housingRecords, sethousingRecords] = useState([]);
  const [sort, setsort] = useState(null);

  const fetchDisabledHousings = async (sort, take, skip) => {
    try {
      const res = await axios({
        method: "get",
        url: `${apiUrl}get_my_housings`,
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "application/json",
        },
        params: {
          orderByHousings: sort,
          take: take,
          skip: skip,
          data: {
            status: 3,
          },
        },
      });

      setTotalAdverts(res?.data?.total_count);
      if (skip === 0) {
        sethousings(res?.data?.disabledHousingTypes);
        console.log("test2--");
      } else {
        sethousings((prevHousing) => [
          ...prevHousing,
          ...res?.data?.disabledHousingTypes,
        ]);
      }
    } catch (e) {
      console.log(e + " hata");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchDisabledHousings(sort, take, skip);
    console.log(user?.acces_token + "aswww");

  }, [user, sort, skip]);

  const [selectedIndex, setIndex] = React.useState(null);
  const [SortLıstModal, setSortLıstModal] = useState(false);
  const handleRadio = (index, sort) => {
    setIndex(index);
    setTimeout(() => {
      setSortLıstModal(false);
      fetchDisabledHousings(sort, take, 0);
    }, 600);
  };
  const [searchValue, setsearchValue] = useState("");

  const handleSearch = (value) => {
    setsearchValue(value);
    const filteredData = value
      ? housings.filter((item) =>
          item?.housing_title.toLowerCase().includes(value.toLowerCase())
        )
      : housings;
    sethousings(filteredData);
  };

  const handleEndReached = () => {
    setSkip((prevSkip) => prevSkip + take);
  };
  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : (
        <View>
          <View
            style={{
              paddingTop: 6,
              paddingLeft: 12,
              paddingBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333",
                fontWeight: "600",
              }}
            >
              Reddedilen İlanlar ({totalAdverts})
            </Text>
          </View>
          <View
            style={{
              padding: 2,
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: "row",
              gap: 4,
            }}
          >
            <TextInput
              style={styles.Input}
              placeholder="Kelime veya İlan No ile ara"
              value={searchValue}
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#ebebeb",
                width: "10%",
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setSortLıstModal(true)}
            >
              <MaterialIcon name="swap-vertical" size={23} color={"#333"} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: 10, gap: 10, alignItems: "center" }}>
            {loading ? (
              <Text>Yükleniyor...</Text>
            ) : housings.length === 0 ? (
              <Text>Reddedilen İlanınız Bulunmamaktadır</Text>
            ) : (
              <FlatList
                data={housings} // Yüklenen ilanları burada render ediyoruz
                renderItem={({ item, index }) => (
                  <RealtorAdvertPost
                    key={index}
                    housing={item}
                    Onpress={openSheet}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleEndReached} // Sayfa sonuna gelindiğinde yeni verileri yükle
                onEndReachedThreshold={0.5} // Sayfa sonunda ne kadar yaklaşınca tetiklensin
              />
            )}
          </View>

          <Modal
            isVisible={SortLıstModal}
            onBackdropPress={() => setSortLıstModal(false)}
            backdropColor="transparent"
            style={[
              styles.modal,
              {
                padding: 20,
                justifyContent: "center",
                backgroundColor: "#3339",
              },
            ]}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            swipeDirection={["down"]}
            onSwipeComplete={() => setEditModalVisible(false)}
          >
            <View
              style={[
                styles.modalContent,
                {
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  padding: 0,
                  borderRadius: 6,
                  backgroundColor: "#ffffff",
                },
              ]}
            >
              <View style={{ paddingTop: 15, alignItems: "center" }}>
                <Text
                  style={{ color: "#333", fontSize: 17, fontWeight: "600" }}
                >
                  Sıralama
                </Text>
              </View>
              <View>
                <Stack row align="center" spacing={4}>
                  <CheckBox
                    checked={selectedIndex === 0}
                    onPress={() => {
                      handleRadio(0, "asc-price");
                    }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={
                      <Text style={{ color: "#333", fontWeight: "600" }}>
                        Fiyata göre (Önce en düşük)
                      </Text>
                    }
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      margin: 0,
                    }}
                    checkedColor="#333"
                  />
                  <CheckBox
                    checked={selectedIndex === 1}
                    onPress={() => {
                      handleRadio(1, "desc-price");
                    }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={
                      <Text style={{ color: "#333", fontWeight: "600" }}>
                        Fiyata göre (Önce en yüksek)
                      </Text>
                    }
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      margin: 0,
                    }}
                    checkedColor="#333"
                  />
                  <CheckBox
                    checked={selectedIndex === 2}
                    onPress={() => handleRadio(2, "asc-date")}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={
                      <Text style={{ color: "#333", fontWeight: "600" }}>
                        Tarihe göre (Önce en eski ilan)
                      </Text>
                    }
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      margin: 0,
                    }}
                    checkedColor="#333"
                  />
                  <CheckBox
                    checked={selectedIndex === 3}
                    onPress={() => handleRadio(3, "desc-date")}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={
                      <Text style={{ color: "#333", fontWeight: "600" }}>
                        Tarihe göre (Önce en yeni ilan)
                      </Text>
                    }
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      margin: 0,
                    }}
                    checkedColor="#333"
                  />
                </Stack>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={EditModalVisible}
            onBackdropPress={openSheet}
            backdropColor="transparent"
            style={styles.modal}
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDown"}
            swipeDirection={["down"]}
            onSwipeComplete={() => setEditModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <View style={{ paddingTop: 10, alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "15%",
                    backgroundColor: "#c2c4c6",
                    padding: 4,
                    borderRadius: 50,
                  }}
                ></TouchableOpacity>
              </View>
              <View style={{ padding: 20, gap: 35 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("EditPending");
                    setEditModalVisible(false);
                  }}
                >
                  <Icon3 name="mode-edit-outline" size={23} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Düzenle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("EditPending");
                    setEditModalVisible(false);
                  }}
                >
                  <Icon3 name="photo-library" size={21} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Resimler
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Icon4 name="handshake" size={21} color={"#333"} />
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    Pazarlık Teklifleri (0)
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    color: "#141824",
    fontWeight: "600",
  },
  Adverts: {
    width: "100%",

    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#0c03033d",
  },
  modalContent: {
    gap: 5,
    paddingBottom: 25,
    backgroundColor: "#f8f8ff",
    padding: 10,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Input: {
    backgroundColor: "#ebebeb",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
});

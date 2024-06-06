import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Search from "./Search";
import Categories from "../../components/Categories";
import ProjectPost from "../../components/ProjectPost";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { Platform } from "react-native";
import { ActivityIndicator, Switch, TextInput } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function AllProjects() {
  const apiUrl = "https://mobil.emlaksepette.com/";

  const route = useRoute();
  const {
    name,
    data,
    slug,
    type,
    optional,
    title,
    titleHeader,
    check,
    city,
    county,
    hood,
  } = route.params;
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [isHidden, setIsHidden] = useState(false);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    // Sayfanın 200px aşağısına inildiğinde gizlenmesi gerekiyor
    if (scrollPosition > 25) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [pageInfo, setPageInfo] = useState(null);
  const [neighborhoodTitle, setNeighborhoodTitle] = useState("");
  const [neighborhoodSlug, setNeighborhoodSlug] = useState("");
  const [countySlug, setCountySlug] = useState("");
  const [countyTitle, setCountyTitle] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [cityTitle, setCityTitle] = useState("");
  const [cityID, setCityID] = useState(null);
  const [neighborhoodID, setNeighborhoodID] = useState(null);
  const [countyID, setCountyID] = useState(null);
  const [filters, setFilters] = useState([]);
  const [slugItem, setSlugItem] = useState(null);
  const [items, setItems] = useState([]);
  const [nslug, setNslug] = useState("");
  const [checkTitle, setCheckTitle] = useState("");
  const [menu, setMenu] = useState([]);
  const [opt, setOpt] = useState("");
  const [housingTypeSlug, setHousingTypeSlug] = useState("");
  const [housingTypeParentSlug, setHousingTypeParentSlug] = useState("");
  const [optName, setOptName] = useState("");
  const [housingTypeName, setHousingTypeName] = useState("");
  const [housingTypeSlugName, setHousingTypeSlugName] = useState("");
  const [slugName, setSlugName] = useState("");
  const [housingTypeParent, setHousingTypeParent] = useState("");
  const [housingType, setHousingType] = useState("");
  const [projects, setProjects] = useState([]);
  const [secondhandHousings, setSecondhandHousings] = useState([]);
  const [housingStatuses, setHousingStatuses] = useState([]);
  const [cities, setCities] = useState([]);
  const [titleParam, setTitleParam] = useState("");
  const [optionalParam, setOptionalParam] = useState(null);
  const [typeParam, setTypeParam] = useState("");
  const [term, setTerm] = useState("");
  const apiUrlFilter = `https://mobil.emlaksepette.com/api/kategori/${slug}/${title}/${optional}/${type}/${check}/${city}/${county}/${hood}`;

  const fetchFilteredProjects = async () => {
    try {
      const response = await axios.get(apiUrlFilter);
      const data = response.data;
      setPageInfo(data.pageInfo);
      setNeighborhoodTitle(data.neighborhoodTitle);
      setNeighborhoodSlug(data.neighborhoodSlug);
      setCountySlug(data.countySlug);
      setCountyTitle(data.countyTitle);
      setCitySlug(data.citySlug);
      setCityTitle(data.cityTitle);
      setCityID(data.cityID);
      setNeighborhoodID(data.neighborhoodID);
      setCountyID(data.countyID);
      setFilters(data.filters);
      setSlugItem(data.slugItem);
      setItems(data.items);
      setNslug(data.nslug);
      setCheckTitle(data.checkTitle);
      setMenu(data.menu);
      setOpt(data.opt);
      setHousingTypeSlug(data.housingTypeSlug);
      setHousingTypeParentSlug(data.housingTypeParentSlug);
      setOptionalParam(data.optional);
      setOptName(data.optName);
      setHousingTypeName(data.housingTypeName);
      setHousingTypeSlugName(data.housingTypeSlugName);
      setSlugName(data.slugName);
      setHousingTypeParent(data.housingTypeParent);
      setHousingType(data.housingType);
      setProjects(data.projects);
      setSecondhandHousings(data.secondhandHousings);
      setHousingStatuses(data.housingStatuses);
      setCities(data.cities);
      setTitleParam(data.title);
      setTypeParam(data.type);
      setTerm(data.term);
    } catch (error) {
      console.error(error);
    }
  };

  const [IsLoading, setIsLoading] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/featured-projects"
      );
      setFeaturedProjects(response.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
    fetchFilteredProjects();
  }, []);

  const [openFilterIndex, setOpenFilterIndex] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [selectedRadio, setSelectedRadio] = useState({});
  const [textInputs, setTextInputs] = useState({});

  const toggleFilter = (index) => {
    setOpenFilterIndex(openFilterIndex === index ? null : index);
  };

  const handleCheckboxChange = (filterName, value) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [filterName]: {
        ...prevState[filterName],
        [value]: !prevState[filterName]?.[value],
      },
    }));
  };
  const handleRadioChange = (filterName, value) => {
    setSelectedRadio((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };

  const handleTextInputChange = (filterName, type, value) => {
    setTextInputs((prevState) => ({
      ...prevState,
      [filterName]: {
        ...prevState[filterName],
        [type]: value,
      },
    }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Header onPress={toggleDrawer} /> */}

      <Modal
        swipeDirection="left"
        onSwipeComplete={() => setModalVisible(false)}
        onSwipeThreshold={(gestureState) => {
          return {
            horizontal: gestureState.ly > Dimensions.get("window").width / 10,
          };
        }}
        isVisible={isDrawerOpen}
        onBackdropPress={() => setIsDrawerOpen(false)}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: "#EA2C2E",
              flex: 0.7 / 2,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <SafeAreaView style={{ zIndex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomePage");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Ana Sayfa"
                    bordernone="none"
                    ıconName="home"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Hesabım");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Hesabım"
                    bordernone="none"
                    ıconName="user"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RealtorClubExplore");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Emlak Kulüp"
                    bordernone="none"
                    showImage={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="İlan Ver"
                    bordernone="none"
                    ıconName="plus"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="Sat Kirala"
                    bordernone="none"
                    ıconName="search-plus"
                  />
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
            <ImageBackground
              source={require("./MenuBg.jpg")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: 0.2,
              }}
              resizeMode="cover"
              borderBottomLeftRadius={30}
              borderBottomRightRadius={30}
            />
          </View>
          <View style={{ backgroundColor: "white", flex: 1.3 / 2 }}>
            <Search onpres={toggleDrawer} />
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>
            Filtrele
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.btn,
            borderLeftColor: "#bebebe",
            borderLeftWidth: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>
            Sırala
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {IsLoading == false && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flex: 1,
            }}
          >
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
        <View>
          <FlatList
            data={featuredProjects}
            renderItem={({ item }) => (
              <ProjectPost
                project={item}
                key={item.id}
                caption={item.project_title}
                ımage={`${apiUrl}/${item.image.replace("public/", "storage/")}`}
                user={item.user}
                location={item.city.title}
                city={item.county.ilce_title}
                ProjectNo={item.id}
                slug={item.slug}
                acıklama={item.description
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .replace(/&nbsp;/g, " ")}
                ShoppingName={item.user.name}
                ShoppingMail={item.user.email}
                Phone={item.user.phone}
                ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
                ShopingInfo={item.user.corporate_type}
              />
            )}
          />
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <View style={styles.modalContent2}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.filterContainerStyle}>
              <View
                style={{
                  ...styles.filterContainer,
                  backgroundColor: "#eaeff5",
                }}
              >
                <TouchableOpacity >
                  <View style={styles.filterLabel}>
                    <Text style={{ fontWeight: "bold" }}>Kategori</Text>
                    <View style={styles.brandsSquare}>
                      {slugName.length > 0 && (
                        <Text style={[styles.brandName, { color: "black" }]}>
                          {slugName}
                        </Text>
                      )}
                      {housingTypeSlugName.length > 0 && (
                        <>
                          {slugName != null && (
                            <Text style={styles.brandName}>
                              <FontAwesome5Icon
                                name="angle-right"
                                style={{ color: "black" }}
                              />
                            </Text>
                          )}
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {housingTypeSlugName}
                          </Text>
                        </>
                      )}
                      {optName.length > 0 && (
                        <>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {optName}
                          </Text>
                        </>
                      )}
                      {housingTypeName.length > 0 && (
                        <>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {housingTypeName}
                          </Text>
                        </>
                      )}
                      {cityTitle != null && (
                        <View style={styles.hiddenCityName}>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {cityTitle}
                          </Text>
                        </View>
                      )}
                      {countyTitle != null && (
                        <View style={styles.hiddenCountyName}>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {countyTitle}
                          </Text>
                        </View>
                      )}
                      {neighborhoodTitle != null && (
                        <View style={styles.hiddenNeighborhoodName}>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {neighborhoodTitle}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => toggleFilter("kimden")}>
                  <Text style={styles.filterLabel}>Kimden</Text>
                </TouchableOpacity>
                {openFilterIndex === "kimden" && (
                  <View style={styles.optionsContainer}>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange("corporate_type", "Banka")
                        }
                      >
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              selectedRadio["corporate_type"] === "Banka" &&
                                styles.radioSelected,
                            ]}
                          />
                        </View>
                        <Text style={styles.radioLabel}>Bankadan</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange("corporate_type", "İnşaat Ofisi")
                        }
                      >
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              selectedRadio["corporate_type"] ===
                                "İnşaat Ofisi" && styles.radioSelected,
                            ]}
                          />
                        </View>
                        <Text style={styles.radioLabel}>İnşaat Ofisinden</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange(
                            "corporate_type",
                            "Turizm Amaçlı Kiralama"
                          )
                        }
                      >
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              selectedRadio["corporate_type"] ===
                                "Turizm Amaçlı Kiralama" &&
                                styles.radioSelected,
                            ]}
                          />
                        </View>
                        <Text style={styles.radioLabel}>
                          Turizm İşletmesinden
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange("corporate_type", "Emlak Ofisi")
                        }
                      >
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              selectedRadio["corporate_type"] ===
                                "Emlak Ofisi" && styles.radioSelected,
                            ]}
                          />
                        </View>
                        <Text style={styles.radioLabel}>Emlak Ofisinden</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              {filters.map((filter, index) => (
                <View key={index} style={styles.filterContainer}>
                  <TouchableOpacity onPress={() => toggleFilter(index)}>
                    <Text style={styles.filterLabel}>
                      {filter.label === "Peşin Fiyat" ? "Fiyat" : filter.label}
                    </Text>
                  </TouchableOpacity>
                  {openFilterIndex === index && (
                    <View style={styles.optionsContainer}>
                      {filter.values &&
                        filter.values.map((value, idx) => (
                          <View key={idx} style={styles.option}>
                            {filter.toggle ? (
                              // Switch-slider öğesi
                              <View style={styles.switchContainer}>
                                <Switch
                                  value={
                                    !!selectedCheckboxes[filter.name]?.[
                                      value.value
                                    ]
                                  }
                                  onValueChange={() =>
                                    handleCheckboxChange(
                                      filter.name,
                                      value.value
                                    )
                                  }
                                  trackColor={{
                                    false: "transparent",
                                    true: "transparent",
                                  }}
                                  thumbColor={
                                    selectedCheckboxes[filter.name]?.[
                                      value.value
                                    ]
                                      ? "green"
                                      : "white"
                                  }
                                />
                                <Text style={styles.switchLabel}>
                                  {value.label}
                                </Text>
                              </View>
                            ) : (
                              <>
                                {filter.type === "select" && idx !== 0 && (
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCheckboxChange(
                                        filter.name,
                                        value.value
                                      )
                                    }
                                    style={styles.checkboxContainer}
                                  >
                                    <View style={styles.checkbox}>
                                      {selectedCheckboxes[filter.name]?.[
                                        value.value
                                      ] && (
                                        <View style={styles.checkboxInner} />
                                      )}
                                    </View>
                                    <View>
                                      <Text style={styles.checkboxLabel}>
                                        {value.label}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                                {filter.type === "checkbox-group" && (
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCheckboxChange(
                                        filter.name,
                                        value.value
                                      )
                                    }
                                    style={styles.checkboxContainer}
                                  >
                                    <View style={styles.checkbox}>
                                      {selectedCheckboxes[filter.name]?.[
                                        value.value
                                      ] && (
                                        <View style={styles.checkboxInner} />
                                      )}
                                    </View>
                                    <View>
                                      <Text style={styles.checkboxLabel}>
                                        {value.label}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </>
                            )}
                          </View>
                        ))}
                      {filter.type === "text" && (
                        <View style={styles.textInputContainer}>
                          <TextInput
                            placeholder={`Min`}
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                              handleTextInputChange(filter.name, "min", value)
                            }
                            value={textInputs[filter.name]?.min || ""}
                          />
                          <TextInput
                            placeholder={`Max`}
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                              handleTextInputChange(filter.name, "max", value)
                            }
                            value={textInputs[filter.name]?.max || ""}
                          />
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 0,
    ...Platform.select({
      ios: {},
      android: {
        top: 15,
      },
    }),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },

  modal: {
    margin: 0,
  },

  headerText: {
    color: "#333",
    fontSize: 20,
  },
  btn: {
    width: "50%",
    backgroundColor: "#264ABB",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  switchInner: {
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
  },
  switchChecked: {
    backgroundColor: "green", // Switch'i yeşil yapar
  },

  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "80%",
   marginTop:10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  btnFilter: {
    width: "80%",
    backgroundColor: "#264ABB",
    padding: 9,
    alignItems: "center",
    borderRadius: 5,
  },
  filterContainerStyle: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 5,
  },
  filterContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#eaeff5",
  },
  filterLabel: {
    fontWeight: "bold",
    padding: 10,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 5,
    borderTopWidth: 1,
    borderColor: "#eaeff5",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "green",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: "green",
  },
  checkboxLabel: {
    flex: 1,
    width: "100%",
  },
  textInputContainer: {
    flexDirection: "row", // Yatay düzende sıralama sağlar
    justifyContent: "space-between", // İki input arasında boşluk oluşturur
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    backgroundColor: "white",
    marginRight: 8,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 5,
    borderTopWidth: 1,
    borderColor: "#eaeff5",
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginLeft: 10
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  radioSelected: {
    backgroundColor: "green",
  },
  radioLabel: {
    marginLeft: 8,
  },
  brandsSquare: {
    position: "relative",
    flexDirection: "row",
    fontWeight: "bold",
    marginTop: 5,
    alignItems: "center",
  },
  brandName: {
    color: "black",
    marginRight: 3,
  },
});

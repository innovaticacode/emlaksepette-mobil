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
import { RxDropdownMenu } from "react-icons/rx";
import RNPickerSelect from "react-native-picker-select";

export default function AllProjects() {
  const [cityItems, setCityItems] = useState();
  const [state, setState] = useState({
    loading: true,
    isDrawerOpen: false,
    isHidden: false,
    selectedCity: "",
    selectedProjectStatus: "",
    selectedCounty: "",
    selectedNeighborhood: "",
    modalVisible: false,
    neighborhoodTitle: "",
    neighborhoodSlug: "",
    neighborhoods: [],
    countySlug: "",
    countyTitle: "",
    citySlug: "",
    cityTitle: "",
    cityID: null,
    neighborhoodID: null,
    searchStatus: "Yükleniyor...",
    countyID: null,
    filters: [],
    slugItem: null,
    nslug: "",
    checkTitle: "",
    menu: [],
    opt: "",
    housingTypeSlug: "",
    housingTypeParentSlug: "",
    optName: "",
    housingTypeName: "",
    housingTypeSlugName: "",
    slugName: "",
    housingTypeParent: "",
    housingType: "",
    projects: [],
    secondhandHousings: [],
    housingStatuses: [],
    cities: [],
    titleParam: "",
    counties: [],
    optionalParam: null,
    typeParam: "",
    term: "",
    openFilterIndex: null,
    selectedCheckboxes: {},
    selectedRadio: {},
    textInputs: {},
    selectedListingDate: null,
    projectStatuses: [
      { value: 2, label: "Tamamlanan Projeler" },
      { value: 3, label: "Devam Eden Projeler" },
      { value: 5, label: "Topraktan Projeler" },
    ],
    listingDates: [
      { value: 24, label: "Son 24 Saat" },
      { value: 3, label: "Son 3 Gün" },
      { value: 7, label: "Son 7 Gün" },
      { value: 15, label: "Son 15 Gün" },
      { value: 30, label: "Son 30 Gün" },
      { value: 45, label: "Son 45 Gün" },
      { value: 60, label: "Son 60 Gün" },
      { value: 75, label: "Son 75 Gün" },
      { value: 90, label: "Son 90 Gün" },
    ],
  });

  const apiUrl = "https://mobil.emlaksepette.com/";
  const route = useRoute();
  const navigation = useNavigation();
  const { params } = route;


  useEffect(() => {
    if (params.href) {
      const baseUrl = "https://emlaksepette.com";
      const relativeUrl = params.href.replace(`${baseUrl}/kategori`, ""); // 'kategori' kısmını çıkar
      const urlSegments = relativeUrl.split("/").filter((segment) => segment);

      const slug = urlSegments[0] || ""; 
      const title = urlSegments[1] || ""; 
      const optional = urlSegments[2] || ""; 
      const type = urlSegments[3] || "";
      const check = urlSegments[4] || "";
      const city = urlSegments[5] || "";
      const county = urlSegments[6] || "";
      const hood = urlSegments[7] || "";
  
      const apiUrlFilter = buildApiUrl({
        slug,
        title,
        optional,
        type,
        check,
        city,
        county,
        hood,
      });
  
      fetchFilteredProjects(apiUrlFilter, null);
    }else{
      fetchFilteredProjects(buildApiUrl(params), null);

    }
  }, [params]);
  

  useEffect(() => {
    const newCityItems = state.cities.map((city) => ({
      label: city.title,
      value: city.id,
    }));
    setCityItems(newCityItems);
    return () => {};
  }, [state.cities]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const timer = setTimeout(() => {
      setState((prevState) => ({ ...prevState, loading: false }));
    }, 500);

    return () => clearTimeout(timer);
  }, [params.slug, params.data]);

  const buildApiUrl = ({
    slug,
    title,
    optional,
    type,
    check,
    city,
    county,
    hood,
  }) => {
    let url = `${apiUrl}api/kategori/${slug}`;
    if (title) url += `/${title}`;
    if (optional) url += `/${optional}`;
    if (type) url += `/${type}`;
    if (check) url += `/${check}`;
    if (city) url += `/${city}`;
    if (county) url += `/${county}`;
    if (hood) url += `/${hood}`;
    return url;
  };

  const onChangeCity = (value) => {
    setState((prevState) => ({ ...prevState, selectedCity: value }));
    if (value) {
      fetchDataCounty(value)
        .then((county) =>
          setState((prevState) => ({ ...prevState, counties: county.data }))
        )
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setState((prevState) => ({ ...prevState, counties: [] }));
    }
  };

  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}api/counties/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const fetchDataNeighborhood = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}api/neighborhoods/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setState((prevState) => ({ ...prevState, selectedCounty: value }));
    if (value) {
      fetchDataNeighborhood(value)
        .then((neighborhood) =>
          setState((prevState) => ({
            ...prevState,
            neighborhoods: neighborhood.data,
          }))
        )
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setState((prevState) => ({ ...prevState, neighborhoods: [] }));
    }
  };

  const onChangeNeighborhood = (value) => {
    setState((prevState) => ({ ...prevState, selectedNeighborhood: value }));
  };

  const onChangeProjectStatus = (value) => {
    setState((prevState) => ({ ...prevState, selectedProjectStatus: value }));
  };

  const handleFilterSubmit = () => {
    const filterData = {
      selectedCheckboxes: state.selectedCheckboxes,
      selectedRadio: state.selectedRadio,
      textInputs: state.textInputs,
      selectedCity: state.selectedCity,
      selectedCounty: state.selectedCounty,
      selectedNeighborhood: state.selectedNeighborhood,
      selectedProjectStatus: state.selectedProjectStatus,
      selectedListingDate: state.selectedListingDate,
    };
    setState((prevState) => ({
      ...prevState,
      modalVisible: false,
      searchStatus: "Filtreleniyor...",
      openFilterIndex: null,
    }));
    fetchFilteredProjects(buildApiUrl(params), filterData);
  };

  const fetchFilteredProjects = async (apiUrlFilter, filterData) => {
    try {
      const response = await axios.get(apiUrlFilter, { params: filterData });
      const data = response.data;

      const newState = {
        neighborhoodTitle: data.neighborhoodTitle,
        neighborhoodSlug: data.neighborhoodSlug,
        countySlug: data.countySlug,
        countyTitle: data.countyTitle,
        citySlug: data.citySlug,
        cityTitle: data.cityTitle,
        cityID: data.cityID,
        neighborhoodID: data.neighborhoodID,
        countyID: data.countyID,
        filters: data.filters,
        slugItem: data.slugItem,
        loading: false,
        nslug: data.nslug,
        checkTitle: data.checkTitle,
        menu: data.menu,
        opt: data.opt,
        housingTypeSlug: data.housingTypeSlug,
        housingTypeParentSlug: data.housingTypeParentSlug,
        optionalParam: data.optional,
        optName: data.optName,
        housingTypeName: data.housingTypeName,
        housingTypeSlugName: data.housingTypeSlugName,
        slugName: data.slugName,
        housingTypeParent: data.housingTypeParent,
        housingType: data.housingType,
        secondhandHousings: data.secondhandHousings,
        housingStatuses: data.housingStatuses,
        cities: data.cities,
        titleParam: data.title,
        typeParam: data.type,
        term: data.term,
        searchStatus: "Yükleniyor...",
        projects: data.projects,
      };

      if (data.projects.length === 0) {
        newState.searchStatus = "Sonuç bulunamadı";
      }

      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (filterName, value) => {
    setState((prevState) => ({
      ...prevState,
      selectedCheckboxes: {
        ...prevState.selectedCheckboxes,
        [filterName]: {
          ...prevState.selectedCheckboxes[filterName],
          [value]: !prevState.selectedCheckboxes[filterName]?.[value],
        },
      },
    }));
  };

  const handleClearFilters = async () => {
    setState((prevState) => ({
      ...prevState,
      selectedCheckboxes: {},
      projects: [],
      selectedCity: "",
      selectedCounty: "",
      selectedNeighborhood: "",
      selectedProjectStatus: "",
      selectedRadio: {},
      textInputs: {},
      searchStatus: "Filtre Temizleniyor...",
      modalVisible: false,
    }));

    await fetchFilteredProjects(buildApiUrl(params), null);

    setState((prevState) => ({
      ...prevState,
      modalVisible: false,
      loading: false,
      openFilterIndex: null,
    }));
  };

  const handleRadioChange = (filterName, value) => {
    setState((prevState) => ({
      ...prevState,
      selectedRadio: {
        ...prevState.selectedRadio,
        [filterName]: value,
      },
    }));
  };

  const handleTextInputChange = (filterName, type, value) => {
    setState((prevState) => ({
      ...prevState,
      textInputs: {
        ...prevState.textInputs,
        [filterName]: {
          ...prevState.textInputs[filterName],
          [type]: value,
        },
      },
    }));
  };

  const toggleFilter = (index) => {
    setState((prevState) => ({
      ...prevState,
      openFilterIndex: prevState.openFilterIndex === index ? null : index,
    }));
  };

  const toggleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header onPress={toggleDrawer} />

      <Modal
        swipeDirection="left"
        onSwipeComplete={() =>
          setState((prevState) => ({ ...prevState, isDrawerOpen: false }))
        }
        onSwipeThreshold={(gestureState) => ({
          horizontal: gestureState.ly > Dimensions.get("window").width / 10,
        })}
        isVisible={state.isDrawerOpen}
        onBackdropPress={() =>
          setState((prevState) => ({ ...prevState, isDrawerOpen: false }))
        }
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
                    setState((prevState) => ({
                      ...prevState,
                      isDrawerOpen: false,
                    }));
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
                    setState((prevState) => ({
                      ...prevState,
                      isDrawerOpen: false,
                    }));
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
                    setState((prevState) => ({
                      ...prevState,
                      isDrawerOpen: false,
                    }));
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

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            setState((prevState) => ({ ...prevState, modalVisible: true }))
          }
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Filtrele
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.btn,
            borderLeftColor: "white",
            borderLeftWidth: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Sırala
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {state.loading == true ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : (
          <>
            {/* {state.projects.length != 0 && (
              <Text style={styles.resultCount}>
                {state.projects.length} ilan bulundu
              </Text>
            )} */}

            <FlatList
              data={state.projects}
              renderItem={({ item }) => (
                <ProjectPost
                  project={item}
                  key={item.id}
                  caption={item.project_title}
                  ımage={`${apiUrl}/${item.image.replace(
                    "public/",
                    "storage/"
                  )}`}
                  user={item.user}
                  location={item.city?.title}
                  city={item.county?.ilce_title}
                  ProjectNo={item.id}
                  slug={item.slug}
                  acıklama={item.description
                    .replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/&nbsp;/g, " ")}
                  ShoppingName={item.user?.name}
                  ShoppingMail={item.user?.email}
                  Phone={item.user?.phone}
                  ProfilImage={`${apiUrl}/storage/profile_images/${item.user?.profile_image}`}
                  ShopingInfo={item.user?.corporate_type}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <Text
                    style={{ fontSize: 13, color: "gray", fontWeight: 700 }}
                  >
                    <Text>{state.searchStatus}</Text>
                  </Text>
                </View>
              }
            />
          </>
        )}
      </View>

      <Modal
        isVisible={state.modalVisible}
        onBackdropPress={() =>
          setState((prevState) => ({ ...prevState, modalVisible: false }))
        }
        backdropColor="transparent"
        style={styles.modal2}
      >
        <View style={styles.modalContent2}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setState((prevState) => ({ ...prevState, modalVisible: false }))
              }
            >
              <FontAwesome5Icon name="times" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>FİLTRELE</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>TEMİZLE</Text>
            </TouchableOpacity>
          </View>
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
                <TouchableOpacity>
                  <View style={styles.filterLabel}>
                    <Text style={{ fontWeight: "bold" }}>Kategori</Text>
                    <View style={styles.brandsSquare}>
                      {state.slugName.length > 0 && (
                        <Text style={[styles.brandName, { color: "black" }]}>
                          {state.slugName}
                        </Text>
                      )}
                      {state.housingTypeSlugName.length > 0 && (
                        <>
                          {state.slugName != null && (
                            <Text style={styles.brandName}>
                              <FontAwesome5Icon
                                name="angle-right"
                                style={{ color: "black" }}
                              />
                            </Text>
                          )}
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {state.housingTypeSlugName}
                          </Text>
                        </>
                      )}
                      {state.optName.length > 0 && (
                        <>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {state.optName}
                          </Text>
                        </>
                      )}
                      {state.housingTypeName.length > 0 && (
                        <>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {state.housingTypeName}
                          </Text>
                        </>
                      )}
                      {state.cityTitle != null && (
                        <View style={styles.hiddenCityName}>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {state.cityTitle}
                          </Text>
                        </View>
                      )}
                      {state.countyTitle != null && (
                        <View style={styles.hiddenCountyName}>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {state.countyTitle}
                          </Text>
                        </View>
                      )}
                      {state.neighborhoodTitle != null && (
                        <View style={styles.hiddenNeighborhoodName}>
                          <Text style={styles.brandName}>
                            <FontAwesome5Icon
                              name="angle-right"
                              style={{ color: "black" }}
                            />
                          </Text>
                          <Text style={[styles.brandName, { color: "black" }]}>
                            {state.neighborhoodTitle}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => toggleFilter("location")}>
                  <Text style={styles.filterLabel}>Konum</Text>
                </TouchableOpacity>
                {state.openFilterIndex === "location" && (
                  <View style={styles.optionsContainer}>
                    <RNPickerSelect
                      doneText="Tamam"
                      placeholder={{
                        label: "Şehir Seçiniz",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      value={state.selectedCity}
                      onValueChange={(value) => {
                        onChangeCity(value);
                      }}
                      items={cityItems}
                    />

                    <RNPickerSelect
                      doneText="Tamam"
                      placeholder={{
                        label: "İlçe Seçiniz",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      value={state.selectedCounty}
                      onValueChange={(value) => {
                        onChangeCounty(value);
                      }}
                      items={state.counties}
                    />

                    <RNPickerSelect
                      doneText="Tamam"
                      placeholder={{
                        label: "Mahalle Seçiniz",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      value={state.selectedNeighborhood}
                      onValueChange={(value) => {
                        onChangeNeighborhood(value);
                      }}
                      items={state.neighborhoods}
                    />
                  </View>
                )}
              </View>
              {/* <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => toggleFilter("kimden")}>
                  <Text style={styles.filterLabel}>Kimden</Text>
                </TouchableOpacity>
                {state.openFilterIndex === "kimden" && (
                  <View style={styles.optionsContainer}>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange("corporate_type", "Banka")
                        }
                      >
                        <Text style={styles.radioLabel}>Bankadan</Text>
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              state.selectedRadio["corporate_type"] ===
                                "Banka" && styles.radioSelected,
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange(
                            "corporate_type",
                            "construction_office"
                          )
                        }
                      >
                        <Text style={styles.radioLabel}>İnşaat Ofisinden</Text>
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              state.selectedRadio["corporate_type"] ===
                                "construction_office" && styles.radioSelected,
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange(
                            "corporate_type",
                            "tourism_purpose_rental"
                          )
                        }
                      >
                        <Text style={styles.radioLabel}>
                          Turizm İşletmesinden
                        </Text>
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              state.selectedRadio["corporate_type"] ===
                                "tourism_purpose_rental" &&
                                styles.radioSelected,
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          handleRadioChange("corporate_type", "Emlak Ofisi")
                        }
                      >
                        <Text style={styles.radioLabel}>Emlak Ofisinden</Text>
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioInner,
                              state.selectedRadio["corporate_type"] ===
                                "Emlak Ofisi" && styles.radioSelected,
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View> */}
              <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => toggleFilter("listingDate")}>
                  <Text style={styles.filterLabel}>İlan Tarihi</Text>
                </TouchableOpacity>
                {state.openFilterIndex === "listingDate" && (
                  <View style={styles.optionsContainer}>
                    {state.listingDates.map((date) => (
                      <View style={styles.option} key={date.value}>
                        <TouchableOpacity
                          style={styles.radioContainer}
                          onPress={() =>
                            handleRadioChange("listing_date", date.value)
                          }
                        >
                          <Text style={styles.radioLabel}>{date.label}</Text>
                          <View style={styles.radio}>
                            <View
                              style={[
                                styles.radioInner,
                                state.selectedRadio["listing_date"] ===
                                  date.value && styles.radioSelected,
                              ]}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => toggleFilter("projectStatus")}>
                  <Text style={styles.filterLabel}>Proje Durumu</Text>
                </TouchableOpacity>
                {state.openFilterIndex === "projectStatus" && (
                  <View style={styles.optionsContainer}>
                    <RNPickerSelect
                      doneText="Tamam"
                      placeholder={{
                        label: "Proje Durumu Seçiniz",
                        value: null,
                      }}
                      style={pickerSelectStyles}
                      value={state.selectedProjectStatus}
                      onValueChange={(value) => {
                        onChangeProjectStatus(value);
                      }}
                      items={state.projectStatuses}
                    />
                  </View>
                )}
              </View>

              {state.filters.map((filter, index) => (
                <View key={index} style={styles.filterContainer}>
                  <TouchableOpacity onPress={() => toggleFilter(index)}>
                    <Text style={styles.filterLabel}>
                      {filter.label === "Peşin Fiyat" ? "Fiyat" : filter.label}
                    </Text>
                  </TouchableOpacity>
                  {state.openFilterIndex === index && (
                    <View style={styles.optionsContainer}>
                      {filter.values &&
                        filter.values.map((value, idx) => (
                          <View key={idx} style={styles.option}>
                            {filter.toggle ? (
                              // Switch-slider öğesi
                              <View style={styles.switchContainer}>
                                <Switch
                                  value={
                                    !!state.selectedCheckboxes[filter.name]?.[
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
                                    state.selectedCheckboxes[filter.name]?.[
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
                                    <View>
                                      <Text style={styles.checkboxLabel}>
                                        {value.label}
                                      </Text>
                                    </View>
                                    <View style={styles.checkbox}>
                                      {state.selectedCheckboxes[filter.name]?.[
                                        value.value
                                      ] && (
                                        <View style={styles.checkboxInner} />
                                      )}
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
                                    <View>
                                      <Text style={styles.checkboxLabel}>
                                        {value.label}
                                      </Text>
                                    </View>
                                    <View style={styles.checkbox}>
                                      {state.selectedCheckboxes[filter.name]?.[
                                        value.value
                                      ] && (
                                        <View style={styles.checkboxInner} />
                                      )}
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
                            value={state.textInputs[filter.name]?.min || ""}
                          />
                          <TextInput
                            placeholder={`Max`}
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                              handleTextInputChange(filter.name, "max", value)
                            }
                            value={state.textInputs[filter.name]?.max || ""}
                          />
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              onPress={handleFilterSubmit}
              style={styles.filterButton}
            >
              <Text style={styles.filterButtonText}>
                İlanları Listele
                {" ("}
                {state.projects.length != 0 && state.projects.length}
                {")"}
              </Text>
            </TouchableOpacity>
          </View>
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  closeButton: {
    flex: 1,
    alignItems: "flex-start",
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  clearButtonText: {
    fontSize: 12,
    color: "red",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
  },
  footerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  resultCount: {
    fontSize: 15,
    padding: 10,
    textAlign: "center",
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
    backgroundColor: "#EA2B2E",
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
    backgroundColor: "#FFFFFF",
    height: "95%",
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
    padding: 12.7,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    marginLeft: 10,
  },
  switchLabel: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    justifyContent: "space-between",
    borderColor: "#eaeff5",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-around", // İki input arasında boşluk oluşturur
    marginBottom: 10,
  },
  textInput: {
    height: 25,
    width: "45%",
    borderWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    backgroundColor: "white",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    justifyContent: "space-between",
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
    marginLeft: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
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
    fontSize: 12,
  },
  filterButton: {
    backgroundColor: "#274abb",
    padding: 12,
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderTopWidth: 1,
    borderColor: "#eaeff5",
    padding: 10,
    fontSize: 14,
    margin: "0 auto",
    marginBottom: 5,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#eaeff5",
    padding: 10,
    marginHorizontal: 5,
    fontSize: 14,
    margin: "0 auto",
    marginBottom: 5,
  },
});

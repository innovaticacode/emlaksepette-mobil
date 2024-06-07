import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import axios from "axios";

import { useState, useEffect, useRef } from "react";
import Posts from "../../components/Posts";
import SliderBar from "../../components/SliderBar";
import Header from "../../components/Header";
import ProjectPost from "../../components/ProjectPost";
import RealtorPost from "../../components/RealtorPost";
import Splash from "../../components/Splash";
import ProjectPostSkeleton from "../../components/SkeletonComponents/ProjectPostSkeleton";
import { Skeleton } from "@rneui/themed";
import SliderItemSkeleton from "../../components/SkeletonComponents/SliderItemSkeleton";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Search from "./Search";
import { SearchBar } from "react-native-elements";
import SliderMenu from "../../components/SliderMenu";
import * as Animatable from "react-native-animatable";
import Swiper from "react-native-swiper";
import PagerView from "react-native-pager-view";
import Categories from "../../components/Categories";
import userData, { getValueFor } from "../../components/methods/user";

import { ActivityIndicator } from "react-native-paper";

export default function HomePage() {
  const navigation = useNavigation();

  const apiUrl = "https://mobil.emlaksepette.com/";

  const [loadingPrjoects, setloadingPrjoects] = useState(false);
  const [loadingEstates, setloadingEstates] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/featured-projects"
      );
      setFeaturedProjects(response.data);
      setloadingPrjoects(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, [page]);
  const [featuredEstates, setFeaturedEstates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeaturedEstates = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mobil.emlaksepette.com/api/real-estates?page=${
          reset ? 1 : page
        }&limit=10`
      );
      const newEstates = response.data;

      if (reset) {
        setFeaturedEstates(newEstates);
        setPage(2);
        setHasMore(true);
      } else {
        if (newEstates.length > 0) {
          setFeaturedEstates((prevEstates) => {
            const newUniqueEstates = newEstates.filter(
              (estate) =>
                !prevEstates.some((prevEstate) => prevEstate.id === estate.id)
            );
            return [...prevEstates, ...newUniqueEstates];
          });
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filteredEstates = featuredEstates.filter(
    (estate) => estate.step1_slug == "is-yeri"
  );
  const filteredArsa = featuredEstates.filter(
    (estate) => estate.step1_slug == "arsa"
  );
  const filteredHomes = featuredEstates.filter(
    (estate) => estate.step1_slug == "konut"
  );

  const filteredProject = featuredProjects.slice(0, 5);
  const filteredBookHouse = featuredEstates.filter(
    (estate) => estate.step2_slug == "gunluk-kiralik"
  );

  // Sayfa yenileme fonksiyonu
  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedEstates();
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const swiperRef = useRef(null);

  const handleIndexChanged = (index) => {
    settab(index);
  };

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - tab);
      settab(index); // Butona her basıldığında activeIndex'i güncelle
    }
  };

  const [tab, settab] = useState(0);
  const scrollViewRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    // Sayfanın 200px aşağısına inildiğinde gizlenmesi gerekiyor
    if (scrollPosition > 225) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };

  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    // Burada arama işlemleri yapılabilir
  };
  const [featuredSliders, setFeaturedSliders] = useState([]);

  const fetchFeaturedSliders = async () => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/featured-sliders"
      );
      setFeaturedSliders(response.data);
      setloadingEstates(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFeaturedSliders();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const pagerViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerViewRef.current) {
        let nextPage = currentPage + 1;
        if (nextPage >= featuredSliders.length) {
          nextPage = 0; // Loop back to first page
        }
        pagerViewRef.current.setPage(nextPage);
        setCurrentPage(nextPage);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
  };

  const addToCard = async () => {
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
          "https://mobil.emlaksepette.com/api/institutional/add_to_cart",
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
  const { width: screenWidth } = Dimensions.get("window");
  useEffect(() => {
    if (
      tab == 1 ||
      tab == 2 ||
      tab == 3 ||
      tab == 4 ||
      tab == 5 ||
      tab == 6 ||
      tab == 7
    ) {
      fetchFeaturedEstates();
    }
  }, [handleIndexChanged]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 25, backgroundColor: "white" }}
      >
        <Modal
          isVisible={isDrawerOpen}
          onBackdropPress={() => setIsDrawerOpen(false)}
          animationIn="fadeInLeftBig"
          animationOut="bounceOutLeft"
          style={styles.modal}
          swipeDirection={["left"]}
          onSwipeComplete={() => setIsDrawerOpen(false)}
        >
          <StatusBar
            backgroundColor="rgba(255, 0, 0, 0.6)"
            barStyle="light-content"
          />

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

        <Header loading={loadingPrjoects} onPress={toggleDrawer} />

        <SearchBar
          containerStyle={{
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderWidth: 0,
            borderBottomWidth: 0,
            justifyContent: "center",
            width: "100%",
            paddingBottom: 10,
            padding: 8,
            height: 50,
          }}
          inputContainerStyle={{
            borderRadius: 5,
            backgroundColor: "#bebebe26",
            borderWidth: 1,
            borderColor: "#bebebe26",
            borderBottomWidth: 1,
            height: "110%",
            borderBottomColor: "#bebebe26",
          }}
          placeholder="Kelime veya ilan no ile ara..."
          inputStyle={{ fontSize: 15 }}
          showLoading={false}
          searchIcon={{ color: "#E54242" }}
          onChangeText={handleSearch}
          value={searchText}
        />

        <View style={{}}>
          <SliderMenu goToSlide={goToSlide} tab={tab} setTab={settab} />
        </View>

        <Swiper
          showsButtons={false}
          showsPagination={false}
          loop={false}
          ref={swiperRef}
          onIndexChanged={handleIndexChanged}
        >
          <ScrollView
            stickyHeaderIndices={[2]}
            ref={scrollViewRef}
            contentContainerStyle={{ gap: 8 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <View style={{ height: 100, padding: 8, borderRadius: 10 }}>
              <PagerView
                style={{ height: "100%" }}
                ref={pagerViewRef}
                initialPage={currentPage}
                onPageSelected={(event) =>
                  setCurrentPage(event.nativeEvent.position)
                }
              >
                {featuredSliders.map((item, index) => (
                  <View
                    style={{
                      borderRadius: 15,
                      width: "100%",
                      height: "100%",
                    }}
                    key={index}
                  >
                    <ImageBackground
                      source={{
                        uri: `${apiUrl}/storage/sliders/${item.image}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                      borderRadius={10}
                    />
                  </View>
                ))}
              </PagerView>
            </View>

            <View style={{ height: 100 }}>
              <SliderBar loading={loadingPrjoects} />
            </View>

            <View
              style={
                {
                  // display: isHidden ? "none" : "flex",
                }
              }
            >
              <View
                style={{
                  paddingBottom: 3,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: 700 }}>
                  ÖNE ÇIKAN PROJELER
                </Text>

                <TouchableOpacity
                  style={styles.allBtn}
                  onPress={() =>
                    navigation.navigate("AllProject", {
                      name: "Tüm Projeler",
                      slug: "tum-projeler",
                      data: featuredProjects,
                      count: featuredProjects.length,
                      type: null,
                      optional: null,
                      title: null,
                      check: null,
                      city: null,
                      county: null,
                      hood: null,
                    })
                  }
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tüm Projeleri Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.slide1}>
              <View style={{ gap: 0, paddingTop: 0 }}>
                {loadingPrjoects == false ? (
                  <View style={{ padding: 10 }}>
                    <ProjectPostSkeleton />
                  </View>
                ) : (
                  <>
                    <FlatList
                      data={filteredProject}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            width: "100%",
                          }}
                        >
                          <ProjectPost
                            key={index}
                            project={item}
                            caption={item.project_title}
                            ımage={`${apiUrl}/${item.image.replace(
                              "public/",
                              "storage/"
                            )}`}
                            user={item.user}
                            location={item.city.title}
                            city={item.county.ilce_title}
                            ProjectNo={item.id}
                            // acıklama={item.description
                            //   .replace(/<\/?[^>]+(>|$)/g, "")
                            //   .replace(/&nbsp;/g, " ")}

                            ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
                            loading={loadingPrjoects}
                          />
                        </View>
                      )}
                      scrollEnabled={false}
                    />
                  </>
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.slide2}>
            <View style={{ paddingTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: 700 }}>
                  ÖNE ÇIKAN KONUTLAR
                </Text>

                <TouchableOpacity
                  style={styles.allBtn}
                  onPress={() =>
                    navigation.navigate("AllRealtor", {
                      name: "Tümünü Gör",
                      data: featuredEstates,
                    })
                  }
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* {refreshing && (
        <View style={{ padding: 10, backgroundColor: 'white', alignItems: 'center' }}>
          <ActivityIndicator animating={true} size="small" color="#000000" />
        </View>
      )} */}
            <FlatList
              data={filteredHomes}
              renderItem={({ item }) => (
                <RealtorPost
                  GetId={GetIdForCart}
                  HouseId={item.id}
                  price={`${JSON.parse(item.housing_type_data)["price"]} `}
                  housing={item}
                  title={item.housing_title}
                  loading={loadingEstates}
                  location={item.city_title + " / " + item.county_title}
                  image={`${apiUrl}/housing_images/${
                    JSON.parse(item.housing_type_data).image
                  }`}
                  column1_name={`${
                    JSON.parse(item.housing_type_data)[item.column1_name]
                  } `}
                  column1_additional={item.column1_additional}
                  column2_name={`${
                    JSON.parse(item.housing_type_data)[item.column2_name]
                  } `}
                  column2_additional={item.column2_additional}
                  column3_name={`${
                    JSON.parse(item.housing_type_data)[item.column3_name]
                  } `}
                  column3_additional={item.column3_additional}
                  column4_name={`${
                    JSON.parse(item.housing_type_data)[item.column4_name]
                  } `}
                  column4_additional={item.column4_additional}
                  bookmarkStatus={true}
                  dailyRent={false}
                />
              )}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              onEndReached={() => fetchFeaturedEstates()}
              onEndReachedThreshold={0}
              onRefresh={onRefresh}
              refreshing={refreshing}
              ListFooterComponent={
                loading && !refreshing ? (
                  <ActivityIndicator
                    style={{ margin: 20 }}
                    size="small"
                    color="#000000"
                  />
                ) : null
              }
            />
          </View>
          <View style={styles.slide3}>
            <View style={{ paddingTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  ÖNE ÇIKAN İŞ YERLERİ
                </Text>

                <TouchableOpacity style={styles.allBtn}>
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={filteredEstates}
              renderItem={({ item }) => (
                <RealtorPost
                  GetId={GetIdForCart}
                  HouseId={item.id}
                  price={`${JSON.parse(item.housing_type_data)["price"]} `}
                  housing={item}
                  title={item.housing_title}
                  loading={loadingEstates}
                  location={item.city_title + " / " + item.county_title}
                  image={`${apiUrl}/housing_images/${
                    JSON.parse(item.housing_type_data).image
                  }`}
                  column1_name={`${
                    JSON.parse(item.housing_type_data)[item.column1_name]
                  } `}
                  column1_additional={item.column1_additional}
                  column2_name={`${
                    JSON.parse(item.housing_type_data)[item.column2_name]
                  } `}
                  column2_additional={item.column2_additional}
                  column3_name={`${
                    JSON.parse(item.housing_type_data)[item.column3_name]
                  } `}
                  column3_additional={item.column3_additional}
                  column4_name={`${
                    JSON.parse(item.housing_type_data)[item.column4_name]
                  } `}
                  column4_additional={item.column4_additional}
                  bookmarkStatus={true}
                  dailyRent={false}
                />
              )}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              onEndReached={() => fetchFeaturedEstates(false)}
              onEndReachedThreshold={0.5}
              onRefresh={onRefresh}
              refreshing={refreshing}
              ListFooterComponent={
                loading && !refreshing ? (
                  <ActivityIndicator
                    style={{ margin: 20 }}
                    size="small"
                    color="#000000"
                  />
                ) : null
              }
            />
          </View>
          <View style={styles.slide4}>
            <View style={{ paddingTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>ÖNE ÇIKAN ARSALAR</Text>

                <TouchableOpacity style={styles.allBtn}>
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={filteredArsa}
              renderItem={({ item }) => (
                <RealtorPost
                  GetId={GetIdForCart}
                  HouseId={item.id}
                  price={`${JSON.parse(item.housing_type_data)["price"]} `}
                  housing={item}
                  title={item.housing_title}
                  loading={loadingEstates}
                  location={item.city_title + " / " + item.county_title}
                  image={`${apiUrl}/housing_images/${
                    JSON.parse(item.housing_type_data).image
                  }`}
                  column1_name={`${
                    JSON.parse(item.housing_type_data)[item.column1_name]
                  } `}
                  column1_additional={item.column1_additional}
                  column2_name={`${
                    JSON.parse(item.housing_type_data)[item.column2_name]
                  } `}
                  column2_additional={item.column2_additional}
                  column3_name={`${
                    JSON.parse(item.housing_type_data)[item.column3_name]
                  } `}
                  column3_additional={item.column3_additional}
                  column4_name={`${
                    JSON.parse(item.housing_type_data)[item.column4_name]
                  } `}
                  column4_additional={item.column4_additional}
                  bookmarkStatus={true}
                  dailyRent={false}
                />
              )}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              onEndReached={() => fetchFeaturedEstates(false)}
              onEndReachedThreshold={0.5}
              onRefresh={onRefresh}
              refreshing={refreshing}
              ListFooterComponent={
                loading && !refreshing ? (
                  <ActivityIndicator
                    style={{ margin: 20 }}
                    size="small"
                    color="#000000"
                  />
                ) : null
              }
            />
          </View>
          <View style={styles.slide4}>
            <View style={{ paddingTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  ÖNE ÇIKAN PREFABRİK YAPILAR
                </Text>

                <TouchableOpacity style={styles.allBtn}>
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide4}>
            <View style={{ paddingTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>Günlük Kiralık İlanlar</Text>

                <TouchableOpacity style={styles.allBtn}>
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {
              <ScrollView style={{ width: "100%" }}>
                {loadingPrjoects == false ? (
                  <View style={{ top: 40, padding: 10 }}>
                    <ProjectPostSkeleton />
                  </View>
                ) : (
                  filteredBookHouse.map((item, index) => (
                    <RealtorPost
                      GetId={GetIdForCart}
                      key={index}
                      HouseId={item.id}
                      price={`${
                        JSON.parse(item.housing_type_data)["daily_rent"]
                      } `}
                      title={item.housing_title}
                      loading={loadingEstates}
                      location={item.city_title + " / " + item.county_title}
                      image={`${apiUrl}/housing_images/${
                        JSON.parse(item.housing_type_data).image
                      }`}
                      m2={`${
                        JSON.parse(item.housing_type_data)["squaremeters"]
                      } `}
                      roomCount={`${
                        JSON.parse(item.housing_type_data)["room_count"]
                      } `}
                      floor={`${
                        JSON.parse(item.housing_type_data)["floorlocation"]
                      } `}
                      bookmarkStatus={true}
                      step2_slug={item.step2_slug}
                      step1_slug={item.step1_slug}
                      dailyRent={true}
                    />
                  ))
                )}
              </ScrollView>
            }
          </View>
          <View style={styles.slide4}>
            <View style={{ paddingTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>AL SAT ACİL İLANLARI</Text>

                <TouchableOpacity style={styles.allBtn}>
                  <Text style={{ color: "white", fontSize: 13 }}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Swiper>
        {/* </ScrollView> */}
        <Modal
          isVisible={ModalForAddToCart}
          onBackdropPress={() => setModalForAddToCart(false)}
          animationType="fade" // veya "fade", "none" gibi
          transparent={true}
          useNativeDriver={true}
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <View style={{ padding: 10, gap: 10 }}>
              <Text style={{ textAlign: "center" }}>
                #1000{selectedCartItem} No'lu Konutu Sepete Eklemek İsteiğinize
                Eminmisiniz?
              </Text>
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
                    addToCard();
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
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
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
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  page: {
    width: "100%",
    height: "100%", // Sayfa yüksekliği
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  slide1: {
    flex: 1,

    paddingBottom: 30,
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
  },
  slide4: {
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  filterBtn: {
    backgroundColor: "#ebebeb",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c7c7ca",
  },
  btn: {
    backgroundColor: "#ebebeb",
    width: "45%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#c7c7ca",
  },
  allBtn: {
    backgroundColor: "#EA2C2E",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
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
});
{
  /*   */
}

{
  /*    <View style={{ paddingTop: 20, padding: 10 }}>
            {loadingPrjoects == false ? <></> : <Text>Emlak İlanları</Text>}

            <View>
            {
                loadingPrjoects == false ?
                  '' :
                  <FlatList
                    data={featuredEstates}
                    renderItem={({ item }) =>
                      <RealtorPost
                        price={`${JSON.parse(item.housing_type_data)['price']} `}
                        title={item.housing_title}
                        loading={loadingEstates}
                        location={item.city_title + ' / ' + item.county_title}
                        image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
                        m2={`${JSON.parse(item.housing_type_data)['squaremeters']} `}
                        roomCount={`${JSON.parse(item.housing_type_data)['room_count']} `}
                        floor={`${JSON.parse(item.housing_type_data)['floorlocation']} `}

                      />

                    }

                    scrollEnabled={false}
                  />
              } 
       
            </View>
          </View> */
}
{
  /*  */
}

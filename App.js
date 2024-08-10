import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import Home from "./pages/Home/Home";
import Emlakİlanı from "./pages/Home/İlanYükleme/Emlakİlanı";
import Projeİlanı from "./pages/Home/İlanYükleme/Projeİlanı";
import Details from "./pages/Home/Details";
import Login from "./pages/Home/Login&Register/Login";
import Register from "./pages/Home/Login&Register/Register";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Home/Profile";
import ShoppingProfile from "./pages/Home/ShoppingProfile";
import RealtorDetails from "./pages/Home/RealtorPages/RealtorDetails";
import Collections from "./pages/Home/ProfilePages/Collections";
import Panel from "./pages/Home/ProfilePages/Panel";
import SellAndRentForms from "./pages/Home/ProfilePages/SellAndRentForms";
import Sell from "./pages/Home/ProfilePages/Sell";
import Rent from "./pages/Home/ProfilePages/Rent";
import UpdateProfile from "./pages/Home/ProfilePages/UpdateProfile";
import ChangePassword from "./pages/Home/ProfilePages/ChangePassword";
import RegisterRealtorClub from "./pages/Home/ProfilePages/RegisterRealtorClub";
import { useState, useEffect } from "react";
import MyProjectAdverts from "./pages/Home/ProfilePages/MyProjectAdverts";
import MyRealtorAdverts from "./pages/Home/ProfilePages/MyRealtorAdverts";
import Offer from "./pages/Home/ProfilePages/Offer";
import CreateUserType from "./pages/Home/ProfilePages/CreateUserType";
import CreateUser from "./pages/Home/ProfilePages/CreateUser";
import AdsPictures from "./pages/Home/ProfilePages/AdsPictures";
import SeeCollection from "./pages/Home/ProfilePages/SeeCollection";
import EditCollection from "./pages/Home/ProfilePages/EditCollection";
import PasswordVerify from "./pages/Home/ProfilePages/PasswordVerify";
import OrderDetails from "./pages/Home/ProfilePages/OrderDetails";
import RentOrderDetails from "./pages/Home/ProfilePages/RentOrderDetails";
import Suggests from "./pages/Home/ProfilePages/Suggests";
import OfferList from "./pages/Home/ProfilePages/OfferList";
import CategoryChoose from "./pages/Home/İlanYükleme/ProjectAdvertsAdd/CategoryChoose";
import CategorieStatus from "./pages/Home/İlanYükleme/ProjectAdvertsAdd/CategorieStatus";
import AdvertsPlace from "./pages/Home/İlanYükleme/ProjectAdvertsAdd/AdvertsPlace";
import ShareScreenProject from "./pages/Home/İlanYükleme/ProjectAdvertsAdd/ShareScreenProject";
import AdvertForm from "./pages/Home/İlanYükleme/ProjectAdvertsAdd/AdvertForm";

import Notifications from "./pages/Home/Notifications";
import RealtorClub from "./pages/Home/RealtorClub";

import PublicPage from "./pages/Home/SearchPageItem/PublicPage";
import SubCategory from "./pages/Home/SearchPageItem/SubCategory";
import HomeList from "./pages/Home/SearchPageItem/HomeList";
import SubCategoryChild from "./pages/Home/SearchPageItem/SubCategoryChild";

import Search from "./pages/Home/Search";
import AllProjects from "./pages/Home/AllProjects";
import FilterScreen from "./pages/Home/FilterScreen";
import EditAdvert from "./pages/Home/ProfilePages/ProjectAdveretsPages/EditPages/EditAdvert";
import Archieve from "./pages/Home/ProfilePages/ProjectAdveretsPages/EditPages/Archieve";
import EditProject from "./pages/Home/ProfilePages/ProjectAdveretsPages/EditPages/EditProject";
import SellAndRentFormPage from "./pages/Home/SellAndRentFormPage";
import SendSellAndRentForm from "./pages/Home/SendSellAndRentForm";
import SeeNeigbourhood from "./pages/Home/ProfilePages/SeeNeigbourhood";
import SwapScreen from "./pages/Home/ProfilePages/SwapScreen";
import ComeSwapScreen from "./pages/Home/ProfilePages/ComeSwapScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AllRealtorAdverts from "./pages/Home/AllRealtorAdverts";
import UploadAdsPicture from "./pages/Home/ProfilePages/UploadAdsPicture";
import AdsPictureList from "./pages/Home/ProfilePages/AdsPictureList";
import UserTypeList from "./pages/Home/ProfilePages/UserTypeList";
import PaymentScreen from "./pages/Home/PaymentScreen";
import Onboard from "./pages/Home/Onboarding/Onboard";
import SplashScreen from "./pages/Home/Onboarding/SplashScreen";
import { getValueFor, getValueFor2 } from "./components/methods/user";
import Verification from "./pages/Home/ProfilePages/Verification";
import ForgotPassword from "./pages/Home/Login&Register/ForgotPassword";
import UpdateUserType from "./pages/Home/ProfilePages/UpdateUserType";
import UpdateUsers from "./pages/Home/ProfilePages/UpdateUsers";
import UsersList from "./pages/Home/ProfilePages/UsersList";
import Takeds from "./pages/Home/ProfilePages/Takeds";
import Invoice from "./pages/Home/Invoice";
import CreateReservation from "./pages/Home/RealtorPages/CreateReservation";
import PaymentScreenForReserve from "./pages/Home/PaymentScreenForReserve";
import CreateCollections from "./pages/Home/CreateCollections";

import WelcomePage from "./pages/Home/Onboarding/WelcomePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import DecontPdf from "./pages/Home/DecontPdf";
import AddComment from "./pages/Home/AddComment";
import SuccesScreen from "./pages/Home/SuccesScreen";
import ExtradionRequest from "./components/ExtraditionRequest";
import UpgradeProfile from "./pages/Home/ProfilePages/UpgradeProfile";

import SearchPage from "./pages/Home/SearchPage";

import Support from "./pages/Home/ProfilePages/profileComponents/Support";
import RequestPage from "./pages/Home/ProfilePages/RequestPage";
import AddCommentForProject from "./pages/Home/AddCommentForProject";
import MyComments from "./pages/Home/MyComments";
import EditCommentForProject from "./pages/Home/EditCommentForProject";

import Basket2 from "./pages/Home/Basket2";
import PaymentScreen2 from "./pages/Home/PaymentScreen2";
import AdvertsPanelTab from "./pages/Home/Panel/AdvertsPanelTab";
import ClubPanel from "./pages/Home/Panel/RealtorClubPanel/ClubPanel";
import CollectionsTab from "./pages/Home/Panel/CollectionsTab";

const Stack = createNativeStackNavigator();

export default function App({ route }) {
  const [İsLoggedIn, setİsLoggedIn] = useState(false);
  const [ShowOnBoard, setShowOnBoard] = useState(true);
  const [showBackIcon, setshowBackIcon] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [housingTypes, setHousingTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [showSplashTemp, setShowSplashTemp] = useState(null);

  useEffect(() => {
    // AsyncStorage'de saklanan bilgiyi kontrol et
    const checkWelcomeStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("@welcome_screen_shown");
        if (value === "true") {
          // Welcome screen daha önce gösterilmiş, gösterme
          setShowWelcome(false);
        }
      } catch (error) {
        console.error("AsyncStorage hatası:", error);
      }
    };

    checkWelcomeStatus();
  }, []);

  const handleWelcomeScreenDone = async () => {
    // Welcome screen gösterildi olarak işaretlenir
    try {
      await AsyncStorage.setItem("@welcome_screen_shown", "true");
    } catch (error) {
      console.error("AsyncStorage hatası:", error);
    }
    setShowWelcome(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 3 saniye sonra splash ekranını kaldır
  }, []);

  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);

    getValueFor2("welcome_screen_show", setShowSplashTemp);
  }, []);

  useEffect(() => {
    if (showSplashTemp == "ff") {
      setShowSplash(false);
    }
  }, [showSplashTemp]);

  const hideSplash = () => {
    SecureStore.setItemAsync("welcome_screen_show", "ff");
    setShowSplash(false);
  };
  function StepScreen({
    step,
    navigation,
    setHousingTypes,
    setSelectedTypes,
    housingTypes,
    selectedTypes,
  }) {
    return (
      <View style={styles.container}>
        <TypeListScreen
          step={step}
          navigation={navigation}
          setHousingTypes={setHousingTypes}
          setSelectedTypes={setSelectedTypes}
          housingTypes={housingTypes}
          selectedTypes={selectedTypes}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,

            headerTintColor: "#333",
          }}
        >
          {showSplash ? (
            <Stack.Screen
              name="SplashScreen"
              component={() => (
                <WelcomePage
                  hideSplash={hideSplash}
                  onFinish={handleWelcomeScreenDone}
                />
              )}
              options={{ headerShown: false }}
            />
          ) : (
            //   ShowOnBoard?
            //   <Stack.Screen name='OnBoard'>

            //   {(props)=><Onboard {...props} setShowOnBoard={setShowOnBoard}/>}
            //  </Stack.Screen>:
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            >
              {(props) => (
                <Home
                  {...props}
                  showBackIcon={showBackIcon}
                  setshowBackIcon={setshowBackIcon}
                />
              )}
            </Stack.Screen>
          )}

          <Stack.Group>
            <Stack.Screen
              name="Login"
              options={{
                title: "Giriş Yap",
                headerBackTitleVisible: false,
                headerShown: false,
              }}
            >
              {(props) => <Login {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Üye Ol", headerBackTitle: "." }}
            />
          </Stack.Group>

          <Stack.Screen name="Step1">
            {(props) => (
              <StepScreen
                {...props}
                step={1}
                setHousingTypes={setHousingTypes}
                setSelectedTypes={setSelectedTypes}
                housingTypes={housingTypes}
                selectedTypes={selectedTypes}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Step2">
            {(props) => (
              <StepScreen
                {...props}
                step={2}
                setHousingTypes={setHousingTypes}
                setSelectedTypes={setSelectedTypes}
                housingTypes={housingTypes}
                selectedTypes={selectedTypes}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Step3">
            {(props) => (
              <StepScreen
                {...props}
                step={3}
                setHousingTypes={setHousingTypes}
                setSelectedTypes={setSelectedTypes}
                housingTypes={housingTypes}
                selectedTypes={selectedTypes}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Emlak"
            component={Emlakİlanı}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Proje"
            component={Projeİlanı}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ route }) => ({
              headerShown: false,
              title: route.params.name,
            })}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetail}
            options={({ route }) => ({
              headerShown: false,
              headerBackTitleVisible: false,
            })}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ShopProfile" options={{ headerShown: false }}>
            {(props) => <ShoppingProfile {...props} İsLoggedIn={İsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen
            name="Realtor details"
            component={RealtorDetails}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Group>
            <Stack.Screen
              name="Collections"
              component={Collections}
              options={{
                title: "Koleksiyonlarım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="DashBord"
              component={Panel}
              options={{
                title: "Sana Özel",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="Forms"
              component={SellAndRentForms}
              options={{
                title: "Sat Kirala Formlarım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="Sell"
              component={Sell}
              options={{
                title: "Sattıklarım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="Rent"
              component={Rent}
              options={({ route }) => ({
                animationTypeForReplace: "pop",
                title: "Kiraladıklarım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              })}
            />
            <Stack.Screen
              name="UpdateProfile"
              component={UpdateProfile}
              options={{
                title: "Profili Güncelle",
                headerStyle: {
                  backgroundColor: "white",
                },
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="ChangePas"
              component={ChangePassword}
              options={{
                title: "Şifreyi Değiştir",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="RealtorClub"
              options={{
                title: "Emlak Kulüp Üyesi Ol",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            >
              {(props) => (
                <RegisterRealtorClub {...props} setİsLoggedIn={setİsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="MyProject"
              component={MyProjectAdverts}
              options={{
                title: "Proje İlanlarım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="MyRealtor"
              component={MyRealtorAdverts}
              options={{
                title: "Emlak ilanlarım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="Offer"
              component={Offer}
              options={({ route }) => ({
                headerBackTitleVisible: false,
                title: "Kampanya Oluştur",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              })}
            />
            <Stack.Screen
              name="CreateUserType"
              component={CreateUserType}
              options={({ route }) => ({
                title: "Kullanıcı Tipi Oluştur",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              })}
            />
            <Stack.Screen
              name="CreateUser"
              component={CreateUser}
              options={({ route }) => ({
                animationTypeForReplace: "pop",
                title: "Alt Kullanıcı Oluştur",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              })}
            />
            <Stack.Screen
              name="AdsPicture"
              component={AdsPictures}
              options={{
                title: "Reklam Görselleri",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="SeeColleciton"
              component={SeeCollection}
              options={{
                headerShown: false,
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="EditColection"
              component={EditCollection}
              initialParams={{ item: { name: "Koleksiyon Düzenle" } }}
              options={{
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="PassVerify"
              component={PasswordVerify}
              options={{
                title: "Şifre Doğrulama",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetails}
              options={{
                title: "Sipariş Detayı",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="RentOrderDetail"
              component={RentOrderDetails}
              options={{
                title: "Rezervasyon Detayı",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="Suggest"
              component={Suggests}
              options={({ route }) => ({
                animationTypeForReplace: "pop",
                title: "Başvurularım",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              })}
            />
            <Stack.Screen
              name="OfferList"
              component={OfferList}
              options={({ route }) => ({
                animationTypeForReplace: "pop",
                title: "Kampanya Listele",
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
              })}
            />
          </Stack.Group>

          <Stack.Screen
            name="CategorieChoose"
            component={CategoryChoose}
            options={({ route }) => ({
              animationTypeForReplace: "pop",
              title: route.params.name,
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="CategorieStatu"
            component={CategorieStatus}
            options={({ route }) => ({
              animationTypeForReplace: "pop",
              title: route.params.name,
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="AdvertPlace"
            component={AdvertsPlace}
            options={({ route }) => ({
              animationTypeForReplace: "pop",
              title: route.params.name,
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="AdvertForm"
            options={({ route }) => ({
              animationTypeForReplace: "pop",
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            })}
          >
            {(props) => <AdvertForm />}
          </Stack.Screen>

          <Stack.Screen
            name="ShareAdvert"
            options={({ route }) => ({
              animationTypeForReplace: "pop",
              title: "",
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            })}
          >
            {(props) => <ShareScreenProject {...props} />}
          </Stack.Screen>

          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={({ route }) => ({
              title: "Bildirimler",
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="RealtorClubExplore"
            component={RealtorClub}
            options={({ route }) => ({
              title: "Emlak Kulübü Keşfet",
            })}
          />
          <Stack.Screen
            name="Public"
            component={PublicPage}
            options={({ route }) => ({
              headerShown: true,
              title: route.params.title,
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 14,
              },
              headerBackTitleStyle: {
                fontSize: 14,
              },
            })}
          />
          <Stack.Screen
            name="SubCategory"
            component={SubCategory}
            options={({ route }) => {
              const title =
                route.params.title === "Projeler"
                  ? route.params.name + route.params.title
                  : route.params.name;

              return {
                headerShown: true,
                title: title,
                headerBackTitle: route.params.title,
                headerBackTitleVisible: true,
                headerTitleStyle: {
                  fontSize: 14,
                },
                headerBackTitleStyle: {
                  fontSize: 14,
                },
              };
            }}
          />

          <Stack.Screen
            name="HomeList"
            component={HomeList}
            options={({ route }) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="SubCategoryChild"
            component={SubCategoryChild}
            options={({ route }) => ({
              headerShown: true,
              title: route.params.text,
              headerBackTitle:
                route.params.title === "Projeler"
                  ? route.params.name + route.params.title
                  : route.params.name,
              headerBackTitleVisible: true,
              headerTitleStyle: {
                fontSize: 14,
              },
              headerBackTitleStyle: {
                fontSize: 14,
              },
            })}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={({ route }) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="AllProject"
            component={AllProjects}
            options={({ route }) => ({
              headerShown: false,
              headerStyle: {
                backgroundColor: "#EA2B2E",
              },
              title: route.params.name + " - " + route.params.count + " Proje",
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "white",
              headerTitleStyle: {
                fontSize: 14,
              },
            })}
          />
          <Stack.Screen
            name="FilterScrenn"
            component={FilterScreen}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen
            name="EditAdvert"
            component={EditAdvert}
            options={() => ({
              title: "İlanları Düzenle",
              headerBackTitle: ".",
            })}
          />
          <Stack.Screen name="Archieve" component={Archieve} />
          <Stack.Screen
            name="EditProject"
            component={EditProject}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="SellAndRent"
            component={SellAndRentFormPage}
            options={({ route }) => ({
              title: "Sat Kirala",
              headerBackTitleVisible:false
            })}
          />
          <Stack.Screen
            name="SendSellAndRentForm"
            component={SendSellAndRentForm}
            options={({ route }) => ({
              title: "Sat Kirala Formu",
              headerBackTitleVisible:false
            })}
          />
          <Stack.Screen
            name="SeeNeigbourHood"
            component={SeeNeigbourhood}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              title: "Komşumu Gör",
            })}
          />
          <Stack.Screen
            name="SwapScreen"
            component={SwapScreen}
            options={({ route }) => ({
              title: "Gelen Takas Başvurularım",
            })}
          />
          <Stack.Screen
            name="ComeSwapScreen"
            component={ComeSwapScreen}
            options={({ route }) => ({
              title: "Takas Başvurularım",
            })}
          />
          <Stack.Screen
            name="AllRealtorAdverts"
            component={AllRealtorAdverts}
            options={({ route }) => ({
              headerShown: false,
              headerStyle: {
                backgroundColor: "#EA2B2E",
              },
              title:
                route.params.name +
                " - " +
                route.params.count +
                " Emlak İlanları",
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "white",
              headerTitleStyle: {
                fontSize: 14,
              },
            })}
          />
          <Stack.Screen
            name="UploadAdsPicture"
            component={UploadAdsPicture}
            options={({ route }) => ({
              // Geri düğmesini kaldırır
              headerBackTitleVisible: false,
              title: "Reklam Görseli Oluştur",
              headerStyle: {
                backgroundColor: "#F5F5F7",
              },
            })}
          />
          <Stack.Screen
            name="AdsPictureList"
            component={AdsPictureList}
            options={({ route }) => ({
              title: "Reklam Görselleri",
              headerStyle: {
                backgroundColor: "#F5F5F7",
              },
            })}
          />
          <Stack.Screen
            name="UserTypes"
            component={UserTypeList}
            options={({ route }) => ({
              title: "Kullanıcı Tipleri",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#F5F5F7",
              },
            })}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={({ route }) => ({
              title: "Sepet Özeti Ve Onay",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotPassword}
            options={({ route }) => ({
              title: "Şifremi Unuttum",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="UpdateUserType"
            component={UpdateUserType}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              headerShown: true,
              title: "Kullanıcı Güncelle",
            })}
          />
          <Stack.Screen
            name="UpdateUsers"
            component={UpdateUsers}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              headerShown: true,
              title: "Alt Kullanıcı Güncelle",
            })}
          />
          <Stack.Screen
            name="UsersList"
            component={UsersList}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              headerShown: true,
              title: "Alt Kullanıcılar",
            })}
          />
          <Stack.Screen
            name="Taked"
            component={Takeds}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              headerShown: true,
              title: "Siparişlerim",
            })}
          />
          <Stack.Screen
            name="Invoice"
            component={Invoice}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              headerShown: true,
              title: "Fatura",
            })}
          />
          <Stack.Screen
            name="CreateReservation"
            component={CreateReservation}
            options={({ route }) => ({
              headerBackTitleVisible: false,
              headerShown: true,
              title: "Rezervasyon Oluştur",
            })}
          />
          <Stack.Screen
            name="PaymentScreenForReserve"
            component={PaymentScreenForReserve}
            options={({ route }) => ({
              title: "Sepet Özeti Ve Onay",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="CreateCollections"
            component={CreateCollections}
            options={({ route }) => ({
              title: "Koleksiyon Oluştur Ve Ekle",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="DecontPdf"
            component={DecontPdf}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="AddComment"
            component={AddComment}
            options={({ route }) => ({
              title: "Konutu Değerlendir",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="ExtraditionRequest"
            component={ExtradionRequest}
            options={({ route }) => ({
              title: "İade İşlemleri",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="Success"
            component={SuccesScreen}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="VerifyPhone"
            component={Verification}
            options={({ route }) => ({
              headerShown: false,
              gestureEnabled: false,
              title: "Konutu Değerlendir",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="Upgrade"
            component={UpgradeProfile}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />

          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={({ route }) => ({
              title: "Ara",
              headerShown:false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="Support"
            component={Support}
            options={({ route }) => ({
              title: "Destek",

              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="AddCommentForProject"
            component={AddCommentForProject}
            options={({ route }) => ({
              title: "Konutu Değerlendir",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="MyComments"
            component={MyComments}
            options={({ route }) => ({
              title: "Değerlendirmelerim",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="EditProjectComment"
            component={EditCommentForProject}
            options={({ route }) => ({
              title: "Yorumu Düzenle",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="Basket2"
            component={Basket2}
            options={({ route }) => ({
              title: "Komşumu Gör Satın Alma",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
          <Stack.Screen
            name="PaymentScreen2"
            component={PaymentScreen2}
            options={({ route }) => ({
              title: "Komşumu Gör Satın Alma",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
             <Stack.Screen
            name="AdvertPanel"
            component={AdvertsPanelTab}
            options={({ route }) => ({
              title: "İlan Yönetimi",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
              <Stack.Screen
            name="ClubPanel"
            component={ClubPanel}
            options={({ route }) => ({
              title: "Emlak Kulüp",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#f7f7f7",
              },
            })}
          />
         
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

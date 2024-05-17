import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput ,TouchableWithoutFeedback,Keyboard,ScrollView, Alert } from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import Home from './pages/Home/Home'
import Emlakİlanı from './pages/Home/İlanYükleme/Emlakİlanı';
import Projeİlanı from './pages/Home/İlanYükleme/Projeİlanı';
import Details from './pages/Home/Details';
import Login from './pages/Home/Login&Register/Login';
import Register from './pages/Home/Login&Register/Register';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Home/Profile';
import ShoppingProfile from './pages/Home/ShoppingProfile';
import RealtorDetails from './pages/Home/RealtorPages/RealtorDetails';
import Collections from './pages/Home/ProfilePages/Collections';
import Panel from './pages/Home/ProfilePages/Panel';
import SellAndRentForms from './pages/Home/ProfilePages/SellAndRentForms';
import Sell from './pages/Home/ProfilePages/Sell';
import Rent from './pages/Home/ProfilePages/Rent';
import UpdateProfile from './pages/Home/ProfilePages/UpdateProfile';
import ChangePassword from './pages/Home/ProfilePages/ChangePassword';
import RegisterRealtorClub from './pages/Home/ProfilePages/RegisterRealtorClub';
import { useState ,useEffect} from 'react';
import MyProjectAdverts from './pages/Home/ProfilePages/MyProjectAdverts';
import MyRealtorAdverts from './pages/Home/ProfilePages/MyRealtorAdverts';
import Offer from './pages/Home/ProfilePages/Offer';
import CreateUserType from './pages/Home/ProfilePages/CreateUserType';
import CreateUser from './pages/Home/ProfilePages/CreateUser';
import AdsPictures from './pages/Home/ProfilePages/AdsPictures';
import SeeCollection from './pages/Home/ProfilePages/SeeCollection';
import EditCollection from './pages/Home/ProfilePages/EditCollection';
import PasswordVerify from './pages/Home/ProfilePages/PasswordVerify';
import OrderDetails from './pages/Home/ProfilePages/OrderDetails';
import RentOrderDetails from './pages/Home/ProfilePages/RentOrderDetails';
import Suggests from './pages/Home/ProfilePages/Suggests';
import OfferList from './pages/Home/ProfilePages/OfferList';
import CategoryChoose from './pages/Home/İlanYükleme/ProjectAdvertsAdd/CategoryChoose';
import CategorieStatus from './pages/Home/İlanYükleme/ProjectAdvertsAdd/CategorieStatus';
import AdvertsPlace from './pages/Home/İlanYükleme/ProjectAdvertsAdd/AdvertsPlace';
import ShareScreenProject from './pages/Home/İlanYükleme/ProjectAdvertsAdd/ShareScreenProject';
import AdvertForm from './pages/Home/İlanYükleme/ProjectAdvertsAdd/AdvertForm';

import AdvertStatu from './pages/Home/İlanYükleme/RealtorAdvertsAdd/AdvertStatu';
import AdvertType from './pages/Home/İlanYükleme/RealtorAdvertsAdd/AdvertType';
import RealtorAdvertAdd from './pages/Home/İlanYükleme/RealtorAdvertsAdd/RealtorAdvertAdd';
import Notifications from './pages/Home/Notifications';
import RealtorClub from './pages/Home/RealtorClub';

import PublicPage from './pages/Home/SearchPageItem/PublicPage';
import SubCategory from './pages/Home/SearchPageItem/SubCategory';
import HomeList from './pages/Home/SearchPageItem/HomeList';
import SubCategoryChild from './pages/Home/SearchPageItem/SubCategoryChild';

import Search from './pages/Home/Search';
import AllProjects from './pages/Home/AllProjects';
import FilterScreen from './pages/Home/FilterScreen';
import EditAdvert from './pages/Home/ProfilePages/ProjectAdveretsPages/EditPages/EditAdvert';
import Archieve from './pages/Home/ProfilePages/ProjectAdveretsPages/EditPages/Archieve';
import EditProject from './pages/Home/ProfilePages/ProjectAdveretsPages/EditPages/EditProject';
import SellAndRentFormPage from './pages/Home/SellAndRentFormPage';
import SendSellAndRentForm from './pages/Home/SendSellAndRentForm';
import SeeNeigbourhood from './pages/Home/ProfilePages/SeeNeigbourhood';
import SwapScreen from './pages/Home/ProfilePages/SwapScreen';
import ComeSwapScreen from './pages/Home/ProfilePages/ComeSwapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AllRealtorAdverts from './pages/Home/AllRealtorAdverts';
import UploadAdsPicture from './pages/Home/ProfilePages/UploadAdsPicture';
import AdsPictureList from './pages/Home/ProfilePages/AdsPictureList';
import UserTypeList from './pages/Home/ProfilePages/UserTypeList';
import PaymentScreen from './pages/Home/PaymentScreen';
import Onboard from './pages/Home/Onboarding/Onboard';
import SplashScreen from './pages/Home/Onboarding/SplashScreen';
import { getValueFor } from './components/methods/user';
import Verification from './pages/Home/ProfilePages/Verification';
import ForgotPassword from './pages/Home/Login&Register/ForgotPassword';
import UpdateUserType from './pages/Home/ProfilePages/UpdateUserType';
import UpdateUsers from './pages/Home/ProfilePages/UpdateUsers';
import UsersList from './pages/Home/ProfilePages/UsersList';

const Stack = createNativeStackNavigator();

export default function App({route}) {
  
  const [İsLoggedIn, setİsLoggedIn] = useState(false)
  const [ShowOnBoard, setShowOnBoard] = useState(true)
  const [showBackIcon, setshowBackIcon] = useState(false)

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 3 saniye sonra splash ekranını kaldır
  }, []);


  const [user, setUser] = useState({});


  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  return (
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
   
  <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
      
  }}>
   
    {
      showSplash?
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{
        headerShown:false
      }}/>
  :
    //   ShowOnBoard? 
    //   <Stack.Screen name='OnBoard'>

    //   {(props)=><Onboard {...props} setShowOnBoard={setShowOnBoard}/>}
    //  </Stack.Screen>:
      <Stack.Screen name="Home" options={{
        headerShown:false,
       
      }} 
        
      >
        {(props) => <Home {...props}  showBackIcon={showBackIcon} setshowBackIcon={setshowBackIcon}/>}
      </Stack.Screen>
    }


 
  

  <Stack.Group>
    <Stack.Screen name="Login"  options={{ title: 'Giriş Yap' }} >
      {(props=> <Login {...props}/>)}
    </Stack.Screen>
    <Stack.Screen name="Register" component={Register} options={{title:'Üye Ol',headerBackTitle:'.' }} />
  </Stack.Group>

 
  <Stack.Screen name="Emlak"  component={Emlakİlanı} 
   options={({route})=>({
   
  })} 
  />
  <Stack.Screen name="Proje"  component={Projeİlanı}
   options={({route})=>({
    title:route.params.name
  })} 
  />
  <Stack.Screen name="Details"  component={Details} options={({route})=>({
    headerShown:false,
    title:route.params.name
  })} 
 
  />
    <Stack.Screen name="PostDetails"  component={PostDetail}
  
    options={({route})=>({
      headerShown:false,
       headerBackTitleVisible: false,
        title:route.params.name
        
        
    })} />
 
    <Stack.Screen name="Profile"  component={Profile}
    
    options={{
    headerShown:false
  }} />
<Stack.Screen

  name='ShopProfile'

  options={{headerShown:false}}
  
>

{(props) => <ShoppingProfile {...props} İsLoggedIn={İsLoggedIn} />}
</Stack.Screen>
 <Stack.Screen name="Realtor details"  component={RealtorDetails}options={{
      headerShown:false
   
  }} />



    <Stack.Group>

<Stack.Screen name="Collecitons"  component={Collections}options={{
        title:'Koleksiyonlarım',
      headerBackTitle:'Panel'
  }} />
    <Stack.Screen name="DashBord"  component={Panel}options={{
        title:'Gösterge Paneli'
   
  }} />
    <Stack.Screen name="Forms"  component={SellAndRentForms}options={{
        title:'Sat Kirala Formlarım'
   
  }} />
    <Stack.Screen name="Sell"  component={Sell}options={{
        title:'Siparişlerim'

  }} />
    <Stack.Screen name="Rent"  component={Rent}
       options={({route})=>({
        animationTypeForReplace:'pop',
        title:'Kiraladıklarım'
        
        
    })}
 
  />
     <Stack.Screen name="UpdateProfile"  component={UpdateProfile}options={{
        title:'Profili Güncelle',
          headerStyle:{
            backgroundColor:'white',
          }
  }} 
  
  />
    <Stack.Screen name="ChangePas"  component={ChangePassword}options={{
        title:'Şifreyi Değiştir'
   
  }} />
      <Stack.Screen name="RealtorClub" 
        
      options={{
        title:'Emlak Kulüp Üyesi Ol'
   
  }} >
    {(props) => <RegisterRealtorClub {...props} setİsLoggedIn={setİsLoggedIn}/>}
  </Stack.Screen>
  <Stack.Screen name="MyProject"  component={MyProjectAdverts}options={{
          title:'Proje İlanlarım'
   
  }} />
   <Stack.Screen name="MyRealtor"  component={MyRealtorAdverts}options={{
      title:'Emlak ilanlarım'
      }} />
        <Stack.Screen name="Offer"  component={Offer}
         options={({route})=>({
           headerBackTitleVisible: false,
          title:'Kampanya Oluştur'
          
})}
        
        />
         <Stack.Screen name="CreateUserType"  component={CreateUserType} 
            options={({route})=>({
            
                title:route.params.name
                
                
            })}
         />
        <Stack.Screen name="CreateUser"  component={CreateUser}
         options={({route})=>({
          animationTypeForReplace:'pop',
          title:route.params.name
          
          
      })}
        />
          <Stack.Screen name="AdsPicture"  component={AdsPictures}options={{
            title:'Reklam Görselleri'
        }} />
          <Stack.Screen name="SeeColleciton"  component={SeeCollection}options={{
            headerShown:false, 
        }} />
           <Stack.Screen name="EditColection"  component={EditCollection}options={{
            title:'Koleksiyonu Düzenle',
            headerBackTitle:'.'
            
        }} />
            <Stack.Screen name="PassVerify"  component={PasswordVerify}options={{
            title:'Şifre Doğrulama',
            headerBackTitle:'.'
            
        }} />
           <Stack.Screen name="OrderDetail"  component={OrderDetails}options={{
            title:'Sipariş Detayı',
            headerBackTitle:'.'
            
        }} />
         <Stack.Screen name="RentOrderDetail"  component={RentOrderDetails}options={{
          title:'Rezervasyon Detayı',
          headerBackTitle:'.'
          
      }} />
      <Stack.Screen name="Suggest"  component={Suggests} 
            options={({route})=>({
              animationTypeForReplace:'pop',
              title:route.params.name
              
              
          })}
      
      />
         <Stack.Screen name="OfferList"  component={OfferList} 
            options={({route})=>({
               headerBackTitleVisible: false,
              animationTypeForReplace:'pop',
              title:'Kampanya Listele'
              
              
          })}
      
      />






    </Stack.Group>






        <Stack.Screen name="CategorieChoose"  component={CategoryChoose} 
            options={({route})=>({
               headerBackTitleVisible: false,
              animationTypeForReplace:'pop',
              title:route.params.name
              
              
          })}
      
      />
          <Stack.Screen name="CategorieStatu"  component={CategorieStatus} 
            options={({route})=>({
               headerBackTitleVisible: false,
              animationTypeForReplace:'pop',
              title:route.params.name
              
              
          })}
      
      />
        <Stack.Screen name="AdvertPlace"  component={AdvertsPlace} 
            options={({route})=>({
               headerBackTitleVisible: false,
              animationTypeForReplace:'pop',
              title:route.params.name
                
              
          })}
      


      />
         <Stack.Screen name="AdvertForm"  
            options={({route})=>({
               headerBackTitleVisible: false,
              animationTypeForReplace:'pop',
              
                
              
          })}
      
            

      >
        {(props) => <AdvertForm />}
      </Stack.Screen>

         <Stack.Screen name="ShareAdvert" 
       options={({route})=>({
         headerBackTitleVisible: false,
        animationTypeForReplace:'pop',
        title:''
        
        
    })}
  
  >

{(props) => <ShareScreenProject {...props} />}
  </Stack.Screen>


  <Stack.Screen name="AdvertStatu"  component={AdvertStatu} options={({route})=>({
     headerBackTitleVisible: false,
    title:route.params.name
  })} 
 
  />  

<Stack.Screen name="AdvertType"  component={AdvertType} options={({route})=>({
    headerBackTitleVisible: false,
    title:route.params.name
  })} 
 
  /> 
  <Stack.Screen name="RealtorAdd"  component={RealtorAdvertAdd} options={({route})=>({
      headerBackTitleVisible: false,
    title:'İlanı Paylaş'
  })} 
 
  /> 
  <Stack.Screen name="Notifications"  component={Notifications} options={({route})=>({
    title:'Bildirimler'
  })} 
 
  /> 
   <Stack.Screen name='RealtorClubExplore'  component={RealtorClub} options={({route})=>({
    title:'Emlak Kulübü Keşfet'
  })} 
 
  /> 
     <Stack.Screen name='Public'  component={PublicPage} options={({route})=>({
        title:route.params.name
  })} 
 
  /> 
     <Stack.Screen name='SubCategory'  component={SubCategory} options={({route})=>({
        title:route.params.name
  })} 
 
  /> 
   
      <Stack.Screen name='HomeList'  component={HomeList} options={({route})=>({
        headerShown:false
  })} 
 
  /> 
     <Stack.Screen name='SubCategoryChild'  component={SubCategoryChild} options={({route})=>({
        title:route.params.name
  })} 
 
  />
      <Stack.Screen name='Search'  component={Search} options={({route})=>({
        headerShown:false
  })} 
 
  /> 
      <Stack.Screen name='AllProject'  component={AllProjects} options={({route})=>({
        headerShown:false,
    title:route.params.name
  })} 
 
  /> 
      <Stack.Screen name='FilterScrenn'  component={FilterScreen} options={({route})=>({
      
    title:route.params.name
  })} 
 
  /> 
  <Stack.Screen name='EditAdvert' component={EditAdvert} options={()=>({
    title:'İlanları Düzenle',
    headerBackTitle:'.'
  })}/>
  <Stack.Screen name='Archieve' component={Archieve}/>
  <Stack.Screen name='EditProject' component={EditProject}/>
  <Stack.Screen name='SellAndRent' component={SellAndRentFormPage}
  options={({route})=>({
        title:'Sat Kirala'
  
  })}  />
    <Stack.Screen name='SendSellAndRentForm' component={SendSellAndRentForm}
  options={({route})=>({
        title:'Sat Kirala Formu'
  
  })}  />
      <Stack.Screen name='SeeNeigbour' component={SeeNeigbourhood}
  options={({route})=>({
        title:'Komuşumu Gör'
  
  })}  />
        <Stack.Screen name='SwapScreen' component={SwapScreen}
  options={({route})=>({
        title:'Gelen Takas Başvurularım'
  
  })}  />
         <Stack.Screen name='ComeSwapScreen' component={ComeSwapScreen}
  options={({route})=>({
        title:'Takas Başvurularım'
  
        
  })}  />
           <Stack.Screen name='AllRealtor' component={AllRealtorAdverts}
  options={({route})=>({
        headerShown:false
  
  })}  />
             <Stack.Screen name='UploadAdsPicture' component={UploadAdsPicture}
             
  options={({route})=>({
  // Geri düğmesini kaldırır
    headerBackTitleVisible: false,
        title:'Reklam Görseli Oluştur',
        headerStyle:{
          backgroundColor:"#F5F5F7",
          
        }
  })}  />
              <Stack.Screen name='AdsPictureList' component={AdsPictureList}
  options={({route})=>({
        title:'Reklam Görselleri',
    headerStyle:{
          backgroundColor:"#F5F5F7",
          
        }
  })}  />
             <Stack.Screen name='UserTypes' component={UserTypeList}
  options={({route})=>({
        title:'Kullanıcı Tipleri',
    headerStyle:{
          backgroundColor:"#F5F5F7",
          
        }
  })}  />
          <Stack.Screen name='PaymentScreen' component={PaymentScreen}
  options={({route})=>({
    title:'Sepet Özeti Ve Onay',
       headerStyle:{
        backgroundColor:'#f7f7f7',
        
       }
  
  })}  />
  <Stack.Screen name='Forgot' component={ForgotPassword}
   options={({route})=>({
    title:'Şifremi Unuttum',
    headerShown:false,
       headerStyle:{
        backgroundColor:'#f7f7f7',
        
       }
  
  })}
  />
           <Stack.Screen name='UpdateUserType' component={UpdateUserType}
  options={({route})=>({
    headerBackTitleVisible: false,
        headerShown:true,
        title:'Kullanıcı Güncelle'
  
  })}  />
             <Stack.Screen name='UpdateUsers' component={UpdateUsers}
  options={({route})=>({
    headerBackTitleVisible: false,
        headerShown:true,
        title:'Alt Kullanıcı Güncelle'
  
  })}  />
              <Stack.Screen name='UsersList' component={UsersList}
  options={({route})=>({
    headerBackTitleVisible: false,
        headerShown:true,
        title:'Alt Kullanıcılar'
  
  })}  />
  
</Stack.Navigator>

</NavigationContainer>
</GestureHandlerRootView>

  );
   
  



}

  


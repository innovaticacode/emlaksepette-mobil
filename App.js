import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput ,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
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
import { useState } from 'react';
import MyProjectAdverts from './pages/Home/ProfilePages/MyProjectAdverts';
import MyRealtorAdverts from './pages/Home/ProfilePages/MyRealtorAdverts';
import Offer from './pages/Home/ProfilePages/Offer';
import CreateUserType from './pages/Home/ProfilePages/CreateUserType';
import CreateUser from './pages/Home/ProfilePages/CreateUser';
import AdsPictures from './pages/Home/ProfilePages/AdsPictures';
const Stack = createNativeStackNavigator();

export default function App({route}) {
  const [İsLoggedIn, setİsLoggedIn] = useState(false)
  return (
    
    <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Home" component={Home}options={{
    headerShown:false
  }} />
  <Stack.Screen name="Login"  component={Login} options={{
      title:'Giriş Yap'
  }} />
  <Stack.Screen name="Emlak"  component={Emlakİlanı} options={{
    headerShown:false
  }} />
  <Stack.Screen name="Proje"  component={Projeİlanı} options={{
    headerShown:false
  }} />
  <Stack.Screen name="Details"  component={Details} options={({route})=>({
    title:route.params.name
  })} 
 
  />
    <Stack.Screen name="PostDetails"  component={PostDetail}
  
    options={({route})=>({
      headerBackTitle:'.',
        title:route.params.name
        
        
    })} />
   <Stack.Screen name="Register"  component={Register}options={{
    headerShown:false
  }} />
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
        title:'Emlak İlanı'
   
  }} />
    <Stack.Screen name="Collecitons"  component={Collections}options={{
        title:'Koleksiyonlarım'
   
  }} />
    <Stack.Screen name="DashBord"  component={Panel}options={{
        title:'Gösterge Paneli'
   
  }} />
    <Stack.Screen name="Forms"  component={SellAndRentForms}options={{
        title:'Sat Kirala Formlarım'
   
  }} />
    <Stack.Screen name="Sell"  component={Sell}options={{
        title:'Satış'
   
  }} />
    <Stack.Screen name="Rent"  component={Rent}options={{
        title:'Kiralık'
   
  }} />
     <Stack.Screen name="UpdateProfile"  component={UpdateProfile}options={{
        title:'Profili Güncelle'
   
  }} />
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
        <Stack.Screen name="Offer"  component={Offer}options={{
            title:'İlanda Kampanya Yap'
        }} />
         <Stack.Screen name="CreateUserType"  component={CreateUserType}options={{
            title:'Kullanıcı Tipi Oluştur'
        }} />
        <Stack.Screen name="CreateUser"  component={CreateUser}options={{
            title:'Alt Kullanıcı Oluştur'
        }} />
          <Stack.Screen name="AdsPicture"  component={AdsPictures}options={{
            title:'Reklam Görselleri'
        }} />
</Stack.Navigator>
</NavigationContainer>

  );
   
  



}

  


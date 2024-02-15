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
const Stack = createNativeStackNavigator();
export default function App() {
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
  <Stack.Screen name="Details"  component={Details} options={{
      title:'Proje Detay'
  }} />
    <Stack.Screen name="PostDetails"  component={PostDetail} options={{
      title:'Proje Konut Detay'
  }} />
   <Stack.Screen name="Register"  component={Register}options={{
    headerShown:false
  }} />
    <Stack.Screen name="Profile"  component={Profile}options={{
      title:'Profil'
  }} />
    <Stack.Screen name="ShopProfile"  component={ShoppingProfile}options={{
        title:'Mağaza Profili'
   
  }} />
    <Stack.Screen name="Realtor details"  component={RealtorDetails}options={{
        title:'Emlak İlanı'
   
  }} />
   
</Stack.Navigator>
</NavigationContainer>

  );
   
  



}

  


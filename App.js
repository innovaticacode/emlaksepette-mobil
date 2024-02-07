import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput ,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import Header from './components/Header';
import SliderBar from './components/SliderBar';
import Posts from './components/Posts';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home/Home'

import Emlakİlanı from './pages/Home/İlanYükleme/Emlakİlanı';
import Projeİlanı from './pages/Home/İlanYükleme/Projeİlanı';
import Details from './pages/Home/Details';
import Login from './pages/Home/Login&Register/Login';
import Register from './pages/Home/Login&Register/Register';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Home" component={Home}options={{
    headerShown:false
  }} />
  <Stack.Screen name="Login"  component={Login} options={{
    headerShown:false
  }} />
  <Stack.Screen name="Emlak"  component={Emlakİlanı} options={{
    headerShown:false
  }} />
  <Stack.Screen name="Proje"  component={Projeİlanı} options={{
    headerShown:false
  }} />
  <Stack.Screen name="Details"  component={Details} options={{
    
  }} />
   <Stack.Screen name="Register"  component={Register}options={{
    headerShown:false
  }} />
   
</Stack.Navigator>
</NavigationContainer>
  );
   
  



}

  


import { View, Text ,ImageBackground,TouchableOpacity} from 'react-native'
import {React,useState} from 'react'
import Icon from "react-native-vector-icons/AntDesign";

import PagerView from 'react-native-pager-view';
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
export default function DetailsPicture() {
  const [heart, setHeart] = useState('hearto');
  const [bookmark, setbookmark] = useState('bookmark-o')
  const changeHeart = () => {
    setHeart(heart === 'hearto' ? 'heart' : 'hearto');
   
  };
  const changeBookmark=()=>{
    setbookmark(bookmark==='bookmark-o' ? 'bookmark': 'bookmark-o')
  }
  return (
    <View
        style={{ width: "100%", height: 250, borderRadius: 20, padding: 5}}
      >
        <ImageBackground
          source={require('./images/home.jpg')}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
        />
        <View
          style={{
            width: 50,
            height: 150,
            backgroundColor: "transparent",
            position: "absolute",
            right: 20,
            top: 43,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 20,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                justifyContent: "center",
                width: 40,
                height: 40,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Icon name="sharealt" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeHeart}>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Heart name={heart} size={20} color={heart=='hearto'?'black':'red'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={changeBookmark}>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Bookmark name={bookmark} size={20} color={bookmark=='bookmark-o'?'black':'red'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}
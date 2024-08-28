import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  PanResponder,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Lightbox from "react-native-lightbox";

export default function CommentItem({ username, comment, date, rate, image }) {
  const [stars, setStars] = useState([false, false, false, false, false]);

  const handleLastStarPress = () => {
    const allYellow = stars.every((star) => star === true);
    const newStars = allYellow
      ? [false, false, false, false, false]
      : [true, true, true, true, true];
    setStars(newStars);
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    // Tarih formatını ayarla
    const options = { weekday: "long", month: "long", day: "numeric" };

    // Tarihi belirtilen formatta formatla
    const formattedDate = dateObject.toLocaleDateString("tr-TR", options); // 'tr-TR' Türkçe dilini temsil eder, dil ayarını kendi ihtiyacınıza göre değiştirebilirsiniz

    return formattedDate;
  };
  const numStars = Math.round(rate);
  const [commentImages, setcommentImages] = useState([]);
  useEffect(() => {
    const Images = username && date && comment && image && JSON.parse(image);
    setcommentImages(Images);
  }, [comment]);
  console.log(commentImages + "dizi efsd");

  const ApıUrl = "https://private.emlaksepette.com/";
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } // useNativeDriver: true ise, animasyonun natif sürücüde çalışmasını sağlar
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  return (
    <View style={styles.commentContainer}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 4 }}>
          {[...Array(numStars)].map((_, index) => (
            <Ionicons key={index} name="star" size={12} color="gold" />
          ))}
        </View>
        <View>
          <Text style={{ fontSize: 11, color: "grey" }}>
            {formatDate(date)}
          </Text>
        </View>
      </View>
      <View style={{ gap: 5 }}>
        <View>
          <Text style={{ fontSize: 11, color: "#333" }}>{username}</Text>
        </View>
        <View>
          <Text numberOfLines={3}>{comment}</Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "row", width: "100%", gap: 15 }}>
          {/* {
                    commentImages.map((image,i)=>(
                  <View style={{width:40,height:40,backgroundColor:'red'}}>
                            <Lightbox>
                                <Animated.View
          style={{
            
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
                <ImageBackground
                  style={{width:'100%',height:'100%'}}
                  source={{ uri: `${ApıUrl}${image.replace(
                    "public/",
                    "storage/"
                  )}` }}
                />
                </Animated.View>
              </Lightbox>
              </View>
                    
                    ))
                  } */}
        </View>
      </View>
    </View>
    // <View style={styles.commentContainer}>
    //   <View
    //     style={{
    //       width: "100%",
    //       backgroundColor: "#F9F9F9",
    //       padding: 10,
    //       borderRadius: 5,
    //       height: 120,
    //     }}
    //   >
    //     <View
    //       style={{
    //         flex: 0.4 / 2,
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <View style={{ flex: 0.5, flexDirection: "row" }}>
    //         {[...Array(numStars)].map((_, index) => (
    //           <Ionicons key={index} name="star" size={9} color="gold" />
    //         ))}
    //       </View>

    //       <View style={{ flex: 1 / 2, alignItems: "flex-end" }}>
    //         <Text style={{ fontSize: 13, color: "grey" }}>
    //           {formatDate(date)}
    //         </Text>
    //       </View>
    //     </View>
    //     <View style={{ flex: 0.3 / 2, width: "100%" }}>
    //       <Text style={{ fontSize: 11, color: "#333" }}>{username}</Text>
    //     </View>
    //     <View style={{ flex: 1.5 / 2, paddingTop: 5 }}>
    //       <Text numberOfLines={3}>{comment}</Text>
    //     </View>
    //   </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  commentContainer: {
    width: 250,
    gap: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
  },
});
{
  /* {stars.map((selected, index) => (
     
  <Ionicons
  key={index}
    name={'md-star'}
    size={10}
    color={'yellow'}
  />

))}   */
}

import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native-elements";
import Swiper from "react-native-swiper";
import { ScrollView } from "react-native-gesture-handler";
import CommentItem from "../RealtorPages/CommentItem";

export default function ShopVitrin({ data }) {
  const ApiUrl = "https://test.emlaksepette.com/storage/store_banners/";
  const [banners, setBanners] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      if (data.data.banners) {
        setBanners(data.data.banners);
      }
      if (data.data.owners) {
        setOwners(data.data.owners);
      }
    }
  }, [data]);

  return (
    <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
      {banners.length > 0 && (
        <View style={{ height: 245 }}>
          <Swiper autoplay>
            {banners.map((banner, index) => (
              <View key={index} style={{ width: "100%", height: 200 }}>
                <Image
                  source={{
                    uri: `${ApiUrl}${banner.image}`,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
              </View>
            ))}
          </Swiper>
        </View>
      )}

      {owners.length > 0 && (
        <View style={[{ top: 5 }, styles.shadow]}>
          <ScrollView
            horizontal
            contentContainerStyle={{ padding: 10, gap: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {owners.map((itemComment, index) => (
              <CommentItem
                username=""
                key={index}
                comment={itemComment.comment}
                date={itemComment.created_at}
                rate={itemComment.rate}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: "100%",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  commentPoint: {
    width: "100%",
    backgroundColor: "#ececec",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    borderRadius: 10,
  },
  point: {
    flex: 0.8 / 2,
    display: "flex",
  },
  stars: {
    flex: 1.2 / 2,
    gap: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
  },
  progressText: {
    position: "absolute",
    alignSelf: "center",
    lineHeight: 30,
    color: "white",
  },
  star: {
    top: 3,
  },
});

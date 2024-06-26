import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { React, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import Star from "react-native-vector-icons/FontAwesome";
import Map from "../../../components/Map";
import ShopComment from "./ShopComment";
import ProfileMap from "./ProfileMap";
import { Skeleton } from "@rneui/themed";
import CommentItem from "../RealtorPages/CommentItem";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ShopInfo({ data, loading }) {
  const { width, height } = Dimensions.get("window");
  const dateTimeString = data?.data?.created_at;
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Months are zero-based, so we add 1
  const year = dateTime.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  console.log(data?.data.latitude);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <ScrollView
      contentContainerStyle={{ height: 900 }}
      scrollEnabled={loading ? true : false}
    >
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {loading ? (
            <>
              <View
                style={[
                  styles.ınformation,
                  { borderRadius: 10 },
                  styles.commentArea,
                ]}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#E92C2A",
                    width: width > 400 ? "10%" : "11%",
                    left: 10,
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <Icon name="calendar" size={20} color={"white"} />
                </View>
                <View style={{ gap: 5, left: 20 }}>
                  <Text>Katılma Tarihi</Text>
                  <Text style={{ fontWeight: "600" }}>{formattedDate}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.ınformation,
                  {
                    top: 10,
                    backgroundColor: "#e7ebee",
                    padding: 10,
                    borderWidth: 0,
                    borderRadius: 5,
                  },
                ]}
              >
                <Skeleton
                  width={"10%"}
                  skeletonStyle={{
                    backgroundColor: "#ced4da",
                    borderRadius: 5,
                  }}
                  height={40}
                  children={
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: "#E92C2A",
                        width: width > 400 ? "10%" : "11%",
                        left: 10,
                        alignItems: "center",
                      }}
                    >
                      <Icon name="calendar" size={20} color={"white"} />
                    </View>
                  }
                />

                <View style={{ gap: 10 }}>
                  <Skeleton
                    width={60}
                    height={10}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                  <Skeleton
                    width={70}
                    height={10}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
            </>
          )}

          {loading ? (
            <>
              <View
                style={[
                  styles.ınformation,
                  { borderRadius: 10 },
                  styles.commentArea,
                ]}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#E92C2A",
                    width: width > 400 ? "10%" : "12%",
                    height: "70%",
                    left: 10,
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <Icon name="phone" size={20} color={"white"} />
                </View>
                <View style={{ gap: 5, left: 20 }}>
                  <Text>İletişim</Text>
                  <Text style={{ fontWeight: "600" }}>
                    Telefon : {data?.data?.phone} {data?.data?.mobile_phone}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>
                    E-Mail : {data?.data?.email}{" "}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.ınformation,
                  styles.commentArea,
                  { backgroundColor: "#e7ebee" },
                ]}
              >
                <Skeleton
                  width={"10%"}
                  style={{ left: 5 }}
                  height={40}
                  skeletonStyle={{
                    backgroundColor: "#ced4da",
                    borderRadius: 5,
                  }}
                />

                <View style={{ gap: 5 }}>
                  <Skeleton
                    width={60}
                    height={10}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                  <Skeleton
                    width={80}
                    height={10}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                  <Skeleton
                    width={100}
                    height={10}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
            </>
          )}

          {loading ? (
            <>
              <View
                style={[
                  styles.ınformation,
                  { borderRadius: 10 },
                  styles.commentArea,
                ]}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#E92C2A",
                    width: width > 400 ? "10%" : "12%",
                    height: "100%",
                    left: 10,
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <Icon name="map-pin" size={20} color={"white"} />
                </View>
                <View style={{ gap: 5, left: 20 }}>
                  <Text>Konum</Text>
                  <Text style={{ fontWeight: "600" }}>
                    {data?.data?.town?.sehir_title}/{" "}
                    {data?.data?.district?.ilce_title}/{" "}
                    {data?.data?.neighborhood?.mahalle_title}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.ınformation,
                  { top: 50 },
                  styles.commentArea,
                  { backgroundColor: "#e7ebee" },
                ]}
              >
                <Skeleton
                  animation="pulse"
                  width={40}
                  height={40}
                  style={{ left: 6 }}
                  rounded
                  skeletonStyle={{
                    backgroundColor: "#ced4da",
                    borderRadius: 5,
                  }}
                />
                <View style={{ gap: 5 }}>
                  <Skeleton
                    width={40}
                    height={12}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                  <Skeleton
                    width={195}
                    height={12}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
            </>
          )}
        </View>
        {loading ? (
          <>
            <View
              style={[
                { width: "100%", height: 150, borderRadius: 10 },
                styles.shadow,
              ]}
            >
              <MapView
                initialRegion={{
                  latitude:
                    parseFloat(
                      data?.data?.latitude == null
                        ? 38.9637
                        : data?.data?.latitude
                    ) || 0,
                  longitude:
                    parseFloat(
                      data?.data?.longitude == null
                        ? 35.2433
                        : data?.data?.longitude
                    ) || 0,
                  latitudeDelta: data?.data?.latitude == null ? 8.0 : 0.0922,
                  longitudeDelta: data?.data?.lingitude == null ? 8.0 : 0.0421,
                  altidute: 50.03281021118164,
                }}
                style={{ flex: 1 }}
              >
                <Marker
                  coordinate={{
                    latitude:
                      parseFloat(
                        data?.data?.latitude == null || undefined
                          ? ""
                          : data?.data?.latitude
                      ) || 0,
                    longitude:
                      parseFloat(
                        data?.data?.longitude == null || undefined
                          ? ""
                          : data?.data?.longitude
                      ) || 0,
                  }}
                  title={data?.name}
                  description="Proje Konumu"
                />
              </MapView>
              {/* <ProfileMap mapData={data}/>   */}
            </View>
          </>
        ) : (
          <Skeleton
            width={"100%"}
            height={150}
            style={{ top: 60, backgroundColor: "#e0e2e5" }}
            skeletonStyle={{ backgroundColor: "#F0EFF1", borderRadius: 5 }}
          />
        )}
      </View>

      {loading ? (
        <>
          <View style={[styles.comment, { borderRadius: 10 }]}>
            <View style={styles.commentArea}>
              <Text
                style={{ color: "#666666", fontWeight: "600", display: "none" }}
              >
                Bu mağaza için henüz yorum yapılmadı
              </Text>
              <View style={{ padding: 10 }}>
                <View>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", bottom: 10 }}
                  >
                    Tüm yorumlar
                  </Text>
                </View>
                <View style={styles.commentPoint}>
                  <View style={styles.point}>
                    <View
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                        4.6
                      </Text>
                      <Text
                        style={{ top: 5, color: "grey", fontWeight: "400" }}
                      >
                        /5
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Star name="star-o" size={18} />
                      <Star name="star-o" size={18} />
                      <Star name="star-o" size={18} />
                      <Star name="star-o" size={18} />
                      <Star name="star-o" size={18} />
                    </View>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>
                      Ortalama
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center" }}>
                      ( {data?.data?.owners.length} Yorum)
                    </Text>
                  </View>
                  <View style={styles.stars}>
                    <View
                      style={{ flex: 1.9 / 2, justifyContent: "space-around" }}
                    >
                      <View>
                        <View
                          style={{
                            width: "100%",
                            height: 4,
                            backgroundColor: "blue",
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            width: "90%",
                            height: 4,
                            backgroundColor: "blue",
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            width: "70%",
                            height: 4,
                            backgroundColor: "blue",
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            width: "60%",
                            height: 4,
                            backgroundColor: "blue",
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            width: "50%",
                            height: 4,
                            backgroundColor: "blue",
                            borderRadius: 20,
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ display: "flex", gap: 3 }}>
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                          }}
                        >
                          <Text>5</Text>
                          <Star name="star-o" size={10} style={styles.star} />
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                          }}
                        >
                          <Text>4</Text>
                          <Star name="star-o" size={10} style={styles.star} />
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                          }}
                        >
                          <Text>3</Text>
                          <Star name="star-o" size={10} style={styles.star} />
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                          }}
                        >
                          <Text>2</Text>
                          <Star name="star-o" size={10} style={styles.star} />
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                          }}
                        >
                          <Text>1</Text>
                          <Star name="star-o" size={10} style={styles.star} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "grey",
                top: 3,
              }}
            ></View>
            <View style={[{ top: 5 }, styles.shadow]}>
              <ScrollView
                horizontal
                contentContainerStyle={{ padding: 10, gap: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {data?.data?.owners.length < 1 ? (
                  <View style={{ width: "100%" }}>
                    <Text style={{ textAlign: "center", color: "red" }}>
                      Bu Mağaza için yorum yapılmadı
                    </Text>
                  </View>
                ) : (
                  data?.data?.owners?.map((itemComment, _index) => (
                    <CommentItem
                      username=""
                      key={_index}
                      comment={itemComment.comment}
                      date={itemComment.created_at}
                      rate={itemComment.rate}
                    />
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.comment, { borderRadius: 10 }]}>
            <View style={styles.commentArea}>
              <Text
                style={{ color: "#666666", fontWeight: "600", display: "none" }}
              >
                Bu mağaza için henüz yorum yapılmadı
              </Text>
              <View style={{ padding: 10 }}>
                <View>
                  <Skeleton width={70} height={10} style={{ bottom: 10 }} />
                </View>
                <View style={styles.commentPoint}>
                  <View
                    style={[styles.point, { alignItems: "center", gap: 5 }]}
                  >
                    <Skeleton
                      width={80}
                      height={30}
                      children={
                        <View
                          style={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                            4.6
                          </Text>
                          <Text
                            style={{ top: 5, color: "grey", fontWeight: "400" }}
                          >
                            /5
                          </Text>
                        </View>
                      }
                    />
                    <Skeleton width={100} height={15} />
                    <Skeleton width={60} height={10} />
                    <Skeleton width={40} height={10} />
                  </View>
                  <View style={styles.stars}>
                    <View
                      style={{ flex: 1.9 / 2, justifyContent: "space-around" }}
                    >
                      <View>
                        <Skeleton width={"100%"} height={5} />
                      </View>
                      <View>
                        <Skeleton width={"100%"} height={5} />
                      </View>
                      <View>
                        <Skeleton width={"100%"} height={5} />
                      </View>
                      <View>
                        <Skeleton width={"100%"} height={5} />
                      </View>
                      <View>
                        <Skeleton width={"100%"} height={5} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "grey",
                top: 3,
              }}
            ></View>
            <View style={[{ top: 5 }, styles.shadow]}>
              <ScrollView
                horizontal
                contentContainerStyle={{ padding: 10, gap: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {data?.data?.owners.length < 1 ? (
                  <View style={{ width: "100%" }}>
                    <Text style={{ textAlign: "center", color: "red" }}>
                      Bu Mağaza için yorum yapılmadı
                    </Text>
                  </View>
                ) : (
                  data?.data?.owners?.map((itemComment, _index) => (
                    <CommentItem
                      username=""
                      key={_index}
                      comment={itemComment.comment}
                      date={itemComment.created_at}
                      rate={itemComment.rate}
                    />
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    height: "auto",
  },
  ınformation: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",

    alignItems: "center",
  },
  comment: {
    width: "100%",
    padding: 10,
  },
  commentArea: {
    backgroundColor: "#FFFFFF",

    paddingVertical: 17,
    paddingHorizontal: 5,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 7,
      },
    }),
  },
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
    borderRadius: 5,
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

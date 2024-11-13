import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { apiUrl, frontEndUriBase } from "../../methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import Basket from "../../../assets/basket.svg";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { Path, Svg } from "react-native-svg";
import {
  clearLocation,
  setCity,
  setLocation,
} from "../../../store/slices/FilterProject/FilterProjectSlice";
import { addDotEveryThreeDigits } from "../../methods/merhod";
import MapFilter from "../MapFilter/MapFilter";

const MapFilterProject = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const nav = useNavigation();
  const location = useSelector((state) => state?.mapFilters?.location);
  const dispatch = useDispatch();
  const [filterMarker, setfilterMarker] = useState([]);

  const [filterLatiude, setfilterLatiude] = useState(null);
  const [filterLongitude, setfilterLongitude] = useState(null);
  const [loading, setloading] = useState(false);
  const GetProjectsInfo = (city, county, neighbourhood) => {
    setloading(true);
    axios
      .get(apiUrl + "featured-projects")
      .then((res) => {
        const data = res?.data?.data;

        const advertFiter = data.filter((item) => {
          // Şehir, ilçe ve mahalleye göre filtreleme koşulları
          const matchCity = city ? item.city_id === city : true;
          const matchCounty = (Array.isArray(county) && county.length<0) ? Array.isArray(county)
            ? county.includes(item.county_id)
            : true:true
          const matchNeighbourhood =(Array.isArray(neighbourhood) && neighbourhood.length<0) ? Array.isArray(neighbourhood)
            ? neighbourhood.includes(item.neighbourhood_id)
            : true:true

          return matchCity && matchCounty && matchNeighbourhood;
        });

        setfilterMarker(advertFiter);
        setMarkers(data);
        console.log("Çalıştı");
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  };
  useEffect(() => {
    GetProjectsInfo(location.city, location.county, location.neigbourhood);
  }, []);
  useEffect(() => {
    setfilterLatiude(filterMarker[0]?.location.split(",")[0]);
    setfilterLongitude(filterMarker[0]?.location.split(",")[1]);
    //r  onChangeCity(location.city)
  }, [GetProjectsInfo]);

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url).catch((err) =>
      console.error("Google Maps açılırken hata oluştu:", err)
    );
  };

  useEffect(() => {
    const unsubscribe = nav.addListener("beforeRemove", () => {
      // Dispatch the action to clear location
      dispatch(clearLocation());
    });

    return unsubscribe;
  }, [nav, dispatch]);

  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [isVisible3, setisVisible3] = useState(false);
  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <MapFilter
            GetProjectsInfo={GetProjectsInfo}
            setfilterLatiude={setfilterLatiude}
            setfilterLongitude={setfilterLongitude}
            setfilterMarker={setfilterMarker}
            filterMarker={filterMarker}
            nav={nav}
            isVisible={isVisible}
            setisVisible={setisVisible}
            isVisible2={isVisible2}
            isVisible3={isVisible3}
            setisVisible2={setisVisible2}
            setisVisible3={setisVisible3}
          />

          {location.city ? (
            filterLatiude && filterLongitude ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: filterLatiude,
                  longitude: filterLongitude,
                  latitudeDelta: 1,
                  longitudeDelta: 2,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {filterMarker.map((marker, _i) => (
                  <Marker
                    key={_i}
                    coordinate={{
                      latitude: parseFloat(marker.location.split(",")[0]),
                      longitude: parseFloat(marker.location.split(",")[1]),
                    }}
                    // title={marker.housing_title}
                    // description={marker.address}
                    onPress={() => {
                      setSelectedMarker(marker);
                    }}
                    pinColor="red" // Kırmızı marker rengi
                  >
                    <View style={styles.markerContainer}>
                      <View style={styles.circle}>
                        <View style={styles.svgWrapper}>
                          <Svg
                            width={30} // SVG genişliği
                            height={30} // SVG yüksekliği
                            viewBox="0 0 55.96 55.68"
                            style={styles.svg}
                          >
                            <Path
                              d="M10.46,24.5h26.64c.14,0,.27,0,.41,0,.66.02,1.02.33,1.01.86-.01.5-.36.8-1,.8-9.37,0-18.74,0-28.11,0-.93,0-1.26-.51-.88-1.36.55-1.27,1.11-2.54,1.68-3.81.11-.26.14-.49.07-.78-1.26-5.55-2.51-11.1-3.76-16.65-.22-.97-.52-1.21-1.52-1.21-1.34,0-2.67,0-4.01,0C.36,2.35.01,2.07,0,1.56c0-.52.37-.84,1.02-.85,1.43,0,2.86-.01,4.3,0,1.43.01,2.46.84,2.78,2.24,1.22,5.4,2.43,10.8,3.62,16.2.12.55.31.72.89.72,7.26-.02,14.52-.02,21.78,0,.44,0,.62-.1.72-.57,1.03-4.61,2.09-9.22,3.14-13.82.05-.22.1-.46.22-.65.25-.37.63-.45,1.02-.27.43.2.53.57.43,1.02-.38,1.67-.76,3.35-1.14,5.02-.76,3.33-1.53,6.65-2.29,9.98-.18.8-.36.94-1.2.94-7.61,0-15.21,0-22.82-.01-.55,0-.83.14-1.01.67-.27.76-.64,1.48-1,2.32h0Z"
                              fill="#ea2b2e" // Renk ayarını buradan yapabilirsiniz
                            />
                            <Path
                              d="M30.15,4.65c0-.8,0-1.48,0-2.15,0-.59.3-.91.81-.91.51,0,.81.32.82.91.01.91.03,1.82,0,2.72-.02.47.11.78.52,1.05.71.46,1.38.99,2.06,1.5.61.45.75.91.42,1.35-.32.43-.82.42-1.43-.02-3.15-2.31-6.3-4.61-9.44-6.93-.36-.27-.57-.26-.93,0-3.17,2.34-6.36,4.66-9.53,6.99-.36.26-.72.39-1.12.15-.3-.17-.39-.46-.36-.79.03-.27.17-.46.38-.61,3.51-2.56,7.02-5.13,10.53-7.7.45-.33.85-.23,1.27.08,1.85,1.36,3.71,2.72,5.57,4.07.1.08.22.14.44.29h0Z"
                              fill="#ea2b2e"
                            />
                            <Path
                              d="M23.44,16.5h-6.15c-.72,0-1.1-.28-1.11-.8,0-.53.39-.84,1.09-.84,4.12,0,8.24,0,12.36,0,.44,0,.81.1.99.54.13.32.05.6-.17.86-.22.25-.5.25-.8.25-2.07,0-4.14,0-6.21,0h0Z"
                              fill="#ea2b2e"
                            />
                            <Path
                              d="M23.44,10.09c1.62,0,3.25,0,4.87,0,.65,0,.97.27.98.8s-.33.84-.96.84c-3.27,0-6.54,0-9.81,0-.62,0-.98-.31-.99-.82,0-.54.34-.82,1.02-.82,1.62,0,3.25,0,4.87,0h0Z"
                              fill="#ea2b2e"
                            />
                            <Path
                              d="M16.3,27.98c-2.1,0-3.83,1.73-3.85,3.84-.02,2.11,1.74,3.86,3.88,3.86,2.14,0,3.87-1.73,3.87-3.86,0-2.12-1.75-3.84-3.9-3.83h0ZM16.34,34.01c-1.24,0-2.22-.96-2.22-2.18,0-1.2,1.03-2.22,2.22-2.22,1.17,0,2.17,1,2.19,2.19.02,1.23-.95,2.21-2.18,2.21h0Z"
                              fill="#ea2b2e"
                            />
                            <Path
                              d="M30.5,27.98c-2.1,0-3.82,1.72-3.83,3.84-.02,2.12,1.74,3.87,3.87,3.86,2.16,0,3.86-1.72,3.85-3.87,0-2.14-1.74-3.84-3.89-3.83h0ZM30.55,34.01c-1.25,0-2.22-.94-2.22-2.17,0-1.21,1-2.22,2.21-2.22,1.19,0,2.22,1.04,2.21,2.23,0,1.19-.99,2.16-2.19,2.16h0Z"
                              fill="#ea2b2e"
                            />
                          </Svg>
                        </View>
                      </View>
                      <View style={styles.pointer} />
                    </View>
                  </Marker>
                ))}
              </MapView>
            ) : (
              <ActivityIndicator />
            )
          ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 39.925533,
                longitude: 32.866287,
                latitudeDelta: 20,
                longitudeDelta: 13,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              {markers.map((marker, _i) => (
                <Marker
                  key={_i}
                  coordinate={{
                    latitude: parseFloat(marker.location.split(",")[0]),
                    longitude: parseFloat(marker.location.split(",")[1]),
                  }}
                  // title={marker.housing_title}
                  // description={marker.address}
                  onPress={() => {
                    setSelectedMarker(marker);
                  }}
                  pinColor="red" // Kırmızı marker rengi
                >
                  <View style={styles.markerContainer}>
                    <View style={styles.circle}>
                      <View style={styles.svgWrapper}>
                        <Svg
                          width={30} // SVG genişliği
                          height={30} // SVG yüksekliği
                          viewBox="0 0 55.96 55.68"
                          style={styles.svg}
                        >
                          <Path
                            d="M10.46,24.5h26.64c.14,0,.27,0,.41,0,.66.02,1.02.33,1.01.86-.01.5-.36.8-1,.8-9.37,0-18.74,0-28.11,0-.93,0-1.26-.51-.88-1.36.55-1.27,1.11-2.54,1.68-3.81.11-.26.14-.49.07-.78-1.26-5.55-2.51-11.1-3.76-16.65-.22-.97-.52-1.21-1.52-1.21-1.34,0-2.67,0-4.01,0C.36,2.35.01,2.07,0,1.56c0-.52.37-.84,1.02-.85,1.43,0,2.86-.01,4.3,0,1.43.01,2.46.84,2.78,2.24,1.22,5.4,2.43,10.8,3.62,16.2.12.55.31.72.89.72,7.26-.02,14.52-.02,21.78,0,.44,0,.62-.1.72-.57,1.03-4.61,2.09-9.22,3.14-13.82.05-.22.1-.46.22-.65.25-.37.63-.45,1.02-.27.43.2.53.57.43,1.02-.38,1.67-.76,3.35-1.14,5.02-.76,3.33-1.53,6.65-2.29,9.98-.18.8-.36.94-1.2.94-7.61,0-15.21,0-22.82-.01-.55,0-.83.14-1.01.67-.27.76-.64,1.48-1,2.32h0Z"
                            fill="#ea2b2e" // Renk ayarını buradan yapabilirsiniz
                          />
                          <Path
                            d="M30.15,4.65c0-.8,0-1.48,0-2.15,0-.59.3-.91.81-.91.51,0,.81.32.82.91.01.91.03,1.82,0,2.72-.02.47.11.78.52,1.05.71.46,1.38.99,2.06,1.5.61.45.75.91.42,1.35-.32.43-.82.42-1.43-.02-3.15-2.31-6.3-4.61-9.44-6.93-.36-.27-.57-.26-.93,0-3.17,2.34-6.36,4.66-9.53,6.99-.36.26-.72.39-1.12.15-.3-.17-.39-.46-.36-.79.03-.27.17-.46.38-.61,3.51-2.56,7.02-5.13,10.53-7.7.45-.33.85-.23,1.27.08,1.85,1.36,3.71,2.72,5.57,4.07.1.08.22.14.44.29h0Z"
                            fill="#ea2b2e"
                          />
                          <Path
                            d="M23.44,16.5h-6.15c-.72,0-1.1-.28-1.11-.8,0-.53.39-.84,1.09-.84,4.12,0,8.24,0,12.36,0,.44,0,.81.1.99.54.13.32.05.6-.17.86-.22.25-.5.25-.8.25-2.07,0-4.14,0-6.21,0h0Z"
                            fill="#ea2b2e"
                          />
                          <Path
                            d="M23.44,10.09c1.62,0,3.25,0,4.87,0,.65,0,.97.27.98.8s-.33.84-.96.84c-3.27,0-6.54,0-9.81,0-.62,0-.98-.31-.99-.82,0-.54.34-.82,1.02-.82,1.62,0,3.25,0,4.87,0h0Z"
                            fill="#ea2b2e"
                          />
                          <Path
                            d="M16.3,27.98c-2.1,0-3.83,1.73-3.85,3.84-.02,2.11,1.74,3.86,3.88,3.86,2.14,0,3.87-1.73,3.87-3.86,0-2.12-1.75-3.84-3.9-3.83h0ZM16.34,34.01c-1.24,0-2.22-.96-2.22-2.18,0-1.2,1.03-2.22,2.22-2.22,1.17,0,2.17,1,2.19,2.19.02,1.23-.95,2.21-2.18,2.21h0Z"
                            fill="#ea2b2e"
                          />
                          <Path
                            d="M30.5,27.98c-2.1,0-3.82,1.72-3.83,3.84-.02,2.12,1.74,3.87,3.87,3.86,2.16,0,3.86-1.72,3.85-3.87,0-2.14-1.74-3.84-3.89-3.83h0ZM30.55,34.01c-1.25,0-2.22-.94-2.22-2.17,0-1.21,1-2.22,2.21-2.22,1.19,0,2.22,1.04,2.21,2.23,0,1.19-.99,2.16-2.19,2.16h0Z"
                            fill="#ea2b2e"
                          />
                        </Svg>
                      </View>
                    </View>
                    <View style={styles.pointer} />
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
          {selectedMarker && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={!!selectedMarker}
              onRequestClose={() => setSelectedMarker(null)}
            >
              <TouchableWithoutFeedback onPress={() => setSelectedMarker(null)}>
                <View style={styles.modalBackdrop}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      style={styles.modalContent}
                      onPress={() => {
                        nav.navigate("Details", {
                          ProjectId: selectedMarker.id,
                        });
                        setTimeout(() => {
                          setSelectedMarker(null);
                        }, 500);
                      }}
                    >
                      <Image
                        source={{
                          uri: `${frontEndUriBase}/${selectedMarker.image.replace(
                            "public/",
                            "storage/"
                          )}`,
                        }} // Modal'da resmi gösteriyoruz
                        style={styles.modalImage}
                        borderRadius={10}
                      />
                      <View
                        style={{
                          gap: 5,
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ gap: 5 }}>
                          <Text style={styles.header} numberOfLines={2}>
                            {selectedMarker.project_title}
                          </Text>
                          <Text style={styles.modalDescription}>
                            {selectedMarker?.city?.title} /{" "}
                            {selectedMarker?.county?.ilce_title}
                          </Text>
                          <Text style={styles.modalDescription}>
                            Proje Konut Sayısı {selectedMarker?.room_count}
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={[
                              styles.modalDescription,
                              { color: "#EA2C2E", fontSize: 15 },
                            ]}
                          >
                            Min:
                            {addDotEveryThreeDigits(selectedMarker?.min_price)}₺
                            - Max:
                            {addDotEveryThreeDigits(selectedMarker?.max_price)}
                          </Text>
                        </View>
                      </View>
                      {/* <View style={styles.textContainer}>
                    <Text style={styles.modalTitle}>
                      {selectedMarker.project_title}
                    </Text>
                    <Text style={styles.modalDescription}>
                      {selectedMarker?.city?.title} / {selectedMarker?.county?.ilce_title} 
                    </Text>
                  </View> */}
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                        onPress={() => {
                          openGoogleMaps(
                            parseFloat(selectedMarker.location.split(",")[0]),
                            parseFloat(selectedMarker.location.split(",")[1])
                          );
                        }}
                      >
                        <Text style={styles.buttonText}>Yol Tarifi Al</Text>
                        <Icon name="location-arrow" color={"#EA2C2E"} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.buttonClose,
                          { backgroundColor: "#EA2C2E" },
                        ]}
                        onPress={() => {
                          nav.navigate("Details", {
                            ProjectId: selectedMarker.id,
                          });
                          setTimeout(() => {
                            setSelectedMarker(null);
                          }, 500);
                        }}
                      >
                        <Text style={[styles.buttonText, { color: "white" }]}>
                          İlana Git
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "500",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Modal arka planını karartıyoruz
  },
  modalView: {
    marginTop: "auto",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    flexDirection: "row",
    height: 100,
    marginBottom: 25,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {},
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 13,
    color: "#404040",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Butonlar arasına boşluk eklemek için
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFDBDB",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5, // Butonlar arasına boşluk eklemek için
    flex: 1, // Butonların genişliğini eşit yapar
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    color: "#EA2C2E",
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    borderRightWidth: 1,
    borderColor: "#7C7C7C",
    flexDirection: "row",

    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#7C7C7C",
    fontSize: 14,
    fontWeight: "600",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Ensure relative position for absolute children
  },
  svg: {
    transform: [{ translateX: 3 }, { translateY: 5 }], // Fine-tuning adjustment
  },
  svgWrapper: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  svgContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 7.5,
    borderRightWidth: 7.5,
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
    marginTop: -1,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderColor: "#7C7C7C",
    padding: 10,
    fontSize: 14,
    margin: "0 auto",

    borderRightWidth: 2,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#7C7C7C",
    padding: 10,
    marginHorizontal: 5,
    fontSize: 14,
    margin: "0 auto",
    borderRightWidth: 2,
  },
});
export default MapFilterProject;

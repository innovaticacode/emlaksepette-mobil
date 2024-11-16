import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { pickerSelectStyles, styles } from "./MapFilter.style";
import { apiUrl } from "../../methods/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { clearLocation, setLocation } from "../../../store/slices/FilterProject/FilterProjectSlice";
import axios from "axios";
import ActionSheet from "react-native-actions-sheet";
import Arrow from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/AntDesign";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { ActivityIndicator } from "react-native-paper";
import { CheckBox } from "@rneui/themed";
export default function MapFilter({
  GetProjectsInfo,
  setfilterLatiude,
  setfilterLongitude,
  setfilterMarker,
  filterMarker,
  nav,
  isVisible,
  setisVisible,
  isVisible2,
  setisVisible2,
  isVisible3,
  setisVisible3,
}) {
  const location = useSelector((state) => state?.mapFilters?.location);
  const dispatch = useDispatch();
  const [citites, setCities] = useState([]);
  const [counties, setcounties] = useState([]);
  const [Neigbour, setNeigbour] = useState([]);
  const [city, setcity] = useState(null);
  const [county, setcounty] = useState([]);
  const [neigbourhod, setneigbourhod] = useState(null);
  const [countiesFilter, setcountiesFilter] = useState([]);
  const [checkedNeighbourhoods, setCheckedNeighbourhoods] = useState({});

  // İlçe ID ve mahalle ID'yi alarak yalnızca birini seçili yapar

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "cities");
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu şehir:", error)
      );
  }, []);

  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}counties/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCity = (value) => {
    setcity(value);

    if (value) {
      fetchDataCounty(value)
        .then((county) => setcounties(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu ilçe:", error)
        );
    } else {
      setcounties([]);
    }
  };
  const fetchDataNeigbour = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}neighborhoods/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setcounty(value);

    if (value) {
      fetchDataNeigbour(value)
        .then((county) => setNeigbour(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu mahalle:", error)
        );
    } else {
      setNeigbour([]);
    }
  };

  useEffect(() => {
    if (location.city) {
      onChangeCity(location.city);
    }

    setcity(location.city);
    fetchDataCounty(location.city);
    setcounty(location.county);
    fetchDataNeigbour(location.county);
    setneigbourhod(location.neigbourhood);
  }, [filterMarker]);
  function findLabelByValue(array, value) {
    const foundItem = array.find((item) => item.value === value);
    return foundItem ? `${foundItem.label}` : null; // Eğer eşleşen obje yoksa null döner
  }

  const findLabelByCounty = (array, value) => {
    const countyID = counties.find((item) => item.value == value[0]);

    return countyID ? countyID?.label : "yok";
    const foundItem = array.find((item) => item.value === countyID);
    return foundItem ? `${foundItem.label}` : "il"; // Eğer eşleşen obje yoksa null döner
  };
  useEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <View style={{}}>
          <View>
            {location.city || location.county || location.neigbourhood ? (
              <Text style={{ textAlign: "center" }}>
                {findLabelByValue(citites, location.city)}{" "}
                {location.county && "/"}{" "}
                {findLabelByValue(counties, location.county)}{" "}
                {location.neigbourhood && "/"}{" "}
                {findLabelByValue(Neigbour, location.neigbourhood)}
              </Text>
            ) : (
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Tümü</Text>
            )}
          </View>

          <Text
            style={{
              fontSize: 13,
              color: "#333",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            ({filterMarker?.length}) İlan
          </Text>
          {/* Add other elements like icons, badges, etc. here if needed */}
        </View>
      ),
    });
  }, [nav, city, county, neigbourhod, filterMarker]);
  const actionSheetRef = useRef(null);
  const actionSheetRef2 = useRef(null);
  const actionSheetRef3 = useRef(null);

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible2) {
      actionSheetRef2.current?.setModalVisible(true);
    } else {
      actionSheetRef2.current?.setModalVisible(false);
    }
  }, [isVisible2]);

  useEffect(() => {
    if (isVisible3) {
      actionSheetRef3.current?.setModalVisible(true);
    } else {
      actionSheetRef3.current?.setModalVisible(false);
    }
  }, [isVisible3]);

  const [cityLabel, setcityLabel] = useState(null);
  const [countyLabel, setcountyLabel] = useState(null);
  const [neigbourhodLabel, setneigbourhodLabel] = useState(null);

  useEffect(() => {
    const filterCounties = counties.filter(
      (item) =>
        Array.isArray(location.county) && location?.county.includes(item.value)
    );
    setcountiesFilter(filterCounties);
  }, [GetProjectsInfo, location.county]);
  const [openAccor, setOpenAccor] = useState({});

  const [filterNeigbourhood, setfilterNeigbourhood] = useState([]);
  const makeFilterNeigbourhood = (value) => {
    fetchDataNeigbour(value).then((res) => {
      setfilterNeigbourhood(res.data);
      alert(res.data[0].label);
    });
  };
  const [neighbourhoods, setNeighbourhoods] = useState([]); // Mahalleleri burada tutacağız

  const fetchNeighbourhoods = async (countyId, index) => {
    try {
      // API isteğini yap
      fetchDataNeigbour(countyId).then((res) => {
        setNeighbourhoods((prev) => ({
          ...prev,
          [index]: res.data, // ilçeyi indexe göre tutuyoruz
        }));
        console.log(res.data, "---------->mahalleler");
      });
      console.log("çalıştı");
      // Mahalleleri durum içinde ilgili ilçe anahtarına göre sakla
    } catch (error) {
      console.error("Mahalleleri getirirken hata oluştu:", error);
    }
  };
  const [cheked, setcheked] = useState({});
  const handlechekedNeigbourhood = (countyIndex, neighbourhoodId) => {
    setcheked((prev) => ({
      ...prev,
      [countyIndex]: neighbourhoodId, // yalnızca bir mahalleyi seçili yapar
    }));
  };
  console.log(location.neigbourhood, "-----Seçilen Mahalleler");
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        paddingTop: 8,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <TouchableOpacity
          style={styles.butonfilter}
          onPress={() => {
            setisVisible(true);
          }}
        >
          {city ? (
            <Text>{findLabelByValue(citites, city)}</Text>
          ) : (
            <Text style={{ fontWeight: "600", fontSize: 13 }}>
              İl{" "}
              <Text style={{ color: "#606060", fontSize: 13 }}>(seçiniz)</Text>
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.butonfilter}
          onPress={() => {
            setisVisible2(true);
          }}
        >
          {location?.county?.length > 1 ? (
            <Text>{location?.county?.length} İlçe</Text>
          ) : county ? (
            <Text>{findLabelByCounty(counties, location.county)}</Text>
          ) : (
            <Text style={{ fontWeight: "600", fontSize: 13 }}>
              İlçe{" "}
              <Text style={{ color: "#606060", fontSize: 13 }}>(seçiniz)</Text>
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.butonfilter}
          onPress={() => {
            setisVisible3(true);
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 13 }}>
            Mahalle{" "}
            <Text style={{ color: "#606060", fontSize: 13 }}>(seçiniz)</Text>
          </Text>
        </TouchableOpacity>
        {/* <RNPickerSelect
        onClose={() => {
          dispatch(
            setLocation({
              city: city,
            })
          );
          GetProjectsInfo(city);
        }}
        doneText="Tamam"
        placeholder={{
          label: "İl (seçiniz)", // Just a plain text placeholder here
          value: null,
          color: '#333' // Customize color directly here
        }}
        style={{
          ...pickerSelectStyles,
          placeholder: {
            color: '#333',
            fontWeight: '500',
            fontSize: 14,
          }
        }}
        value={city}
        onValueChange={(value) => {
          onChangeCity(value);
        }}
        items={citites}
      />

      <RNPickerSelect
        doneText="Tamam"
        onClose={() => {
          dispatch(
            setLocation({
              county: county,
            })
          );
          GetProjectsInfo(city, county);
        }}
        placeholder={{
          label: "İlçe (seçiniz)", // Just a plain text placeholder here
          value: null,
          color: '#333' // Customize color directly here
        }}
        style={{
          ...pickerSelectStyles,
          placeholder: {
            color: '#333',
            fontWeight: '500',
            fontSize: 14,
          }
        }}
        value={county}
        onValueChange={(value) => {
          onChangeCounty(value);
        }}
        items={counties}
      />

      <RNPickerSelect
        doneText="Tamam"
        onClose={() => {
          dispatch(
            setLocation({
              neigbourhood: neigbourhod,
            })
          );
          GetProjectsInfo(city, county, neigbourhod);
        }}
        placeholder={{
          label: "Mahalle (seçiniz)", // Just a plain text placeholder here
          value: null,
          color: '#333' // Customize color directly here
        }}
        style={{
          ...pickerSelectStyles,
          placeholder: {
            color: '#333',
            fontWeight: '500',
            fontSize: 14,
          }
        }}
        value={neigbourhod}
        onValueChange={(value) => setneigbourhod(value)}
        items={Neigbour}
      /> */}
        <TouchableOpacity
          style={[styles.btn, { borderRightWidth: 0 }]}
          onPress={() => {
            dispatch(
              setLocation({
                city: null,
                county: null,
                neigbourhood: null,
              })
            );
            setfilterLatiude(null);
            setfilterLongitude(null);
            setfilterMarker([]);

            GetProjectsInfo();

            setcity(null);
            setcounty(null);
            setneigbourhod(null);
          }}
        >
          <Text style={styles.btnText}>Sıfırla</Text>
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setisVisible(false)} // Close ActionSheet when dismissed
        containerStyle={{
          backgroundColor: "#FFF",
          width: "100%", // Set width to 32px less than screen width
          height: "40%", // Set height to 80% of screen height
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        closable={true}
        defaultOverlayOpacity={0.3}
        animated={true}
        drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
      >
        <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 35 }}>
          {citites.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                backgroundColor: city == item.value ? "#EA2C2E" : "transparent",
                borderRadius: 10,
              }}
              onPress={() => {
                dispatch(
                  setLocation({
                    city: item.value,
                    county: null,
                  })
                );
                GetProjectsInfo(item.value);
                onChangeCity(item.value);
                setcounty(null);

                setisVisible(false);
              }}
            >
              <Text
                style={{
                  color: city == item.value ? "white" : "#333",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {item?.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ActionSheet>
      <ActionSheet
        ref={actionSheetRef2}
        onClose={() => setisVisible2(false)} // Close ActionSheet when dismissed
        containerStyle={{
          backgroundColor: "#FFF",
          width: "100%", // Set width to 32px less than screen width
          height: "40%", // Set height to 80% of screen height
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        closable={true}
        defaultOverlayOpacity={0.3}
        animated={true}
        drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
      >
        <View
          style={{ paddingTop: 15, paddingRight: 20, alignItems: "flex-end" }}
        >
          <TouchableOpacity
            onPress={() => {
              GetProjectsInfo(city, location.county);
              setisVisible2(false);
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#EA2C2E" }}>
              Tamam
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 35 }}>
          {counties.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                backgroundColor:
                  Array.isArray(location.county) &&
                  location?.county?.includes(item.value)
                    ? "#EA2C2E" // Seçilen ilçe kırmızı
                    : "transparent",
                borderRadius: 10,
              }}
              onPress={() => {
                // `county` dizisinde item.value varsa, çıkar, yoksa ekle
                let updatedCounty = Array.isArray(location.county)
                  ? [...location.county]
                  : [];

                if (updatedCounty.includes(item.value)) {
                  // Eğer zaten dizide varsa, çıkar
                  updatedCounty = updatedCounty.filter(
                    (county) => county !== item.value
                  );
                } else {
                  // Eğer dizide yoksa, ekle
                  updatedCounty.push(item.value);
                }
                setcounty(updatedCounty);
                dispatch(
                  setLocation({
                    county: updatedCounty, // Güncellenmiş county dizisini gönder
                  })
                );

                // Diğer işlemleri yap
                onChangeCounty(item.value);
                setcountyLabel(item.label);
              }}
            >
              <Text
                style={{
                  color:
                    Array.isArray(location.county) &&
                    location?.county?.includes(item.value)
                      ? "white"
                      : "#333", // Seçili ilçenin rengi beyaz
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {item?.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ActionSheet>
      <ActionSheet
        ref={actionSheetRef3}
        onClose={() => setisVisible3(false)} // Close ActionSheet when dismissed
        containerStyle={{
          backgroundColor: "#FFF",
          width: "100%", // Set width to 32px less than screen width
          height: "90%", // Set height to 80% of screen height
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        closable={true}
        defaultOverlayOpacity={0.3}
        animated={true}
        drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
      >
        <View
          style={{ paddingTop: 15, paddingRight: 10, flexDirection:'row',justifyContent:'space-between',paddingLeft:8 }}
        >
          <TouchableOpacity
            onPress={() => {
             dispatch(setLocation({
              neigbourhood:[]
             }))
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#EA2C2E" }}>
              Temizle
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              GetProjectsInfo(city, location.county, location.neigbourhood);
              setisVisible3(false);
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#EA2C2E" }}>
              Tamam
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {countiesFilter.map((item, i) => (
            <Collapse
              onToggle={() => {
                setOpenAccor((prevState) => ({
                  ...prevState,
                  [i]: !prevState[i],
                }));
                if (!neighbourhoods[i]) {
                  fetchNeighbourhoods(item.value, i);
                }
              }}
              isCollapsed={!openAccor[i]}
            >
              <CollapseHeader>
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ebebeb",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: 13,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, color: "#333", fontWeight: "700" }}
                  >
                    {item.label}
                  </Text>
                  <View>
                    {/* <View>
                    <Text>{neighbourhoods[i]?.lenth}</Text>
                  </View> */}
                    <Arrow
                      name={!openAccor[i] ? "arrow-down" : "arrow-up"}
                      size={14}
                      color={"#333"}
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody style={{ margin: 10, gap: 10 }}>
                {neighbourhoods[i] ? (
                  neighbourhoods[i]?.map((neighbourhood, key) => (
                    <TouchableOpacity
                      style={{
                        padding: 6,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      key={key}
                      onPress={() => {
                        let updatedCounty = Array.isArray(location.neigbourhood)
                          ? [...location.neigbourhood]
                          : [];

                        if (updatedCounty.includes(neighbourhood.value)) {
                          // Eğer zaten dizide varsa, çıkar
                          updatedCounty = updatedCounty.filter(
                            (county) => county !== neighbourhood.value
                          );
                        } else {
                          // Eğer dizide yoksa, ekle
                          updatedCounty.push(neighbourhood.value);
                        }
                        setneigbourhod(updatedCounty);
                        dispatch(
                          setLocation({
                            neigbourhood: updatedCounty, // Güncellenmiş county dizisini gönder
                          })
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#333",
                          fontWeight: "500",
                        }}
                      >
                        {neighbourhood?.label}
                      </Text>
                      {Array.isArray(location.neigbourhood) &&
                      location?.neigbourhood?.includes(neighbourhood.value) ? (
                        <Icon name="checkcircleo" size={20} color={"#EA2C2E"} />
                      ) : (
                        <TouchableOpacity
                          style={{
                            padding: 9,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: "grey",
                          }}
                          onPress={() => {
                            let updatedCounty = Array.isArray(
                              location.neigbourhood
                            )
                              ? [...location.neigbourhood]
                              : [];

                            if (updatedCounty.includes(neighbourhood.value)) {
                              // Eğer zaten dizide varsa, çıkar
                              updatedCounty = updatedCounty.filter(
                                (county) => county !== neighbourhood.value
                              );
                            } else {
                              // Eğer dizide yoksa, ekle
                              updatedCounty.push(neighbourhood?.value);
                            }
                            setneigbourhod(updatedCounty);
                            dispatch(
                              setLocation({
                                neigbourhood: updatedCounty, // Güncellenmiş county dizisini gönder
                              })
                            );
                          }}
                        ></TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <ActivityIndicator />
                  </View>
                )}
              </CollapseBody>
            </Collapse>
          ))}
        </ScrollView>
      </ActionSheet>
    </View>
  );
}
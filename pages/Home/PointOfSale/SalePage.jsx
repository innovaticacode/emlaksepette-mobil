import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import RNPickerSelect from "react-native-picker-select";
import HTML from "react-native-render-html";
import {
  Forms,
  SaleForms,
} from "../../../pages/Home/PointOfSale/SaleFormHelper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Platform } from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import { CheckBox } from "react-native-elements";

const SalePage = () => {
  const [modalVisible, setModalVisible] = useState(false); // State for Modal visibility
  const [modalVisible2, setModalVisible2] = useState(false); // State for Modal visibility
  const [modalVisible3, setModalVisible3] = useState(false); // State for Modal visibility
  const [Deals, setDeals] = useState("");
  const [errorStatu, seterrorStatu] = useState(0);
  const [Show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [errors, setErrors] = useState({});
  const [storeData, setStoreData] = useState([]); // All store data
  const [store, setStore] = useState([]); // All store data

  const [selectedPoint, setSelectedPoint] = useState(null); // State to hold the selected point

  const show = () => {
    setShow(!Show);
  };
  const inputRefs = {
    salePoint: useRef(null),
    workerNumber: useRef(null),
    city_id: useRef(null),
    county_id: useRef(null),
    message: useRef(null),
  };

  const [formData, setFormData] = useState({
    salePoint: "",
    workerNumber: "",
    city_id: "",
    county_id: "",
    message: "",
  });

  const handleCheckboxChange = (
    checked,
    setChecked,
    modalVisible,
    setModalVisible,
    deal
  ) => {
    if (checked) {
      setModalVisible(false);
      setChecked(false);
    } else {
      setModalVisible(true);
      if (deal) {
        GetDeal(deal);
      }
    }
  };
  const GetDeal = (deal) => {
    // setDeals(deal)
    fetchData(deal);
  };
  const fetchData = async (deal) => {
    const url = `https://private.emlaksepette.com/api/sayfa/${deal}`;
    try {
      const data = await fetchFromURL(url);
      setDeals(data.content);
      // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    } catch (error) {
      console.error("İstek hatası:", error);
      // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
    }
  };
  const fetchFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const [alertMessage, setalertMessage] = useState("");
  const ShowAlert = (alert) => {
    setalertMessage(alert);
    setshowMailSendAlert(true);
  };

  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);

  const [user, setuser] = useState({});

  useEffect(() => {
    getValueFor("user", setuser);
    console.log(user);
  }, []);
  const [error, setError] = useState({});

  const handleSubmit = async () => {
    const { salePoint, workerNumber, city_id, county_id, message } = formData;

    // Validation logic
    const newErrors = {};
    if (!salePoint) newErrors.salePoint = "İnşaat Ofisi seçimi gerekli.";
    if (!city_id) newErrors.city_id = "Şehir gerekli.";
    if (!county_id) newErrors.county_id = "İlçe gerekli.";
    if (!workerNumber) newErrors.workerNumber = "Çalışan sayısı gerekli.";

    // Add more validations as needed

    // If there are errors, focus on the first error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      inputRefs[firstErrorKey].current.focus(); // Focus the first input with an error
      return;
    }
    if (!checked || !checked1 || !checked2) {
      Alert.alert(
        "Onay Gerekli",
        "Lütfen tüm onay kutularını işaretleyin." // Alert message in Turkish
      );
      return;
    } else {
      setError(""); // Clear the error if all checkboxes are checked
      // Proceed with your logic
    }
    setErrors({});

    console.log("Form Data to Send:", {
      store_id: salePoint,
      employee_count: workerNumber,
      city_id,
      district_id: county_id,
      message,
    });

    const formDataToSend = new FormData();
    formDataToSend.append("store_id", salePoint);
    formDataToSend.append("employee_count", workerNumber);
    formDataToSend.append("city_id", city_id);
    formDataToSend.append("district_id", county_id);
    formDataToSend.append("message", message);

    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://private.emlaksepette.com/api/sales-points",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Form Data tooS Send:", {
          store_id: salePoint,
          employee_count: workerNumber,
          city_id,
          district_id: county_id,
          message,
        });
        console.log("Form Data to Send:", formDataToSend);

        console.log("User Token:", user?.access_token);
        Alert.alert("Başvuru Başarılı", "Başvurunuz başarıyla gönderildi.");
        // Reset form
        setFormData({
          salePoint: "",
          workerNumber: "",
          city_id: "",
          county_id: "",
          message: "",
        });
        setChecked(false); // Reset checkbox 1
        setChecked1(false); // Reset checkbox 2
        setChecked2(false); // Reset checkbox 3
        setPointOptions(false);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        console.error("Response Data:", error.response.data); // Log the response data from the server
        console.error("Response Status:", error.response.status); // Log the status code
        console.error("Response Headers:", error.response.headers); // Log the response headers
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request Data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
    }
  };

  //
  const [TaxOfficesCities, setTaxOfficesCities] = useState([]);
  const [TaxOffice, setTaxOffice] = useState([]);
  useEffect(() => {
    const fetchTaxOfficeCity = async () => {
      try {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/get-tax-offices"
        );
        setTaxOfficesCities(response.data);
      } catch (error) {
        console.error("Hata:", error);
        throw error;
      }
    };
    fetchTaxOfficeCity();
  }, []);

  const fetchTaxOffice = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/get-tax-office/${value}`
      );
      setTaxOffice(response.data);
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/cities"
        );
        setCities(response.data.data);
      } catch (error) {
        console.error("Hata:", error);
      }
    };
    fetchCities();
  }, []);

  const [pointOptions, setPointOptions] = useState([
    { label: "İnşaat Ofisi", value: "İnşaat Ofisi" },
    { label: "Üretici Firma", value: "Üretici" },
    { label: "Turizm Amaçlı Kiralama", value: "Turizm Amaçlı Kiralama" },
  ]);

  // Example of handling corporate type change
  const [corporateType, setCorporateType] = useState(null);

  const fetchStores = async (selectedCorporateType) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/fetch-stores`,
        {
          params: { corporate_type: selectedCorporateType }, // Send the corporate type as a query parameter
        }
      );
      const storesFormatted = response.data.stores.map((store) => ({
        label: store.name, // Assuming the API returns store names in 'name'
        value: store.id, // Assuming the API returns store IDs in 'id'
      }));

      // Update state with formatted stores
      setStoreData(storesFormatted); // Store the fetched stores in desired format
      setFilteredStores(storesFormatted); // Filtered stores for picker
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const handleCorporateTypeChange = (value) => {
    setCorporateType(value); // Store the selected corporate type
    fetchStores(value); // Fetch stores for the selected corporate type
  };
  const handleStores = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const onChangeStore = (value) => {
    setFormData({ ...formData, salePoint: value });
  };
  const [filteredStores, setFilteredStores] = useState([]);

  const fetchCounties = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/counties/${value}`
      );
      setCounties(response.data.data);
      setSelectedCounty(null); // Seçili ilçe sıfırla
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);

  const onChangeCity = (value) => {
    setSelectedCity(value);
    setSelectedCounty(null); // Reset county when city changes
    if (value) {
      fetchCounties(value);
    }
  };

  const onChangeCounty = (value) => {
    setSelectedCounty(value);
  };

  const getItemsForKey = (key) => {
    switch (key) {
      case "city_id":
        return cities;
      case "county_id":
        return counties;
      default:
        return [];
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS ve Android için farklı davranışlar
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // iOS için klavyenin üstünde kalacak şekilde offset ayarı
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          gap: 20,
          justifyContent: "center",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.bigTitle}>Satış Noktası Başvuru Formu</Text>
          {SaleForms.map((item, i) => {
            const labelStyle =
              item.key === "pointOfSale"
                ? { fontSize: 11, fontWeight: "600" }
                : { fontSize: 13, fontWeight: "600" };
            if (item.key === "city_id" || item.key === "county_id") {
              return (
                <View key={i} style={styles.inputContainer}>
                  <Text style={[styles.label, labelStyle]}>{item.label}</Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    value={formData[item.key] || null}
                    placeholder={{ label: "Seçiniz...", value: null }}
                    style={pickerSelectStyles}
                    keyboardType={item.keyboardType || "default"}
                    onValueChange={(value) => {
                      handleInputChange(item.key, value);
                      if (item.key === "city_id" && value) {
                        onChangeCity(value);
                      } else if (item.key === "county_id" && value) {
                        onChangeCounty(value);
                      }
                    }}
                    items={getItemsForKey(item.key)}
                    useNativeAndroidPickerStyle={false}
                  />
                  {errors[item.key] && (
                    <Text style={styles.errorText}>{errors[item.key]}</Text>
                  )}
                </View>
              );
            }
            if (item.key === "salePoint") {
              return (
                <View key={i} style={styles.inputContainer}>
                  <Text style={[styles.label, labelStyle]}>{item.label}</Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    value={formData.salePoint || null}
                    placeholder={{ label: "Seçiniz...", value: null }}
                    style={pickerSelectStyles}
                    keyboardType={item.keyboardType || "default"}
                    onValueChange={(value) => {
                      handleInputChange(item.key, value);
                      console.log("Selected Store:", value);
                    }}
                    items={filteredStores} // Use filteredStores here
                    useNativeAndroidPickerStyle={false}
                  />
                  {errors.salePoint && (
                    <Text style={styles.errorText}>{errors[item.key]}</Text>
                  )}
                </View>
              );
            }

            if (item.key === "message") {
              return (
                <View key={i} style={styles.inputContainer}>
                  <Text style={[styles.label, labelStyle]}>{item.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={item.placeholder || ""}
                    value={formData[item.key]}
                    onChangeText={(value) => handleInputChange(item.key, value)}
                    keyboardType={item.keyboardType || "default"}
                    editable={!item.disabled}
                    multiline
                    numberOfLines={4}
                    maxLength={item.maxlength}
                  />
                  {errors[item.key] && (
                    <Text style={styles.errorText}>{errors[item.key]}</Text>
                  )}
                </View>
              );
            }
            if (item.key === "corporateType") {
              return (
                <View key={i} style={styles.inputContainer}>
                  <Text style={[styles.label, labelStyle]}>{item.label}</Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    value={corporateType}
                    placeholder={{ label: "Seçiniz...", value: null }}
                    style={pickerSelectStyles}
                    onValueChange={handleCorporateTypeChange}
                    items={pointOptions}
                    useNativeAndroidPickerStyle={false}
                  />
                  {errors[item.key] && (
                    <Text style={styles.errorText}>{errors[item.key]}</Text>
                  )}
                </View>
              );
            }
            if (item.key === "workerNumber") {
              return (
                <View key={i} style={styles.inputContainer}>
                  <Text style={[styles.label, labelStyle]}>{item.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={item.placeholder || ""}
                    value={formData[item.key]}
                    onChangeText={(value) => handleInputChange(item.key, value)}
                    keyboardType={item.keyboardType || "default"}
                    editable={!item.disabled}
                    maxLength={item.maxlength}
                  />
                  {errors[item.key] && (
                    <Text style={styles.errorText}>{errors[item.key]}</Text>
                  )}
                </View>
              );
            }
          })}
          <View>
            {/* Accept KVKK Checkbox */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  handleCheckboxChange(
                    checked,
                    setChecked,
                    modalVisible,
                    setModalVisible,
                    "kvkk-politikasi"
                  )
                }
                style={styles.checkboxContainer}
              >
                {checked ? (
                  <FontAwesome5Icon
                    name="check-square"
                    size={18}
                    color="black"
                  />
                ) : (
                  <FontAwesome5Icon name="square" size={18} color="black" />
                )}
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: errorStatu === 5 ? "red" : "black" },
                  ]}
                >
                  <Text
                    style={{
                      color: errorStatu === 5 ? "red" : "#027BFF",
                      fontSize: 13,
                    }}
                  >
                    KVKK politakasını
                  </Text>{" "}
                  okudum onaylıyorum.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Accept Cerez Checkbox */}
            <TouchableOpacity
              onPress={() =>
                handleCheckboxChange(
                  checked1,
                  setChecked1,
                  modalVisible2,
                  setModalVisible2,
                  "cerez-politikasi"
                )
              }
              style={styles.checkboxContainer}
            >
              {checked1 ? (
                <FontAwesome5Icon name="check-square" size={18} color="black" />
              ) : (
                <FontAwesome5Icon name="square" size={18} color="black" />
              )}
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: errorStatu === 5 ? "red" : "black" },
                ]}
              >
                <Text
                  style={{
                    color: errorStatu === 5 ? "red" : "#027BFF",
                    fontSize: 13,
                  }}
                >
                  Çerez politakasını
                </Text>{" "}
                okudum onaylıyorum.
              </Text>
            </TouchableOpacity>

            {/* Accept gizlilik Checkbox */}
            <TouchableOpacity
              onPress={() =>
                handleCheckboxChange(
                  checked2,
                  setChecked2,
                  modalVisible3,
                  setModalVisible3,
                  "gizlilik-sozlesmesi-ve-aydinlatma-metni"
                )
              }
              style={styles.checkboxContainer}
            >
              {checked2 ? (
                <FontAwesome5Icon name="check-square" size={18} color="black" />
              ) : (
                <FontAwesome5Icon name="square" size={18} color="black" />
              )}
              <Text
                style={[
                  styles.checkboxLabel,
                  { color: errorStatu === 5 ? "red" : "black" },
                ]}
              >
                <Text
                  style={{
                    color: errorStatu === 5 ? "red" : "#027BFF",
                    fontSize: 13,
                  }}
                >
                  Gizlilik sözleşmesi ve aydınlatma metnini
                </Text>{" "}
                okudum onaylıyorum.
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#EA2B2E",
                padding: 10,
                margin: 5,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                Başvuruyu Gönder
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            backdropColor="transparent"
            style={styles.modal2}
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutRightBig"}
          >
            <SafeAreaView style={styles.modalContent2}>
              <ScrollView
                style={{ padding: 20 }}
                contentContainerStyle={{ gap: 20 }}
              >
                {/* <Text>
          
            </Text> */}
                <HTML source={{ html: Deals }} contentWidth={100} />

                <View style={{ alignItems: "center", paddingBottom: 25 }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked(!checked);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Okudum kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>

          <Modal
            isVisible={modalVisible2}
            onBackdropPress={() => setModalVisible2(false)}
            backdropColor="transparent"
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutRightBig"}
            style={styles.modal2}
          >
            <SafeAreaView style={styles.modalContent2}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 10 }}
              >
                <HTML source={{ html: Deals }} contentWidth={100} />

                <View style={{ alignItems: "center", paddingBottom: 20 }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked1(true);
                      setModalVisible2(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Okudum kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
          <Modal
            isVisible={modalVisible3}
            onBackdropPress={() => setModalVisible(false)}
            backdropColor="transparent"
            animationIn={"fadeInRightBig"}
            animationOut={"fadeOutRightBig"}
            style={styles.modal2}
          >
            <SafeAreaView style={styles.modalContent2}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 20 }}
              >
                <HTML source={{ html: Deals }} contentWidth={100} />

                <View style={{ alignItems: "center", paddingBottom: 20 }}>
                  <TouchableOpacity
                    style={styles.Acceptbtn}
                    onPress={() => {
                      setChecked2(true);
                      setModalVisible3(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Okudum kabul ediyorum
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "black",
    // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  modalText: {
    color: "#2f5f9e",
  },

  bigTitle: {
    alignItems: "center",
    fontSize: 24,
    padding: 16,
    paddingLeft: 30,
    color: "#EA2B2E",
    fontWeight: "600",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 10,
  },
  inputContainer: {
    margin: 5,
  },
  label: {
    color: "#777777",
    fontSize: 13,
    fontWeight: "600",
    padding: 5,
    gap: 10,
  },
  errorText: {
    color: "#EA2B2E",
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 7,
    fontWeight: "600",
  },
  input: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
  },
  checkboxStyle: {
    margin: 15,
  },

  checkboxContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 3,
  },
  checkboxLabel: {
    fontSize: 13,
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
  },
  checkbox: {
    padding: 10,
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 18,
    height: 18,
    backgroundColor: "#E54242",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 10,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  Acceptbtn: {
    backgroundColor: "#2aaa46",
    padding: 10,
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default SalePage;

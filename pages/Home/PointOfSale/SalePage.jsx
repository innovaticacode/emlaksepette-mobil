    import { View, Text, TextInput, Button, StyleSheet, Alert,   TouchableOpacity,    KeyboardAvoidingView, ScrollView} from 'react-native';
    import React, { useState, useEffect } from "react";
    import RNPickerSelect from 'react-native-picker-select';
    import { Forms, SaleForms } from "../../../pages/Home/PointOfSale/SaleFormHelper";
    import { Platform } from "react-native";
    import axios from "axios";
import { getValueFor } from '../../../components/methods/user';


    const SalePage = () => {
        
    const [formData, setFormData] = useState({
        salePoint: '',
        firmName: '',
        competentName: '',
        email: '',
        tel: '',
        taxOffice:'',
        taxNumber: '',
        workerNumber: '',
        city_id: '',
        county_id: '',
        message: '',
    });

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);
    
        const [user, setuser] = useState({})
        useEffect(() => {
                getValueFor('user',setuser)
        }, [])
 
    const handleSubmit = async () => {
       
        const { salePoint, firmName, competentName, email, tel, workerNumber, city_id, county_id, taxOffice, taxNumber, message } = formData;

        console.log("Form values before validation:", {
            salePoint,
            firmName,
            competentName,
            email,
            tel,
            workerNumber,
            city_id,
            county_id,
            taxOffice,
            taxNumber,
            message,
        });

        if (!salePoint || !firmName || !competentName || !email || !tel || !city_id || !county_id) {
            console.log("Validation Error", "Please fill in all required fields.");
            return;
        }        
        const formDataToSend = new FormData();
        formDataToSend.append("store_id", salePoint);
        formDataToSend.append("company_name", firmName);
        formDataToSend.append("authorized_name", competentName);
        formDataToSend.append("email", email);
        formDataToSend.append("phone", tel);
        formDataToSend.append("employee_count", workerNumber);
        formDataToSend.append("city_id", city_id);
        formDataToSend.append("district_id", county_id); 
        formDataToSend.append("tax_office", taxOffice);
        formDataToSend.append("tax_number", taxNumber);
        formDataToSend.append("message", message);

        console.log("Submitting with data:", formDataToSend); // Log FormData

       

        try {
            if(user?.access_token){
                const response = await axios.post("https://private.emlaksepette.com/api/sales-points",
                    formDataToSend, { 
                    headers:
                    {
                    Authorization: `Bearer ${user?.access_token}`,
                    "Content-Type": "multipart/form-data",

            } 
         });
         console.log("Form Data to Send:", formDataToSend);
         

         console.log("User Token:", user?.access_token); 
            Alert.alert("Başvuru Başarılı", "Başvurunuz başarıyla gönderildi.");
            // Reset form
            setFormData({
                salePoint: '',
                firmName: '',
                competentName: '',
                email: '',
                tel: '',
                taxOffice: '',
                taxNumber: '',
                workerNumber: '',
                city_id: '',
                county_id: '',
                message: '',
            });}
        } catch (error) {
            console.error("Hata:", error);
            Alert.alert("Başvuru Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
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
                contentContainerStyle={{ paddingBottom: 40, gap: 20, justifyContent: "center"}}
            >
        
        <View style={styles.container}>
            <Text style={styles.bigTitle}>Satış Noktası Başvuru Formu</Text>

        {SaleForms.map((item, i) => {
            const labelStyle = item.key === "pointOfSale" ? { fontSize: 11,  fontWeight: "600" } : { fontSize: 13, fontWeight: "600" };
            if (item.key === "city_id" || item.key === "county_id") {
            return (
                <View key={i} style={styles.inputContainer}>
                <Text  style={[styles.label, labelStyle]}>{item.label}</Text>
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
                </View>
            );
            }
            if(item.key === "message")
            {
                return (
                    <View key={i} style={styles.inputContainer}>
                    <Text  style={[styles.label, labelStyle]}>{item.label}</Text>
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
                </View>
                );
            }
            if(item.key === "point")
                {
                    return (
                        <View key={i} style={styles.inputContainer}>
                        <Text  style={[styles.label, labelStyle]}>{item.label}</Text>
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
                    </View>
                    );
                }
        
            return (
            <View key={i} style={styles.inputContainer}>
                <Text  style={[styles.label, labelStyle]}>{item.label}</Text>
                <TextInput
                style={styles.input}
                placeholder={item.placeholder || ""}
                value={formData[item.key]}
                onChangeText={(value) => handleInputChange(item.key, value)}
                keyboardType={item.keyboardType || "default"}
                editable={!item.disabled}
                maxLength={item.maxlength}
                />
            </View>
            
            
            );
        })}
    <View style={{ alignItems: "center" }}>
        <TouchableOpacity  style={{
                    width: "100%",
                    backgroundColor: "#EA2B2E",
                    padding: 10,
                    margin: 5,
                    borderRadius: 10,
                    alignItems: "center",
                    }} 
                    onPress={handleSubmit}>
                <Text  style={{
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: "600",
                    }}>Başvuruyu gönder</Text>
            </TouchableOpacity>   
            </View>  
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
        color: 'black',
        // to ensure the text is never behind the icon
        },
    });
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, 
        backgroundColor: "#FFFFFF"
    },
 
    bigTitle:{
        alignItems: "center",
        fontSize: 24,
        padding: 16,
        paddingLeft: 30,
        color: "#EA2B2E",
        fontWeight: "600"
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
        padding:5,
        gap: 10,

    },
    input: {
        padding: 10,
        backgroundColor: "#F3F3F3",
        borderRadius: 8,
    },
    });

    export default SalePage;

    import { View, Text, TextInput, Button, StyleSheet, Alert,   TouchableOpacity,    KeyboardAvoidingView, ScrollView} from 'react-native';
    import React, { useState, useEffect } from "react";
    import RNPickerSelect from 'react-native-picker-select';
    import { Forms, SaleForms } from "../../../pages/Home/PointOfSale/SaleFormHelper";
    import { Platform } from "react-native";
    import {
        AlertNotificationRoot,
        ALERT_TYPE,
        Dialog,
    } from "react-native-alert-notification";
    import * as Progress from "react-native-progress";
    import axios from "axios";


    const SalePage = () => {
    const [formData, setFormData] = useState({
        salePoint: '',
        firmName: '',
        competentName: '',
        email: '',
        tel: '',
        selectedValue: '',
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
    

    const handleSubmit = () => {
        Alert.alert("Form Submitted", JSON.stringify(formData));
        setFormData({
            salePoint: '',
            firmName: '',
            competentName: '',
            email: '',
            tel: '',
            selectedValue: '',
            taxOffice:'',
            taxNumber: '',
            workerNumber: '',
            city: '',
            county: '',
            message: '',
        });
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

    const uniqueCities = TaxOfficesCities.map((city) => ({
        label: city.il,
        value: city.plaka,
    })) // Şehir isimlerini ve plakalarını map'le
        .filter(
        (city, index, self) =>
            index ===
            self.findIndex((c) => c.label === city.label && c.value === city.value) // Benzersiz olmasını kontrol et
        );
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
    const onchangeTaxOffice = (value) => {
        fetchTaxOffice(value);
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
        setSelectedNeighborhood(null); // Seçili mahalleyi sıfırla
        } catch (error) {
        console.error("Hata:", error);
        }
    };
    const onChangeCity = (value) => {
        setSelectedCity(value);
        setTimeout(() => {
        if (value) {
            fetchCounties(value);
        }
        }, 600);
    };

    const onChangeCounty = (value) => {
        setTimeout(() => {
        if (value) {
            fetchNeighborhoods(value);
        }
        }, 900);
    };
            
    const getItemsForKey = (key) => {
        switch (key) {
        case "city_id":
            return cities;
        case "county_id":
            return counties;
        case "taxOffice":
            return formattedTaxOfficePlace;
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
            if (item.key === "select") {
            return (
                <View key={i} style={styles.inputContainer}>
        <Text style={styles.label}>{item.label}</Text>
                <RNPickerSelect
                doneText="Tamam"
                value={formData[item.key]}
                placeholder={{ label: "Seçiniz...", value: null }}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                    handleInputChange(item.key, value);
                    if (item.key === "city_id") {
                    onChangeCity(value); // Şehir seçilince ilçe verilerini almak için
                    } else if (item.key === "county_id") {
                    onChangeCounty(value); // İlçe seçilince mahalle verilerini almak için
                    } else if (item.key === "neighborhood_id") {
                    onChangeNeighborhood(value); // Mahalle seçimi
                    } else if (item.key === "taxOfficeCity") {
                    onchangeTaxOffice(value);
                    }
                }}
                items={getItemsForKey(item.key)}
                />
                </View>
            );
            }
        
            return (
            <View key={i} style={styles.inputContainer}>
                <Text style={styles.label}>{item.label}</Text>
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
    <View style={{ alignItems: "center" }}></View>
        <TouchableOpacity  style={{
                    width: "100%",
                    backgroundColor: "#EA2B2E",
                    padding: 10,
                    margin: 5,
                    borderRadius: 10,
                    alignItems: "center",
                    }} onPress={handleSubmit}>
                <Text  style={{
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: "600",
                    }}>Başvuruyu gönder</Text>
            </TouchableOpacity>
            
        </View>

        </ScrollView>
        
        </KeyboardAvoidingView>
    );
    };
    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
        width: "100%",
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderColor: "#ebebeb",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: 'black',
        // to ensure the text is never behind the icon
        },
        inputAndroid: {
        width: "100%",
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderColor: "#eaeff5",
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
    btn: {
        width: "100%",
        backgroundColor: "#EA2B2E",
        padding: 10,
        borderRadius: 110,
        alignItems: "center",
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

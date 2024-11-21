import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./TeamFilter.styles";
import RNPickerSelect from "react-native-picker-select";
import { WhiteOrRedButtons } from "../../../../components";
import axios from "axios";
import { apiUrl } from "../../../../components/methods/apiRequest";

const TeamFilter = () => {
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const fetchCities = async () => {
    try {
      const response = await axios.get(apiUrl + "cities");
      return setCities(response.data.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchCounties = async (cityId) => {
    try {
      const response = await axios.get(apiUrl + `counties/${cityId}`);
      return setCounties(response.data.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchNeighborhoods = async (countyId) => {
    try {
      const response = await axios.get(apiUrl + `neighborhoods/${countyId}`);
      return setNeighborhoods(response.data.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const selectCity = (value) => {
    fetchCounties(value);
  };

  const selectCounty = (value) => {
    fetchNeighborhoods(value);
  };
  const clearFilter = () => {
    setCities([]);
    setCounties([]);
    setNeighborhoods([]);
  };

  const handleFilter = () => {
    console.debug("Filter");
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.body}>
          <Text style={styles.inputTitle}>İl</Text>
          <RNPickerSelect
            onValueChange={(value) => selectCity(value)}
            placeholder={{ label: "Seçiniz", value: null }}
            items={cities}
            style={{
              viewContainer: styles.pickerContanier,
            }}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.inputTitle}>İlçe</Text>
          <RNPickerSelect
            onValueChange={(value) => selectCounty(value)}
            placeholder={{ label: "Seçiniz", value: null }}
            items={counties}
            style={{
              viewContainer: styles.pickerContanier,
            }}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.inputTitle}>Mahalle</Text>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            placeholder={{ label: "Seçiniz", value: null }}
            items={neighborhoods}
            style={{
              viewContainer: styles.pickerContanier,
            }}
          />
        </View>
        <View style={styles.btn}>
          <WhiteOrRedButtons
            bgColor={"#EA2B2E"}
            onPress={() => handleFilter()}
            text={"Danışmanları Listele"}
          />
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={() => clearFilter()}>
          <Text style={styles.clearText}>Filtreleyi Temizle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeamFilter;

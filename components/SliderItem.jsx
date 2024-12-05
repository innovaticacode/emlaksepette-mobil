import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiUrl } from "./methods/apiRequest";
export default function SliderItem({
  image,
  StoreID,
  borderColor,
  navigationStatus,
  url,
  userName,
  urgent,
}) {
  const [checkImage, setCheckImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (image && userName) {
      if (image.endsWith("indir.jpeg") || image.endsWith("indir.jpg")) {
        const fullName = userName.split(" ");
        let checkImage = "";
        if (fullName.length > 1) {
          const name = fullName[0].charAt(0).toUpperCase();
          const surname = fullName[1].charAt(0).toUpperCase();
          checkImage = `${name}${surname}`;
        } else {
          checkImage = fullName[0].charAt(0).toUpperCase();
        }
        setCheckImage(checkImage);
      } else {
        setCheckImage(null);
      }
    } else {
      setCheckImage(null);
    }
  }, [image, userName]);

  const [urgentAdverts, setUrgentAdverts] = useState([]);

  const handleUrgentAdverts = async () => {
    try {
      const response = await axios.get(`${apiUrl}real-estates`);
      const urgentFilter = response?.data.data.housings?.filter((item) => {
        try {
          const data = JSON.parse(item.housing_type_data);
          return data?.buysellurgent?.[0] === "Evet";
        } catch (error) {
          console.error("JSON parse error:", error);
          return false;
        }
      });
      return setUrgentAdverts(urgentFilter);
    } catch (error) {
      console.error("Error fetching urgent adverts:", error);
    }
  };

  useEffect(() => {
    if (urgent) {
      handleUrgentAdverts();
    }
  }, [urgent]);

  const handlePress = () => {
    if (urgent) {
      navigation.navigate("AllRealtorAdverts", {
        name: "Al Sat Acil",
        slug: "al-sat-acil",
        data: urgentAdverts,
        count: urgentAdverts.length,
        type: null,
        optional: null,
        title: null,
        check: null,
        city: null,
        county: null,
        hood: null,
      });
    } else if (navigationStatus) {
      navigation.navigate(url);
    } else {
      navigation.navigate("Profile", {
        name: "Master Realtor",
        id: StoreID,
      });
    }
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View
        style={[
          styles.container,
          {
            borderColor: borderColor,
          },
        ]}
      >
        {checkImage ? (
          <View style={styles.textArea}>
            <Text style={styles.text}>{checkImage}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
            borderRadius={50}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: 60,
    height: 60,
    flexWrap: "wrap",
    borderRadius: 50,
    margin: 6,
    padding: 1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
});

import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";

const apiUrl = "https://private.emlaksepette.com";
const AllFranchiseBrands = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/franchise-markalari`);
      return setBrands(response.data.data);
    } catch (error) {
      return console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
    console.debug("Brands:", brands);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.area}>
            <View style={styles.imageArea}>
              <Image
                source={{
                  uri: `${apiUrl}/logos/${item.logo}`,
                }}
                alt="brands"
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.info}>Toplam Danışman Sayısı:</Text>
              <View style={styles.seperator} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AllFranchiseBrands;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    paddingHorizontal: 10,
  },
  area: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  imageArea: {
    width: "90%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  info: {
    fontSize: 11,
    fontWeight: "500",
    color: "#0056b3",
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e4e4",
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0056b3",
  },
});

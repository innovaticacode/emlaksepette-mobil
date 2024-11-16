import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { apiUrl, frontEndUriBase } from "../../components/methods/apiRequest";


const AllFranchiseBrands = (props) => {
  const { navigation } = props;
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${apiUrl}franchise-markalari`);
      console.debug("Brands response:>>>>>>>>>>>>>>", response.data);
      return setBrands(response.data.data);
    } catch (error) {
      return console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
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
            <TouchableOpacity
              style={styles.imageArea}
              onPress={() => {
                navigation.navigate("Profile", {
                  id: item?.user_id,
                });
              }}
            >
              <Image
                source={{
                  uri: `${frontEndUriBase}/logos/${item.logo}`,
                }}
                alt="brands"
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.info}>Toplam Danışman Sayısı:</Text>
              <View style={styles.seperator} />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
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

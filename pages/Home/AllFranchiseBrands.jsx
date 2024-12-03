import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { apiUrl, frontEndUriBase } from "../../components/methods/apiRequest";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { WhiteOrRedButtons } from "../../components";

const AllFranchiseBrands = () => {
  const navigation = useNavigation();
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${apiUrl}franchise-markalari`);
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
          <>
            <View style={styles.area}>
              <View style={styles.body}>
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: `${frontEndUriBase}/logos/${item.logo}` }}
                    alt="brands"
                    resizeMode="contain"
                    style={styles.image}
                  />
                </View>
                <View style={styles.seperator} />
                <View style={{ gap: 6 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.infoArea}>
                    <Ionicons name="person" size={12} color="#000" />
                    <Text
                      style={styles.info}
                    >{`${item?.consultants_count} Danışman`}</Text>
                  </View>
                  <View style={styles.infoArea}>
                    <MaterialIcons name="home" size={12} color="#000" />
                    <Text
                      style={styles.info}
                    >{`${item?.offices_count} Ofis`}</Text>
                  </View>
                  <WhiteOrRedButtons
                    text={"Hemen İncele"}
                    bgColor={"#EA2B2E"}
                    onPress={() => {
                      navigation.navigate("Profile", {
                        id: item?.user_id,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default AllFranchiseBrands;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 10,
  },
  area: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  body: {
    width: "90%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#BBBBBB",
    borderRadius: 10,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: "#FFF",
    borderRadius: 50,
    overflow: "hidden",
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: "#BBBBBB",
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0C0C0C",
  },
  info: {
    color: "#0C0C0C",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 12,
  },
  infoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";

function TypeListScreen({
  step,
  navigation,
  setHousingTypes,
  housingTypes,
  setSelectedTypes,
  selectedTypes,
  nextStep,
}) {
  const baseUrl = "https://emlaksepette.com/react/";

  const [loadingOrder, setLoadingOrder] = useState(null);
  const [loadingOrderStatusId, setLoadingOrderStatusId] = useState(null);

  useEffect(() => {
    if (step === 1) {
      axios.get(baseUrl + "housing_types").then((res) => {
        console.log("Fetched housing types for step 1:", res.data.data);
        setHousingTypes([res.data.data]);
      });
    }
  }, [step]);

  const setHousingTypeParent = (housingTypeId, order) => {
    const tempHousingTypeParents = [];

    for (let i = 0; i <= order; i++) {
      if (i === order) {
        tempHousingTypeParents.push(housingTypeId);
      } else {
        tempHousingTypeParents.push(selectedTypes[i]);
      }
    }
    setLoadingOrder(order);
    setLoadingOrderStatusId(housingTypeId);
    setSelectedTypes(tempHousingTypeParents);

    axios
      .get(
        baseUrl +
          (order === 1 ? "housing_types_end" : "housing_types") +
          "?parent_id=" +
          housingTypeId
      )
      .then((res) => {
        const tempHousingTypes = [];
        for (let i = 0; i <= order + 1; i++) {
          if (i === order + 1) {
            tempHousingTypes.push(res.data.data);
          } else {
            tempHousingTypes.push(housingTypes[i]);
          }
        }
        setLoadingOrder(null);
        setLoadingOrderStatusId(null);
        setHousingTypes(tempHousingTypes);

        // Navigate to the next step if applicable
        if (nextStep) {
          nextStep(order + 2);
        } else {
          navigation.navigate("Step" + (order + 2));
        }
      })
      .catch((error) => {
        console.error("Error fetching housing types:", error);
        setLoadingOrder(null);
        setLoadingOrderStatusId(null);
      });
  };

  const renderHousingType = ({ item, index, order }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        selectedTypes[order] === item.id ? styles.selected : {},
      ]}
      onPress={() => setHousingTypeParent(item.id, order)}
    >
      <Text>{item.title}</Text>
      {loadingOrder === order && loadingOrderStatusId === item.id && (
        <ActivityIndicator color={"#333"} style={styles.loadingIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.areaList}
        data={housingTypes[step - 1]}
        renderItem={({ item, index }) =>
          renderHousingType({ item, index, order: step - 1 })
        }
        keyExtractor={(item) => item.id.toString()}
      />
      {step === 3 && selectedTypes[2] && (
        <View style={styles.finishCategorySelect}>
          <View style={styles.finishIconArea}>
            <Text style={styles.finishIcon}>✓</Text>
          </View>
          <View style={styles.finishText}>
            <Text>Kategori Seçimi Tamamlanmıştır</Text>
          </View>
          <View style={styles.finishButtonFirst}>
            <Button
              onPress={() => navigation.navigate("Step1")}
              title="Başka Kategori Seç"
              color="#1E90FF"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
  },
  areaList: {
    flex: 1,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selected: {
    backgroundColor: "#d0e0f0",
  },
  loadingIcon: {
    marginLeft: 10,
  },
  finishCategorySelect: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e0f7fa",
  },
  finishIconArea: {
    marginBottom: 10,
  },
  finishIcon: {
    fontSize: 24,
    color: "green",
  },
  finishText: {
    marginBottom: 20,
  },
  finishButtonFirst: {
    marginTop: 20,
  },
});

export default TypeListScreen;

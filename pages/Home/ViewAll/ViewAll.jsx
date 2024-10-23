import React, { useEffect, useState } from "react";
import { ViewAllCard } from "../../../components";
import axios from "axios";
import { apiUrl } from "../../../components/methods/apiRequest";
import { ActivityIndicator, FlatList, View } from "react-native";
import { styles } from "./ViewAll.styles";

const ViewAll = (props) => {
  const { navigation } = props;
  const [acente, setAcente] = useState([]);
  const [loading, setLoading] = useState(false);

  const hanadleFetchAcente = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}get_featured_acente_brands`);
      setAcente(response?.data);
      return setLoading(false);
    } catch (error) {
      console.debug("Error fetching acente:", error);
      return setLoading(false);
    }
  };

  useEffect(() => {
    hanadleFetchAcente();
  }, []);

  return (
    <View style={styles.cont}>
      {loading && (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      )}
      <View>
        <FlatList
          data={acente}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ViewAllCard
              name={item?.name}
              refCode={item?.code}
              image={item?.profile_image}
              onPress={() => {
                navigation.navigate("Profile", {
                  id: item?.id,
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ViewAll;

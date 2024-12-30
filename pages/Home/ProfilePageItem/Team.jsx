import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Filter from "../../../assets/filterRealtor.svg";
import { useNavigation } from "@react-navigation/native";
import IconFilter from "react-native-vector-icons/MaterialCommunityIcons"; // import for icon

export default function Team({ team, type }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const filteredTeam = useMemo(() => {
    if (search) {
      return team.filter((item) => {
        const itemData = item.name?.toUpperCase() || "";
        const textData = search.toUpperCase();
        return itemData.includes(textData);
      });
    }
    return team;
  }, [search, team]);

  return (
    <View style={styles.container}>
      <View style={styles.filterBody}>
        <TextInput
          placeholder="Ara..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.filter}
          onPress={() => navigation.navigate("TeamFilter")}
        >
          <Filter width={16} height={16} style={{ marginRight: 6 }} />
          <Text style={styles.filterText}>Filtrele</Text>
        </TouchableOpacity>
      </View>

      {filteredTeam.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <IconFilter name="emoticon-sad-outline" size={50} color="#EA2B2E" />
          <Text style={styles.noResultsText}>Sonuç bulunamadı.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTeam}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                disabled={type !== "Franchise Markası"}
                style={styles.main}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("FranchisePersonDetail", { item })
                }
              >
                <View style={styles.imgBody}>
                  <Image
                    source={{
                      uri: `${frontEndUriBase}storage/profile_images/${item.profile_image}`,
                    }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textBody}>
                  <Text style={styles.boldText}>{item.name}</Text>
                  <Text style={styles.boldText}>{item?.title}</Text>
                  <Text style={styles.thinText}>
                    Referans Kodu: {item.code}
                  </Text>
                  <View style={styles.info}>
                    <FontAwesome5 name="phone-alt" size={12} color="#000" />
                    <Text style={styles.thinText}>{item.mobile_phone}</Text>
                  </View>
                  <View style={styles.info}>
                    <MaterialIcons name="email" size={12} color="#000" />
                    <Text style={styles.thinText}>{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.seperator} />
            </>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  main: {
    paddingHorizontal: 14,
    flexDirection: "row",
    gap: 16,
  },
  imgBody: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  boldText: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
  },
  thinText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  seperator: {
    width: "96%",
    height: 1,
    backgroundColor: "#CACACA",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  textBody: {
    gap: 3,
  },
  filterBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#7C7C7C",
    borderRadius: 4,
    padding: 6,
    marginRight: 10,
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7C7C7C",
    borderRadius: 4,
    paddingHorizontal: 10,
    padding: 6,
    flex: 1,
  },
  filterText: {
    color: "#7C7C7C",
    fontSize: 12,
    fontWeight: "500",
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
});

import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React from "react";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Filter from "../../../assets/filterRealtor.svg";

export default function Team({ team }) {
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0][0] + nameParts[1][0].toUpperCase();
    } else if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    } else {
      return "";
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={team}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <View style={styles.main}>
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
                <Text style={styles.thinText}>Referans Kodu: {item.code}</Text>
                <View style={styles.info}>
                  <FontAwesome5 name="phone-alt" size={12} color="#000" />
                  <Text style={styles.thinText}>{item.mobile_phone}</Text>
                </View>
                <View style={styles.info}>
                  <MaterialIcons name="email" size={12} color="#000" />
                  <Text style={styles.thinText}>{item.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.seperator} />
          </>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.filterBody}>
              <TextInput placeholder="Ara..." style={styles.input} />
              <TouchableOpacity activeOpacity={0.7} style={styles.filter}>
                <Filter width={16} height={16} style={{ marginRight: 6 }} />
                <Text style={styles.filterText}>Filtrele</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
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
});

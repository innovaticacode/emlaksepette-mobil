import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Notificate from "../../components/Notificate";
import { useRoute } from '@react-navigation/native';
import moment from "moment";
import "moment/locale/tr";

export default function Notifications() {
  const route = useRoute();
  const { notifications } = route.params;

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Sil</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 5 }}>
        <Text style={{ color: "grey" }}>Bugün</Text>
      </View>
      <ScrollView style={{}}>
        <View style={{ gap: 15 }}>
          {notifications.map((item, index) => (
            <GestureHandlerRootView key={index}>
              <Swipeable renderRightActions={renderRightActions}>
                <Notificate
                  key={index}
                  name={item.text}
                  time={moment(item.created_at).locale("tr").format("LLL")}
                />
              </Swipeable>
            </GestureHandlerRootView>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },

  deleteButton: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#ea2b2e",

    flexDirection: "row",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
  },
});

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Favorite from "../../components/Favorite";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Categories from "../../components/Categories";
import Search from "./Search";
import { useNavigation } from "@react-navigation/native";
import FavoriteComp from "../../components/FavoriteComp";

export default function Test() {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <Modal
          isVisible={isDrawerOpen}
          onBackdropPress={() => setIsDrawerOpen(false)}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View
              style={{
                backgroundColor: "red",
                padding: 10,
                flex: 0.7 / 2,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("HomePage");
                      setIsDrawerOpen(false);
                    }}
                  >
                    <Categories
                      category="Ana Sayfa"
                      bordernone="none"
                      ıconName="home"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Hesabım");
                      setIsDrawerOpen(false);
                    }}
                  >
                    <Categories
                      category="Hesabım"
                      bordernone="none"
                      ıconName="user"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Categories
                      category="Emlak Kulüp"
                      bordernone="none"
                      showImage={true}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Categories
                      category="İlan Ver"
                      bordernone="none"
                      ıconName="plus"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Categories
                      category="Sat Kirala"
                      bordernone="none"
                      ıconName="search-plus"
                    />
                  </TouchableOpacity>
                </ScrollView>
              </SafeAreaView>
            </View>
            <View style={{ backgroundColor: "white", flex: 1.3 / 2 }}>
              <Search onpres={toggleDrawer} />
            </View>
          </View>
        </Modal>
        <View>
          <Header onPress={toggleDrawer} />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ color: "#333", fontSize: 22 }}>Favoriler</Text>
        </View>
        <FavoriteComp />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },

  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
});

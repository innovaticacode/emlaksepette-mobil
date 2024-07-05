import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const ExtradionRequest = () => {
  const [checked, setChecked] = useState(false);
  const pagerRef = useRef(null);

  const handleNextPage = (page) => {
    if (page == 1 && !checked) {
      return;
    }
    pagerRef.current?.setPage(page);
  };

  const HandleCheckboxToggle = () => {
    setChecked(!checked);
  };
  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      ref={pagerRef}
      scrollEnabled={false}
    >
      <View key="1" style={styles.pageContainerr}>
        <TouchableOpacity
          onPress={HandleCheckboxToggle}
          style={styles.CheckboxContainer}
        >
          <Checkbox status={checked ? "checked" : "unchecked"} />
          <Text>Aydınlatma Metnini Okudum Onaylıyorum.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNextPage(1)}
        >
          <Text style={styles.buttonText}>İleri</Text>
        </TouchableOpacity>
      </View>
      <View key="2" style={styles.pageContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Soyad</Text>
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              placeholder="Telefon Numarası"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => handleNextPage(0)}
          >
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNextPage(2)}
          >
            <Text style={styles.buttonText}>İleri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => handleNextPage(0)}
          >
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNextPage(2)}
          >
            <Text style={styles.buttonText}>İleri</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View key="3" style={styles.pageContainer}>
        <Text>Üçüncü Sayfa</Text>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => handleNextPage(1)}
        >
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    padding: 20,
  },
  pageContainerr: {
    flex: 1,
    marginTop: 20,
  },
  pageContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  CheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#E54242",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333", // Yazı rengi
  },
  inputContainer: {
    width: "90%",
  },
});

export default ExtradionRequest;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { apiUrl } from "../../components/methods/apiRequest";

const MapWiew = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl+"real-estates")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url).catch((err) =>
      console.error("Google Maps açılırken hata oluştu:", err)
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.9334,
          longitude: 32.8597,
          latitudeDelta: 5.0,
          longitudeDelta: 13.0,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }}
            title={marker.housing_title}
            description={marker.address}
            onPress={() => setSelectedMarker(marker)}
            pinColor="red" // Kırmızı marker rengi
          />
        ))}
      </MapView>

      {selectedMarker && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!selectedMarker}
          onRequestClose={() => setSelectedMarker(null)}
        >
          <TouchableWithoutFeedback onPress={() => setSelectedMarker(null)}>
            <View style={styles.modalBackdrop}>
              <View style={styles.modalView}>
                <View style={styles.modalContent}>
                  <Image
                    source={{ uri: selectedMarker.image }} // Modal'da resmi gösteriyoruz
                    style={styles.modalImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.modalTitle}>
                      {selectedMarker.housing_title}
                    </Text>
                    <Text style={styles.modalDescription}>
                      {selectedMarker.address}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      openGoogleMaps(
                        selectedMarker.latitude,
                        selectedMarker.longitude
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>Yol Tarifi Al</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setSelectedMarker(null)}
                  >
                    <Text style={styles.buttonText}>Kapat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Modal arka planını karartıyoruz
  },
  modalView: {
    marginTop: "auto",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    objectFit: "contain",
  },
  textContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Butonlar arasına boşluk eklemek için
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5, // Butonlar arasına boşluk eklemek için
    flex: 1, // Butonların genişliğini eşit yapar
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MapWiew;

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapWiew = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    {
      id: 1,
      title: "Kayseri İlanı",
      description: "Kayseri'deki ilan açıklaması",
      coordinate: {
        latitude: 38.7322,
        longitude: 35.4853,
      },
    },
    {
      id: 2,
      title: "Elazığ İlanı",
      description: "Elazığ'daki ilan açıklaması",
      coordinate: {
        latitude: 38.6749,
        longitude: 39.2219,
      },
    },
    {
      id: 3,
      title: "Ahmet İlanı",
      description: "Ahmet'in ilan açıklaması",
      coordinate: {
        latitude: 40.7322,
        longitude: 36.4853,
      },
    },
  ];

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
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => setSelectedMarker(marker)}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedMarker}
          onRequestClose={() => setSelectedMarker(null)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedMarker.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedMarker.description}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                openGoogleMaps(
                  selectedMarker.coordinate.latitute,
                  selectedMarker.coordinate.longitude
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "100%",
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

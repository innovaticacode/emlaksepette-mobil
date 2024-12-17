import { View, Text, Button, TouchableOpacity } from "react-native";
import { React } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import openMap from "react-native-open-maps";
export default function Map({ mapData }) {
  var locationCoords = mapData.project.location.split(",");

  const handleGetDirections = () => {
    // Harita uygulamasını açmak ve seçilen konuma yönlendirme yapmak için openMap fonksiyonunu kullanıyoruz
    if (locationCoords && locationCoords[0] && locationCoords[1]) {
      openMap({
        latitude: parseFloat(locationCoords[0]),
        longitude: parseFloat(locationCoords[1]),
        query:
          mapData.project.city.title + "/" + mapData.project.county.ilce_title,
      });
    } else {
      Alert.alert("Hata", "Konum bilgisi bulunamadı.");
    }
  };

  return (
    <View style={{ height: 400 }}>
      <TouchableOpacity
        onPress={handleGetDirections}
        style={{
          position: "absolute",
          zIndex: 2,
          backgroundColor: "white",
          padding: 10,
          top: 5,
        }}
      >
        <Text style={{ color: "black" }}>Yol Tarifi Al</Text>
      </TouchableOpacity>

      <MapView
        region={{
          latitude: parseFloat(locationCoords[0]),
          longitude: parseFloat(locationCoords[1]),

          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          altidute: 50.03281021118164,
        }}
        style={{ flex: 1 }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(locationCoords[0]),
            longitude: parseFloat(locationCoords[1]),
          }}
          title={
            mapData.project.city.title + "/" + mapData.project.county.ilce_title
          }
          description="Projenin Konumu"
        />
      </MapView>
    </View>
  );
}

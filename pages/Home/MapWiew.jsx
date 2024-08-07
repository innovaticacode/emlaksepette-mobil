import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapWiew = () => {
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
  ];

  return (
    <View style={styles.container}>
      <MapView
        // Google Maps'i kullanmak istiyorsanız
        style={styles.map}
        initialRegion={{
          latitude: 39.9334, // Türkiye'nin yaklaşık merkezi koordinatları
          longitude: 32.8597,
          latitudeDelta: 10.0, // Zoom seviyesini ayarlayın
          longitudeDelta: 10.0,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
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
});

export default MapWiew;

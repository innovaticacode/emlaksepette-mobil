import { View, Text, Button, TouchableOpacity } from "react-native";
import { React } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function ProfileMap({ mapData }) {
  return (
    <View style={{ height: "100%", paddingLeft: 9, paddingRight: 8 }}>
      <MapView
        initialRegion={{
          latitude: mapData?.data?.latitude,
          longitude: mapData?.data?.longitude,

          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          altidute: 50.03281021118164,
        }}
        style={{ flex: 1 }}
      >
        <Marker
          coordinate={{
            latitude: mapData?.data?.latitude,
            longitude: mapData?.data?.longitude,
          }}
          // title={mapData?.housing?.city?.title / mapData?.housing?.county?.title}
          description="Konutun Konumu"
        />
      </MapView>
    </View>
  );
}

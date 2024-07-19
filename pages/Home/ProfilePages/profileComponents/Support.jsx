import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Support() {
  const [step, setStep] = useState(0);
  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: step == 1 ? "blue" : "gray",
          }}
          onPress={() => setStep(1)}
        >
          <Text style={{ color: "#333" }}>Talep Gönder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: step == 2 ? "blue" : "gray",
          }}
          onPress={() => setStep(2)}
        >
          <Text style={{ color: "#333" }}>Gelen Talepler</Text>
        </TouchableOpacity>
      </View>
      {step == 1 && (
        <View>
          <Text>asd</Text>
        </View>
      )}

      {step == 2 && (
        <View>
          <Text>looloololo</Text>
        </View>
      )}
    </View>
  );
}

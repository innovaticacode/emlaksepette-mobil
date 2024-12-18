import { View, Text, Dimensions } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import ActionSheet from "react-native-actions-sheet";
import { WebView } from "react-native-webview";
import { frontEndUriBase } from "../methods/apiRequest";
import { ActivityIndicator } from "react-native-paper";
export default function ContratsActionSheet({
  isVisibleOpen,
  url,
  setIsVisible,
}) {
  const { width, height } = Dimensions.get("screen");
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (isVisibleOpen) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisibleOpen]);
  const [loading, setLoading] = useState(true);
  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={() => setIsVisible(false)} // Modal kapandığında dışarıya durumu bildir
      containerStyle={{
        backgroundColor: "#FFF",
        width: "100%",
        height: "90%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      closable={true}
      defaultOverlayOpacity={0.3}
      animated={true}
    >
      <View style={{ height: "100%" }}>
        {loading && (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator
              size="large"
              color="#333" // Spinner rengi
            />
          </View>
        )}
        <WebView
          source={{ uri: `${frontEndUriBase}page/${url ?? url}` }}
          style={{ height: "100%" }}
          renderLoading={() => {
            return <ActivityIndicator />;
          }}
          onLoadStart={() => setLoading(true)} // Yükleme başlarken spinner göster
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      {/*  */}
    </ActionSheet>
  );
}

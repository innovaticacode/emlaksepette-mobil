import { View, Text, Dimensions } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import ActionSheet from "react-native-actions-sheet";

export default function ContratsActionSheet({ isVisibleOpen, url }) {
  const { width, height } = Dimensions.get("screen");
  const actionSheetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isVisibleOpen) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisibleOpen]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={() => setIsVisible(false)} // Modal kapandığında dışarıya durumu bildir
      containerStyle={{
        backgroundColor: "#FFF",
        width: width,
        height: "60%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      closable={true}
      defaultOverlayOpacity={0.3}
      animated={true}
    ></ActionSheet>
  );
}

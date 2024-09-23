import React, { useRef, useEffect, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Dimensions, Text, View } from "react-native";
import { CheckBox } from "@rneui/themed";

const { width, height } = Dimensions.get("screen");

const EstateBottomSheetFilter = (props) => {
  const { isVisible, setIsVisible } = props;
  const actionSheetRef = useRef(null);

  const [checkboxes, setCheckboxes] = useState([
    { label: "Tümü", checked: true, count: 23 },
    { label: "Satılık", checked: false, count: 9 },
    { label: "Kiralık", checked: false, count: 5 },
    { label: "Günlük Kiralık", checked: false, count: 9 },
  ]);

  const toggleCheckbox = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={() => setIsVisible(false)} // Modal kapandığında dışarıya durumu bildir
      containerStyle={{
        backgroundColor: "#FFF",
        width: width,
        height: height < 812 ? height * 0.5 : height * 0.36,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      closable={true}
      defaultOverlayOpacity={0.3}
      animated={true}
    >
      <View
        style={{
          padding: 16,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#C9C9C9",
              height: 2,
              width: "10%",
              marginBottom: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Filtre
        </Text>
        {checkboxes.map((checkbox, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <CheckBox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
              label={checkbox.label}
              checked={checkbox.checked} // Checkbox durumu
              onChange={() => handleCheckboxChange(index)} // Checkbox değiştirildiğinde
              onPress={() => toggleCheckbox(index)} // Checkbox tıklandığında
            />
            <Text>{`${checkbox.label} (${checkbox?.count})`}</Text>
          </View>
        ))}
      </View>
    </ActionSheet>
  );
};

export default EstateBottomSheetFilter;

import React, { useRef, useEffect, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Dimensions, Text, View } from "react-native";
import { CheckBox } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("screen");

const EstateBottomSheetFilter = ({
  isVisible,
  setIsVisible,
  setFilter,
  totalCount,
}) => {
  const actionSheetRef = useRef(null);

  const [checkboxes, setCheckboxes] = useState([
    { label: "Tümü", checked: true, count: totalCount, value: null },
    { label: "Satılık", checked: false, value: "satilik" },
    { label: "Kiralık", checked: false, value: "kiralik" },
    {
      label: "Günlük Kiralık",
      checked: false,
      value: "gunluk-kiralik",
    },
  ]);

  const toggleCheckbox = (index) => {
    const newCheckboxes = checkboxes.map((checkbox, i) => ({
      ...checkbox,
      checked: i === index,
    }));
    setCheckboxes(newCheckboxes);
    setFilter(newCheckboxes[index].value);
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
      onClose={() => setIsVisible(false)}
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
      <View style={{ padding: 16 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
              checked={checkbox.checked} // Checkbox durumu
              onPress={() => toggleCheckbox(index)}
            />
            <TouchableOpacity onPress={() => toggleCheckbox(index)}>
              <Text>
                {checkbox?.count !== undefined && checkbox?.count > 0
                  ? `${checkbox?.label} (${checkbox?.count})`
                  : checkbox?.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ActionSheet>
  );
};

export default EstateBottomSheetFilter;

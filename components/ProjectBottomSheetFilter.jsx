import React, { useRef, useEffect, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Dimensions, Text, View } from "react-native";
import { CheckBox } from "@rneui/themed";

const { width, height } = Dimensions.get("screen");

const ProjectBottomSheetFilter = (props) => {
  const { isVisible, setIsVisible, onFilterChange } = props;
  const actionSheetRef = useRef(null);

  const [checkboxes, setCheckboxes] = useState([
    { label: "Tümü", checked: true, count: 23, slug: "tum-projeler" },
    {
      label: "Devam Eden Projeler",
      checked: false,
      count: 9,
      slug: "devam-eden-projeler",
    },
    {
      label: "Tamamlanan Projeler",
      checked: false,
      count: 5,
      slug: "tamamlanan-projeler",
    },
    {
      label: "Topraktan Projeler",
      checked: false,
      count: 9,
      slug: "topraktan-projeler",
    },
  ]);

  // only one checkbox can be selected at a time
  const handleCheckboxChange = (index) => {
    const newCheckboxes = checkboxes.map((checkbox, i) => ({
      ...checkbox,
      checked: i === index, // only one checkbox can be selected, others will be false
    }));
    setCheckboxes(newCheckboxes);

    // Seçilen checkbox değerini üst bileşene ilet
    const selectedHousingType = newCheckboxes[index].slug;
    onFilterChange(selectedHousingType); // Ana bileşene filtreyi gönder
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
      <View style={{ padding: 16 }}>
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
              checked={checkbox.checked}
              onPress={() => handleCheckboxChange(index)}
            />
            <Text>{`${checkbox.label} (${checkbox?.count})`}</Text>
          </View>
        ))}
      </View>
    </ActionSheet>
  );
};

export default ProjectBottomSheetFilter;

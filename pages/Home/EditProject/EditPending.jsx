import { View, Text } from "react-native";
import React from "react";
import NoDataScreen from "../../../components/NoDataScreen";

const EditPending = () => {
  return (
    <View style={{ flex: 1 }}>
      <NoDataScreen
        buttonText={"Anasayfaya Dön"}
        isShowButton={true}
        message={
          "Düzenleme henüz aktif değil, düzenleme için web sitemizi kullanabilirsiniz."
        }
        iconName={"tooltip-edit"}
        navigateTo={"Home"}
      />
    </View>
  );
};

export default EditPending;

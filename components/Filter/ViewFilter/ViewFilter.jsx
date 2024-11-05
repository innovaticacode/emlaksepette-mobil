import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";
import { Stack } from "@react-native-material/core";
import { styles } from "../RadioFilter/RadioFilter.styles";
import { useNavigation } from "@react-navigation/native";


const ViewFilter = ({selectedView,showViewModal,setshowViewModal, handleRadio}) => {
const nav =useNavigation()
  return (
    <React.Fragment>
      <Modal
        style={styles.modalBody}
        isVisible={showViewModal}
        onBackdropPress={() => setshowViewModal(false)}
        backdropColor="transparent"
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        swipeDirection={["down"]}
        onSwipeComplete={() => setshowViewModal(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Görünüm</Text>
          </View>
          <View>
            <Stack row align="center" spacing={4}>
              <CheckBox
                checked={selectedView === 0}
                onPress={() => {
                  handleRadio(0);
                  setshowViewModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>Liste Görünümü (Varsayılan)</Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
              <CheckBox
                checked={selectedView === 1}
                onPress={() => {
                  handleRadio(1);
                  setshowViewModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>Detaylı Görünüm</Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
              <CheckBox
                checked={selectedView === 2}
                onPress={() => {
                  handleRadio(2);
                  setshowViewModal(false);
                  setTimeout(() => {
                        nav.navigate('MapWiew')
                        handleRadio(0)
                  }, 200);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>
                    Harita Görünümü
                  </Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
            
            </Stack>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ViewFilter;

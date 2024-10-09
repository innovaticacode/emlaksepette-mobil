import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";
import { Stack } from "@react-native-material/core";
import { styles } from "./RadioFilter.styles";

const RadioFilter = (props) => {
  const { selectedIndex, sortListModal, setSortListModal, handleRadio } = props;
  return (
    <React.Fragment>
      <Modal
        style={styles.modalBody}
        isVisible={sortListModal}
        onBackdropPress={() => setSortListModal(false)}
        backdropColor="transparent"
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        swipeDirection={["down"]}
        onSwipeComplete={() => setSortListModal(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Sıralama</Text>
          </View>
          <View>
            <Stack row align="center" spacing={4}>
              <CheckBox
                checked={selectedIndex === 0}
                onPress={() => {
                  handleRadio(0);
                  setSortListModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>Fiyata göre (Önce en düşük)</Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
              <CheckBox
                checked={selectedIndex === 1}
                onPress={() => {
                  handleRadio(1);
                  setSortListModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>Fiyata göre (Önce en yüksek)</Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
              <CheckBox
                checked={selectedIndex === 2}
                onPress={() => {
                  handleRadio(2);
                  setSortListModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>
                    Tarihe göre (Önce en eski ilan)
                  </Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
              <CheckBox
                checked={selectedIndex === 3}
                onPress={() => {
                  handleRadio(3);
                  setSortListModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={
                  <Text style={styles.text}>
                    Tarihe göre (Önce en yeni ilan)
                  </Text>
                }
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />

              <CheckBox
                checked={selectedIndex === 4}
                onPress={() => {
                  handleRadio(4);
                  setSortListModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={<Text style={styles.text}>Ada göre (A'dan Z'ye)</Text>}
                containerStyle={styles.checkBox}
                checkedColor="#333"
              />
              <CheckBox
                checked={selectedIndex === 5}
                onPress={() => {
                  handleRadio(5);
                  setSortListModal(false);
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={<Text style={styles.text}>Ada göre (Z'den A'ya)</Text>}
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

export default RadioFilter;

import React, { useEffect, useRef } from "react";
import { View, Text, TextInput, ScrollView, Dimensions } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { styles } from "./FranchiseForm.styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import WhiteOrRedButtons from "../../Buttons/WhiteOrRedButtons/WhiteOrRedButtons";

const FranchiseForm = ({ isVisible, setIsVisible }) => {
  const actionSheetRef = useRef(null);
  const screenHeight = Dimensions.get("screen").height;
  const actionSheetHeight = screenHeight * 0.71;

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);

  return (
    <View>
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setIsVisible(false)}
        closable={true}
        animated={true}
        defaultOverlayOpacity={0.3}
        drawUnderStatusBar={true}
        gestureEnabled={true}
        containerStyle={[styles.container, { height: actionSheetHeight }]}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headText}>Franchise Başvuru Formu</Text>
            <AntDesign
              name="close"
              size={24}
              color="#EA2B2E"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.seperator} />

          <View>
            <View style={styles.inputBody}>
              <Text style={styles.inputInfo}>Ad Soyad</Text>
              <TextInput
                placeholder="Adınızı ve soyadınızı yazın..."
                style={styles.input}
              />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.inputInfo}>E-posta Adresi</Text>
              <TextInput placeholder="örnek@gmail.com" style={styles.input} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.inputInfo}>Telefon Numarası</Text>
              <TextInput placeholder="5xx xxx xx xx" style={styles.input} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.inputInfo}>Şehir</Text>
              <TextInput placeholder="İstanbul" style={styles.input} />
            </View>

            <View style={styles.inputBody}>
              <Text style={styles.inputInfo}>Mesajınız</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={250}
                placeholder="Franchise başvurunuzla ilgili mesajınızı yazın..."
                style={styles.messageInput}
              />
            </View>
            <View style={{ height: 40, marginVertical: 10 }}>
              <WhiteOrRedButtons
                text={"Gönder"}
                bgColor={"#EA2B2E"}
                onPress={() => null}
              />
            </View>
          </View>
        </ScrollView>
      </ActionSheet>
    </View>
  );
};

export default FranchiseForm;

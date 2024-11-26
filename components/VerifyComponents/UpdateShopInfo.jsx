import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { ScrollView } from "react-native";
import WebView from "react-native-webview";
import NextAndPrevButton from "./NextAndPrevButton";
export default function UpdateShopInfo({nextStep,prevStep}) {
  const richText = useRef(null);
  const [prevBioText, setprevBioText] = useState("");

 



  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{height:'100%' }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          
        }}
        
      >
        <View style={{ padding: 15, gap: 20 }}>
          <View>
            <Text style={styles.Label}>Web Sitesi</Text>
            <TextInput style={styles.Input} />
          </View>
          <View>
            <Text style={styles.Label}>Sektöre Giriş Tarihi</Text>
            <TextInput style={styles.Input} />
          </View>
          {/* <View>
            <Text style={styles.Label}>Hakkında</Text>
            <View
              style={{
                height: "65%",
                borderRightWidth: 1,
                borderColor: "#ebebeb",
                borderLeftWidth: 1,
                borderBottomWidth: 1,
              }}
            >
      
               <RichToolbar
                editor={richText}
                selectedIconTint="blue" // Aktif olan ikonun rengi mavi olacak
                iconTint="#333"
                actions={[
                  actions?.setBold,
                  actions?.setItalic,
                  actions?.insertBulletsList,
                  actions?.insertOrderedList,
                  actions?.insertLink,
                  actions?.setStrikethrough,
                  actions?.setUnderline,
                  actions?.undo,
                  actions?.redo,
                  actions?.heading2,
                  actions?.fontSize,
               ]}
                iconMap={{ [actions?.heading2]: handleHead }}
              />
               <RichEditor
             
                ref={richText}
                placeholder="Tanıtım Yazısı Yazınız"
                height={200}
                onChange={(descriptionText) => {
                  setBioText(descriptionText || '');
                }}
              />  
            </View>
          </View> */}
         
        </View>

      </TouchableWithoutFeedback>
      <NextAndPrevButton nextButtonPress={nextStep} prevButtonPress={prevStep} />
    </ScrollView>
  );
}
const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const styles = StyleSheet.create({
  Input: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#717171",
    fontWeight: "600",
  },
  Label: {
    fontSize: 13,
    bottom: 3,
    left: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#333",
  },
});

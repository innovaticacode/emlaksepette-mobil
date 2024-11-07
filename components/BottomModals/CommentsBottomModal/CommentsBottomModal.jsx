import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { styles } from "./CommentsBottomModal.styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CheckBox } from "@rneui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import WhiteOrRedButtons from "../../Buttons/WhiteOrRedButtons/WhiteOrRedButtons";

const CommentsBottomModal = ({ isVisible, setIsVisible }) => {
  const actionSheetRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState({
    "Düzenli Bilgilendirme": 0,
    Hız: 0,
    "Profesyonel Deneyim": 0,
    "Sektör Bilgisi": 0,
    Güvenirlik: 0,
    Diğer: 0,
  });

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);

  const handleStarPress = (category, rating) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const renderStars = (category, selectedCount) => {
    return Array(5)
      .fill()
      .map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleStarPress(category, index + 1)}
        >
          <MaterialCommunityIcons
            name="star"
            size={20}
            color={index < selectedCount ? "#FFAF01" : "#D4D4D4"}
          />
        </TouchableOpacity>
      ));
  };

  const ratingCategories = [
    { label: "Düzenli Bilgilendirme" },
    { label: "Hız", backgroundColor: "#FFF" },
    { label: "Profesyonel Deneyim" },
    { label: "Sektör Bilgisi", backgroundColor: "#FFF" },
    { label: "Güvenirlik" },
    { label: "Diğer", backgroundColor: "#FFF" },
  ];

  return (
    <View>
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setIsVisible(false)}
        closable={true}
        animated={true}
        defaultOverlayOpacity={0.3}
        drawUnderStatusBar={true}
        gestureEnabled={false}
        containerStyle={styles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headText}>Yorum Yap / Değerlendir</Text>
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
              <View style={styles.infoArea}>
                <Text style={styles.boldText}>Ad</Text>
                <Text style={styles.thinText}>{`(Yorumda Gösterilecek)`}</Text>
              </View>
              <TextInput style={styles.input} editable={false} />
            </View>
            <View style={styles.inputBody}>
              <View style={styles.infoArea}>
                <Text style={styles.boldText}>Soyad</Text>
                <Text style={styles.thinText}>{`(Yorumda Gösterilecek)`}</Text>
              </View>
              <TextInput style={styles.input} editable={false} />
            </View>

            <CheckBox
              title={"Sayfada adımı gizle"}
              checked={toggle}
              onPress={() => setToggle(!toggle)}
              checkedColor="#000000"
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={"checkbox-blank-outline"}
              containerStyle={styles.checkBox}
              textStyle={styles.boldText}
            />
            <View style={styles.inputBody}>
              <Text style={styles.boldText}>Telefon Numarası</Text>
              <TextInput style={styles.input} editable={false} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.boldText}>E-posta Adresi</Text>
              <TextInput style={styles.input} editable={false} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.boldText}>Yorumunuz</Text>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Yorumunuzu buraya yazabilirsiniz..."
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={250}
              />
            </View>
          </View>

          <View style={styles.pointer}>
            <Text style={[styles.boldText, { paddingVertical: 8 }]}>
              Danışmanı Puanlayınız
            </Text>
            {ratingCategories.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.statistic,
                  item.backgroundColor && {
                    backgroundColor: item.backgroundColor,
                  },
                ]}
              >
                <Text style={styles.boldText}>{item.label}</Text>
                <View style={styles.stars}>
                  {renderStars(item.label, selectedRatings[item.label])}
                </View>
              </View>
            ))}
          </View>
          <View style={{ marginVertical: 20 }}>
            <WhiteOrRedButtons
              text={"Gönder"}
              onPress={() => null}
              bgColor={"#EA2B2E"}
            />
          </View>
        </ScrollView>
      </ActionSheet>
    </View>
  );
};

export default CommentsBottomModal;

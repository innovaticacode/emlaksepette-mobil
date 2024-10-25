import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import AwesomeAlert from "react-native-awesome-alerts";
import Header from "../../../assets/salePageHeader.png";
import { SalePointCard, WhiteOrRedButtons } from "../../../components";
import Bg from "../../../assets/salePageBg.png";
import CardDatajson from "../../../json/SalePage.json";
import SaleMap from "../../../assets/saleMap.svg";
import Docs from "../../../assets/docs.svg";
import Line from "../../../assets/lineArrow.svg";
import Clock from "../../../assets/clock.svg";
import Okey from "../../../assets/okey.svg";
import Faq from "../../../json/FaqSalePage.json";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";

export default function SalePageMain() {
  const [isUserHaveToken, setIsUserHaveToken] = useState(false);
  const [isCorporateTypeRight, setIsCorporateTypeRight] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [category, setCategory] = useState(
    dropdownData ? dropdownData[0].value : null
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const navigation = useNavigation();
  const handleSubmit = () => {
    if (!user?.access_token) {
      setIsUserHaveToken(true);
    } else if (user?.access_token && user.corporate_type !== "Emlak Ofisi") {
      setIsCorporateTypeRight(true);
    } else if (user?.access_token && user.corporate_type === "Emlak Ofisi") {
      navigation.navigate("SalePage");
    }
  };
  const navigateToLogin = () => {
    navigation.navigate("Login");
    closeModal();
  };
  const closeModal = () => {
    setIsCorporateTypeRight(false);
    setIsUserHaveToken(false);
  };

  const toggleExpand = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const dropdownData = [
    { label: "Kullanım", value: "use" },
    { label: "Avantajlar", value: "advantages" },
    { label: "Ödeme", value: "payment" },
  ];

  const filteredFaq = category
    ? Faq.filter((item) => item.category === category.value)
    : Faq;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollViewContent}
      scrollEventThrottle={16}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <AwesomeAlert
        show={isUserHaveToken}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        messageStyle={{ textAlign: "center" }}
        message={`Başvuru yapabilmek için önce giriş yapmalısınız!`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Kapat"
        confirmText="Giriş Yap"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={closeModal}
        onConfirmPressed={navigateToLogin}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <AwesomeAlert
        show={isCorporateTypeRight}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        messageStyle={{ textAlign: "center" }}
        message={`Başvuru yapabilmek için emlak ofisi olmalısınız!`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Kapat"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={closeModal}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ paddingHorizontal: 30, paddingTop: 20, gap: 20 }}>
          <Image
            source={Header}
            width={"100%"}
            height={200}
            resizeMode="cover"
          />
          <View style={{ paddingTop: 14 }}>
            <View style={{ gap: 14 }}>
              <Text style={{ fontSize: 24, fontWeight: "600" }}>
                TEK TIKLA BİNLERCE PORTFÖYDE SATIŞ YETKİSİNE SAHİP OL!
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 17 }}>
                Emlak ofisleri, platformda bulunan "Satış Noktası Ol" butonuna
                tıklayarak Emlaksepette yetkili satış noktası olma başvurusunda
                bulunabilirler. Bu başvuru, emlak ofisinin bulunduğu bölgede
                emlaksepette ile iş birliği yaparak çeşitli avantajlardan
                faydalanma ve sınırsız kazanç elde etme imkanı sağlar.
              </Text>
              <WhiteOrRedButtons
                bgColor={"#EA2B2E"}
                text={"Hemen Başvur"}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <ImageBackground
            source={Bg}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={styles.bodyTitle}>
                Emlaksepette Satış Noktası Olmanın Avantajları Nelerdir?
              </Text>
              <FlatList
                data={CardDatajson}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <SalePointCard
                    title={item.title}
                    description={item.description}
                    icon={item.image}
                  />
                )}
              />
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            paddingTop: 20,
          }}
        >
          <View style={styles.mapCard}>
            <Text style={{ fontWeight: "700", fontSize: 12 }}>
              Emlaksepette Satış Noktaları
            </Text>
            <View style={styles.mapArea}>
              <SaleMap style={styles.map} />
            </View>

            <View>
              <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 17 }}>
                ÇOK YAKINDA 81 İLDEYİZ !
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 10,
                  lineHeight: 12,
                }}
              >
                Emlaksepette satış noktası olmak istiyorsanız, hemen başvurunuzu
                yaparak bu büyüyen ağın bir parçası olabilirsiniz.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F9F9F9",
            paddingVertical: 20,
          }}
        >
          <View style={{ paddingHorizontal: 40 }}>
            {/* Section 1: Nasıl Satış Noktası Olurum? */}
            <View style={styles.section}>
              <Text style={styles.bigTitle}>Nasıl Satış Noktası Olurum?</Text>
              <View style={[styles.svgArea]}>
                <Docs width={50} height={50} />
              </View>
              <Text style={styles.title}>Başvuru Formu</Text>
              <Text style={styles.desc}>
                Emlak ofisleri, satış noktası başvuru formunu eksiksiz ve doğru
                bir şekilde doldurmalıdır. Formda istenen bilgilerin eksiksiz
                olması, başvurunun hızlı bir şekilde değerlendirilmesini sağlar.
              </Text>
              <Line style={{ marginTop: 20 }} />
            </View>
            {/* section 2: */}
            <View style={styles.section}>
              <View style={[styles.svgArea]}>
                <Clock width={50} height={50} />
              </View>
              <Text style={styles.title}>Değerlendirme Süreci</Text>
              <Text style={styles.desc}>
                Başvuru tamamlandıktan sonra, emlaksepette tarafından başvuru
                değerlendirilir. Bu süreçte, emlak ofisinin gerekli kriterlere
                uygunluğu kontrol edilir. Bu kriterler, ofisin geçmiş
                performansı, yerel pazar bilgisi ve profesyonel deneyim gibi
                unsurları içerebilir.
              </Text>
              <Line style={{ marginTop: 20 }} />
            </View>
            {/* section 3: */}
            <View style={styles.section}>
              <View style={[styles.svgArea]}>
                <Okey width={50} height={50} />
              </View>
              <Text style={styles.title}>Onay Süreci</Text>
              <Text style={styles.desc}>
                Başvurusu onaylanan emlak ofisleri, emlaksepette ile iş birliği
                yaparak sektördeki rekabet avantajlarını artırabilir. Bu, onlara
                bölgesel pazarda daha güçlü bir konum kazandırır.
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#FFF", paddingBottom: 20 }}>
          <Text style={styles.faqTitle}>Sıkça Sorulan Sorular</Text>
          <View style={styles.faqContainer}>
            <Text style={styles.categoryTitle}>Kategori Seçimi</Text>
            <Dropdown
              style={styles.dropDown}
              data={dropdownData}
              placeholder={dropdownData[0].label}
              containerStyle={styles.dropDownContainer}
              labelField="label"
              valueField="value"
              value={category}
              onChange={(value) => setCategory(value)}
            />
            <FlatList
              data={filteredFaq}
              renderItem={({ item }) => {
                const isExpanded = selectedId === item.id;
                return (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        isExpanded
                          ? styles.activeQuestion
                          : styles.questionContainer,
                      ]}
                      onPress={() => toggleExpand(item.id)}
                    >
                      <Text
                        style={[
                          styles.questionText,
                          isExpanded ? styles.activeQuestionText : null,
                        ]}
                      >
                        {item.question}
                      </Text>
                      <Icon5
                        name={
                          isExpanded
                            ? "keyboard-arrow-up"
                            : "keyboard-arrow-down"
                        }
                        size={24}
                        color={isExpanded ? "#fff" : "#999"}
                      />
                    </TouchableOpacity>
                    {isExpanded && (
                      <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  bodyTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    justifyContent: "center",
    color: "#FFF",
  },
  mapCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    gap: 16,
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "auto",
    resizeMode: "contain",
  },
  mapArea: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  bigTitle: {
    fontWeight: "700",
    fontSize: 26,
    lineHeight: 36,
    color: "#000",
    textAlign: "center",
  },
  svgArea: {
    backgroundColor: "#FFE3E3",
    borderRadius: 8,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    alignItems: "center",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
  },
  title: {
    fontWeight: "700",
    fontSize: 26,
    lineHeight: 36,
    color: "#000",
    textAlign: "center",
    marginTop: 18,
  },
  itemContainer: {
    marginBottom: 10,
  },
  faqTitle: {
    fontWeight: "700",
    fontSize: 26,
    lineHeight: 31,
    textAlign: "center",
    paddingVertical: 20,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
  },
  activeQuestion: {
    backgroundColor: "#EC302E",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  activeQuestionText: {
    color: "#fff",
  },
  answerContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  answerText: {
    fontSize: 14,
    color: "#666",
  },
  faqContainer: {
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginHorizontal: 16,
    paddingVertical: 22,
    borderRadius: 14,
    backgroundColor: "#fff",
    gap: 20,
  },
  dropDownContainer: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
  },
  dropDown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
    padding: 10,
  },
  categoryTitle: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 14,
  },
});

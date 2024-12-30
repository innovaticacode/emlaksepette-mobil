import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { apiUrl } from "../../../components/methods/apiRequest";

const { width, height } = Dimensions.get("window");

const SeeMyNeighbor = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [faqData, setFaqData] = useState([]);

  const fetchFaqData = async () => {
    const response = await axios.get(apiUrl + "faqs", {
      params: {
        title: "Komşumu Gör",
      },
    });
    return setFaqData(response.data.faqs);
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  const toggleExpand = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isExpanded = selectedId === item.id;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[
            styles.questionContainer,
            isExpanded ? styles.activeQuestion : null,
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
            name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
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
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.mainContainer2}>
        <View style={styles.coloredContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../../src/assets/images/KomsumuGorNedir/KomsumuGor2.png")}
            ></Image>
            <Text style={styles.bigTitle}>
              <Text style={styles.bigTitleRed}> "Komşunu Gör" </Text> ile Yeni
              Komşularınızla Tanışın, Güvenle Yatırım Yapın!
            </Text>
            <Text style={styles.mainContent}>
              EmlakSepette.com, inşaat projelerinden mülk satın alan kişilere,
              komşularıyla tanışma ve etkileşim kurma imkânı sunar. "Komşunu
              Gör" özelliği sayesinde, aynı projeden mülk alan diğer kişilerle
              iletişime geçebilir, onların deneyimlerinden faydalanarak daha
              bilinçli kararlar alabilirsiniz.
            </Text>
            <View style={styles.iconContainer}>
              <Image
                style={styles.iconImage}
                resizeMode="contain"
                source={require("../../../src/assets/images/KomsumuGorNedir/icon1.png")}
              ></Image>
            </View>
            <Text style={styles.title}>Projeye Kendinizi Ekleyin</Text>
            <Text style={styles.mainContent}>
              Bir inşaat projesinden mülk satın aldıysanız, emlaksepette.com'da
              o projeye kendinizi ekleyebilirsiniz. Bu sayede, aynı projede yer
              alan diğer mülk sahipleriyle bağlantı kurabilir ve onları
              tanıyabilirsiniz.
            </Text>
            <View style={styles.divider}></View>
            <View style={styles.iconContainer}>
              <Image
                style={styles.iconImage2}
                resizeMode="contain"
                source={require("../../../src/assets/images/KomsumuGorNedir/icon2.png")}
              ></Image>
            </View>
            <Text style={styles.title}>Mülk Almak İsteyenler</Text>
            <Text style={styles.mainContent}>
              Eğer bir projeden mülk satın almayı düşünüyorsanız,
              emlaksepette.com'a girerek ilgilendiğiniz projeyi seçebilir ve
              "Komşunu Gör" özelliğini kullanarak o projeden mülk almış
              kişilerle görüşebilirsiniz. Bu sayede, projeyle ilgili süreçler
              hakkında doğrudan bilgi alabilirsiniz.
            </Text>
            <View style={styles.divider}></View>

            <View style={styles.iconContainer}>
              <Image
                style={styles.iconImage3}
                resizeMode="contain"
                source={require("../../../src/assets/images/KomsumuGorNedir/icon3.png")}
              ></Image>
            </View>
            <Text style={styles.title}>Mülk Sahipliği</Text>
            <Text style={styles.mainContent}>
              Projeden bir mülk satın aldığınızda, EmlakSepette.com'da hangi
              dairenin sahibi olduğunuz kaydedilir ve bu bilgi platformda açıkça
              gösterilir. Böylece, diğer mülk sahipleriyle projede yer alabilir
              ve komşularınızı tanıyabilirsiniz.
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../src/assets/images/KomsumuGorNedir/KomsumuGor1.png")}
          ></Image>
        </View>
        <Text style={styles.bigTitle2}>Gizlilik ve Güvenlik </Text>
        <Text style={styles.mainContent}>
          EmlakSepette.com, "Komşunu Gör" özelliğini Kişisel Verilerin Korunması
          Kanunu (KVKK) çerçevesinde güvenli bir şekilde sunar. Komşularla
          iletişime geçmek isteyen kullanıcılar, belirli bir ücret karşılığında
          komşularının iletişim bilgilerine ulaşabilirler. Bu özellik sayesinde,
          sadece bir mülk değil, aynı zamanda bir topluluğun parçası
          olabilirsiniz. Komşularınızla tanışarak, mülk sahibi olma sürecinde
          daha güvenli ve bilinçli adımlar atabilirsiniz.
        </Text>
      </View>
      {faqData && (
        <View style={styles.SSS}>
          <View style={styles.faqSection}>
            <Text style={styles.titleSSS}>Sıkça Sorulan Sorular</Text>
          </View>

          <View style={styles.container}>
            <FlatList
              data={faqData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    showsVerticalScrollIndicator: false,
    alignContent: "center",
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: width * 0.65, // ekran genişliğinin %80'i
    height: height * 0.28,
    margin: 20,
  },
  bigTitle: {
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
    fontFamily: "Inter",
  },
  bigTitle2: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
    fontFamily: "Inter",
  },
  bigTitleRed: {
    color: "#EA2B2E",
  },
  mainContent: {
    textAlign: "center",
    marginHorizontal: 55,
    marginVertical: 10,
    fontWeight: "400",
    padding: 5,
    fontSize: 18,
    margin: 20,
    lineHeight: 24,
    marginBottom: 40,
  },
  iconImage: {
    width: width * 0.1, // ekran genişliğinin %80'i
    height: width * 0.1,
  },
  iconImage2: {
    width: width * 0.15, // ekran genişliğinin %80'i
    height: width * 0.15,
  },
  iconImage3: {
    width: width * 0.12, // ekran genişliğinin %80'i
    height: width * 0.12,
  },
  coloredContainer: {
    backgroundColor: "#FAFAFA",
  },

  iconContainer: {
    width: width * 0.25, // ekran genişliğinin %80'i
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: "#EA2B2E",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginTop: 20,
    fontFamily: "Montserrat",
  },
  titleSSS: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
    fontFamily: "Inter",
  },
  divider: {
    flex: 1,
    backgroundColor: "#C8C8C88C",
    height: 1,
    width: width * 0.8,
    marginTop: 10,
    marginBottom: 50,
    opacity: 0.9,
  },
  //ALT BİLGİ & SSS STİLLERİ
  itemContainer: {
    marginBottom: 10,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // Sadece dikey padding ekleyelim
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  activeQuestion: {
    backgroundColor: "#EC302E",
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
  SSS: {
    padding: 20,
  },
});
export default SeeMyNeighbor;

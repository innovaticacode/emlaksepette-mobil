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
import React, { useState } from "react";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import IconGroup from "./IconGroup";
import IconGroup2 from "./IconGroup2";

const { width, height } = Dimensions.get("window");

const SeeMyNeighbor = () => {
  const [selectedId, setSelectedId] = useState(null);

  const faqData = [
    {
      id: "1",
      question: '"Komşunu Gör" özelliği nedir?',
      answer:
        '"Komşunu Gör" özelliği, aynı inşaat projesinden mülk satın alan kişilerin birbirleriyle iletişim kurmasını sağlar. Bu sayede mülk sahipleri komşularıyla tanışabilir ve daha bilinçli kararlar alabilirler. Sat kirala sistemi gayrimenkullerini hızlı güvenli ve değerinde satmak isteyen bireysel satıcıların gayrimenkullerin platforma kayıtlı kurumsal emlak firmaları vasıtasıyla satışını sağlayan bir hizmettir.',
    },
    {
      id: "2",
      question: '"Komşunu Gör" özelliğini nasıl kullanabilirim?',
      answer:
        "EmlakSepette.com'a kaydolduktan sonra, mülk sahibi olduğunuz projeyi seçip kendinizi ekleyebilirsiniz. Eğer bir projeden mülk almak istiyorsanız, o projedeki mevcut mülk sahiplerine ulaşarak bilgi alabilirsiniz.",
    },
    {
      id: "3",
      question: "Bu özellik ücretli mi?",
      answer:
        "EmlakSepette.com, Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde, tüm kullanıcı verilerini güvenli bir şekilde korur. İletişim bilgileri sadece izin verilen kişiler tarafından görüntülenebilir.",
    },
    {
      id: "4",
      question: '"Komşunu Gör" özelliğini kullanırken bilgilerim güvende mi?',
      answer:
        '"Komşunu Gör" özelliği, aynı inşaat projesinden mülk satın alan kişilerin birbirleriyle iletişim kurmasını sağlar. Bu sayede mülk sahipleri komşularıyla tanışabilir ve daha bilinçli kararlar alabilirler. Sat kirala sistemi gayrimenkullerini hızlı güvenli ve değerinde satmak isteyen bireysel satıcıların gayrimenkullerin platforma kayıtlı kurumsal emlak firmaları vasıtasıyla satışını sağlayan bir hizmettir.',
    },
    {
      id: "5",
      question: "Mülk sahibi değilsem de bu özelliği kullanabilir miyim?",
      answer:
        "Evet, bir projeden mülk satın almayı düşünüyorsanız, mevcut mülk sahipleriyle iletişim kurabilir, onların deneyimlerinden faydalanabilirsiniz.",
    },
    {
      id: "6",
      question: "Projeden mülk aldığımı sisteme nasıl eklerim?",
      answer:
        "EmlakSepette.com üzerinden mülkünüzün alımını gerçekleştirirken otomatik olarak verdiğiniz izin ile birlikte kendinizi Komşunu Gör alanına ekleyebilirsiniz. Öncesinde almış olduğunuz bir mülk ise bilgilerinizi eklemek için emlak Sepette çağrı merkezi ile iletişime geçebilirsiniz.",
    },
    {
      id: "7",
      question: "Komisyonumu ne zaman alabilirim?",
      answer:
        '"Komşunu Gör" özelliği, aynı inşaat projesinden mülk satın alan kişilerin birbirleriyle iletişim kurmasını sağlar. Bu sayede mülk sahipleri komşularıyla tanışabilir ve daha bilinçli kararlar alabilirler. Sat kirala sistemi gayrimenkullerini hızlı güvenli ve değerinde satmak isteyen bireysel satıcıların gayrimenkullerin platforma kayıtlı kurumsal emlak firmaları vasıtasıyla satışını sağlayan bir hizmettir.',
    },
    {
      id: "8",
      question: "Bu özellik hangi projelerde geçerli?",
      answer:
        'EmlakSepette.com’da yer alan tüm inşaat projeleri için "Komşunu Gör" özelliği kullanılabilir. İlgili projeyi platformda arayarak özellikten faydalanabilirsiniz.',
    },
    {
      id: "9",
      question: "İstediğim komşularla nasıl iletişim kurabilirim?",
      answer:
        "Komşularınızın iletişim bilgilerine belirli bir ücret karşılığında ulaşabilir ve iletişim bilgilerin görüntülediğiniz müşterilerle irtibata geçebilirisiniz.",
    },
  ];

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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../images/KomsumuGor2.png")}
          ></Image>
          <Text style={styles.bigTitle}>
            <Text style={styles.bigTitleRed}> "Komşunu Gör" </Text> ile Yeni
            Komşularınızla Tanışın, Güvenle Yatırım Yapın!
          </Text>
          <Text style={styles.mainContent}>
            EmlakSepette.com, inşaat projelerinden mülk satın alan kişilere,
            komşularıyla tanışma ve etkileşim kurma imkânı sunar. "Komşunu Gör"
            özelliği sayesinde, aynı projeden mülk alan diğer kişilerle
            iletişime geçebilir, onların deneyimlerinden faydalanarak daha
            bilinçli kararlar alabilirsiniz.
          </Text>
          <View style={styles.iconContainer}>
            <IconGroup />
          </View>
          <Text style={styles.title}>Projeye Kendinizi Ekleyin</Text>
          <Text style={styles.mainContent}>
            Bir inşaat projesinden mülk satın aldıysanız, emlaksepette.com'da o
            projeye kendinizi ekleyebilirsiniz. Bu sayede, aynı projede yer alan
            diğer mülk sahipleriyle bağlantı kurabilir ve onları
            tanıyabilirsiniz.
          </Text>
          <View style={styles.iconContainer}>
            <IconGroup2 />
          </View>
          <Text style={styles.title}>Mülk Almak İsteyenler</Text>
          <Text style={styles.mainContent}>
            Eğer bir projeden mülk satın almayı düşünüyorsanız,
            emlaksepette.com'a girerek ilgilendiğiniz projeyi seçebilir ve
            "Komşunu Gör" özelliğini kullanarak o projeden mülk almış kişilerle
            görüşebilirsiniz. Bu sayede, projeyle ilgili süreçler hakkında
            doğrudan bilgi alabilirsiniz.
          </Text>
          <View style={styles.iconContainer}></View>
          <Text style={styles.title}>Mülk Sahipliği</Text>
          <Text style={styles.mainContent}>
            Projeden bir mülk satın aldığınızda, EmlakSepette.com'da hangi
            dairenin sahibi olduğunuz kaydedilir ve bu bilgi platformda açıkça
            gösterilir. Böylece, diğer mülk sahipleriyle projede yer alabilir ve
            komşularınızı tanıyabilirsiniz.
          </Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../images/KomsumuGor1.png")}
          ></Image>
          <Text style={styles.bigTitle}>Gizlilik ve Güvenlik </Text>
          <Text style={styles.mainContent}>
            EmlakSepette.com, "Komşunu Gör" özelliğini Kişisel Verilerin
            Korunması Kanunu (KVKK) çerçevesinde güvenli bir şekilde sunar.
            Komşularla iletişime geçmek isteyen kullanıcılar, belirli bir ücret
            karşılığında komşularının iletişim bilgilerine ulaşabilirler. Bu
            özellik sayesinde, sadece bir mülk değil, aynı zamanda bir
            topluluğun parçası olabilirsiniz. Komşularınızla tanışarak, mülk
            sahibi olma sürecinde daha güvenli ve bilinçli adımlar
            atabilirsiniz.
          </Text>
        </View>
      </View>
      <View style={styles.SSS}>
        {/* Sıkça Sorulan Sorular Başlığı */}
        <View style={styles.faqSection}>
          <Text style={styles.titleSSS}>Sıkça Sorulan Sorular</Text>
        </View>

        {/* Alt Bilgi ve SSS */}
        <View style={styles.container}>
          <FlatList
            data={faqData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
  },
  iconContainer: {
    width: width * 0.4, // ekran genişliğinin %80'i
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    backgroundColor: "#EA2B2E",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
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

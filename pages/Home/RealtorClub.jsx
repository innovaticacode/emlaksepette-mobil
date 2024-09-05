import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const RealtorClub = () => {

  const navigation = useNavigation();

  const [selectedId, setSelectedId] = useState(null);

  const faqData = [
    {
      id: '1',
      question: 'Emlak Kulüp nasıl üye olunur?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Facilisi ultrices lobortis dignissim vel sapien euismod turpis.',
    },
    {
      id: '2',
      question: 'Emlak Kulüp ile kazan nedir?',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      id: '3',
      question: 'Koleksiyona ilan eklemede sınır var mı?',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      id: '4',
      question: 'Hangi ilanlarda komisyon kazanabilirim?',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      id: '5',
      question: 'Komisyonumu ne zaman alabilirim?',
      answer: 'Lorem ipsum dolor sit amet consectetur.',
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
          style={[styles.questionContainer, isExpanded ? styles.activeQuestion : null]}
          onPress={() => toggleExpand(item.id)}
        >
          <Text style={[styles.questionText, isExpanded ? styles.activeQuestionText : null]}>
            {item.question}
          </Text>
          <Icon5
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color={isExpanded ? '#fff' : '#999'}
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
    <ScrollView style={styles.container}>

      {/* Kırmızı Yuvarlak İçindeki Fotoğraf */}
      <View style={styles.redCircle}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../images/emlak_kulup.png')}
            style={styles.circleImage}
          />
        </View>
      </View>

      {/* Başlık ve Açıklama */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Emlak Kulüp ile Sende Kazan!</Text>
        <Text style={styles.subtitle}>
          Emlak kulüp üyesi ol ve koleksiyonunu oluştur.
          Koleksiyonunu paylaşarak kazanma şansı yakala!
        </Text>
      </View>

      {/* Bilgilendirici Kartlar */}
      <View style={styles.cardsSection}>
        <Text style={styles.title}>Emlak Kulüp ile Sende Kazan!</Text>
        <View style={styles.card}>
          <Icon2 name="home-account" size={30} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Emlak Kulübe Üye Ol!</Text>
            <Text style={styles.cardText}>
              Emlak kulübe üye ol formunu doldur ve hemen üye ol.
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.card}>
          <Icon2 name="image-multiple" size={30} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Koleksiyon Oluştur.</Text>
            <Text style={styles.cardText}>
              İstediğiniz kadar ilanı koleksiyonlarınıza ekleyin.
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.card}>
          <Icon3 name="share-square-o" size={30} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Koleksiyonunu Paylaş!</Text>
            <Text style={styles.cardText}>
              Size özel olarak oluşturulan koleksiyon linkinizi kendi sosyal medya hesaplarınızda paylaşın. #işbirliği #işortaklığı hashtaglerini kullanmayı unutmayın.
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.card}>
          <Icon4 name="hand-holding-dollar" size={30} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Sende Kazan!</Text>
            <Text style={styles.cardText}>
              Paylaşmış olduğunuz koleksiyonda satış ile sonuçlanan her ilan için bizimle beraber sende kazanırsın.
            </Text>
          </View>
        </View>
      </View>

      {/* Telefon Görseli ve CTA Butonu */}
      <View style={styles.mainSection}>
        <Image
          source={require('../../images/emlak_kulup_2.png')}
          style={styles.mainImage}
        />
        <Text style={styles.mainSubtitle}>
          Paylaştıkça Kazandıran Sistem Emlak Kulüp!
        </Text>
        <Text style={styles.mainText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti delectus perferendis eveniet dolores architecto quos adipisci eos error, unde qui mollitia consequatur quaerat debitis, autem, rerum reiciendis nobis modi. Vero.
        </Text>
        <TouchableOpacity style={styles.ctaButton}
          onPress={() => {
            navigation.navigate("RealtorClub");
          }}
        >
          <Text style={styles.ctaButtonText}>Hemen Üye Ol</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.infoSection}>
        <View style={styles.iconContainer}>
          <Icon2 name="home-account" size={120} color="#EC302E" style={styles.iconBase} />
          <Icon2 name="home-account" size={80} color="#EC302E" style={styles.iconMiddle} />
          <Icon2 name="home-account" size={80} color="#EC302E" style={styles.iconTop} />
        </View>
        <View style={styles.infoSection2}>
          <Text style={styles.title}>Emlak Kulüp Nedir?</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Fringilla enim orci luctus et feugiat non ut vel. Luctus amet eu odio placerat. Lorem ipsum dolor sit amet consectetur.
          </Text>
        </View>
      </View>

      <View style={styles.SSS}>
        {/* Sıkça Sorulan Sorular Başlığı */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Sıkça Sorulan Sorular</Text>
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
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  redCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#EA2B2E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 152,
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.8,  // ekran genişliğinin %80'i
    height: height * 0.35, // ekran yüksekliğinin %35'i
    position: 'absolute',
    bottom: 40,
    left: -20,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Resmi kapsayıcıya göre uyumlu hale getirir
  },
  mainContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0C0C0C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  cardsSection: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 112,
  },
  cardTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    marginRight: 40,
    marginLeft: 40,
  },
  icon2: {

  },
  iconContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  iconBase: {
    position: 'absolute',
    zIndex: 1,
  },
  iconMiddle: {
    position: 'absolute',
    top: 20,
    right: 50,
    zIndex: 2,
  },
  iconTop: {
    position: 'absolute',
    top: 20,
    left: 70,
    zIndex: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',

  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  mainSection: {
    alignItems: 'center',
  },
  mainImage: {
    width: width * 0.8,  // ekran genişliğinin %80'i
    height: height * 0.45, // ekran yüksekliğinin %35'i
    marginLeft: 20,
  },
  mainSubtitle: {
    fontSize: 24,
    color: '#0C0C0C',
    textAlign: 'center',
    marginTop: 30,
    padding: 10,
    fontWeight: 'bold'

  },
  mainText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: -10,
    padding: 20,
  },
  ctaButton: {
    backgroundColor: '#EC302E',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f7f7f7',
  },
  footerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EC302E',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  infoSection: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f7f7f7', // Arka plan rengi
    top: 50,
  },
  infoSection2: {
    top: 25,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22, // Satır arası boşluk
  },
  faqSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    top: 20,

  },
  faqTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center'
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  faqText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: '#919191',
  },

  //ALT BİLGİ & SSS STİLLERİ
  itemContainer: {
    marginBottom: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  activeQuestion: {
    backgroundColor: '#EC302E',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeQuestionText: {
    color: '#fff',
  },
  answerContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
  },
  SSS:{
    top: 100,
  }

});

export default RealtorClub;

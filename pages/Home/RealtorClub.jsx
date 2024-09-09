import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList, Platform } from 'react-native';
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
      question: 'Emlaksepette.com Paylaş Kazan Nedir?',
      answer: 'Emlaksepette.com Paylaştıkça Kazan kampanyası, istediğin ilanları koleksiyonuna ekleyerek sana özel link ile farklı pek çok mecrada paylaşmanı ve bu yolla kazanç elde etmeni sağlayan Türkiye’nin en büyük ve en çok kazandıran paylaş kazan uygulamasıdır.',
    },
    {
      id: '2',
      question: 'En fazla ne kadar kazanç elde edebilirim?',
      answer: 'Emlaksepette.com Paylaştıkça Kazan kampanyası ile koleksiyonuna eklemiş olduğun ilanların sana özel linkleri paylaşarak satışına aracılık yapman durumunda aylık 500 bin tl kazanç elde edebilirsin.',
    },
    {
      id: '3',
      question: 'Kazanç komisyonu neye göre belirlenir?',
      answer: 'Emlaksepette.com’ da bulunan proje ilanlarını koleksiyonuna ekleyerek paylaşım yaptığın ilanların satılması durumunda toplam fiyat üzerinden %1 komisyon kazanırsınız. (Örneğin X İnşaat Ofisi firmasının projesindeki bir dairenin fiyatı 10 milyon TL paylaşmış olduğun link üzerinde satılması karşılığında emlaksepette.com emlak kulübü üyesine vergiler düşülerek net 78 bin tl nakit ödeme yapar.) emlaksepette.com’ da bulunan emlak ilanlarını koleksiyonuna ekleyerek paylaşım yaptığın ilanların satılması durumunda toplam fiyat üzerinden %0.5 komisyon kazanırsınız.',
    },
    {
      id: '4',
      question: 'Koleksiyona ilan eklemede ve paylaşmada sınır var mı?',
      answer: 'Emlaksepette.com Paylaştıkça Kazanda ilan paylaşımında sınır yok istediğin kadar ilanı koleksiyonuna ekleyerek paylaş. Paylaşılan ilan sayısı arttıkça kazanma şansın da artar.',
    },
    {
      id: '5',
      question: 'Paylaştığım linkten gelen kişiler kaç gün içinde satın alma yaparsa benim kazancıma yansır?',
      answer: 'Oluşturulan paylaştıkça kazan linki üzerinden emlaksepette.com ‘a gelen kullanıcının 24 gün boyunca sistem de link üzerinden geldiği tanınır. 24 gün içinde link paylaşımınızdan satış olması durumunda kazancınıza yansır.',
    },
    {
      id: '6',
      question: 'Koleksiyonuma eklediğim ilanların linkini paylaştıkdan sonra fiyat değişikliği olursa ne olur?',
      answer: 'Emlaksepette.com üzerinde bulunan kurumsal mağazalar fiyatı artırması veya düşürmesi durumunda en son güncel fiyat üzerinden komisyon kazanırsınız.',
    },
    {
      id: '7',
      question: 'Komisyonumu ne zaman alabilirim?',
      answer: 'Onaylanan komisyonunuzu, bize belirttiğin hesap bilgilerine ya da kestiğin faturaya istinaden her ayın 15 ile 20’si aralığında yatırıyoruz. Ör. Kasım ayı kazancını (yasal) iptal iade süreci sebebiyle Aralık ayı sonunda tamamlıyoruz, bu doğrultuda Kasım ayı ödemeni en geç Ocak ayının 20‘sine kadar alıyorsunuz.',
    },
    {
      id: '8',
      question: 'Komisyon kazancımı ne şekilde alabilirim?',
      answer: 'Emlaksepette.com Paylaştıkça Kazan kampanyasından elde ettiğin kazancını alabilmen için ödeme bilgilerini eksiksiz ve doğrubir şekilde girmiş olman gerekiyor. Ödeme bilgilerin tamamlanmışsa üyelikte bizlere ilettiğin IBAN veya hesap numarasına kazancın nakit olarak iletilecektir. Emlaksepette.com şahıs ödemeleri kapsamında ilgili kullanıcıların adına gider pusulası düzenleyip, oluşan stopaj maliyetinin ödemesini de kendi tarafında üstlenecektir. Fakat gelir beyanının yapılması, ödemeyi alan kullanıcının kendi sorumluluğunda olup, oluşabilecek her türlü vergi ve yükümlülükler kullanıcının sorumluluğundadır.',
    },
    {
      id: '9',
      question: 'Paylaştığım ilan iptal ya da iade edildi ise kazancım iptal olur mu?',
      answer: 'Evet, iptal veya iade edilen ilanlarda kazanç sağlayamazsın. Bir ay içerisinde paylaştığın ürünlerden gelen siparişler iptal ve iade süresi dolduktan sonra kontrol edilip kesinleşmiş satışlar üzerinden kazancın hesaplanır.',
    },
    {
      id: '10',
      question: 'Kendi linkim üzerinden satın alım yaparak kazanç elde edebilir miyim?',
      answer: 'Paylaştıkça kazan kampanyasında emlak kulüp üyeleri kendilerine ait linki paylaşarak kendi linklerinden komisyon kazanırlar.',
    },
    {
      id: '11',
      question: 'Aydınlatma metnini onaylamadan katılabilir miyim?',
      answer: 'Emlaksepette.com Paylaştıkça Kazanda gelir elde edebilmek için aydınlatma metnine ve taahütnameye onay vermelisin. Aydınlatma metninin onaylanmadığı durumlarda paylaşım yapılsa da kazanç elde edilemez.',
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
      <View style={{ backgroundColor: '#FEF7F7', width: '100%', alignItems: 'center' }}>
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
          <Text style={styles.title}>Mesleğin Ne Olursa Olsun!</Text>
            <Text style={styles.titleSmall}>Emlak Kulüp İle Sen de Kazan!</Text>
          <Text style={styles.subtitle}>
            Emlak Kulüp ile koleksiyonunu oluştur, paylaş ve kazancını katla!
          </Text>
        </View>
      </View>
      {/* Bilgilendirici Kartlar */}
      <View style={styles.cardsSection}>
        <Text style={styles.title}>Emlak Kulüp ile Sende Kazan!</Text>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Icon2 name="home-account" size={30} color="#EC302E" style={styles.icon} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Emlak Kulübe Üye Ol!</Text>
            <Text style={styles.cardText}>
              Emlak kulüp üyelik formunu doldur ve hemen üyeliğini oluştur.
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Icon2 name="image-multiple" size={30} color="#EC302E" style={styles.icon} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Koleksiyon Oluştur.</Text>
            <Text style={styles.cardText}>
              İlanları koleksiyonuna ekle, kendine uygun koleksiyonlar oluştur ve paylaş!
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Icon3 name="share-square-o" size={30} color="#EC302E" style={styles.icon} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Koleksiyonunu Paylaş!</Text>
            <Text style={styles.cardText}>
              Size özel olarak oluşturulan koleksiyon linkinizi kendi sosyal medya hesaplarınızda paylaşın.
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.card}>

          <View style={styles.iconContainer}>
            <Icon4 name="handshake-simple" size={30} color="#EC302E" style={styles.icon} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Sende Kazan!</Text>
            <Text style={styles.cardText}>
              Paylaş Kazan! Oluşturduğun koleksiyonlardan satış yap! Her ilan için bizimle beraber sen de kazanırsın.
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
          Hızla kazanç elde etmeye başlamak için hemen Emlak Kulüp'e üye olun! Beğendiğiniz emlak ve projeleri kolekiyona ekleyip, paylaşarak nakit kazanç sağlayın ve sürpriz ödüller kazanma fırsatını yakalayın. Üyeliğinizi hemen oluşturun ve kazancınızı artırmaya başlayın!
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
        <View style={styles.iconContainer2}>
          <Icon2 name="home-account" size={120} color="#EC302E" style={styles.iconBase} />
          <Icon2 name="home-account" size={80} color="#EC302E" style={styles.iconMiddle} />
          <Icon2 name="home-account" size={80} color="#EC302E" style={styles.iconTop} />
        </View>
        <View style={styles.infoSection2}>
          <Text style={styles.title}>Emlak Kulüp Nedir?</Text>
          <Text style={styles.description}>
            Emlak Kulüp, Emlak Sepette'deki ilanları arkadaşlarınız, aileniz veya takipçilerinizle paylaşarak kazanç elde etmenizi sağlayan bir satış ortaklığı platformudur. Paylaşım yaptıkça kazancınızı artırabilir ve sürpriz ödüller kazanabilirsiniz.
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
    height: height * 0.5, // ekran yüksekliğinin %35'i
    position: 'absolute',
    paddingBottom: 150,
    paddingLeft: 40,
    backgroundColor: '#FEF7F7',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0C0C0C',
    marginBottom: 8,
    textAlign: 'center',
    paddingRight: 40,
    paddingLeft: 40,
  },
  titleSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0C0C0C',
    marginBottom: 8,
    textAlign: 'center',
    paddingRight: 40,
    paddingLeft: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingRight: 35,
    paddingLeft: 35,
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
    marginTop: 10,
    marginLeft: 40,
    paddingRight: 40,
    flex: 1,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer2: {
    position: 'relative',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',

    // iOS için siyah gölge
    ...Platform.select({
      ios: {
        shadowColor: '#000',           // Siyah gölge
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,            // Gölgede opaklık yüksek
        shadowRadius: 3.84,
      },
      android: {
        elevation: 10,                 // Android'de daha yoğun gölge efekti
      },
    }),
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
    width: width * 0.75,  // ekran genişliğinin %80'i
    height: height * 0.45, // ekran yüksekliğinin %35'i
    marginLeft: 20,
  },
  mainSubtitle: {
    fontSize: 22,
    color: '#0C0C0C',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingRight: 30,

  },
  mainText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22, // Satır arası boşluk
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
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
    borderRadius: 10,
    backgroundColor: '#FEF7F7',
    width: '100%',
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
    marginTop: 60,

  },
  infoSection2: {
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
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
  SSS: {
    padding: 20,
  },

});

export default RealtorClub;

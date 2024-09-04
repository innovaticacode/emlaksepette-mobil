import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const RealtorClub = () => {
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
        <View style={styles.card}>
          <Icon name="person-add-outline" size={40} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Emlak Kulübe Üye Ol</Text>
            <Text style={styles.cardText}>
              Emlak Kulüp üyesi olarak kazanmaya hemen başla!
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Icon name="albums-outline" size={40} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Koleksiyonunu oluştur</Text>
            <Text style={styles.cardText}>
              Kendi koleksiyonunu oluştur ve kazançlarını artır.
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Icon name="share-social-outline" size={40} color="#EC302E" style={styles.icon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Koleksiyonunu Paylaş</Text>
            <Text style={styles.cardText}>
              Koleksiyonunu paylaş ve ödüller kazan.
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Icon name="gift-outline" size={40} color="#EC302E" style={styles.icon}/>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Sende Kazan</Text>
            <Text style={styles.cardText}>
              Sen de kazançlarını artırmaya başla.
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
          Paylaştıkça Kazandıran Sistem: Emlak Kulüp!
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Hemen Üye Ol</Text>
        </TouchableOpacity>
      </View>

      {/* Alt Bilgi ve SSS */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Emlak Kulüp Nedir?</Text>
        <Text style={styles.footerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <View style={styles.faqSection}>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>Emlak Kulübe nasıl üye olurum?</Text>
            <Icon name="chevron-down-outline" size={20} color="#EC302E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>Emlak Kulüp ile kazan nedir?</Text>
            <Icon name="chevron-down-outline" size={20} color="#EC302E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>Koleksiyonuma nasıl eklerim?</Text>
            <Icon name="chevron-down-outline" size={20} color="#EC302E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>Hangi ilanlarda komisyon kazanırım?</Text>
            <Icon name="chevron-down-outline" size={20} color="#EC302E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>Komisyonumu ne zaman alabilirim?</Text>
            <Icon name="chevron-down-outline" size={20} color="#EC302E" />
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
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
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    height:200,
  },
  cardTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    marginRight: 40, // İkon ile metin arasındaki boşluk
    marginLeft: 40,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  mainSection: {
    alignItems: 'center',
    padding: 20,
  },
  mainImage: {
    width: width * 0.8,  // ekran genişliğinin %80'i
    height: height * 0.45, // ekran yüksekliğinin %35'i
  },
  mainSubtitle: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  ctaButton: {
    backgroundColor: '#EC302E',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
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
  faqSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  faqText: {
    fontSize: 16,
    color: '#333',
  },
});

export default RealtorClub;

import { color } from "@rneui/base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const WhatIsEmlakSepette = () => {
  return (
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>
            Emlak Sepette: Yeni Nesil Emlak Platformu
          </Text>
          <View style={styles.marginTop}>
            <Text style={styles.text}>
              <Text style={styles.strong}>Emlaksepette.com</Text>, taşınmazlarını
              satmak ya da kiralamak isteyen tüm kullanıcı ve şirketleri bir arada
              buluşturan yeni nesil bir platformdur. Hem alıcıların hem de
              satıcıların haklarını güvence altına alan bu platform, kiralama ve
              satın alma işlemlerini doğrudan online ortama taşıyor. Kredi veya
              banka kartınızla kolayca teminat ve depozito ödemesi yapabilmenizi
              sağlayan bu yeniliklerle, işlemleriniz artık daha hızlı ve güvenli.
            </Text>
          </View>
        </View>

        <View style={styles.marginTop}>
          <Text style={styles.title}>Emlak Kulüp Nedir?</Text>
          <View style={styles.marginTop}>
            <Text style={styles.text}>
              <Text style={styles.strong}>Emlaksepette.com</Text>, Emlak Kulüp
              özelliği ile birçok kişiye yüksek kazançlı para kazanma imkânı
              sağlıyor. Platform üzerinde yer alan ürünleri koleksiyonunuza
              ekleyebilir, sosyal medya platformlarında ya da farklı mecralarda
              paylaşabilirsiniz. Paylaştığınız link üzerinden yapılan her satış
              için yüksek miktarlarda kazanç sağlayabilirsiniz. {"\n"}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.strong}>Nasıl Dahil Olabilirsiniz? </Text>
              <Text style={styles.strong}>Emlaksepette.com</Text> üzerinden Emlak
              Kulübe üye ol, seçtiğiniz ürünleri koleksiyonunuza ekleyin, size
              özel üretilen linki kopyala, istediğiniz platformda paylaşın ve
              satıldıkça komisyon kazanın.
              {"\n"}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.strong}>Emlak Sepette Nasıl Çalışır? </Text>
              Satışlar için: Emlakçı ya da mal sahibi olarak sisteme kaydolur,
              taşınmaz hakkında detaylı bilgi ve içerik girişlerini sağlar, satın
              almak isteyen kişi yine platforma üye olur ve mülk sahibi ile
              iletişime geçer. Almak istediği mülk için depozito/kapora ödemesi
              gerçekleştirir, bu sayede fırsat ürünlerini kaçırmadan direkt olarak
              bağlar.
              {"\n"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.strong}>Kiralamalar için: </Text>
              Kiralama yapacak kişi ya da mal sahibi sisteme kaydolur, ürünü
              hakkında detaylı bilgi ve içerik girişlerini sağlar, kiralamak
              isteyen kişi mal sahibi ile iletişime geçer ve kiralama işlemini
              gerçekleştirir.
            </Text>
          </View>
        </View>

        <View style={styles.marginTop}>
          <Text style={styles.title}>
            Emlaksepette.com’un Sunduğu Avantajlar Nelerdir?
          </Text>
          <Text style={styles.text}>
            Yeni nesil emlak platformu{" "}
            <Text style={styles.strong}>emlaksepette.com</Text>, hem tüketiciye
            hem de satıcıya sunduğu imkanlarla dikkat çekiyor. Hem tüketici hem
            satıcı için güvenilir alışveriş sağlaması en başta gelir. Yayınlanan
            ilanlar moderatör onayına düşer. Bu sayede yanlış, gereksiz ya da
            eksik bilgilerin tüketiciyi yanıltmasının önüne geçerken, satıcıların
            yükledikleri ürünlerinin daha dikkat çekici olmasını sağlar.
          </Text>
          <Text style={styles.text}>
            Gelişmiş istatistik paneli ile yüklenen ürünlerinizin detaylı
            istatistiklerini inceleyebilirsiniz. Bu istatistikler doğrultusunda
            pazarlama stratejileri geliştirebilirsiniz.
          </Text>
        </View>

        <View style={styles.marginTop}>
          <Text style={styles.title}>Acil İlanlar Emlaksepette.com’da</Text>
          <Text style={styles.text}>
            Acil satmanız gereken taşınmazlarınız için çözüm{" "}
            <Text style={styles.strong}>Emlaksepette.com’da</Text>. Acil satmanız
            gereken ilanlarınızı yüklerken “acil sat” butonunu tıklayabilir,
            ilanınızı ücretsiz olarak öne çıkarabilirsiniz. İlan olarak
            yüklediğiniz taşınmazlarınızı “paylaşıma aç” seçeneği ile farklı
            kişilerin koleksiyonuna eklemesine izin verebilir ve emlak kulüp
            üyelerinin satmasına olanak sağlayarak daha hızlı satılmasını
            sağlayabilirsiniz.
          </Text>
        </View>

        <View style={styles.marginTop}>
          <Text style={styles.title}>Hangi Tür İlanlar Verebilirsiniz?</Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>Emlaksepette.com</Text> üzerinde; proje,
            kiralık / satılık konut, kiralık / satılık iş yeri, arsa, tiny house,
            bungalov, prefabrik ve turizm amaçlı kiralama ve satın alma ilanları
            verebilirsiniz. Öne çıkan özellikleri ile taşınmazlarınızı daha hızlı
            satabilir ve projelerinizin daha fazla görüntülenmesini
            sağlayabilirsiniz.
          </Text>
        </View>
      </View>
  );
};

export default WhatIsEmlakSepette;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    
  },
  title: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
  },
  text: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  strong: {
    fontWeight: "bold",
  },
  marginTop: {
    marginTop: 10,
  },
});

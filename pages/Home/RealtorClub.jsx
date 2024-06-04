import { View, Text, StyleSheet, ImageBackground, LayoutAnimation, UIManager, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import PagerView from 'react-native-pager-view'
import DetailsPicture from '../../components/DetailsPicture'
import RealtorClubItem from '../../components/RealtorClubItem'
import ıcon from "react-native-vector-icons/SimpleLineIcons"
import ıcon2 from "react-native-vector-icons/AntDesign"
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Accordion = ({ title, children, index, selectedIndex, setSelectedIndex }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    setSelectedIndex(index);

  };

  return (
    <View style={[styles.container2, { backgroundColor: expanded ? '#EA2A29' : '#F5F5F5' }]}>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <View style={{ flex: 1.8 / 2 }}>
          <Text style={[styles.title, { color: expanded ? 'white' : '#666666' }]}>{title}</Text>
        </View>
        <View style={{ flex: 0.1 / 2 }}>
          <ıcon name={expanded ? 'arrow-down' : 'arrow-right'} color={expanded ? 'white' : 'grey'} />
        </View>


      </TouchableOpacity>
      {expanded && <View style={styles.child}>{children}</View>}
    </View>
  );
};


export default function RealtorClub() {
  const image = require('./contact.png')
  const image2 = require('./contact2.png')
  const image3 = require('./contact3.png')
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const closeOthers = (index) => {
    setSelectedIndex(!selectedIndex);
  };
  return (

    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.headerImage}>
              <PagerView style={styles.viewPager} >

                <View style={styles.page} key="1">
                  <ImageBackground source={require('./emlakkulupslider.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={styles.page} key="2">
                  <Text>afddlsfşsdf</Text>
                </View>
                <View style={styles.page} key="3">
                  <Text>afddlsfşsdf</Text>
                </View>
                <View style={styles.page} key="4">
                  <Text>afddlsfşsdf</Text>
                </View>
              </PagerView>
            </View>
            <View style={{ gap: 20, marginTop: 0 }}>
              <RealtorClubItem description='Emlak Kulüp’e ÜYE OL Hemen Paylaştıkça Kazan (ilk 5000 üyelik ücretsiz)' ımage={image} colorcss={true} />
              <RealtorClubItem description='test.emlaksepette.com da bulunan bütün ilanları Koleksiyonuna ekleyerek kendi mağazada sosyal medya hesabında sana özel link ile paylaş' ımage={image2} colorcss={true} />
              <RealtorClubItem description='Paylaştığın link üzerinden satışa dönen her ilandan sınırsız para kazan' ımage={image3} />
            </View>
            <View style={{ gap: 10, marginTop: 20, padding: 6 }}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>Sıkça Sorulan Sorular</Text>
              <Accordion
                title="test.emlaksepette.com Paylaş Kazan Nedir?"
                index={0}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>
                  test.emlaksepette.com Paylaştıkça Kazan kampanyası, istediğin ilanları koleksiyonuna ekleyerek sana özel link ile farklı pek çok mecrada paylaşmanı ve bu yolla kazanç elde etmeni sağlayan Türkiye’nin en büyük ve en çok kazandıran paylaş kazan uygulamasıdır.
                </Text>
              </Accordion>
              <Accordion
                title="En fazla ne kadar kazanç elde edebilirim?"
                index={1}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>
                  test.emlaksepette.com Paylaştıkça Kazan kampanyası ile koleksiyonuna eklemiş olduğun ilanların sana özel linkleri paylaşarak satışına aracılık yapman durumunda aylık 500 bin tl kazanç elde edebilirsin.
                </Text>
              </Accordion>
              <Accordion
                title="Kazanç komisyonu neye göre belirlenir"
                index={2}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>test.emlaksepette.com’ da bulunan proje ilanlarını koleksiyonuna ekleyerek paylaşım yaptığın ilanların satılması durumunda toplam fiyat üzerinden %1 komisyon kazanırsınız. (Örneğin X İnşaat firmasının projesindeki bir dairenin fiyatı 10 milyon TL paylaşmış olduğun link üzerinde satılması karşılığında emlak sepette.com emlak kulübü üyesine vergiler düşülerek net 78 bin tl nakit ödeme yapar) test.emlaksepette.com’ da bulunan emlak ilanlarını koleksiyonuna ekleyerek paylaşım yaptığın ilanların satılması durumunda toplam fiyat üzerinden %0.5 komisyon kazanırsınız</Text>
              </Accordion>
              <Accordion
                title="Koleksiyona ilan eklemede ve paylaşmada sınır var mı?"
                index={3}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>test.emlaksepette.com Paylaştıkça Kazan'da ilan paylaşımında sınır yok istediğin kadar ilanı koleksiyonuna ekleyerek paylaş. Paylaşılan ilan sayısı arttıkça kazanma şansın da artar.</Text>
              </Accordion>
              <Accordion
                title="Hangi ilanlarda komisyon kazanbilirim?"
                index={4}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>Emlak kulüp üyeleri Paylaştıkça Kazan kampanyasına göre emlaksepete.com üzerindeki tüm kategorilerdeki emlak ilanlarını paylaşabilir, linkinden satın alım yapıldığı zaman komisyon kazanabilirsin.</Text>
              </Accordion>
              <Accordion
                title="Paylaştığım linkten gelen kişiler kaç gün içinde satın alma yaparsa benim kazancıma yansır?"
                index={5}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>Oluşturulan paylaştıkça kazan linki üzerinden test.emlaksepette.com ‘a gelen kullanıcının 24 gün boyunca sistem de link üzerinden geldiği tanınır. 24 gün içinde link paylaşımınızdan satış olması durumunda kazancınıza yansır</Text>
              </Accordion>
              <Accordion
                title="Koleksiyonuma eklediğim ilanların linkini paylaştıktan sonra fiyat değişikliği olursa ne olur?"
                index={6}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>test.emlaksepette.com üzerinde bulunan kurumsal mağazalar fiyatı artırması veya düşürmesi durumunda en son güncel fiyat üzerinden komisyon kazanırsınız.</Text>
              </Accordion>
              <Accordion
                title="Komisyonumu ne zaman alabilirim?"
                index={7}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>Onaylanan komisyonunuzu, bize belirttiğin hesap bilgilerine ya da kestiğin faturaya istinaden her ayın 15 ile 20’si aralığında yatırıyoruz. Ör. Kasım ayı kazancını (yasal) iptal iade süreci sebebiyle Aralık ayı sonunda tamamlıyoruz, bu doğrultuda Kasım ayı ödemeni en geç Ocak ayının 20‘sine kadar alıyorsunuz.</Text>
              </Accordion>
              <Accordion
                title="Komisyon kazancımı ne şekilde alırım?"
                index={8}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>test.emlaksepette.com Paylaştıkça Kazan kampanyasından elde ettiğin kazancını alabilmen için ödeme bilgilerini eksiksiz ve doğrubir şekilde girmiş olman gerekiyor. Ödeme bilgilerin tamamlanmışsa üyelikte bizlere ilettiğin IBAN- hesap numarasına kazancın nakit olarak iletilecektir. test.emlaksepette.com şahıs ödemeleri kapsamında ilgili kullanıcıların adına gider pusulası düzenleyip, oluşan stopaj maliyetinin ödemesini de kendi tarafında üstlenecektir fakat gelir beyanının yapılması, ödemeyi alan kullanıcının kendi sorumluluğunda olup oluşabilecek her türlü vergi ve yükümlülükler sizlerin sorumluluğundadır</Text>
              </Accordion>
              <Accordion
                title="Paylaştığım ilan iptal ya da iade edildi ise kazancım iptal olur mu?"
                index={9}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>Evet, iptal veya iade edilen ilanlarda kazanç sağlayamazsın. Bir ay içerisinde paylaştığın ürünlerden gelen siparişler iptal ve iade süresi dolduktan sonra kontrol edilip kesinleşmiş satışlar üzerinden kazancın hesaplanır.</Text>
              </Accordion>
              <Accordion
                title="Kendi linkim üzerinden satın alım yaparak kazanç elde edebilirmiyim?"
                index={10}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>Paylaştıkça kazan kampanyasında emlak kulüp üyeleri kendilerine ait linki paylaşarak kendi linklerinden komisyon kazanırlar.</Text>
              </Accordion>
              <Accordion
                title="Aydınlatma metnini onaylamadan katılabilirmiyim"
                index={11}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              >
                <Text style={{ color: 'grey', lineHeight: 22 }}>test.emlaksepette.com Paylaştıkça Kazan'da gelir elde edebilmek için aydınlatma metnine ve taahütnameye onay vermelisin. Aydınlatma metninin onaylanmadığı durumlarda paylaşım yapılsa da kazanç elde edilemez.</Text>
              </Accordion>
            </View>
            <View style={styles.footerAndAdvice}>
              <View style={{ flexDirection: 'row' }}>

                <View style={{ backgroundColor: '#EA2A29', flex: 0.2 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <ıcon2 name='home' size={30} color={'white'} />
                </View>

                <View style={{ backgroundColor: '#333', flex: 1.8 / 2, padding: 5 }}>
                  <Text style={{ color: 'white', lineHeight: 20, fontSize: 12 }}>
                    <Text style={{ fontWeight: 'bold' }}> Emlak Kulüp Nedir? </Text>

                    Emlak Kulüp, en sevdiğin Emlak Sepette ürünlerini, arkadaşlarınla, ailenle veya takipçilerinle paylaştığın, paylaştıkça kazandığın bir Affiliate / Satış Ortaklığı Platformu’dur.
                  </Text>
                </View>
              </View>

            </View>
            <View style={styles.footerAndAdvice}>
              <View style={{ flexDirection: 'row' }}>

                <View style={{ backgroundColor: '#EA2A29', flex: 0.2 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <ıcon2 name='sharealt' size={30} color={'white'} />
                </View>

                <View style={{ backgroundColor: '#333', flex: 1.8 / 2, padding: 5 }}>
                  <Text style={{ color: 'white', lineHeight: 20, fontSize: 12 }}>
                    <Text style={{ fontWeight: 'bold', }}> Peki, Paylaşmak nasıl mı kazandırıyor? </Text>
                    Emlak Sepette'den seçtiğin, beğendiğin emlak veya proje konutlarını, kendi sosyal medya hesaplarında sana özel oluşturduğumuz linki ekleyerek paylaşıyorsun. Paylaştığın link üzerinden Emlak Sepette'den yapılan her alışveriş ise sana nakit kazanç sağlıyor
                  </Text>
                </View>
              </View>

            </View>
         
            <View style={{paddingTop:10}}>
            
              <View style={styles.footerAndAdvice}>
              <View style={{ flexDirection: 'row' }}>

                <View style={{ backgroundColor: '#EA2A29', flex: 0.2 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <ıcon2 name='sharealt' size={30} color={'white'} />
                </View>

                <View style={{ backgroundColor: '#333', flex: 1.8 / 2, padding: 5 }}>
                  <Text style={{ color: 'white', lineHeight: 20, fontSize: 12 }}>
                  Paylaşımlarını yaptığın sosyal medya hesaplarını herkese görünür yaparsan daha fazla kişiye ulaşırsın
                  
                  </Text>
                </View>
              </View>

            </View>
            <View style={styles.footerAndAdvice}>
              <View style={{ flexDirection: 'row' }}>

                <View style={{ backgroundColor: '#EA2A29', flex: 0.2 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <ıcon2 name='tag' size={30} color={'white'} />
                </View>

                <View style={{ backgroundColor: '#333', flex: 1.8 / 2, padding: 5 }}>
                  <Text style={{ color: 'white', lineHeight:20, fontSize: 12 }}>
                  #işbirliği #affiliate #işortaklığı #affiliatelink hashtag 'lerini kullanmayı unutma!
                  
                  </Text>
                </View>
              </View>

            </View>
            <View style={styles.footerAndAdvice}>
              <View style={{ flexDirection: 'row' }}>

                <View style={{ backgroundColor: '#EA2A29', flex: 0.2 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <ıcon2 name='home' size={30} color={'white'} />
                </View>

                <View style={{ backgroundColor: '#333', flex: 1.8 / 2, padding: 10 }}>
                  <Text style={{ color: 'white', lineHeight: 20, fontSize: 12 }}>
                   
                  Takipçilerine ilham ver! Doğru evi bulmalarına
                  
                  <Text style={{fontWeight:'bold'}}> Aracı Ol</Text> 

                  </Text>
                </View>
              </View>

            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ height: 120 }}>
                <View style={{ backgroundColor: '#DF4342d1', position: 'absolute', zIndex: 1, width: '100%', height: '100%', padding:10}}>
                  <Text style={{fontSize:12,color:'white',fontWeight:'bold',lineHeight:15}}>
                    test.emlaksepette.com ‘DA YER ALAN YÜZBİNLERCE PROJE İLANINI VE EMLAK İLANLARINI SEÇ VE BÜTÜN DÜNYA İLE PAYLAŞ.

                    AYLIK 50.000 TL İLE 500.000 TL ARASINDA LİNKLERİNDEN NAKİT GELİR ELDE ETME HAKKI KAZAN!

                    EMLAK KULÜP ÜYELERİ ARASINDAN EN BAŞARILI İLK YÜZ KİŞİYE SÜPRİZ HEDİYELER!
                  </Text>


                </View>
                <Image source={require('./profilePhoto.jpg')} style={{ width: '100%', height: '100%' }} />
              </View>

            </View>
            </View>

          </View>

        </ScrollView>

      </GestureHandlerRootView>

    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  headerImage: {
    width: '100%',

    height: '12%',

  },
  body: {
    flex: 1,
    padding: 5,
    minHeight: 2000,

  },
  viewPager: {
    height: '100%'
  },
  page: {
    width: '100%',
    height: '100%'
  },
  container2: {


    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    padding: 13,


  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666'
  },
  child: {
    padding: 10,
    backgroundColor: '#eaeaea',
  },
  footerAndAdvice: {
    paddingTop: 15
  }

})
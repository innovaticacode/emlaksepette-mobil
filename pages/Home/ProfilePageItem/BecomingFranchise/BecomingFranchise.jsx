import { View, Text, ScrollView, Image } from "react-native";
import React, { useRef, useState } from "react";
import { styles } from "./BecomingFranchise.styles";
import { FranchiseForm, WhiteOrRedButtons } from "../../../../components";
import Map from "../../../../assets/greyMap.svg";
import PagerView from "react-native-pager-view";
import AntDesign from "@expo/vector-icons/AntDesign";

const BecomingFranchise = () => {
  const pagerRef = useRef(null);
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const goToNextImage = () => {
    if (currentImage < images.length - 1) {
      const nextImage = currentImage + 1;
      imageRef.current.setPage(nextImage);
      setCurrentImage(nextImage);
    }
  };

  const goToPreviousImage = () => {
    if (currentImage > 0) {
      const prevImage = currentImage - 1;
      imageRef.current.setPage(prevImage);
      setCurrentImage(prevImage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < slidersItems.length - 1) {
      const nextPage = currentPage + 1;
      pagerRef.current.setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      pagerRef.current.setPage(prevPage);
      setCurrentPage(prevPage);
    }
  };

  const images = [
    { id: 1, src: "https://www.dummyimage.co.uk/200x200/000000" },
    { id: 2, src: "https://www.dummyimage.co.uk/200x200/808080" },
  ];

  const items = [
    { id: 1, text: "Emlak sektöründe en az 5 yıl deneyimli olmak" },
    {
      id: 2,
      text: "Emlak sektöründe en az 2 yıl kendi ofisini işletmiş olmak",
    },
    { id: 3, text: "Emlak sektöründe en az 3 çalışana sahip olmak" },
    { id: 4, text: "100 m2'den büyük ofise sahip olmak" },
  ];

  const slidersItems = [
    {
      id: 1,
      title: "BAŞVURU FORMU",
      desc: "Basit ve kullanıcı dostu bir online başvuru formu",
    },
    {
      id: 2,
      title: "KABUL SÜRECİ",
      desc: "Başvurunuz incelendikten sonra, kabul süreci başlar.",
    },
    {
      id: 3,
      title: "SÖZLEŞME",
      desc: "Sözleşme süreci başlar ve ofisinizin açılış tarihi belirlenir.",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <Text style={styles.title}>Franchise Başvuru Şartları</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.descCont}>
          <Text style={styles.whyTitle}>
            Neden Master Realtor Ofisi Açmalısın?
          </Text>
          <Text style={styles.description}>
            Master Girişim Bilgi Teknolojileri Yatırım Gayrimenkul Pazarlama
            A.Ş. iştiraklerinden biri olan Master Realtor Markası Amerika’dan
            bütün haklarıyla satın alınarak %100 Türk markası haline gelmiştir.
            Farklı sektörlerde proje geliştiren 20 yıllık gayrimenkul deneyimine
            sahip bir markadır. Master Realtor markası ‘‘Uzman Emlakçı’’
            Türkiye’de gayrimenkul sektöründe bilinenlerin dışında gerçek
            emlakçılık nedir sorusuna verilecek en güzel cevaptır. Ülkemizde
            bilindiği gibi emlakçılık sadece ilan girerek ve branda asarak
            yürütülmektedir. Master Realtor emlak sektörüne yeni bir model
            getirerek bütün emlak ofislerini gayrimenkul proje geliştirme iş
            ortaklığına davet ediyor. Bulunduğunuz bölgede en kapsamlı
            gayrimenkul satış sistemine kavuşarak bölgenizin en çok kazanan ve
            en iyi emlak ofisi olmak ister misiniz?
          </Text>
        </View>

        <View style={{ height: 40 }}>
          <WhiteOrRedButtons
            bgColor={"#EA2B2E"}
            textColor={"#FFF"}
            onPress={() => {
              setIsVisible(true);
            }}
            text={"Başvuru Formu"}
          />
        </View>

        <View>
          <Text style={styles.title}>
            Türkiye Genelinde Toplam 60 Master Realtor Ofisi
          </Text>
          <Map />
        </View>

        <View style={styles.sliderSection}>
          <Text style={styles.title}>Franchise Süreçleri</Text>
          <View style={styles.arrowContainer}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#000"
              style={styles.arrow}
              onPress={goToPreviousPage}
            />
            <PagerView
              style={styles.pagerView}
              ref={pagerRef}
              initialPage={0}
              onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
              {slidersItems.map((item) => (
                <View key={item.id} style={styles.sliderContent}>
                  <View style={styles.pageNumber}>
                    <Text style={styles.pageNumberText}>{item.id}</Text>
                  </View>
                  <View style={styles.sliderBorder}>
                    <Text style={styles.sliderTitle}>{item.title}</Text>
                    <Text style={styles.sliderText}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </PagerView>
            <AntDesign
              name="arrowright"
              size={24}
              color="#000"
              style={styles.arrow}
              onPress={goToNextPage}
            />
          </View>
          <View style={styles.dotArea}>
            {slidersItems.map((_, index) => (
              <View
                key={index}
                style={[
                  {
                    backgroundColor:
                      currentPage === index ? "#EA2B2E" : "#FBD5D5",
                  },
                  styles.dot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.sliderSection}>
          <Text style={styles.title}>Mağaza Örnekleri</Text>
          <View style={styles.arrowContainer}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#000"
              style={styles.arrow}
              onPress={goToPreviousImage}
            />
            <PagerView
              style={styles.pagerView}
              ref={imageRef}
              initialPage={0}
              onPageSelected={(e) => setCurrentImage(e.nativeEvent.position)}
            >
              {images.map((item) => (
                <View key={item.id} style={styles.imgArea}>
                  <Image
                    source={{ uri: item.src }}
                    resizeMode="cover"
                    borderRadius={6}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
              ))}
            </PagerView>
            <AntDesign
              name="arrowright"
              size={24}
              color="#000"
              style={styles.arrow}
              onPress={goToNextImage}
            />
          </View>
          <View style={styles.dotArea}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  {
                    backgroundColor:
                      currentImage === index ? "#EA2B2E" : "#FBD5D5",
                  },
                  styles.dot,
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <FranchiseForm isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default BecomingFranchise;

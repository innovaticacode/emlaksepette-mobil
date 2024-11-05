import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "./BecomeConsultant.styles";
import { WhiteOrRedButtons } from "../../../../components";

const BecomeConsultant = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: "https://www.dummyimage.co.uk/200x200/000000" }}
          style={styles.image}
        />

        <>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
            <View style={{ height: 40 }}>
              <WhiteOrRedButtons
                bgColor={"#EA2B2E"}
                onPress={() => null}
                text={"Başvuru Formu"}
              />
            </View>
            <Text style={styles.title}>
              Neden Master Realtor Danışmanı Olmalısın?
            </Text>
            <Text style={styles.desc}>
              Master Girişim Bilgi Teknolojileri Yatırım Gayrimenkul Pazarlama
              A.Ş. iştiraklerinden biri olan Master Realtor Markası Amerika’dan
              bütün haklarıyla satın alınarak %100 Türk markası haline
              gelmiştir. Farklı sektörlerde proje geliştiren 20 yıllık
              gayrimenkul deneyimine sahip bir markadır. Master Realtor markası
              ‘‘Uzman Emlakçı ’’ Türkiye’de gayrimenkul sektöründe bilinenlerin
              dışında gerçek emlakçılık nedir sorusuna verilecek en güzel
              cevaptır. Ülkemizde bilindiği gibi emlakçılık sadece ilan girerek
              ve branda asarak yürütülmektedir. Master Realtor emlak sektörüne
              yeni bir model getirerek bütün emlak ofislerini gayrimenkul proje
              geliştirme iş ortaklığına davet ediyor. Bulunduğunuz bölgede en
              kapsamlı gayrimenkul satış sistemine kavuşarak bölgenizin en çok
              kazanan ve en iyi emlak ofisi olmak ister misiniz?
            </Text>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default BecomeConsultant;

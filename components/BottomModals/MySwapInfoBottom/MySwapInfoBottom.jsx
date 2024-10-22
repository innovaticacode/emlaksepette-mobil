import { View, Dimensions, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import ActionSheet from "react-native-actions-sheet";
import { styles } from "./MySwapInfoBottom.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { frontEndUriBase } from "../../methods/apiRequest";

const { height } = Dimensions.get("screen");

const MySwapInfoBottom = ({
  isVisible,
  setIsVisible,
  swapStatus,
  estatesType,
  data,
}) => {
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);

  useEffect(() => {
    console.debug("swap--->", swapStatus);
    console.debug("estates--->", estatesType);
    console.debug("data--->", data);
    console.debug(
      "frontEndUriBase + data?.ruhsat_belgesi--->",
      frontEndUriBase + data?.ruhsat_belgesi
    );
  }, [isVisible]);

  const fetchStyle = () => {
    return {
      ...styles.container,
      height:
        swapStatus === "araç"
          ? height * 0.8 - 22
          : swapStatus === "emlak"
          ? height * 0.6 - 22
          : height * 0.42,
    };
  };

  return (
    <View>
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setIsVisible(false)} // Close ActionSheet when dismissed
        containerStyle={fetchStyle()}
        closable={true}
        defaultOverlayOpacity={0.3}
        animated={true}
        drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
      >
        <>
          <View style={{ paddingTop: 16 }}>
            <Ionicons
              name="close-sharp"
              size={24}
              color="#000"
              style={{
                alignSelf: "flex-end",
              }}
              onPress={() => setIsVisible(false)}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                padding: 16,
              }}
            >
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>Adı: </Text>
                  <Text style={styles.text}>{data?.ad}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>Soyadı: </Text>
                  <Text style={styles.text}>{data?.soyad}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>Telefon Numarası: </Text>
                  <Text style={styles.text}>{data?.telefon}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>E-Posta: </Text>
                  <Text style={styles.text}>{data?.email}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>Şehir: </Text>
                  <Text style={styles.text}>{data?.city?.title}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>İlçe: </Text>
                  <Text style={styles.text}>{data?.county?.title}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              <>
                <View style={styles.area}>
                  <Text style={styles.tokerize}>Takas Tercihi: </Text>
                  <Text style={styles.text}>{swapStatus}</Text>
                </View>
              </>
              <View style={styles.seperator} />
              {swapStatus == "araç" && (
                <>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Araç Model Yılı: </Text>
                      <Text style={styles.text}>{data?.arac_model_yili}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Araç Markası: </Text>
                      <Text style={styles.text}>{data?.arac_markasi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Yakıt Tipi: </Text>
                      <Text style={styles.text}>{data?.yakit_tipi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Vites Tipi: </Text>
                      <Text style={styles.text}>{data?.vites_tipi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Takas Fiyatı: </Text>
                      <Text style={styles.text}>{data?.arac_satis_rakami}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                </>
              )}
              {swapStatus == "emlak" && estatesType == "arsa" && (
                <>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Emlak Tipi: </Text>
                      <Text style={styles.text}>{data?.emlak_tipi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Takas Fiyatı: </Text>
                      <Text style={styles.text}>{data.satis_rakami}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>
                        Arsa'nın Bulunduğu İl:{" "}
                      </Text>
                      <Text style={styles.text}>{data?.acity?.title}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>
                        Arsa'nın Bulunduğu İlçe:
                      </Text>
                      <Text style={styles.text}>{data?.acounty?.title}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>
                        Arsa'nın Bulunduğu Mahalle:
                      </Text>
                      <Text style={styles.text}>
                        {data?.aneighborhood?.mahalle_title}
                      </Text>
                    </View>
                    <View style={styles.seperator} />
                  </>

                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Ada Parsel Bilgisi:</Text>
                      <Text style={styles.text}>{data?.ada_parsel}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>İmar Durumu:</Text>
                      <Text style={styles.text}>{data?.imar_durumu}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                </>
              )}
              {swapStatus == "emlak" && estatesType == "konut" && (
                <>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Emlak Tipi:</Text>
                      <Text style={styles.text}>{data?.emlak_tipi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Konut Tipi:</Text>
                      <Text style={styles.text}>{data?.konut_tipi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Oda Sayısı:</Text>
                      <Text style={styles.text}>{data?.oda_sayisi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>

                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Konut Yaşı:</Text>
                      <Text style={styles.text}>{data?.konut_yasi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>

                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Kullanım Durumu:</Text>
                      <Text style={styles.text}>{data?.kullanim_durumu}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>

                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Takas Fiyatı:</Text>
                      <Text style={styles.text}>
                        {data?.konut_satis_rakami}
                      </Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                </>
              )}
              {swapStatus == "emlak" && estatesType == "işyeri" && (
                <>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Emlak Tipi: </Text>
                      <Text style={styles.text}>{data?.emlak_tipi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>Ticari Bilgiler: </Text>
                      <Text style={styles.text}>{data?.ticari_bilgiler}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>İşyeri Takas Fiyatı: </Text>
                      <Text style={styles.text}>
                        {data?.isyeri_satis_rakami}
                      </Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                </>
              )}
              {swapStatus == "diğer" && (
                <>
                  <>
                    <View style={styles.area}>
                      <Text style={styles.tokerize}>
                        Takas İle İlgili Ürün/Hizmet Bilgileri:
                      </Text>
                      <Text style={styles.text}>{data?.takas_tercihi}</Text>
                    </View>
                    <View style={styles.seperator} />
                  </>
                </>
              )}
            </View>
            <>
              {data?.description && (
                <>
                  <View style={styles.area}>
                    <Text style={styles.tokerize}>Mesaj:</Text>
                    <Text style={styles.text}>{data?.description}</Text>
                  </View>
                  <View style={styles.seperator} />
                </>
              )}
            </>
            <>
              {data?.ruhsat_belgesi && (
                <>
                  <Image
                    source={{ uri: frontEndUriBase + data?.ruhsat_belgesi }}
                    style={{
                      width: "100%",
                      height: 200,
                      backgroundColor: "red",
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                </>
              )}
            </>
          </ScrollView>
        </>
      </ActionSheet>
    </View>
  );
};

export default MySwapInfoBottom;

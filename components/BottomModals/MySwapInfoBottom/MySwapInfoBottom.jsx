import { View, Dimensions, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { styles } from "./MySwapInfoBottom.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
const MySwapInfoBottom = ({
  isVisible,
  setIsVisible,
  name,
  surname,
  phone,
  eposta,
  city,
  country,
  swapStatus,
  vehicleModelYear,
  vehicleBrand,
  fuelType,
  shiftType,
  vehicleSwapPrice,
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
  }, [isVisible]);
  return (
    <View>
      <ActionSheet
        ref={actionSheetRef}
        onClose={() => setIsVisible(false)} // Close ActionSheet when dismissed
        containerStyle={styles.container}
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
          <View
            style={{
              padding: 16,
            }}
          >
            <>
              <View style={styles.area}>
                <Text style={styles.tokerize}>Adı: </Text>
                <Text style={styles.text}>{name}</Text>
              </View>
            </>
            <View style={styles.seperator} />
            <>
              <View style={styles.area}>
                <Text style={styles.tokerize}>Soyadı: </Text>
                <Text style={styles.text}>{surname}</Text>
              </View>
            </>
            <View style={styles.seperator} />
            <>
              <View style={styles.area}>
                <Text style={styles.tokerize}>Telefon Numarası: </Text>
                <Text style={styles.text}>{phone}</Text>
              </View>
            </>
            <View style={styles.seperator} />
            <>
              <View style={styles.area}>
                <Text style={styles.tokerize}>E-Posta: </Text>
                <Text style={styles.text}>{eposta}</Text>
              </View>
            </>
            <View style={styles.seperator} />
            <>
              <View style={styles.area}>
                <Text style={styles.tokerize}>Şehir: </Text>
                <Text style={styles.text}>{country}</Text>
              </View>
            </>
            <View style={styles.seperator} />
            <>
              <View style={styles.area}>
                <Text style={styles.tokerize}>İlçe: </Text>
                <Text style={styles.text}>{city}</Text>
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
                    <Text style={styles.text}>{vehicleModelYear}</Text>
                  </View>
                  <View style={styles.seperator} />
                </>
                <>
                  <View style={styles.area}>
                    <Text style={styles.tokerize}>Araç Markası: </Text>
                    <Text style={styles.text}>{vehicleBrand}</Text>
                  </View>
                  <View style={styles.seperator} />
                </>
                <>
                  <View style={styles.area}>
                    <Text style={styles.tokerize}>Yakıt Tipi: </Text>
                    <Text style={styles.text}>{fuelType}</Text>
                  </View>
                  <View style={styles.seperator} />
                </>
                <>
                  <View style={styles.area}>
                    <Text style={styles.tokerize}>Vites Tipi: </Text>
                    <Text style={styles.text}>{shiftType}</Text>
                  </View>
                  <View style={styles.seperator} />
                </>
                <>
                  <View style={styles.area}>
                    <Text style={styles.tokerize}>Takas Fiyatı: </Text>
                    <Text style={styles.text}>{vehicleSwapPrice}</Text>
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
                    <Text style={styles.tokerize}>Arsa'nın Bulunduğu İl: </Text>
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
                    <Text style={styles.text}>{data?.konut_satis_rakami}</Text>
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
                    <Text style={styles.text}>{data?.isyeri_satis_rakami}</Text>
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
        </>
      </ActionSheet>
    </View>
  );
};

export default MySwapInfoBottom;

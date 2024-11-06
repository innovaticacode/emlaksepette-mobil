import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import LinkIcon from "react-native-vector-icons/SimpleLineIcons";
import Star from "react-native-vector-icons/MaterialIcons";
import { styles } from "./FranchisePersonDetail.styles";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Docs from "../../../../assets/docs.svg";
import Marker from "../../../../assets/marker.svg";
import Calendar from "../../../../assets/calendar.svg";
import { frontEndUriBase } from "../../../../components/methods/apiRequest";
const FranchisePersonDetail = ({ route }) => {
  const person = route.params.item;
  const navigation = useNavigation();
  const [storeData, setstoreData] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backBtn}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.back}
            >
              <LinkIcon name="arrow-left" size={20} color={"#000000"} />
            </TouchableOpacity>
          </View>
          <View style={styles.storeInfo}>
            <View style={styles.storePosition}>
              <View style={styles.imgSize}>
                <View style={styles.imgCenter}>
                  <Image
                    source={{
                      uri: `https://picsum.photos/200/300`,
                    }}
                    style={styles.img}
                  />
                </View>
              </View>

              <View>
                <View style={styles.storeInfoDetail}>
                  <Text style={styles.storeName}>{"StoreName"}</Text>
                  <Star name="verified" size={19} color={"#0275FF"} />
                </View>

                <Text style={styles.storeInfoType}>
                  {/* {storeData?.data?.corporate_type}{" "}
                  {storeData?.data?.is_brand == 1 &&
                    storeData?.data?.brand_id && (
                      <Text>- Franchise Markası</Text>
                    )} */}
                  corporate_type
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.content}>
            <View style={styles.contentHead}>
              <Image
                source={{
                  uri:
                    frontEndUriBase +
                    "storage/profile_images/" +
                    person.profile_image,
                }}
                style={styles.personImage}
              />
              <View style={styles.social}>
                <FontAwesome5 name="instagram" size={24} color="black" />
                <FontAwesome5 name="whatsapp" size={24} color="black" />
              </View>
            </View>
            <View style={{ gap: 2, marginTop: 6 }}>
              <Text style={styles.boldText}>Master Realtor Sinop</Text>
              <Text style={[styles.boldText, { color: "#606060" }]}>
                {person?.title}
              </Text>
              <View style={styles.personInfo}>
                <FontAwesome5 name="phone-alt" size={12} color="#000" />
                <Text style={styles.normalText}>{person?.mobile_phone}</Text>
              </View>
              <View style={styles.personInfo}>
                <MaterialIcons name="email" size={12} color="#000" />
                <Text style={styles.normalText}>{person.email}</Text>
              </View>
              <View style={{ marginTop: 10, gap: 6 }}>
                <Text style={styles.boldText}>HAKKINDA</Text>
                <Text style={styles?.normalText}>
                  Güven ve Güleryüz ise aradığınız doğru yerde doğru
                  danışmanlasınız...1978 İstanbul doğumluyum. Evli ve iki kız
                  çocuk babasıyım. 1995 yılında başladığım çalışma hayatım
                  boyunca ofis ve kırtasiye malzemesi satışı yapan birkaç
                  firmada çalıştım. Ayrıca özel bir bankanın PBDK biriminde
                  çalışarak üç yıl bankacılık deneyimi edindim. Çalışmalarını
                  gıptayla izlediğim birkaç Remax ABC çalışanı arkadaşım
                  sayesinde ben de bu aileye dahil oldum...
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.dataMain}>
            <>
              <View style={styles.dataContainer}>
                <View style={styles.dataBody}>
                  <View style={styles.dataImage}>
                    <Docs width={24} height={24} />
                  </View>
                  <Text style={styles.normalText}>120</Text>
                </View>
                <Text style={styles.smallBold}>İlan Sayısı</Text>
              </View>
            </>
            <>
              <View style={styles.dataContainer}>
                <View style={styles.dataBody}>
                  <View style={styles.dataImage}>
                    <Marker width={24} height={24} />
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <Text style={styles.normalText}>Van</Text>
                    <TouchableOpacity
                      style={styles.reqLocationBody}
                      activeOpacity={0.8}
                      onPress={() => {
                        null;
                      }}
                    >
                      <View style={styles.locationIcon}>
                        <FontAwesome5
                          name="location-arrow"
                          size={8}
                          color="#EA2B2E"
                        />
                        <Text style={styles.locationReq}>Yol Tarifi Al</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.smallBold}>Ofis Konumu</Text>
              </View>
            </>
            <>
              <View style={styles.dataContainer}>
                <View style={styles.dataBody}>
                  <View style={styles.dataImage}>
                    <Calendar width={24} height={24} />
                  </View>
                  <Text style={styles.normalText}>6.yıl</Text>
                </View>
                <Text style={styles.smallBold}>Master Realtor’de</Text>
              </View>
            </>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FranchisePersonDetail;

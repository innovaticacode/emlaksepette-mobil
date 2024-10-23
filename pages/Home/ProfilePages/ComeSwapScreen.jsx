import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getValueFor } from "../../../components/methods/user";
import NoDataScreen from "../../../components/NoDataScreen";
import axios from "axios";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/AntDesign";
import { InfoCard, MySwapInfoBottom } from "../../../components";
import { formatDate } from "../../../utils";

export default function ComeSwapScreen() {
  const [user, setUser] = useState({});
  const [mySwapRequest, setMySwapRequest] = useState([]);
  const [swapSuggestdetails, setswapSuggestdetails] = useState([]);
  const [selectedModalIndex, setselectedModalIndex] = useState(0);
  const [DetailModal, setDetailModal] = useState(false);
  const [swapSuggestdetailsCompany, setswapSuggestdetailsCompany] = useState(
    []
  );
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setDetailModal(true);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (user?.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/institutional/my-swap-applications",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        setMySwapRequest(response.data);
        return setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const getDetails = async (id, index) => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/institutional/my-swap-applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        console.log(id + " id budurrr");

        openModal();
        setswapSuggestdetails(response?.data?.form);
        setswapSuggestdetailsCompany(response?.data?.item);

        setselectedModalIndex(index);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          animating={loading}
        />
      ) : (
        <View>
          <>
            <FlatList
              data={mySwapRequest}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <InfoCard
                  colorKey={index}
                  name={item.ad}
                  surname={item.soyad}
                  eposta={item.email}
                  phone={item.telefon}
                  date={formatDate(item.created_at)}
                  onPress={() => getDetails(item.id, index)}
                />
              )}
            />
          </>
          <MySwapInfoBottom
            isVisible={DetailModal}
            setIsVisible={setDetailModal}
            swapStatus={swapSuggestdetails?.takas_tercihi}
            swapSuggest={swapSuggestdetails?.takas_tercihi}
            estatesType={swapSuggestdetails?.emlak_tipi}
            data={swapSuggestdetails}
          />
        </View>
      )}
      {mySwapRequest.length === 0 && !loading ? (
        <>
          <View>
            <NoDataScreen
              message="Takas bilgisi bulunamadı."
              iconName="swap-horizontal-bold"
              buttonText="Anasayfaya Dön"
              navigateTo="HomePage"
            />
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    backgroundColor: "#FFF",
    gap: 10,
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 500,
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

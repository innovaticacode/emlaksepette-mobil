import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Alert, ActivityIndicator } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Success from "./Tabs/Success/Success";
import Pending from "./Tabs/Pending/Pending";
import Failed from "./Tabs/Failed/Failed";
import { styles } from "./PointOfSaleTracking.styles";
import { apiRequestGetWithBearer } from "../../../../components/methods/apiRequest";
import { getValueFor } from "../../../../components/methods/user";

renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.tabIndicator}
    style={styles.tabBg}
    renderLabel={({ route, focused }) => (
      <Text
        style={[
          {
            color: focused ? "#EA2B2E" : "#404040",
          },
          styles.tabText,
        ]}
      >
        {route.title}
      </Text>
    )}
  />
);
const { width } = Dimensions.get("window");
const PointOfSaleTracking = () => {
  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "success", title: "Onaylanan" },
    { key: "pending", title: "Onay Bekleyen" },
    { key: "failed", title: "Reddedilen" },
  ]);
  const [pending, setPending] = useState([]);
  const [success, setSuccess] = useState([]);
  const [failed, setFailed] = useState([]);
  const [loading, setLoading] = useState(false);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "success":
        return <Success data={success} />;
      case "pending":
        return <Pending data={pending} />;
      case "failed":
        return <Failed data={failed} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await apiRequestGetWithBearer(
        "satis-noktasi-basvurularim"
      );
      console.debug("*---------->>>", result?.data?.sales_points);
      if (result.data.message === "success") {
        const data = result?.data?.sales_points;
        setPending(data?.filter((item) => item.status === "pending"));
        setSuccess(data?.filter((item) => item.status === "approved"));
        setFailed(data?.filter((item) => item.status === "rejected"));
      } else {
        Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      ) : null}
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
      />
    </View>
  );
};

export default PointOfSaleTracking;

import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { TracingCard } from "../../../../components";

const Success = () => (
  <View>
    <Text>Success</Text>
  </View>
);

const Pending = () => (
  <View>
    <TracingCard />
  </View>
);

const Failed = () => (
  <View>
    <Text>Failed</Text>
  </View>
);

const renderScene = SceneMap({
  success: Success,
  pending: Pending,
  failed: Failed,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#EA2B2E", height: 1 }}
    style={{ backgroundColor: "#FFF" }}
    renderLabel={({ route, focused }) => (
      <Text
        style={{
          color: focused ? "#EA2B2E" : "#000000",
          fontWeight: "600",
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const { width } = Dimensions.get("window");

const PointOfSaleTracking = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "success", title: "Onaylanan" },
    { key: "pending", title: "Onay Bekleyen" },
    { key: "failed", title: "Reddedilen" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
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

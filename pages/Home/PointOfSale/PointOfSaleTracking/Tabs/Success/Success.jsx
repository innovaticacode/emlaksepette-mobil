import { View, Text, FlatList } from "react-native";
import React from "react";
import { TracingCard } from "../../../../../../components";

const Success = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TracingCard
            colorKey={item?.id}
            title={item?.store?.username}
            subTitle={item?.town.sehir_title + "/" + item?.district?.ilce_title}
            date={item?.updated_at}
            description={item?.message}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
};

export default Success;

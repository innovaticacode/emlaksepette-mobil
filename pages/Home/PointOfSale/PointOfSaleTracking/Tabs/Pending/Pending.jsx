import { View, FlatList } from "react-native";
import React from "react";
import { TracingCard } from "../../../../../../components";
import NoDataScreen from "../../../../../../components/NoDataScreen";
import { styles } from "./Pending.styles";

const Pending = ({ data, loading }) => {
  return (
    <>
      {!loading && data.length === 0 ? (
        <View style={styles.noDataView}>
          <NoDataScreen
            message={"Bekleyen işleminiz bulunmamaktadır."}
            iconName={"emoticon-sad-outline"}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TracingCard
              colorKey={item?.id}
              title={item?.store?.username}
              subTitle={
                item?.town.sehir_title + "/" + item?.district?.ilce_title
              }
              date={item?.updated_at}
              description={item?.message}
              onPress={() => {
                null;
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default Pending;

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import EditCollectionPost from "./profileComponents/EditCollectionPost";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Platform } from "react-native";
export default function EditCollection() {
  const route = useRoute();
  const { collectionItems: initialCollectionItems, item } = route.params;
  const [collectionItems, setCollectionItems] = useState(initialCollectionItems);
  const navigation = useNavigation();

  const handleRemoveFromCollection = (removedItemId) => {
    setCollectionItems((prevItems) =>
      prevItems.filter((collectionItem) => collectionItem.id !== removedItemId)
    );
  };
  useEffect(() => {
    navigation.setOptions({ title: item.name });
  }, [item.name]);

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    >
     {collectionItems && collectionItems.length > 0 ? (
    collectionItems.map((collectionItem, index) => (
      <EditCollectionPost
        item={collectionItem}
        key={index}
        collection={item}
        onRemove={handleRemoveFromCollection}
      />
    ))
  ) : (
    <Text style={{ textAlign: 'center', marginTop: 20 }}>Koleksiyon boş</Text>
  )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 1000,
    backgroundColor: "white",
  },
  shadowcard: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 5,
    width: "100%",
    marginVertical: 10,

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

import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function SearchItem({ name = "Item Name", photo, onPress }) {
  console.log(photo);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        {photo && (
          <Image source={{ uri: photo }} style={styles.photo} />
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.itemText}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingVertical: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 8,
    marginRight: 8,
  },
  textWrapper: {
    flex: 1,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    flexWrap: 'wrap',
  },
});

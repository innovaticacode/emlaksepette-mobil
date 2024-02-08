import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const BottomSheetComponent = () => {
const [isVisible, setIsVisible] = useState(false);
const list = [
  { title: 'List Item 1' },
  { title: 'List Item 2' },
  {
    title: 'Cancel',
    containerStyle: { backgroundColor: 'red' },
    titleStyle: { color: 'white' },
    onPress: () => setIsVisible(false),
  },
];

return (
  <SafeAreaView>
    <Button
      title="Open Bottom Sheet"
      onPress={() => setIsVisible(true)}
      buttonStyle={styles.button}
    />
    <BottomSheet modalProps={{}} isVisible={isVisible}>
      {list.map((l, i) => (
        <ListItem
          key={i}
          containerStyle={l.containerStyle}
          onPress={l.onPress}
        >
          <ListItem.Content>
            <TouchableOpacity>
            <ListItem.Title style={l.titleStyle}>Ara</ListItem.Title>
            </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
button: {
  margin: 10,
},
});

export default BottomSheetComponent;
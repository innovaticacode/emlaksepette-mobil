import { View, Text, SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'
import DetailsPicture from '../../../components/DetailsPicture'
import PagerView from 'react-native-pager-view';
export default function Emlakİlanı() {
  return (
    <SafeAreaView style={{flex:1}}>
         <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
        <DetailsPicture/>
        </View>
        <View style={styles.page} key="2">
        <DetailsPicture/>
        </View>
        <View style={styles.page} key="3">
        <DetailsPicture/>
        </View>
      </PagerView>
   
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
   
  },
});
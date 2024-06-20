import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { WebView } from 'react-native-webview';
export default function DecontPdf() {
    const route =useRoute()
    const {name,pdfUri}=route.params
   

  return (
    <View style={styles.container}>
      <WebView
          style={styles.webView}
          originWhitelist={['*']}
          source={{ uri: pdfUri }}
        />


    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    webView: {
      flex: 1,
      width: '100%',
    },
  });
  
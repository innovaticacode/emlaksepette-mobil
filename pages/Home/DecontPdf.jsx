import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

export default function DecontPdf() {
  const route = useRoute();
  const { pdfUri } = route.params;
  const [fileUri, setFileUri] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function requestStoragePermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Depolama İzni Gerekiyor',
              message: 'Bu uygulamanın PDF dosyalarına erişebilmesi için depolama iznine ihtiyacı var.',
              buttonNeutral: 'Daha Sonra Sor',
              buttonNegative: 'İptal',
              buttonPositive: 'Tamam',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setFileUri(pdfUri.startsWith('file://') ? pdfUri : `file://${pdfUri}`);
            setLoading(false);
          } else {
            console.log('Depolama izni reddedildi');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        setFileUri(pdfUri.startsWith('file://') ? pdfUri : `file://${pdfUri}`);
        setLoading(false);
      }
    }

    requestStoragePermission();
  }, [pdfUri]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <WebView
          style={styles.webView}
          originWhitelist={['*']}
          source={{ uri: fileUri }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  webView: {
  width:400
  },
});

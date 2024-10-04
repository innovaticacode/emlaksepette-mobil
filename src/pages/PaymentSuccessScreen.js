// PaymentSuccessScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PaymentSuccess from '../components/PaymentSuccess';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // İkonlar için

const PaymentSuccessScreen = ({ route, navigation }) => {
  // Dinamik parametreleri route üzerinden al
  const { title, message, primaryButtonText, secondaryButtonText, icon, onContinue, onGoHome } = route.params;

  return (
    <View style={styles.container}>
      <PaymentSuccess
        title={title}
        message={message}
        icon={icon}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        onContinue={onContinue}
        onGoHome={onGoHome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default PaymentSuccessScreen;

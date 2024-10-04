import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentSuccess = ({ 
  title = "", 
  message = "", 
  primaryButtonText = "", 
  secondaryButtonText = "",
  onContinue, 
  onGoHome 
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="check-circle"
        size={100}
        color="#4BB543"
        style={styles.icon}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.buttonText}>{primaryButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onGoHome}>
          <Text style={styles.buttonText}>{secondaryButtonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4BB543',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#EA2B2E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginRight: 10,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentSuccess;

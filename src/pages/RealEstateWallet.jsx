import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Geri tuşu için ikon
import { Card } from 'react-native-elements';

const RealEstateWallet  = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const amounts = ['1000', '2000', '3000', '4000', '5000'];

  const renderAmountButton = (amount) => {
    return (
      <TouchableOpacity
        key={amount}
        style={[
          styles.amountButton,
          selectedAmount === amount && styles.selectedAmountButton
        ]}
        onPress={() => setSelectedAmount(amount)}
      >
        <Text style={styles.amountText}>{amount} ₺</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emlak Cüzdan</Text>
      </View>

      {/* Balance Card */}
      <Card containerStyle={styles.balanceCard}>
        <View>
          <Text style={styles.balanceTitle}>Toplam Bakiye</Text>
          <Text style={styles.balanceAmount}>0 ₺</Text>
        </View>
        <View>
          <Text style={styles.balanceSubtitle}>Yüklenen Bakiye</Text>
          <Text style={styles.balanceAmount}>0,00 ₺</Text>
          <Text style={styles.balanceSubtitle}>Kazanç</Text>
          <Text style={styles.balanceAmount}>0,00 ₺</Text>
        </View>
        <Text style={styles.balanceDesc}>
          Emlak Cüzdan ile hızlıca ödeme yap. Emlak cüzdanlı olmanın ayrıcalıklarını yakala!
        </Text>
      </Card>

      {/* Withdraw Section */}
      <View style={styles.withdrawSection}>
        <Text style={styles.sectionTitle}>Para Çek</Text>
        <TouchableOpacity>
          <Text style={styles.removeCardText}>Kartı Sil</Text>
        </TouchableOpacity>

        {/* Card Display */}
        <View style={styles.card}>
          <Text style={styles.cardText}>20576****7877</Text>
          <Text style={styles.cardText}>VakıfBank</Text>
          <Ionicons name="checkmark-circle" size={24} color="green" />
        </View>

        {/* Amount Selection */}
        <View style={styles.amountContainer}>
          <FlatList
            data={amounts}
            horizontal
            renderItem={({ item }) => renderAmountButton(item)}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Custom Amount Input */}
        <TextInput
          style={styles.customInput}
          placeholder="Farklı Tutar giriniz..."
          keyboardType="numeric"
          value={customAmount}
          onChangeText={setCustomAmount}
        />

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>Hemen Para Çek</Text>
        </TouchableOpacity>

        {/* Add Card Section */}
        <TouchableOpacity style={styles.addCard}>
          <Ionicons name="add-circle" size={24} color="red" />
          <Text style={styles.addCardText}>Kart Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  balanceCard: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4d',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4d4d',
  },
  balanceSubtitle: {
    fontSize: 14,
    color: '#000',
  },
  balanceDesc: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
  withdrawSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeCardText: {
    fontSize: 14,
    color: '#ff4d4d',
    textAlign: 'right',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedAmountButton: {
    backgroundColor: '#ff4d4d',
  },
  amountText: {
    color: '#000',
    fontWeight: 'bold',
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: '#ff4d4d',
    padding: 16,
    borderRadius: 10,
  },
  withdrawButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addCardText: {
    color: '#ff4d4d',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default RealEstateWallet;

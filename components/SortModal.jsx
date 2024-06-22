import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';

const SortModal = ({ isVisible, onClose, onSortChange, selectedSortOption }) => {
  const handleSortChange = (value) => {
    onSortChange(value); // Sıralama seçeneği değiştiğinde ana bileşene bildirim gönder
    onClose(); // Seçim yapıldıktan sonra modalı kapat
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>SIRALAMA</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleSortChange('price-asc')}
              style={styles.checkboxItem}
            >
              <Text style={styles.checkboxLabel}>Fiyata göre (Önce en düşük)</Text>
              <View style={[styles.checkbox, selectedSortOption === 'price-asc' && styles.checkboxSelected]}>
                {selectedSortOption === 'price-asc' && <View style={styles.checkboxInner} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortChange('price-desc')}
              style={styles.checkboxItem}
            >
              <Text style={styles.checkboxLabel}>Fiyata göre (Önce en yüksek)</Text>
              <View style={[styles.checkbox, selectedSortOption === 'price-desc' && styles.checkboxSelected]}>
                {selectedSortOption === 'price-desc' && <View style={styles.checkboxInner} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortChange('date-asc')}
              style={styles.checkboxItem}
            >
              <Text style={styles.checkboxLabel}>Tarihe göre (Önce en eski ilan)</Text>
              <View style={[styles.checkbox, selectedSortOption === 'date-asc' && styles.checkboxSelected]}>
                {selectedSortOption === 'date-asc' && <View style={styles.checkboxInner} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortChange('date-desc')}
              style={styles.checkboxItem}
            >
              <Text style={styles.checkboxLabel}>Tarihe göre (Önce en yeni ilan)</Text>
              <View style={[styles.checkbox, selectedSortOption === 'date-desc' && styles.checkboxSelected]}>
                {selectedSortOption === 'date-desc' && <View style={styles.checkboxInner} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: "green",
  },
  checkboxSelected: {
    borderColor: 'green',
  },
});

export default SortModal;

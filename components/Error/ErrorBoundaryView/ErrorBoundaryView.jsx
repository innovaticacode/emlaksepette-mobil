import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./ErrorBoundaryView.styles";

const ErrorBoundaryView = ({ error, resetErrorBoundary }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bir hata oluştu:</Text>
      <Text style={styles.errorMessage}>{error?.message || ""}</Text>
      <Button title="Tekrar Dene" onPress={resetErrorBoundary} />
    </View>
  );
};

export default ErrorBoundaryView;

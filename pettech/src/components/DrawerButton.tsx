// CustomButton.tsx

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const DrawerButton = ({ navigation, screenName, title }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(screenName)}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 10, // Espaciado vertical entre botones
  },
  buttonText: {
    color: "#8396dc", // Color del texto
    fontSize: 28, // Tamaño del texto
    fontWeight: "900", // Grosor del texto
  },
});

export default DrawerButton;

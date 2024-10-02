// CustomButton.tsx

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ navigation, screenName, title }) => {
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
    backgroundColor: "#566ec4", // Cambia el color de fondo según lo desees
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 10, // Espaciado vertical entre botones
  },
  buttonText: {
    color: "white", // Color del texto
    fontSize: 28, // Tamaño del texto
    fontWeight: "400", // Grosor del texto
  },
});

export default CustomButton;

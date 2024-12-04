// ActualizarEstadoButton.tsx

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ActualizarEstadoButton = () => {
  const handlePress = async () => {
    try {
      const response = await fetch(
        "https://alimentador-production-15ae.up.railway.app/distancias/update-last-state",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: "segundos" }),
        }
      );

      const data = await response.json();
      console.log(data); // Maneja la respuesta según sea necesario
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Dispensar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1, // Cada botón ocupa el mismo espacio
    backgroundColor: "#8396dc", // Color de fondo del botón
    padding: 10, // Espaciado interno del botón
    borderRadius: 5, // Bordes redondeados
    alignItems: "center", // Centra el texto del botón
    marginHorizontal: 5, // Espacio entre los botones
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ActualizarEstadoButton;

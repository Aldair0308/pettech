import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ActualizarEstadoButton = () => {
  const handlePress = async () => {
    try {
      // Paso 1: GET a /signals/clear
      const clearResponse = await fetch(
        "https://alimentador-production-15ae.up.railway.app/distancias/signals/clear"
      );

      if (!clearResponse.ok) {
        throw new Error("Error al limpiar señales");
      }

      console.log("Señales limpiadas exitosamente");

      // Paso 2: POST a /distancias/signal con { "signal": "abrir" }
      const postResponse = await fetch(
        "https://alimentador-production-15ae.up.railway.app/distancias/signal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ signal: "abrir" }),
        }
      );

      if (!postResponse.ok) {
        throw new Error("Error al enviar el POST de la señal");
      }

      const postData = await postResponse.json();
      console.log("Respuesta del POST:", postData);
    } catch (error) {
      console.error("Error:", error.message);
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
    flex: 1,
    backgroundColor: "#8396dc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ActualizarEstadoButton;

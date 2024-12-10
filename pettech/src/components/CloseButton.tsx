import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CloseButton = () => {
  const handlePress = async () => {
    try {
      // Paso 1: Realizar GET a /distancias/signals/clear
      const clearResponse = await fetch(
        "https://alimentador-production-15ae.up.railway.app/distancias/signals/clear"
      );

      if (!clearResponse.ok) {
        throw new Error("Error al limpiar las señales");
      }

      console.log("Señales limpiadas exitosamente");

      // Paso 2: Realizar POST a /distancias/signal con { "signal": "cerrar" }
      const postResponse = await fetch(
        "https://alimentador-production-15ae.up.railway.app/distancias/signal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ signal: "cerrar" }),
        }
      );

      if (!postResponse.ok) {
        console.log("Código de respuesta del POST:", postResponse.status);
        const errorText = await postResponse.text();
        console.log("Respuesta del servidor:", errorText);
        throw new Error("Error al enviar la señal de cierre");
      }

      const postData = await postResponse.json();
      console.log("Respuesta del servidor:", postData);
    } catch (error) {
      console.error("Error al ejecutar la acción de cerrar:", error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Parar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#81248a",
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

export default CloseButton;

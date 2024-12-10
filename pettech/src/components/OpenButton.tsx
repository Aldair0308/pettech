import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const OpenButton = () => {
  const handlePress = async () => {
    try {
      // Obtener la IP del dispensador
      const dispenserResponse = await fetch(
        "https://alimentador-production-15ae.up.railway.app/dispenser/code/3Wa0c71"
      );

      if (!dispenserResponse.ok) {
        throw new Error("Error al obtener la IP del dispensador");
      }

      const dispenserData = await dispenserResponse.json();
      const ip = dispenserData.ip;

      if (!ip) {
        throw new Error("No se encontró la IP en la respuesta de la API");
      }

      console.log("IP obtenida:", ip);

      // Realizar el POST
      const postResponse = await fetch(`http://${ip}/api/open`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!postResponse.ok) {
        console.log("Código de respuesta del POST:", postResponse.status);
        const errorText = await postResponse.text();
        console.log("Respuesta del servidor:", errorText);
        throw new Error("Error al enviar el POST al dispensador");
      }

      const postData = await postResponse.json();
      console.log("Respuesta del dispensador:", postData);
    } catch (error) {
      console.error("Error al realizar la acción de abrir:", error.message);
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

export default OpenButton;

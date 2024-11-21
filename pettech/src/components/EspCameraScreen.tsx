import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

interface EspCameraImageViewProps {
  streamUrl: string; // URL del stream de la cámara
  refreshInterval?: number; // Intervalo de actualización en milisegundos
}

const EspCameraImageView: React.FC<EspCameraImageViewProps> = ({
  streamUrl,
  refreshInterval = 500, // Por defecto, se actualiza cada 500 ms
}) => {
  const [imageUrl, setImageUrl] = useState(`${streamUrl}?time=${Date.now()}`);

  useEffect(() => {
    // Actualiza la URL cada cierto intervalo para forzar la recarga de la imagen
    const interval = setInterval(() => {
      setImageUrl(`${streamUrl}?time=${Date.now()}`);
    }, refreshInterval);

    return () => {
      clearInterval(interval);
    };
  }, [streamUrl, refreshInterval]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cámara ESP32 en Vivo</Text>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        // onError={(error) => console.error("Error al cargar la imagen:", error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000", // Fondo negro para resaltar la imagen
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  image: {
    width: "90%", // La imagen ocupa el 90% del ancho
    height: 300, // Ajusta la altura según sea necesario
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default EspCameraImageView;

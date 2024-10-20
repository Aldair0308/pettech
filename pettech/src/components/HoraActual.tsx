import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../hooks/useTheme";

const { width } = Dimensions.get("window");

const HoraDisplay: React.FC = () => {
  const [hora, setHora] = useState<string>("");
  const { theme } = useTheme();

  // Función para actualizar la hora
  const updateHora = () => {
    const now = new Date();

    // Configuración de formato de hora en 24 horas
    const options = {
      timeZone: "America/Mexico_City",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Cambiar a false para formato de 24 horas
    };

    const timeString = new Intl.DateTimeFormat("es-MX", options).format(now);

    setHora(timeString);
  };

  // Actualizar la hora cada segundo
  useEffect(() => {
    updateHora(); // Inicializar la hora
    const interval = setInterval(updateHora, 1000); // Actualizar cada segundo
    return () => clearInterval(interval); // Limpiar el intervalo
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.hora, color: theme.colors.hora }}>{hora}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  hora: {
    fontSize: width * 0.08, // Tamaño de fuente basado en el ancho
    fontFamily: "monospace", // Fuente monoespaciada
    letterSpacing: 2,
    textAlign: "center", // Centrar texto
    color: "#81248a", // Color morado
    fontWeight: "900",
  },
});

export default HoraDisplay;

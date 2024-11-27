import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Battery from "./Battery"; // Asegúrate de que la ruta sea correcta
import { useTheme } from "../hooks/useTheme"; // Asumiendo que useTheme está bien configurado
import AsyncStorage from "@react-native-async-storage/async-storage";

const FullBattery: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const { theme } = useTheme(); // Usando el hook useTheme

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      try {
        const code = await AsyncStorage.getItem("dispenserCode");
        if (code) {
          const response = await fetch(
            `http://192.168.100.169:3000/distancias/last/code/${code}` // Usando el code del AsyncStorage
          );
          const data = await response.json();
          const { porcentaje } = data;
          setBatteryLevel(Math.max(0, Math.min(100, porcentaje)));
        }
      } catch (error) {
        console.error("Error fetching battery level:", error);
      }
    };

    // Llama a la función inmediatamente y luego cada 5 segundos
    fetchBatteryLevel();
    const intervalId = setInterval(fetchBatteryLevel, 5000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {/* Usamos el color primario del tema en el estilo del texto */}
      <Text style={[styles.batteryText, { color: theme.colors.text }]}>
        {`${batteryLevel}%`}
      </Text>
      <Battery level={batteryLevel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  batteryText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30, // Espaciado entre el texto y el componente de batería
    marginTop: -20,
  },
});

export default FullBattery;

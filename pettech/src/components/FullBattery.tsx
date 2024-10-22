import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Battery from "./Battery"; // Asegúrate de que la ruta sea correcta

const FullBattery: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      try {
        const response = await fetch(
          "https://alimentador-production.up.railway.app/distancias/last"
        );
        const data = await response.json();
        const { porcentaje } = data;
        setBatteryLevel(Math.max(0, Math.min(100, porcentaje)));
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
    <View>
      <Battery level={batteryLevel} />
    </View>
  );
};

export default FullBattery;

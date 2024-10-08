import React from "react";
import { View, StyleSheet } from "react-native";

interface BatteryProps {
  level: number; // Debe estar entre 0 y 100
}

const Battery: React.FC<BatteryProps> = ({ level }) => {
  // Asegúrate de que el nivel esté en el rango correcto
  const batteryLevel = Math.max(0, Math.min(100, level));

  // Número de divisiones que queremos dentro de la batería
  const divisions = 5;
  const divisionHeight = 100 / divisions;

  return (
    <View style={styles.batteryContainer}>
      <View style={styles.battery}>
        {/* Dibujar la batería llena */}
        <View
          style={[
            styles.batteryLevel,
            {
              height: `${batteryLevel}%`,
              backgroundColor: batteryLevel > 20 ? "green" : "red",
            },
          ]}
        />

        {/* Dibujar las divisiones */}
        {Array.from({ length: divisions }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.divider,
              {
                bottom: `${(index + 1) * divisionHeight}%`,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  batteryContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 400, // Aumenta la altura al 400%
    width: 150, // Aumenta el ancho al 150%
    borderWidth: 4, // Grosor del borde
    borderColor: "black",
    borderRadius: 10,
    position: "relative",
  },
  battery: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
    position: "relative",
  },
  batteryLevel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  divider: {
    position: "absolute",
    width: "100%",
    height: 4, // Altura de la línea divisoria
    backgroundColor: "gray", // Cambié el color a blanco
  },
});

export default Battery;

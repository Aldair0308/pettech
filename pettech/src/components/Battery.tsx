import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BatteryProps {
  level: number; // Debe estar entre 0 y 100
}

const Battery: React.FC<BatteryProps> = ({ level }) => {
  const batteryDisplayLevel = Math.max(0, Math.min(100, level));
  const divisions = 6; // Ahora usamos 6 divisiones (barras)

  // Calcular el número de barras llenas basadas en el nivel de batería
  const filledBars = Math.round((batteryDisplayLevel / 100) * divisions);

  // Función para interpolar entre verde, amarillo y rojo
  const interpolateColor = (level: number) => {
    if (level > 60) return "green";
    if (level > 30) return "yellow";
    return "red";
  };

  return (
    <View style={styles.batteryContainer}>
      <Text style={styles.batteryText}>{`${batteryDisplayLevel}%`}</Text>

      <View style={styles.battery}>
        {[...Array(divisions)].map((_, index) => {
          const isFilled = index < filledBars;
          return (
            <View
              key={index}
              style={[
                styles.bar,
                isFilled && {
                  backgroundColor: interpolateColor(batteryDisplayLevel),
                },
                !isFilled && styles.empty,
                { bottom: index * (100 / divisions) + "%" }, // Llenar de abajo hacia arriba
              ]}
            />
          );
        })}
      </View>

      {/* Agregamos la tapa de la batería (chupon) */}
      <View style={styles.cap}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  batteryContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300, // Altura ajustada para mejor visibilidad
    width: 120, // Ancho ajustado para que se vea bien
    borderWidth: 4,
    borderColor: "#B88B4A", // Color marrón de la batería
    borderRadius: 10,
    position: "relative",
    paddingBottom: 3,
  },
  batteryText: {
    position: "absolute",
    top: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  battery: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
    position: "relative",
  },
  bar: {
    width: "96%", // Las barras tienen el mismo ancho
    height: 45, // Hicimos las barras más anchas
    borderRadius: 5,
    backgroundColor: "transparent",
    position: "absolute",
    marginHorizontal: 2,
  },
  empty: {
    backgroundColor: "transparent", // Barras vacías (espacio transparente)
  },
  cap: {
    width: 30,
    height: 20,
    backgroundColor: "#B88B4A", // Color marrón de la tapa
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    top: -20,
    left: 42, // Centrado en la parte superior
  },
});

export default Battery;

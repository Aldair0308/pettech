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
    height: 450, // Altura ajustada para hacerla más alta
    width: 200, // Ancho ajustado para hacerla más ancha
    borderWidth: 6, // Grosor de borde mayor
    borderColor: "#B88B4A", // Color marrón de la batería
    borderRadius: 15, // Radio de esquina mayor para una apariencia más suavizada
    position: "relative",
    paddingBottom: 0, // Ajuste de espacio abajo
  },
  batteryText: {
    position: "absolute",
    top: 15,
    fontSize: 28, // Tamaño de fuente más grande
    fontWeight: "bold",
    color: "black",
  },
  battery: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
    position: "relative",
    borderRadius: 10,
  },
  bar: {
    width: "96%", // Las barras siguen con el mismo ancho
    height: 65, // Barras más altas para que se vean más grandes
    borderRadius: 8, // Bordes más redondeados
    backgroundColor: "transparent",
    position: "absolute",
    marginHorizontal: 4, // Separación horizontal mayor
    marginBottom: 4,
  },
  empty: {
    backgroundColor: "transparent", // Barras vacías (espacio transparente)
  },
  cap: {
    width: 90,
    height: 25,
    backgroundColor: "#B88B4A", // Color marrón de la tapa
    borderRadius: 10,
    position: "absolute",
    top: -25,
    left: 52, // Centrado en la parte superior
  },
});

export default Battery;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BatteryProps {
  level: number; // Debe estar entre 0 y 100
}

const Battery: React.FC<BatteryProps> = ({ level }) => {
  const batteryDisplayLevel = Math.max(0, Math.min(100, level));
  const divisions = 5;
  const divisionHeight = 100 / divisions;

  // Función para interpolar entre verde y rojo
  const interpolateColor = (level: number) => {
    const green = Math.round((level / 100) * 255);
    const red = Math.round(255 - (level / 100) * 255);
    return `rgb(${red}, ${green}, 0)`; // Color en formato RGB
  };

  return (
    <View style={styles.batteryContainer}>
      <Text style={styles.batteryText}>{`${batteryDisplayLevel}%`}</Text>
      <View style={styles.battery}>
        <View
          style={[
            styles.batteryLevel,
            {
              height: `${batteryDisplayLevel}%`,
              backgroundColor: interpolateColor(batteryDisplayLevel),
            },
          ]}
        />
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
    height: 400,
    width: 150,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 10,
    position: "relative",
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
  batteryLevel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  divider: {
    position: "absolute",
    width: "100%",
    height: 4,
    backgroundColor: "gray",
  },
});

export default Battery;

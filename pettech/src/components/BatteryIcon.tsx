import React from "react";
import { View, StyleSheet } from "react-native";

const BatteryIcon: React.FC<{ level: number }> = ({ level }) => {
  // Asegúrate de que el nivel esté entre 0 y 5
  const filledBars = Math.min(5, Math.max(0, level));

  return (
    <View style={styles.container}>
      <View style={styles.battery}>
        <View
          style={[
            styles.bar,
            { height: 20 * filledBars, backgroundColor: "green" },
          ]}
        />
        <View
          style={[
            styles.bar,
            { height: 20 * (5 - filledBars), backgroundColor: "transparent" },
          ]}
        />
      </View>
      <View style={styles.cap}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  battery: {
    width: 50,
    height: 100,
    borderWidth: 2,
    borderColor: "#B88B4A", // color marrón de la batería
    borderRadius: 5,
    position: "relative",
  },
  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "green",
    borderRadius: 5,
  },
  cap: {
    width: 20,
    height: 10,
    backgroundColor: "#B88B4A", // color marrón de la tapa
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: "absolute",
    top: -10,
    left: 15,
  },
});

export default BatteryIcon;

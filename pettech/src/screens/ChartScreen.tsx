// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import Battery, { Demo } from "../components/Battery";
import FullBattery from "../components/FullBattery";
import styles from "./../themes/petStyles";

const ChartScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 0, paddingTop: 0 },
        ]}
      >
        <Text style={{ ...styles.title, marginBottom: -10 }}>Nivel de</Text>
        <Text style={{ ...styles.title, marginBottom: 60 }}>alimento</Text>
        <FullBattery />
      </View>
    </View>
  );
};

export default ChartScreen;

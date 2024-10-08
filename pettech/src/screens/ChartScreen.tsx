// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import Battery, { Demo } from "../components/Battery";

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
        <Battery level={90} />
      </View>
    </View>
  );
};

export default ChartScreen;

// CamScreen.tsx

import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import BatteryIcon from "../components/BatteryIcon";

const CamScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <BatteryIcon level={5} />
      </View>
    </View>
  );
};

export default CamScreen;

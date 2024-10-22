// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import CatalogoComponent from "../components/CatologoComponent";

const CatalogoScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <CatalogoComponent />
    </View>
  );
};

export default CatalogoScreen;

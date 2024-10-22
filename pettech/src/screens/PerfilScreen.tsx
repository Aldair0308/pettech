// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import PerfilForm from "../components/PerfilForm";

const PerfilScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <PerfilForm />
    </View>
  );
};

export default PerfilScreen;

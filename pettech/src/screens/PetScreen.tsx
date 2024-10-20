// PetScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import CatalogoComponent from "../components/CatologoComponent";
import PetsScreen from "../components/PetsScreen";

const PetScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <PetsScreen />
    </View>
  );
};

export default PetScreen;

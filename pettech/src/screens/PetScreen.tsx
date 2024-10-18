// PetScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import CatalogoComponent from "../components/CatologoComponent";

const PetScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 0, paddingTop: 0 },
        ]}
      ></View>
    </View>
  );
};

export default PetScreen;

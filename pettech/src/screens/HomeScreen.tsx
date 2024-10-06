// HomeScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import BreedCard from "../components/BreedCard";

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View style={[theme.styles.containerSet]}>
        <Text style={[theme.text]}>Home</Text>
        <BreedCard />
      </View>
    </View>
  );
};

export default HomeScreen;

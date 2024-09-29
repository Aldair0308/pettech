// HomeScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View style={[theme.styles.containerSet]}>
        <Text style={[theme.text]}>Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

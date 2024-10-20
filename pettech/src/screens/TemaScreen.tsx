// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import ThemeSwitch from "../components/ThemeSwitch";
import styles from "../themes/petStyles";

const TemaScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <Text style={{ ...styles.title, marginBottom: 100 }}>
          Elige un Tema
        </Text>

        <ThemeSwitch />
      </View>
    </View>
  );
};

export default TemaScreen;

// HomeScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <Text style={[theme.text]}>Home</Text>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            backgroundColor:
              theme.styles.button.backgroundColor ||
              theme.colors.buttonBackground,
          }}
        >
          <Text style={{ color: theme.colors.buttonText }}>Cambia Tema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

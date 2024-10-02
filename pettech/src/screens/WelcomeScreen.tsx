// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Button } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <View>
          <Text>Bienvenido a Pettech</Text>
          <Button
            title="Crear una cuenta"
            onPress={() => navigation.navigate("Register")}
          />
          <Button
            title="Ya tengo Cuenta"
            onPress={() => navigation.navigate("App")}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

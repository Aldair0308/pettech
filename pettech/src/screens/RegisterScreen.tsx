// RegisterScreen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Button } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <Text style={[theme.text]}>Register</Text>
        <View>
          <Button
            title="Continuar"
            onPress={() => navigation.navigate("Registro")}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

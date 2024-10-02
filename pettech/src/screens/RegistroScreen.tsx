import React from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const RegistroScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <Text style={[theme.text]}>Registra a tu mascota</Text>
        {/* Cambia "Pettech" a "App" */}
        <Button title="Terminar" onPress={() => navigation.navigate("App")} />
      </View>
    </View>
  );
};

export default RegistroScreen;

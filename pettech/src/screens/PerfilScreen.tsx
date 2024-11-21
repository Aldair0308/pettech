// PerfilScreen.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import PerfilForm from "../components/PerfilForm";
import ShowImageEditComponent from "../components/ShowImageEditComponent";
import styles from "./../themes/petStyles"; // Asegúrate de que la ruta sea correcta

const PerfilScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container, localStyles.container]}>
      <Text style={{ ...styles.title, marginBottom: 8, marginTop: 60 }}>
        Edita tu Perfil
      </Text>

      <ShowImageEditComponent />
      <PerfilForm />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PerfilScreen;

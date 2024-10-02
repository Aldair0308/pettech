// Screen.tsx

import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import CustomButton from "../components/CustomButton";

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: "rgba(255, 255, 255, 0.95)" },
        styles.container,
      ]}
    >
      <Image
        source={require("./../../assets/Header.jpg")}
        style={styles.headerImage} // Aplica el estilo de la imagen
      />
      <View style={{ alignItems: "center", marginHorizontal: 10 }}>
        <Image
          source={require("./../../assets/pettech_1.jpg")}
          style={{ ...styles.headerImage, height: 300 }} // Ajusta el tamaño de la imagen
        />
      </View>
      <View style={styles.content}>
        <CustomButton
          navigation={navigation}
          screenName="Register"
          title="REGISTRARSE"
        />
        <CustomButton
          navigation={navigation}
          screenName="App"
          title="INICIAR SESIÓN"
        />
      </View>
      <Image
        source={require("./../../assets/Footer.jpg")}
        style={styles.footerImage} // Aplica el estilo del footer
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el View ocupe toda la altura de la pantalla
  },
  headerImage: {
    width: "100%", // 100% del ancho de la pantalla
    height: 200, // Ajusta la altura según sea necesario
  },
  footerImage: {
    width: "100%", // 100% del ancho de la pantalla
    height: 100, // Ajusta la altura del footer según sea necesario
  },
  content: {
    gap: 12,
    flex: 1, // Permite que el contenido ocupe el espacio restante
    justifyContent: "center", // Centra el contenido verticalmente
    padding: 20, // Espaciado alrededor del contenido
  },
  welcomeText: {
    fontSize: 24, // Tamaño de texto para el mensaje de bienvenida
    marginBottom: 20, // Espaciado inferior
  },
});

export default WelcomeScreen;

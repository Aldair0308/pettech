// HomeScreen.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "./../hooks/useTheme";
import HoraDisplay from "../components/HoraActual";
import ActualizarEstadoButton from "../components/ActualizarEstadoButton";
import NotificationButton from "../components/NotificationButton";

const HomeScreen = () => {
  const { theme } = useTheme();
  const { width } = Dimensions.get("window");

  return (
    <View style={[theme.styles.container]}>
      <View style={[theme.styles.containerSet]}>
        <View style={{ width: "100%" }}>
          <Text
            style={{ ...styles.mensaje, color: theme.colors.text }}
            numberOfLines={1} // Limita a una sola línea
            ellipsizeMode="tail" // Agrega puntos suspensivos si es necesario
          >
            ¡Bienvenido a nuestra aplicación!
          </Text>
        </View>
        <HoraDisplay />
        <Image
          source={require("./../../assets/pettech_2.png")}
          style={styles.headerImage} // Usar estilo definido
        />

        {/* Contenedor para los botones */}
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>Dispensar</Text>
          </TouchableOpacity> */}
          <ActualizarEstadoButton />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Parar</Text>
          </TouchableOpacity>
        </View>
        <NotificationButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: Dimensions.get("window").width, // 100% del ancho de la pantalla
    height: 300, // Ajusta la altura según sea necesario
  },
  mensaje: {
    fontSize: Dimensions.get("window").width * 0.04, // Tamaño de fuente basado en el ancho
    letterSpacing: 2,
    textAlign: "center", // Centrar texto
    color: "#81248a", // Color morado
    fontWeight: "bold",
    paddingHorizontal: 10, // Espaciado lateral opcional
  },
  buttonContainer: {
    flexDirection: "row", // Distribuir botones en una fila
    justifyContent: "space-between", // Espaciado entre los botones
    width: "100%", // Asegurarse de que ocupe todo el ancho
    paddingHorizontal: 20, // Espacio lateral opcional
    marginTop: 40, // Espacio superior opcional
  },
  button: {
    flex: 1, // Cada botón ocupa el mismo espacio
    backgroundColor: "#81248a", // Color de fondo del botón
    padding: 10, // Espaciado interno del botón
    borderRadius: 5, // Bordes redondeados
    alignItems: "center", // Centra el texto del botón
    marginHorizontal: 5, // Espacio entre los botones
    marginVertical: 10,
  },
  button1: {
    flex: 1, // Cada botón ocupa el mismo espacio
    backgroundColor: "#8396dc", // Color de fondo del botón
    padding: 10, // Espaciado interno del botón
    borderRadius: 5, // Bordes redondeados
    alignItems: "center", // Centra el texto del botón
    marginHorizontal: 5, // Espacio entre los botones
    marginVertical: 10,
  },
  buttonText: {
    color: "white", // Color del texto del botón
    fontWeight: "bold", // Negrita
  },
});

export default HomeScreen;

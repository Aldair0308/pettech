import { StyleSheet } from "react-native";

export const lightTheme = {
  colors: {
    primary: "#007BFF", // Azul claro
    text: "#1A1A1A", // Texto negro
    background: "#F0F4F8", // Color de fondo suave
    buttonBackground: "#FF6F61", // Color coral para botones
    buttonText: "white", // Color del texto de los botones
  },
  styles: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 8,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F0F4F8",
    },
    containerSet: {
      width: "90%",
      height: "90%",
      borderRadius: 10,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E0E7FF", // Color azul claro
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333", // Texto gris oscuro
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      backgroundColor: "#FF6F61", // Coral
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
  }),
};

export const darkTheme = {
  colors: {
    primary: "#1A1A1A", // Gris oscuro
    text: "#E0E0E0", // Texto claro
    background: "#121212", // Fondo oscuro
    buttonBackground: "#BB86FC", // Morado claro para botones
    buttonText: "white", // Color del texto de los botones
  },
  styles: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 8,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1A1A1A",
    },
    containerSet: {
      width: "90%",
      height: "90%",
      borderRadius: 10,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1F1F1F", // Gris más claro
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#E0E0E0", // Texto claro
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      backgroundColor: "#BB86FC", // Morado
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
  }),
};

import { StyleSheet } from "react-native";

export const lightTheme = {
  colors: {
    primary: "#4A90E2", // Azul suave
    text: "#2C3E50", // Texto oscuro
    background: "#ECF0F1", // Color de fondo suave
    buttonBackground: "#F0F0F0", // Rojo vibrante para botones
    buttonText: "black",
    hora: "#81248a",
  },
  styles: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 8,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ECF0F1",
    },
    containerSet: {
      width: "90%",
      height: "90%",
      borderRadius: 10,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F0F0F0", // Color gris claro
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#2C3E50",
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      backgroundColor: "#E74C3C",
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
  }),
};

export const darkTheme = {
  colors: {
    primary: "#4C6A92", // Azul oscuro con menos contraste
    text: "#ECF0F1", // Texto claro para buen contraste
    background: "#2C3E50", // Fondo oscuro neutro
    buttonBackground: "#7F8C8D", // Gris suave para los botones
    buttonText: "white", // Texto blanco para los botones
    hora: "#B0BEC5", // Color gris claro para la hora
  },
  styles: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 8,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2C3E50",
    },
    containerSet: {
      width: "90%",
      height: "90%",
      borderRadius: 10,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#34495E", // Azul más claro que el fondo
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ECF0F1", // Blanco claro para el texto
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      backgroundColor: "#7F8C8D", // Gris suave para los botones
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
  }),
};

export const blueTheme = {
  colors: {
    primary: "#3B5998",
    text: "#FFFFFF",
    background: "#8B9DC3",
    buttonBackground: "#4B7BE5",
    buttonText: "white",
  },
  styles: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 8,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#8B9DC3",
    },
    containerSet: {
      width: "90%",
      height: "90%",
      borderRadius: 10,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#A4C8E1",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      backgroundColor: "#4B7BE5",
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
  }),
};

export const greenTheme = {
  colors: {
    primary: "#28A745",
    text: "#FFFFFF",
    background: "#C3E6CB",
    buttonBackground: "#218838",
    buttonText: "white",
  },
  styles: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 8,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#C3E6CB",
    },
    containerSet: {
      width: "90%",
      height: "90%",
      borderRadius: 10,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#D4EDDA",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      backgroundColor: "#218838",
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
  }),
};

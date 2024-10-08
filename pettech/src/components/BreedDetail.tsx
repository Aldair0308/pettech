import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Mapa de imágenes locales
const images = {
  Yorkshire_Terrier: require("./../../assets/Terrier.jpg"),
  Chihuahua: require("./../../assets/photo-chihuahua.jpg"),
  Pomerania: require("./../../assets/pomerania.jpg"),
  // Agrega más razas aquí
};

const BreedDetail = ({ route, navigation }) => {
  const { breed } = route.params;

  // Reemplaza espacios por guiones bajos para buscar la imagen
  const breedImageKey = breed.raza.replace(/ /g, "_");
  const imageSource =
    images[breedImageKey] || require("./../../assets/photo-chihuahua.jpg");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{breed.raza}</Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Categoría:</Text> {breed.categoria}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Tamaño:</Text> {breed.tamaño}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Vida:</Text> {breed.vida}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Peso:</Text> {breed.peso}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Gramos:</Text> {breed.gramos}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Veces al día:</Text> {breed.veces}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Porción:</Text> {breed.porcion} gramos
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Horas de comida:</Text>{" "}
          {breed.horas.join(", ")}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Información:</Text> {breed.info}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrar verticalmente
    alignItems: "center", // Centrar horizontalmente
    backgroundColor: "#f8f8f8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "90%", // Ancho de la tarjeta
    maxWidth: 400, // Máximo ancho para dispositivos grandes
    elevation: 5, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center", // Centrar contenido
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF", // Color azul
    borderRadius: 5,
    width: "100%", // Botón a todo lo ancho
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28, // Título más grande
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Centrar el título
  },
  detail: {
    fontSize: 16, // Tamaño de texto
    marginVertical: 5, // Espacio entre líneas
    textAlign: "left", // Alinear a la izquierda
    width: "100%", // Hacer que el texto use todo el ancho
  },
  bold: {
    fontWeight: "bold",
  },
});

export default BreedDetail;

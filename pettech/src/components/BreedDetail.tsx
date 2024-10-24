import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Mapa de imágenes locales
const images = {
  Yorkshire_Terrier: require("./../../assets/Terrier.jpg"),
  Chihuahua: require("./../../assets/photo-chihuahua.jpg"),
  Pomerania: require("./../../assets/pomerania.jpg"),
  Pastor_Aleman: require("./../../assets/Terrier.jpg"),
  Bichón_Frisé_: require("./../../assets/frise.jpg"),
  Pug: require("./../../assets/pug.jpg"),
  Beagle: require("./../../assets/beagle.jpg"),
  Bulldog_Inglés: require("./../../assets/bulldog.jpg"),
  Basset_Hound: require("./../../assets/basset.jpg"),
  Shar_Pei: require("./../../assets/shar.jpg"),
  Dóberman: require("./../../assets/doberman.jpg"),
  Pastor_Alemán: require("./../../assets/pastor.jpg"),
  Husky_Siberiano: require("./../../assets/husky.jpg"),
  Rottweiler: require("./../../assets/rottweiler.jpg"),
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
      <Text style={styles.title}>{breed.raza}</Text>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.card}>
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
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
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
    borderTopLeftRadius: 30, // Aumentar para un efecto más ovalado
    borderTopRightRadius: 30, // Aumentar para un efecto más ovalado
    borderBottomLeftRadius: 30, // Aumentar para un efecto más ovalado
    borderBottomRightRadius: 30, // Aumentar para un efecto más ovalado
    paddingTop: 10,
    paddingHorizontal: 30,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
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
    height: 300,
    borderRadius: 10,
    marginBottom: 1,
  },
  title: {
    color: "#8396dc",
    fontSize: 40, // Título más grande
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
  button: {
    backgroundColor: "#6a7dc5", // Cambia el color de fondo según lo desees
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10, // Espaciado vertical entre botones
    marginBottom: -30,
  },
  buttonText: {
    color: "white", // Color del texto
    fontSize: 18, // Tamaño del texto
    fontWeight: "400", // Grosor del texto
  },
});

export default BreedDetail;

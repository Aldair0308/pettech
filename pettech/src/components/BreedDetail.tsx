import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Mapa de imágenes locales
const images = {
  Chihuahua: require("./../../assets/photo-chihuahua.jpg"),
  // Agrega más razas aquí
};

const BreedDetail = ({ route, navigation }) => {
  const { breed } = route.params;

  // Obtiene la imagen correspondiente a la raza o una imagen por defecto
  const imageSource =
    images[breed.raza] || require("./../../assets/photo-chihuahua.jpg");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{breed.raza}</Text>
      <Text>
        <Text style={styles.bold}>Categoría:</Text> {breed.categoria}
      </Text>
      <Text>
        <Text style={styles.bold}>Tamaño:</Text> {breed.tamaño}
      </Text>
      <Text>
        <Text style={styles.bold}>Vida:</Text> {breed.vida}
      </Text>
      <Text>
        <Text style={styles.bold}>Peso:</Text> {breed.peso}
      </Text>
      <Text>
        <Text style={styles.bold}>Gramos:</Text> {breed.gramos}
      </Text>
      <Text>
        <Text style={styles.bold}>Veces al día:</Text> {breed.veces}
      </Text>
      <Text>
        <Text style={styles.bold}>Porción:</Text> {breed.porcion} gramos
      </Text>
      <Text>
        <Text style={styles.bold}>Horas de comida:</Text>{" "}
        {breed.horas.join(", ")}
      </Text>
      <Text>
        <Text style={styles.bold}>Información:</Text> {breed.info}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#6A51FF",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default BreedDetail;

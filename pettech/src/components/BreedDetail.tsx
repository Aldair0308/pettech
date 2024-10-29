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
          <Text style={styles.bold}>Tamaño:</Text> {breed.tamaño}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Peso:</Text> {breed.peso}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Esperanza de vida:</Text> {breed.vida}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Cantidad de comida diaria:</Text>{" "}
          {breed.gramos} gramos
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Veces al día:</Text> {breed.veces}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Porción:</Text> {breed.porcion} gramos
        </Text>
        <Text style={styles.bold}>Horario recomendado:</Text>
        <View style={styles.hoursContainer}>
          {breed.horas && breed.horas.length > 0 ? (
            breed.horas.map((hora, index) => (
              <View key={index} style={styles.hourItem}>
                <Text style={styles.hourText}>{hora}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.detail}>No hay horarios disponibles.</Text>
          )}
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
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
  title: {
    color: "#8396dc",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 1,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "left",
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Asegura distribución uniforme
    marginVertical: 10,
    width: "100%",
  },
  hourItem: {
    backgroundColor: "#92aae8",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flexGrow: 1, // Permite que se expandan y ocupen el espacio disponible
    alignItems: "center",
    justifyContent: "center",
  },
  hourText: {
    fontWeight: "600",
    fontSize: 21,
  },
  button: {
    backgroundColor: "#6a7dc5",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
});

export default BreedDetail;

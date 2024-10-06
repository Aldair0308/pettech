import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

// Mapa de imágenes locales
const images = {
  Chihuahua: require("./../../assets/photo-chihuahua.jpg"),
  //   OtroRaza: require("./../../assets/photo-otro.jpg"), // Agrega más razas aquí
};

interface Breed {
  _id: string;
  raza: string;
  categoria: string;
  tamaño: string;
  vida: string;
  peso: string;
  gramos: number;
  veces: number;
  porcion: number;
  horas: string[];
  info: string;
  foto?: string; // Campo opcional
}

const BreedCard: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(
          "https://alimentador-production.up.railway.app/breeds"
        );
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const renderItem = ({ item }: { item: Breed }) => (
    <View style={styles.card}>
      <Image
        source={
          images[item.raza] || require("./../../assets/photo-chihuahua.jpg")
        } // Usa un valor por defecto si no se encuentra la imagen
        style={styles.image}
      />
      <Text style={styles.title}>{item.raza}</Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Categoría:</Text> {item.categoria}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Tamaño:</Text> {item.tamaño}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Vida:</Text> {item.vida}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Peso:</Text> {item.peso}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Gramos:</Text> {item.gramos}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Veces al día:</Text> {item.veces}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Porción:</Text> {item.porcion} gramos
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Horas de comida:</Text>{" "}
        {item.horas.join(", ")}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.bold}>Información:</Text> {item.info}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={breeds}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 250, // Aumenté la altura para resaltar la foto
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default BreedCard;

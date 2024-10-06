import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  foto?: string; // Asegúrate de que 'foto' contenga el nombre correcto de la imagen
}

interface BreedCardProps {
  breeds: Breed[];
}

const images = {
  Chihuahua: require("./../../assets/photo-chihuahua.jpg"),
  // Agrega otras razas aquí
};

const BreedCard: React.FC<BreedCardProps> = ({ breeds }) => {
  const navigation = useNavigation();

  const handlePress = (breed: Breed) => {
    navigation.navigate("BreedDetail", { breed });
  };

  const renderItem = ({ item }: { item: Breed }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image
        source={
          images[item.raza] || require("./../../assets/photo-chihuahua.jpg")
        }
        style={styles.image}
      />
      <Text style={styles.title}>{item.raza}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={breeds}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
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
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default BreedCard;

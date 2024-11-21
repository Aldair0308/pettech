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
import { useTheme } from "../hooks/useTheme";

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

const BreedCard: React.FC<BreedCardProps> = ({ breeds }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handlePress = (breed: Breed) => {
    navigation.navigate("BreedDetail", { breed });
  };

  const renderItem = ({ item }: { item: Breed }) => {
    const breedImageKey = item.raza.replace(/ /g, "_");
    const imageSource =
      images[breedImageKey] || require("./../../assets/photo-chihuahua.jpg");

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: theme.colors.buttonBackground },
        ]}
        onPress={() => handlePress(item)}
      >
        <Image source={imageSource} style={styles.image} />
        <Text
          style={[
            styles.title,
            { color: theme.colors.buttonText, alignSelf: "center" },
          ]}
        >
          {item.raza}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={breeds}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: "48%",
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
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default BreedCard;

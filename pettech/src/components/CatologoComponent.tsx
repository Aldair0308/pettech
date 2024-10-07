import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import BreedCard from "./BreedCard"; // Importa el componente donde mostrarás las razas
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const CatalogoComponent = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<any[]>([]); // Cambia el tipo según tu estructura de datos
  const [numColumns, setNumColumns] = useState(2); // Estado para el número de columnas
  const [currentCategory, setCurrentCategory] = useState<string | null>(null); // Estado para la categoría actual

  const handleNavigate = async (raza: string) => {
    let url = "";

    switch (raza) {
      case "Pequeña":
        url = "http://192.168.100.169:3000/breeds/category/chico";
        setCurrentCategory("Pequeña"); // Guarda la categoría actual
        break;
      case "Mediana":
        url = "http://192.168.100.169:3000/breeds/category/mediano";
        setCurrentCategory("Mediana");
        break;
      case "Grande":
        url = "http://192.168.100.169:3000/breeds/category/grande";
        setCurrentCategory("Grande");
        break;
      default:
        return; // Si no coincide con ninguna categoría, no hace nada
    }

    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBreeds(data); // Guarda las razas en el estado
    } catch (error) {
      console.error("Error fetching breeds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBreeds([]); // Resetea las razas para volver a mostrar las categorías
    setCurrentCategory(null); // Resetea la categoría actual
  };

  const { theme } = useTheme();

  return (
    <View style={theme.styles.containerSet}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : breeds.length > 0 ? (
        <>
          {currentCategory && (
            <Text style={styles.categoryTitle}>Raza {currentCategory}</Text>
          )}
          <BreedCard breeds={breeds} numColumns={numColumns} />
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>
              Volver a elegir categoría
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Catálogo</Text>

          <FontAwesome
            name="paw"
            size={100}
            color="#6A51FF"
            style={styles.petIcon}
          />
          <TouchableOpacity
            style={styles.catalogoItem}
            onPress={() => handleNavigate("Pequeña")}
          >
            <FontAwesome
              name="paw"
              size={50}
              color="#fff"
              style={styles.pawIcon}
            />
            <Text style={styles.buttonText}>RAZA PEQUEÑA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.catalogoItem}
            onPress={() => handleNavigate("Mediana")}
          >
            <FontAwesome
              name="paw"
              size={50}
              color="#fff"
              style={styles.pawIcon}
            />
            <Text style={styles.buttonText}>RAZA MEDIANA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.catalogoItem}
            onPress={() => handleNavigate("Grande")}
          >
            <FontAwesome
              name="paw"
              size={50}
              color="#fff"
              style={styles.pawIcon}
            />
            <Text style={styles.buttonText}>RAZA GRANDE</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 0,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A51FF",
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#8396dc",
    marginBottom: 20,
  },
  petIcon: {
    marginBottom: 30,
  },
  catalogoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A51FF",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 20,
  },
  pawIcon: {
    marginRight: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#FF6A51",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    marginTop: 20,
  },
  resetButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CatalogoComponent;

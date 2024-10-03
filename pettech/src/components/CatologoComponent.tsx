import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Importa FontAwesome

const CatalogoComponent = () => {
  const navigation = useNavigation();

  const handleNavigate = (raza: string) => {
    navigation.navigate("RazaScreen", { raza });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>catalogo</Text>

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
        <FontAwesome name="paw" size={50} color="#fff" style={styles.pawIcon} />
        <Text style={styles.buttonText}>RAZA PEQUEÑA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.catalogoItem}
        onPress={() => handleNavigate("Mediana")}
      >
        <FontAwesome name="paw" size={50} color="#fff" style={styles.pawIcon} />
        <Text style={styles.buttonText}>RAZA MEDIANA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.catalogoItem}
        onPress={() => handleNavigate("Grande")}
      >
        <FontAwesome name="paw" size={50} color="#fff" style={styles.pawIcon} />
        <Text style={styles.buttonText}>RAZA GRANDE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A51FF",
    marginBottom: 30,
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
});

export default CatalogoComponent;

import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUserHook } from "./../hooks/useUserHook";
import { useTheme } from "./../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

// Define un objeto que mapee los nombres de archivo de las imágenes (sin la extensión) a las rutas de importación
const photoMap: { [key: string]: any } = {
  photo_user: require("./../../assets/photo_user.jpg"),
  photo1: require("./../../assets/photo1.jpg"),
  photo2: require("./../../assets/photo2.jpg"),
  photo3: require("./../../assets/photo3.jpg"),
  photo4: require("./../../assets/photo4.jpg"),
  photo5: require("./../../assets/photo5.jpg"),
  photo6: require("./../../assets/photo6.jpg"),
};

const ShowImageEditComponent: React.FC = () => {
  const { user, fetchUserData } = useUserHook();
  const { theme } = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    const id = setInterval(() => {
      fetchUserData();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  if (!user) {
    return <Text>Cargando...</Text>;
  }

  // Extrae el nombre base del nombre de archivo de la imagen del usuario (sin la extensión)
  const fileNameWithoutExtension = user.photo.split(".")[0];
  // Selecciona la imagen adecuada basada en el nombre base del archivo de la imagen del usuario
  const photoSource =
    photoMap[fileNameWithoutExtension] ||
    require("./../../assets/photo_user.jpg"); // Por defecto, utiliza la imagen predeterminada

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={photoSource} // Utiliza photoSource como fuente de la imagen
          style={[styles.image]} // Imagen con forma circular
        />
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("Photo")}
        >
          <FontAwesome
            name="pencil"
            size={20}
            color={theme.colors.buttonText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative", // Necesario para superponer el botón
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90, // Hace la imagen circular
    marginBottom: 20,
  },
  editButton: {
    position: "absolute",
    bottom: 10, // Posicionado como si fueran las "4:30" en un reloj
    right: 10, // Ajusta la posición para que quede sobre el borde
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Añadir sombra para resaltar el botón
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default ShowImageEditComponent;

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUserHook } from "././../hooks/useUserHook";
import { useTheme } from "./../hooks/useTheme";

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

const ShowImageHookComponent: React.FC = () => {
  const { user, fetchUserData } = useUserHook();
  const { theme } = useTheme();

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
      <Text style={[styles.name, { color: theme.colors.text }]}>
        {user.name}
      </Text>
      <Image
        source={photoSource} // Utiliza photoSource como fuente de la imagen
        style={[styles.image, { borderRadius: 100 }]} // Aplica un radio de 100 al borde de la imagen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 0,
  },
  name: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default ShowImageHookComponent;

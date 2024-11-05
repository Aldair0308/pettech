import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/useTheme";

const PhotoScreen: React.FC = () => {
  const { theme } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState("photo_user.jpg");

  const handlePhotoSelect = (photoName: string) => {
    setSelectedPhoto(photoName);
  };

  const updatePhoto = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      const response = await fetch(
        `http:192.168.100.169:3000/users/id/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photo: selectedPhoto,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Foto actualizada exitosamente");
      } else {
        Alert.alert(
          "Error al actualizar la foto. Inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error("Error al actualizar la foto del usuario:", error);
      Alert.alert("Error al actualizar la foto. Inténtalo de nuevo más tarde.");
    }
  };

  const getPhotoSource = (photoName: string) => {
    switch (photoName) {
      case "photo1.jpg":
        return require("../../assets/photo1.jpg");
      case "photo2.jpg":
        return require("../../assets/photo2.jpg");
      case "photo3.jpg":
        return require("../../assets/photo3.jpg");
      case "photo4.jpg":
        return require("../../assets/photo4.jpg");
      case "photo5.jpg":
        return require("../../assets/photo5.jpg");
      case "photo6.jpg":
        return require("../../assets/photo6.jpg");
      default:
        return require("../../assets/photo_user.jpg");
    }
  };

  return (
    <View
      style={[
        theme.styles.container,
        { paddingHorizontal: 20, paddingTop: 20 },
      ]}
    >
      <Text
        style={{ color: theme.colors.text, fontSize: 30, fontWeight: "bold" }}
      >
        Cambia tu foto
      </Text>
      <View style={styles.photosContainer}>
        {[
          "photo1.jpg",
          "photo2.jpg",
          "photo3.jpg",
          "photo4.jpg",
          "photo5.jpg",
          "photo6.jpg",
        ].map((photoName) => (
          <TouchableOpacity
            key={photoName}
            onPress={() => handlePhotoSelect(photoName)}
          >
            <View
              style={[
                styles.photoOptionContainer,
                {
                  borderColor:
                    selectedPhoto === photoName
                      ? theme.colors.primary
                      : "transparent",
                },
              ]}
            >
              <Image
                source={getPhotoSource(photoName)}
                style={styles.photoOption}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={updatePhoto}>
        <Text style={styles.updateButtonText}>Actualizar Foto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  photoOptionContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  photoOption: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  updateButton: {
    backgroundColor: "#26A69A",
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default PhotoScreen;

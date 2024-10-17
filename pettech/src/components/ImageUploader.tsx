import React, { useState } from "react";
import { View, Text, Pressable, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ImageUploader = () => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("profile_picture.jpg"); // Nombre por defecto

  const pickImageAsync = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Permission Result:", permissionResult); // Verifica el resultado del permiso

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission denied",
          "Please grant permission to access the media library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled && result.uri) {
        // Verifica que result.uri no sea undefined
        console.log("Image URI:", result.uri); // Debe ser un URI válido
        setSelectedImageUri(result.uri);
        await saveImage(result.uri, fileName); // Guardar imagen con el nombre asignado
      } else {
        Alert.alert("You did not select any image.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick an image. Please try again later.");
    }
  };

  const saveImage = async (uri: string, name: string) => {
    try {
      const newUri = FileSystem.documentDirectory + name; // Directorio local de la app
      await FileSystem.copyAsync({ from: uri, to: newUri }); // Usar copyAsync
      Alert.alert("Success", "Image saved successfully!");
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save the image. Please try again later.");
    }
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={pickImageAsync}>
        <Text style={styles.buttonText}>Choose a photo</Text>
      </Pressable>
      {selectedImageUri && (
        <View>
          <Text style={styles.imageText}>Selected Image:</Text>
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#26A69A",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  imageText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ImageUploader;

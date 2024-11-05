import { useState } from "react";

interface ImageUploaderResult {
  uploadImage: (uri: string, userId: string) => Promise<void>;
  error: Error | null;
}

const useImageUploader = (): ImageUploaderResult => {
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (uri: string, userId: string) => {
    const formData = new FormData();
    formData.append("photo", {
      uri,
      name: "photo.jpg", // Cambia el nombre según sea necesario
      type: "image/jpeg", // Cambia esto según el tipo de imagen
    });

    try {
      const response = await fetch(
        `http:192.168.100.169:3000/api/v2/users/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      console.log("Image uploaded successfully");
    } catch (error) {
      setError(error);
      console.error("Error uploading image:", error);
    }
  };

  return { uploadImage, error };
};

export default useImageUploader;

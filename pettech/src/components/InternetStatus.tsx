import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const InternetStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Suscribirse a los cambios en la conexión a Internet
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  if (isConnected === false) {
    return (
      <View style={styles.noConnectionContainer}>
        <View style={styles.iconWrapper}>
          <FontAwesome
            name="wifi"
            size={26}
            color="white"
            style={styles.icon}
          />
          <FontAwesome5
            name="slash"
            size={28}
            color="white"
            style={styles.diagonalSlash}
          />
        </View>
        <Text style={styles.noConnectionText}>No hay conexión a Internet</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  noConnectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    padding: 4,
  },
  noConnectionText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  iconWrapper: {
    position: "relative",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
  },
  diagonalSlash: {
    position: "absolute",
    transform: [{ rotate: "-75deg" }], // Rotación para alinear la línea diagonal con el ícono WiFi
  },
});

export default InternetStatus;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { FontAwesome } from "@expo/vector-icons";

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

  if (!isConnected === false) {
    return (
      <View style={styles.noConnectionContainer}>
        <FontAwesome name="wifi" size={20} color="white" style={styles.icon} />
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
    padding: 15,
  },
  noConnectionText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default InternetStatus;

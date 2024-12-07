import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useProblems from "./../hooks/useProblems";
import CardProblem from "./CardProblem"; // Importa el nuevo subcomponente

const ProblemList: React.FC = () => {
  const { problems, initialLoading, error } = useProblems();

  if (initialLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.message}>Cargando problemas...</Text>
      </View>
    );
  }

  if (error && problems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={problems}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <CardProblem
          problema={item.problema}
          estado={item.estado}
          fecha={item.fecha}
          descripcion={item.descripcion}
          responsable={item.responsable}
        />
      )}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.message}>No se encontraron problemas.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});

export default ProblemList;

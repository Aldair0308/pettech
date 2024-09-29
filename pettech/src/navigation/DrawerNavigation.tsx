// DrawerNavigator.tsx
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./../components/DrawerContent";
import BottomNavigation from "./BottomNavigation";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";
import { Text, View, StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

const CustomDrawerLabel = () => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>El Pueblo</Text>
    </View>
  );
};

const DrawerNavigator: React.FC = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("DrawerNavigator must be used within an AuthProvider");
  }

  const { authState } = context;

  if (authState.isLoggedIn) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: true, // Asegúrate de que el encabezado se muestre
            headerTitleAlign: "center", // Centra el título del encabezado
            headerStyle: {
              backgroundColor: "#cf70be", // Color de fondo del encabezado
            },
            headerTintColor: "#FFF", // Color del texto del encabezado
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22, // Ajusta el tamaño de la fuente según lo necesites
            },
            drawerStyle: {
              backgroundColor: "#f5f5f5", // Color de fondo del drawer
            },
          }}
        >
          <Drawer.Screen
            name="Pettech"
            component={BottomNavigation}
            options={{
              drawerLabel: () => <CustomDrawerLabel />,
            }}
          />
          {/* Agrega más pantallas de Drawer si es necesario */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen />;
  }
};

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50, // Ajusta la altura según sea necesario
    width: "100%", // Asegura que ocupe todo el ancho
  },
  labelText: {
    fontSize: 20, // Ajusta el tamaño de fuente
    fontWeight: "bold", // Opcional: cambia el peso de la fuente
    textAlign: "center", // Asegura que el texto esté centrado
  },
});

export default DrawerNavigator;

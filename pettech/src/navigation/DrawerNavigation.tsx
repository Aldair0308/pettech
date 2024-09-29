import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./../components/DrawerContent";
import BottomNavigation from "./BottomNavigation";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";
import { Text, View, StyleSheet } from "react-native";
import { ThemeContext } from "./../hooks/ThemeProvider"; // Importa el ThemeContext

const Drawer = createDrawerNavigator();

const CustomDrawerLabel = () => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>PETTECH</Text>
    </View>
  );
};

const DrawerNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext); // Consumiendo el contexto de tema

  if (!authContext) {
    throw new Error("DrawerNavigator must be used within an AuthProvider");
  }

  const { authState } = authContext;

  if (authState.isLoggedIn) {
    if (!themeContext) {
      throw new Error("DrawerNavigator must be used within a ThemeProvider");
    }

    const { theme } = themeContext; // Obtiene el tema actual

    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: theme.colors.primary, // Color de fondo del encabezado
            },
            headerTintColor: theme.colors.text, // Color del texto del encabezado
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            drawerStyle: {
              backgroundColor: theme.colors.background, // Color de fondo del drawer
            },
            drawerLabelStyle: {
              color: theme.colors.text, // Color del texto del drawer
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
    height: 50,
    width: "100%",
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DrawerNavigator;

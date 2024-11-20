import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"; // Importa Stack Navigator
import DrawerContent from "./../components/DrawerContent";
import BottomNavigation from "./BottomNavigation";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "./../hooks/ThemeProvider";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Crea un Stack Navigator

const DrawerNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);

  if (!authContext) {
    throw new Error("DrawerNavigator must be used within an AuthProvider");
  }

  const { authState } = authContext;

  if (!themeContext) {
    throw new Error("DrawerNavigator must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState.isLoggedIn ? (
        <Stack.Screen name="Drawer" component={DrawerComponent} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const DrawerComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerLabelStyle: {
          color: theme.colors.text,
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
  );
};

export default DrawerNavigator;

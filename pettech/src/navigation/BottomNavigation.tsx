import React, { useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "../hooks/ThemeProvider"; // Ajusta la ruta
import HomeScreen from "../screens/HomeScreen";
import CamScreen from "../screens/CamScreen";
import PetScreen from "../screens/PetScreen";
import ChartScreen from "../screens/ChartScreen";

const BottomTab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // Manejo de error, si no hay contexto
  }

  const { theme } = themeContext;

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.text}
      barStyle={{ backgroundColor: theme.colors.background }}
    >
      <BottomTab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={36} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Camara"
        component={CamScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="camera" color={color} size={36} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Mascota"
        component={PetScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="paw" color={color} size={36} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Alimento"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="prescription-bottle" color={color} size={36} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;

import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import HomeScreen from "../screens/HomeScreen";
import CamScreen from "../screens/CamScreen";
import PetScreen from "../screens/PetScreen";
import ChartScreen from "../screens/ChartScreen";
import useNotification from "../hooks/useNotifications";

const BottomTab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  const { theme } = useTheme();

  const [showConfigTab, setShowConfigTab] = useState(false);
  const [showCocinaTab, setShowCocinaTab] = useState(false);
  const { expoPushToken } = useNotification(); // Usamos el hook para gestionar las notificaciones
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (expoPushToken) {
      console.log("Token de Push:", expoPushToken); // Imprime el token si se obtiene correctamente
      setToken(expoPushToken); // Guardamos el token para usarlo en el botón
    }
  }, [expoPushToken]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={theme.colors.text}
      inactiveColor={theme.colors.text}
      barStyle={{ backgroundColor: theme.colors.background }}
    >
      <BottomTab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Camara"
        component={CamScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="camera" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Mascota"
        component={PetScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="paw" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Alimento"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="prescription-bottle" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;

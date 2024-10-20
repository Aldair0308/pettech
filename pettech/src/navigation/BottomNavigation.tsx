import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import HomeScreen from "../screens/HomeScreen";
import CamScreen from "../screens/CamScreen";
import PetScreen from "../screens/PetScreen";
import ChartScreen from "../screens/ChartScreen";

const BottomTab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  const { theme } = useTheme();

  const [showConfigTab, setShowConfigTab] = useState(false);
  const [showCocinaTab, setShowCocinaTab] = useState(false);

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

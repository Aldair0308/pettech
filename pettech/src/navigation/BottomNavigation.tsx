import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import HomeScreen from "../screens/HomeScreen";

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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="table" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;

// DrawerNavigator.tsx
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./../components/DrawerContent";
import BottomNavigation from "./BottomNavigation";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

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
        >
          <Drawer.Screen name="El Pueblo" component={BottomNavigation} />
          {/* Agrega más pantallas de Drawer si es necesario */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen />;
  }
};

export default DrawerNavigator;

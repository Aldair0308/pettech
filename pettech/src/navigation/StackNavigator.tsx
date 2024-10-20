import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./../screens/WelcomeScreen";
import RegisterScreen from "./../screens/RegisterScreen";
import RegistroScreen from "./../screens/RegistroScreen";
import LoginScreen from "./../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";
import DrawerNavigator from "./DrawerNavigation";
import CatalogoComponent from "../components/CatologoComponent";
import BreedDetail from "../components/BreedDetail";
import CatalogoScreen from "../screens/CatalogoScreen";
import PerfilScreen from "../screens/PerfilScreen";
import TemaScreen from "../screens/TemaScreen";

const Stack = createStackNavigator();

const MainStackNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="App" component={DrawerNavigator} />
        <Stack.Screen name="Catalogo" component={CatalogoComponent} />
        <Stack.Screen name="CatalogoScreen" component={CatalogoScreen} />
        <Stack.Screen name="BreedDetail" component={BreedDetail} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Tema" component={TemaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;

import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "./AuthReducer"; // Asegúrate de que la ruta sea correcta
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage

// Define la interfaz Input que se utiliza en AuthState
interface Input {
  // Define las propiedades necesarias para Input
}

export interface LoginResponse {
  _id: string; // Asegúrate de que _id sea un string
  email: string;
  photo: string;
  rol: string;
  name: string;
}

export interface AuthState extends LoginResponse {
  isLoggedIn: boolean;
}

export const AuthInitialState: AuthState = {
  isLoggedIn: false,
  _id: "", // Inicializa el id del usuario como una cadena vacía
  email: "",
  photo: "",
  rol: "",
  name: "", // Inicializa el nombre del usuario como una cadena vacía
};

type AuthAction =
  | { type: "signIn"; payload: LoginResponse }
  | { type: "logout" }
  | { type: "changeFavImage"; payload: string }
  | { type: "changeUserName"; payload: string }
  | { type: "formData"; payload: Input[] };

export interface AuthContextProps {
  authState: AuthState;
  signIn: (response: { accessToken: string; user: LoginResponse }) => void;
  logout: () => void;
  changeUserName: (userName: string) => void;
  changeFavImage: (sourceImage: string) => void;
  formData: (data: Input[]) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  const signIn = (response: { accessToken: string; user: LoginResponse }) => {
    const user = response.user; // Extraer el usuario de la respuesta

    // Comprobación de que el ID es correcto
    console.log("User ID:", user._id);
    if (user._id.length < 24) {
      console.error("El ID del usuario es inválido:", user._id);
      return;
    }

    dispatch({ type: "signIn", payload: user });

    // Guarda el id y otros datos del usuario en AsyncStorage al iniciar sesión
    AsyncStorage.setItem("userId", user._id)
      .then(() =>
        console.log("Id del usuario guardado en AsyncStorage:", user._id)
      )
      .catch((error) =>
        console.error(
          "Error al guardar el id del usuario en AsyncStorage:",
          error
        )
      );

    AsyncStorage.setItem("userPhoto", user.photo)
      .then(() =>
        console.log("Foto del usuario guardada en AsyncStorage:", user.photo)
      )
      .catch((error) =>
        console.error(
          "Error al guardar la foto del usuario en AsyncStorage:",
          error
        )
      );

    AsyncStorage.setItem("userRol", user.rol)
      .then(() =>
        console.log("Rol del usuario guardado en AsyncStorage:", user.rol)
      )
      .catch((error) =>
        console.error(
          "Error al guardar el rol del usuario en AsyncStorage:",
          error
        )
      );

    AsyncStorage.setItem("userName", user.name)
      .then(() =>
        console.log("Nombre del usuario guardado en AsyncStorage:", user.name)
      )
      .catch((error) =>
        console.error(
          "Error al guardar el nombre del usuario en AsyncStorage:",
          error
        )
      );
  };

  const logout = () => {
    dispatch({ type: "logout" });

    // Elimina el id y otros datos del usuario de AsyncStorage al cerrar sesión
    AsyncStorage.removeItem("userId")
      .then(() =>
        console.log("Id del usuario eliminado de AsyncStorage al cerrar sesión")
      )
      .catch((error) =>
        console.error(
          "Error al eliminar el id del usuario de AsyncStorage:",
          error
        )
      );

    AsyncStorage.removeItem("userPhoto")
      .then(() =>
        console.log(
          "Foto del usuario eliminada de AsyncStorage al cerrar sesión"
        )
      )
      .catch((error) =>
        console.error(
          "Error al eliminar la foto del usuario de AsyncStorage:",
          error
        )
      );

    AsyncStorage.removeItem("userRol")
      .then(() =>
        console.log(
          "Rol del usuario eliminado de AsyncStorage al cerrar sesión"
        )
      )
      .catch((error) =>
        console.error(
          "Error al eliminar el rol del usuario de AsyncStorage:",
          error
        )
      );

    AsyncStorage.removeItem("userName")
      .then(() =>
        console.log(
          "Nombre del usuario eliminado de AsyncStorage al cerrar sesión"
        )
      )
      .catch((error) =>
        console.error(
          "Error al eliminar el nombre del usuario de AsyncStorage:",
          error
        )
      );
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

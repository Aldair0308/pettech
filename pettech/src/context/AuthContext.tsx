import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { authReducer } from "././AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage

// Define la interfaz Input que se utiliza en AuthState
interface Input {
  // Define las propiedades necesarias para Input
}

export interface LoginResponse {
  id: number;
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
  id: 0, // Inicializa el id del usuario como 0
  email: "",
  photo: "",
  rol: "",
  name: "", // Inicializa la foto del usuario como una cadena vacía
};

type AuthAction =
  | { type: "signIn"; payload: LoginResponse }
  | { type: "logout" }
  | { type: "changeFavImage"; payload: string }
  | { type: "changeUserName"; payload: string }
  | { type: "formData"; payload: Input[] };

export interface AuthContextProps {
  authState: AuthState;
  signIn: (response: LoginResponse) => void;
  logout: () => void;
  changeUserName: (userName: string) => void;
  changeFavImage: (sourceImage: string) => void;
  formData: (data: Input[]) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  const signIn = (response: LoginResponse) => {
    dispatch({ type: "signIn", payload: response });
    // Guarda el id y la foto del usuario en AsyncStorage al iniciar sesión
    AsyncStorage.setItem("userId", response.id.toString())
      .then(() =>
        console.log("Id del usuario guardado en AsyncStorage:", response.id)
      )
      .catch((error) =>
        console.error(
          "Error al guardar el id del usuario en AsyncStorage:",
          error
        )
      );
    AsyncStorage.setItem("userPhoto", response.photo)
      .then(() =>
        console.log(
          "Foto del usuario guardada en AsyncStorage:",
          response.photo
        )
      )
      .catch((error) =>
        console.error(
          "Error al guardar la foto del usuario en AsyncStorage:",
          error
        )
      );
    AsyncStorage.setItem("userRol", response.rol)
      .then(() =>
        console.log("Rol del usuario guardado en AsyncStorage:", response.rol)
      )
      .catch((error) =>
        console.error(
          "Error al guardar la foto del usuario en AsyncStorage:",
          error
        )
      );
    AsyncStorage.setItem("userName", response.name.toString())
      .then(() =>
        console.log(
          "Nombre del usuario guardado en AsyncStorage:",
          response.name
        )
      )
      .catch((error) =>
        console.error(
          "Error al guardar la foto del usuario en AsyncStorage:",
          error
        )
      );
  };

  const logout = () => {
    dispatch({ type: "logout" });
    // Elimina el id y la foto del usuario de AsyncStorage al cerrar sesión
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
          "Error al eliminar la Rol del usuario de AsyncStorage:",
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
          "Error al eliminar la Nombre del usuario de AsyncStorage:",
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

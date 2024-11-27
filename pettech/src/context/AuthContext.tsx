import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer } from "./AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define la interfaz Input que se utiliza en AuthState
interface Input {
  // Define las propiedades necesarias para Input
}

export interface LoginResponse {
  _id: string;
  email: string;
  photo: string;
  rol: string;
  name: string;
  code: string;
}

export interface AuthState extends LoginResponse {
  isLoggedIn: boolean;
}

export const AuthInitialState: AuthState = {
  isLoggedIn: false,
  _id: "",
  email: "",
  photo: "",
  rol: "",
  name: "",
  code: "",
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

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const userPhoto = await AsyncStorage.getItem("userPhoto");
        const userRol = await AsyncStorage.getItem("userRol");
        const userName = await AsyncStorage.getItem("userName");
        const userCode = await AsyncStorage.getItem("userCode");

        if (userId) {
          dispatch({
            type: "signIn",
            payload: {
              _id: userId,
              photo: userPhoto || "",
              rol: userRol || "",
              name: userName || "",
              email: "",
              code: userCode || "",
            },
          });
        }
      } catch (error) {
        console.error(
          "Error al cargar los datos del usuario de AsyncStorage:",
          error
        );
      }
    };

    loadUserData();
  }, []);

  const signIn = (response: { accessToken: string; user: LoginResponse }) => {
    const user = response.user;

    console.log("User ID:", user._id);
    if (user._id.length < 24) {
      console.error("El ID del usuario es inválido:", user._id);
      return;
    }

    dispatch({ type: "signIn", payload: user });

    // Guarda los datos del usuario en AsyncStorage
    AsyncStorage.setItem("userId", user._id).catch((error) =>
      console.error("Error al guardar el id:", error)
    );
    AsyncStorage.setItem("userPhoto", user.photo).catch((error) =>
      console.error("Error al guardar la foto:", error)
    );
    AsyncStorage.setItem("userRol", user.rol).catch((error) =>
      console.error("Error al guardar el rol:", error)
    );
    AsyncStorage.setItem("userName", user.name).catch((error) =>
      console.error("Error al guardar el nombre:", error)
    );
    AsyncStorage.setItem("dispenserCode", user.code).catch((error) =>
      console.error("Error al guardar el code:", error)
    );
  };

  const logout = () => {
    dispatch({ type: "logout" });

    // Elimina los datos del usuario de AsyncStorage
    AsyncStorage.removeItem("userId").catch((error) =>
      console.error("Error al eliminar el id:", error)
    );
    AsyncStorage.removeItem("userPhoto").catch((error) =>
      console.error("Error al eliminar la foto:", error)
    );
    AsyncStorage.removeItem("userRol").catch((error) =>
      console.error("Error al eliminar el rol:", error)
    );
    AsyncStorage.removeItem("userName").catch((error) =>
      console.error("Error al eliminar el nombre:", error)
    );
    AsyncStorage.removeItem("dispenserCode").catch((error) =>
      console.error("Error al dispenser code:", error)
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

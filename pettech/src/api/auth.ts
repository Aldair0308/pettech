// api/auth.ts

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  id: number;
  email: string;
  rol: string;
  photo: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://192.168.100.169:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Proporcionar más información sobre el error
      throw new Error(
        `Error al iniciar sesión: ${errorData.message || "Error desconocido"}`
      );
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw new Error(`Error al realizar la solicitud: ${error.message}`);
  }
};

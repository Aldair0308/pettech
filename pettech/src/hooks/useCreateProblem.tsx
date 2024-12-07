import { useState } from "react";
import { createProblem } from "./../api/problemService"; // Importa el servicio para crear problemas

// Define el tipo de un problema
interface Problem {
  problema: string;
  estado: string;
  descripcion?: string;
  categoria: string;
  responsable: string;
}

// Define el retorno del hook
interface UseCreateProblemReturn {
  createProblemHandler: (problem: Problem) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useCreateProblem = (): UseCreateProblemReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProblemHandler = async (problem: Problem) => {
    try {
      setLoading(true); // Inicia la carga
      setError(null); // Resetea el estado de error
      await createProblem(problem); // Llama al servicio para crear el problema
    } catch (err) {
      setError((err as Error).message); // Captura y almacena cualquier error
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  return { createProblemHandler, loading, error };
};

export default useCreateProblem;

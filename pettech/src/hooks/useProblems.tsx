import { useState, useEffect, useCallback } from "react";
import { getAllProblems } from "./../api/problemService"; // Asegúrate de que esta ruta sea correcta

// Define el tipo de un problema
interface Problem {
  _id: string;
  problema: string;
  estado: string;
  descripcion?: string;
  categoria: string;
  fecha: string;
  responsable: string;
}

// Define el retorno del hook
interface UseProblemsReturn {
  problems: Problem[];
  initialLoading: boolean; // Carga inicial
  error: string | null;
}

const useProblems = (): UseProblemsReturn => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true); // Carga inicial
  const [error, setError] = useState<string | null>(null);

  const fetchProblems = useCallback(async () => {
    try {
      const data = await getAllProblems();
      setProblems(data); // Actualiza los problemas en el estado
      setError(null); // Limpia cualquier error previo
    } catch (err) {
      setError((err as Error).message); // Captura cualquier error
    } finally {
      setInitialLoading(false); // Finaliza la carga inicial
    }
  }, []);

  useEffect(() => {
    // Carga inicial
    fetchProblems();

    // Configuración del intervalo para recargar cada 5 segundos
    const interval = setInterval(fetchProblems, 5000);

    // Limpieza del intervalo al desmontar
    return () => clearInterval(interval);
  }, [fetchProblems]);

  return { problems, initialLoading, error };
};

export default useProblems;

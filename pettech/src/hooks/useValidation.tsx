import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = ({ name, email, password, confirmPassword }) => {
    let validationErrors = {};

    if (!name) {
      validationErrors.name = "El nombre no puede estar vacío.";
    }

    if (!email || !validateEmail(email)) {
      validationErrors.email = "Por favor, ingresa un correo válido.";
    }

    if (!password || password.length < 6) {
      validationErrors.password =
        "La contraseña debe tener al menos 6 caracteres.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return {
    errors,
    validateForm,
  };
};

export default useValidation;

import React from 'react';

// Utilitaires de validation pour les formulaires
export const validators = {
  // Validation email
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'L\'email est requis';
    if (!emailRegex.test(email)) return 'Format d\'email invalide';
    return null;
  },

  // Validation mot de passe
  password: (password) => {
    if (!password) return 'Le mot de passe est requis';
    if (password.length < 5) return 'Le mot de passe doit contenir au moins 5 caractères';
    return null;
  },

  // Validation confirmation mot de passe
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return 'La confirmation du mot de passe est requise';
    if (password !== confirmPassword) return 'Les mots de passe ne correspondent pas';
    return null;
  },

  // Validation nom/titre
  required: (value, fieldName = 'Ce champ') => {
    if (!value || value.trim() === '') return `${fieldName} est requis`;
    return null;
  },

  // Validation longueur minimale
  minLength: (value, minLength, fieldName = 'Ce champ') => {
    if (!value) return `${fieldName} est requis`;
    if (value.length < minLength) return `${fieldName} doit contenir au moins ${minLength} caractères`;
    return null;
  },

  // Validation nombre
  number: (value, fieldName = 'Ce champ') => {
    if (!value) return `${fieldName} est requis`;
    if (isNaN(value)) return `${fieldName} doit être un nombre valide`;
    return null;
  },

  // Validation année
  year: (year) => {
    if (!year) return 'L\'année est requise';
    const currentYear = new Date().getFullYear();
    if (year < 1000 || year > currentYear) return `L'année doit être entre 1000 et ${currentYear}`;
    return null;
  },

  // Validation prix
  price: (price) => {
    if (!price) return 'Le prix est requis';
    if (isNaN(price) || price < 0) return 'Le prix doit être un nombre positif';
    return null;
  }
};

// Hook pour la validation de formulaire
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return null;
    
    if (typeof rule === 'function') {
      return rule(value);
    }
    
    if (Array.isArray(rule)) {
      for (const validator of rule) {
        const error = validator(value);
        if (error) return error;
      }
    }
    
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel si le champ a été touché
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
};

// Composant pour afficher les erreurs de champ
export const FieldError = ({ error, touched }) => {
  if (!error || !touched) return null;
  
  return (
    <p className="mt-1 text-sm text-red-600">
      {error}
    </p>
  );
};

export default validators;

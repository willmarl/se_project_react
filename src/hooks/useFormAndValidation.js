import { useState, useCallback } from "react";
// example :
// const {
// values,
// handleChange,
// errors,
// isValid,
// setValues,
// setErrors,
// resetForm} = useFormAndValidation()

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const setCustomError = (key, errorName) => {
    setErrors((prev) => ({
      ...prev,
      [key]: `(${errorName})`,
    }));
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors,
    setCustomError,
  };
}

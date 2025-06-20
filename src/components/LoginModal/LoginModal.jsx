import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
  });
  const [validity, setValidity] = useState(false);

  useEffect(() => {
    if (
      Object.values(inputError).every((i) => i === "") &&
      data.email &&
      data.password
    ) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [inputError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  const handleInputChange = (e, inputId) => {
    if (e.target.validity.valid) {
      setInputError({ ...inputError, [inputId]: "" });
    } else {
      setInputError({
        ...inputError,
        [inputId]: `(${e.target.validationMessage})`,
      });
    }
    setData({ ...data, [inputId]: e.target.value });
  };

  return (
    <ModalWithForm
      buttonText="Next"
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={validity}
      extraButton={true}
      extraButtonText="or Register"
    >
      <label
        htmlFor="email"
        className={`modal__label ${inputError.email ? "modal__error" : ""}`}
      >
        Email* {`${inputError.email}`}
        <input
          type="email"
          id="email"
          className={`modal__input ${inputError.email ? "modal__error" : ""}`}
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleInputChange(e, "email")}
          required={true}
        />
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${inputError.password ? "modal__error" : ""}`}
      >
        Password* {`${inputError.password}`}
        <input
          type="password"
          id="password"
          className={`modal__input ${
            inputError.password ? "modal__error" : ""
          }`}
          placeholder="Password"
          value={data.password}
          onChange={(e) => handleInputChange(e, "password")}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;

import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, onRegisterModalSubmit }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
    onRegisterModalSubmit([data])
      .then(() => {
        console.log("Successfully registered");
      })
      .catch(console.error);
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
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={validity}
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
          minLength={2}
          onChange={(e) => handleInputChange(e, "password")}
          required={true}
        />
      </label>
      <label
        htmlFor="name"
        className={`modal__label ${inputError.name ? "modal__error" : ""}`}
      >
        Name {`${inputError.name}`}
        <input
          type="text"
          id="name"
          className={`modal__input ${inputError.name ? "modal__error" : ""}`}
          placeholder="Name"
          value={data.name}
          minLength={2}
          onChange={(e) => handleInputChange(e, "name")}
        />
      </label>
      <label
        htmlFor="avatar"
        className={`modal__label ${inputError.avatar ? "modal__error" : ""}`}
      >
        Avatar URL {`${inputError.avatar}`}
        <input
          type="URL"
          id="avatar"
          className={`modal__input ${inputError.avatar ? "modal__error" : ""}`}
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={(e) => handleInputChange(e, "avatar")}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

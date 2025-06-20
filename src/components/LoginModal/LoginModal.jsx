import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";

function LoginModal({ onClose, isOpen, handleLogin }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

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
      Object.values(inputError).every(
        (i) => i === "" || i === "(Incorrect email or password)"
      ) &&
      data.email &&
      data.password
    ) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [inputError]);

  useEffect(() => {
    if (isLoggedIn) {
      setData({ email: "", password: "" });
      setInputError({ email: "", password: "" });
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data).catch((err) => {
      if (err.includes("401")) {
        setInputError({
          ...inputError,
          email: "(Incorrect email or password)",
          password: "",
        });
      } else {
        console.log(err);
      }
    });
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

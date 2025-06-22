import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({ onClose, isOpen, handleLogin, isLoading }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm, setErrors } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen && !isLoggedIn) {
      resetForm();
    }
  }, [isOpen, isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values).catch((err) => {
      if (err.includes("401")) {
        setErrors((prev) => ({
          ...prev,
          email: "(Incorrect email or password)",
        }));
      } else {
        console.error(err);
      }
    });
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Logging in..." : "Next"}
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={isValid || isLoading}
      extraButton={true}
      extraButtonText="or Register"
    >
      <label
        htmlFor="email"
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
      >
        Email* {errors.email && `${errors.email}`}
        <input
          type="email"
          id="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__error" : ""}`}
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required={true}
        />
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${errors.password ? "modal__error" : ""}`}
      >
        Password* {errors.password && `${errors.password}`}
        <input
          type="password"
          id="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__error" : ""}`}
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;

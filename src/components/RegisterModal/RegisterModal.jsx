import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import CurrentUserContext from "../../context/CurrentUserContext";

function RegisterModal({ onClose, isOpen, onRegisterSubmit, isLoading }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen && !isLoggedIn) {
      resetForm();
    }
  }, [isOpen, isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(values)
      .then(() => {
        resetForm();
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Registering..." : "Next"}
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={isValid || isLoading}
    >
      <label className={`modal__label ${errors.email ? "modal__error" : ""}`}>
        Email* {errors.email && `${errors.email}`}
        <input
          type="email"
          id="registerEmail"
          name="email"
          className={`modal__input ${errors.email ? "modal__error" : ""}`}
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required={true}
        />
      </label>
      <label
        className={`modal__label ${errors.password ? "modal__error" : ""}`}
      >
        Password* {errors.password && `${errors.password}`}
        <input
          type="password"
          id="registerPassword"
          name="password"
          className={`modal__input ${errors.password ? "modal__error" : ""}`}
          placeholder="Password"
          value={values.password || ""}
          minLength={2}
          onChange={handleChange}
          required={true}
        />
      </label>
      <label className={`modal__label ${errors.name ? "modal__error" : ""}`}>
        Name* {errors.name && `${errors.name}`}
        <input
          type="text"
          id="registerName"
          name="name"
          className={`modal__input ${errors.name ? "modal__error" : ""}`}
          placeholder="Name"
          value={values.name || ""}
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          required={true}
        />
      </label>
      <label className={`modal__label ${errors.avatar ? "modal__error" : ""}`}>
        Avatar URL* {errors.avatar && `${errors.avatar}`}
        <input
          type="URL"
          id="registerAvatar"
          name="avatar"
          className={`modal__input ${errors.avatar ? "modal__error" : ""}`}
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

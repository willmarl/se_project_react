import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({
  onClose,
  isOpen,
  handleLogin,
  isLoading,
  setActiveModal,
}) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm, setCustomError } =
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
        setCustomError("email", "Incorrect email or password");
      } else {
        console.error(err);
        setCustomError("email", err);
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
      extrabuttonOnClick={() => setActiveModal("register")}
    >
      <label className={`modal__label ${errors.email ? "modal__error" : ""}`}>
        Email* {errors.email && `${errors.email}`}
        <input
          type="email"
          id="loginEmail"
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
          id="loginPassword"
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

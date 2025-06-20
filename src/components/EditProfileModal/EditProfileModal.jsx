import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, onEditProfileSubmit }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });
  const [inputError, setInputError] = useState({
    name: "",
    avatar: "",
  });
  const [validity, setValidity] = useState(false);

  // fills input with current user data when modal is first opened and when closing without saving
  useEffect(() => {
    resetInputs();
    checkValidity();
  }, [currentUser]);
  useEffect(() => {
    if (!isOpen) {
      resetInputs();
    }
  }, [isOpen]);

  useEffect(() => {
    checkValidity();
  }, [inputError]);

  const checkValidity = () => {
    if (
      Object.values(inputError).every((i) => i === "") &&
      data.name &&
      data.avatar
    ) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit(data);
    setCurrentUser({ name: data.name, avatar: data.avatar });
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

  const resetInputs = () => {
    setData({ name: currentUser.name, avatar: currentUser.avatar });
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={validity}
    >
      <label
        htmlFor="name"
        className={`modal__label ${inputError.name ? "modal__error" : ""}`}
      >
        Name* {`${inputError.name}`}
        <input
          type="text"
          id="name"
          className={`modal__input ${inputError.name ? "modal__error" : ""}`}
          placeholder="name"
          value={data.name}
          onChange={(e) => handleInputChange(e, "name")}
          required={true}
        />
      </label>
      <label
        htmlFor="avatar"
        className={`modal__label ${inputError.avatar ? "modal__error" : ""}`}
      >
        Avatar {`${inputError.avatar}`}
        <input
          type="url"
          id="avatar"
          className={`modal__input ${inputError.avatar ? "modal__error" : ""}`}
          placeholder="avatar"
          value={data.avatar}
          onChange={(e) => handleInputChange(e, "avatar")}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

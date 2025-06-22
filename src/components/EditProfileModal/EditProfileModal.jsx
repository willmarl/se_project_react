import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({ onClose, isOpen, onEditProfileSubmit, isLoading }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setErrors } =
    useFormAndValidation();

  useEffect(() => {
    values.name = currentUser.name;
    values.avatar = currentUser.avatar;
    setErrors((prev) => ({ ...prev, name: "", avatar: "" }));
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit(values);
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Save changes"}
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={isValid || isLoading}
    >
      <label className={`modal__label ${errors.name ? "modal__error" : ""}`}>
        Name* {errors.name && `${errors.name}`}
        <input
          type="text"
          id="name"
          name="name"
          className={`modal__input ${errors.name ? "modal__error" : ""}`}
          placeholder="name"
          value={values.name || ""}
          onChange={handleChange}
          required={true}
          minLength={2}
        />
      </label>
      <label className={`modal__label ${errors.avatar ? "modal__error" : ""}`}>
        Avatar {errors.avatar && `${errors.avatar}`}
        <input
          type="url"
          id="avatar"
          name="avatar"
          className={`modal__input ${errors.avatar ? "modal__error" : ""}`}
          placeholder="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required={true}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

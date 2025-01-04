import React from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useContext } from "react";

function EditProfileModal({ onClose, isOpen, handleSubmit }) {
  if (!isOpen) {
    return null;
  }
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <ModalWithForm
      title="Change profile Data"
      buttonText="save changes"
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="name"
          className="modal__input"
          id="name"
          placeholder="name"
          name="name"
          value={name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

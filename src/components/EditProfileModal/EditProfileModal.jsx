import React from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, handleSubmit }) {
  if (!isOpen) {
    return null;
  }
  const { currentUser } = userContext(CurrentUserContext);
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
          name="email"
          value={data.name}
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
          value={data.avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

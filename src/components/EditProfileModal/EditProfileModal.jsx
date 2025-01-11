import React, { useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useContext, useState } from "react";

function EditProfileModal({ onClose, isOpen, handleSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    // console.log(e.target.value);
    setAvatar(e.target.value);
  };
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
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
          onChange={handleNameChange}
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
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

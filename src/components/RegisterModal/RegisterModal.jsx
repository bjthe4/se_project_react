import { useState } from "react";
import "./RegisterModal.css";
import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, handleSubmit }) {
  if (!isOpen) {
    return null;
  }

  const [data, setData] = useState("");

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password *
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={data.name}
        />
      </label>
      <label htmlFor="avatarUrl" classNam="modal__label">
        Avatar URL *
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={data.avatarUrl}
        />
      </label>
      <label className="register__button-container">
        {/* <button
          type="submit"
          className="register__link"
          onSubmit={handleSubmit}
        >
          Sign up
        </button> */}
        <Link to="register" className="register__login-link">
          Next
        </Link>
      </label>
      <label className="register__signIn">
        <Link to="login" className="register__login-link">
          or Log In
        </Link>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

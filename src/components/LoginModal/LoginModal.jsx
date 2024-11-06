import { useState } from "react";
import "./LoginModal.css";
import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, onSubmit }) {
  if (!isOpen) {
    return null;
  }
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onchange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password *
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Email"
          name="email"
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;

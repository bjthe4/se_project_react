import { useState } from "react";
import "./RegisterModal.css";
// import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import { Button } from "bootstrap";

function RegisterModal({ onClose, isOpen, onSubmit, handleShowLogin }) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setpassword] = useState("");
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmitRegisteration = (e) => {
    console.log("asf");
    e.preventDefault();
    onSubmit({ email, password, name, avatarUrl });
  };

  // const [data, setData] = useState("");

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmitRegisteration}
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
          onChange={handleEmailChange}
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
          value={password}
          onChange={handlePasswordChange}
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
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL *
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
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
        {/* <Link to="register" className="register__login-link">
          Next
        </Link> */}
      </label>
      <label className="register__signIn">
        {/* <Link to="login" className="register__login-link">
          or Log In
        </Link> */}
        <button type="submit" className="register__signup">
          Sign up
        </button>
        <button
          className="register__login-link"
          type="button"
          onClick={handleShowLogin}
        >
          or Log In
        </button>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

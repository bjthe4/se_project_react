import React from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";

function AddItemModal({ closeActiveModal, OnAddItem, isOpen, activeModal }) {
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={closeActiveModal}
      isOpened={activeModal === "add-garment"}
      isOpen={isOpen}
      onSubmit={OnAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image {""}
        <input
          type="text"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type </legend>
        <label htmlFor="hot" className="modal__label modal__label__type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label__type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label__type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;

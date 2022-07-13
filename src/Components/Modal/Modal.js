import React from "react";
import ReactDom from "react-dom";
import "./Modal.scss";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const Modal = ({ open, number, title, artist, length, closeModal }) => {
  if (!open) return null;

  return (
    <div style={OVERLAY_STYLES}>
      <div className="modal" style={MODAL_STYLES}>
        <button className="button" onClick={closeModal}>
          X
        </button>
        <div className="nameContainer">
          <span>Artist:</span>
          <span>{artist.name}</span>
        </div>

        <div className="trackContainer">
          <span>Song:</span>
          <span>{title}</span>
        </div>

        <div className="durationContainer">
          <span>Length:</span>
          <span>{length}</span>
        </div>

        <div className="numberContainer">
          <span>Position:</span>
          <span>{number}</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;

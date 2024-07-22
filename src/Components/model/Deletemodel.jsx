import React from "react";
import "../model/Deletemodel.css"; 

export default function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <>
      {isOpen && (
        <div  className="delete-modal-overlay"onClick={onClose}>
          <div className="delete-modal" >
            <h2>Are you sure you want to delete?</h2>
            <div className="button-container">
              <button className="delete-button" onClick={onDelete}>
                Delete
              </button>
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

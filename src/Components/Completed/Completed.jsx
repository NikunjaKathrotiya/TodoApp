import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../model/Deletemodel";
import "./Completed.css";

export default function Completed(props) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    props.deleteHandler();
    closeModal();
  };

  return (
    <>
      <div className="task-complete">
        <div className="task-details">
          <p>
            <strong>Task Id:</strong> {props.id}
          </p>
          
          <p>
            <strong>Task Name:</strong>
            {props.taskname}
          </p>

          <p>
            <strong>Start Time:</strong>
            {props.starttime}
          </p>

          <p>
            <strong>End Time:</strong> {props.endtime}
          </p>

          <p>
            <strong>Duration:</strong>
            {props.duration}
          </p>

          <p>
            <strong>Category:</strong>
            {props.taskcategory}
          </p>

          <p>
            <strong>assignedto:</strong>
            {props.assigned}
          </p>

          <p>
            <strong>Description:</strong>
            {props.taskdes}
          </p>

          <p>
            <strong>Section:</strong>
            {props.tasksection}
          </p>

          <div className="icons">
            <div>
              <MdDelete
                className="delete"
                onClick={props.deleteHandler}
                onClick={openModal}
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={showModal}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </>
  );
}

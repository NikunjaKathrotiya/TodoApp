import "../TODO/ToDo.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import DeleteModal from "../model/Deletemodel";
import { FaEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
export default function ToDo(props) {
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
      <div className="task-todo">
        <div className="task-details">
          <p>
            <strong>Task Id:</strong> {props.id}
          </p>

          <p>
            <strong className="ptag">Task Name:</strong> {props.taskname}
          </p>

          <p>
            <strong className="ptag">Start Time:</strong> {props.starttime}
          </p>

          <p>
            <strong className="ptag">End Time:</strong> {props.endtime}
          </p>

          <p>
            <strong className="ptag">Duration:</strong> {props.duration}
          </p>

          <p>
            <strong className="ptag">Category:</strong> {props.taskcategory}
          </p>

          <p>
            <strong className="ptag">Assigned To:</strong> {props.assigned}
          </p>
          <p>
            <strong className="ptag">Description:</strong> {props.taskdes}
          </p>
          <p>
            <strong className="ptag">Section:</strong> {props.tasksection}
          </p>

          <div className="icons">
            <div>
              <MdDelete
                className="delete"
                onClick={props.deleteHandler}
                onClick={openModal}
              />
            </div>
            <div>
              <FaEdit className="edit" onClick={props.editHandler} />
            </div>
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

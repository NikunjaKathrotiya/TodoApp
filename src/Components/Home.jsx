import React, { useState, useEffect } from "react";
import TodoFrom from "./TodoForm/TodoFrom";
import "../App.css";
import ToDo from "./TODO/ToDo";
import InProgress from "./InProgress/InProgress";
import Completed from "./Completed/Completed";
import { v4 as uuid } from "uuid";

import Todotitle from "./All-titles/Todotitle";
import Inprogrogresstitle from "./All-titles/Inprogrogresstitle";
import Completedtitle from "./All-titles/Completedtitle";
import DeleteModal from "../Components/model/Deletemodel";
import { toast } from "react-toastify";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage: `, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage: `, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          const updatedValue = JSON.parse(event.newValue);
          setStoredValue(updatedValue);
        } catch (error) {
          console.error(`Error parsing updated ${key} from storage: `, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState([]);
  const [formData, setFormData] = useLocalStorage("formData", []);

  useEffect(() => {
    // Update formData state when localStorage changes..
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, [setFormData]);

  const editHandler = (id) => {
    setIsEdit(true);
    const editData = formData.filter((item) => id === item.id);
    setEditTodo(editData);
  };

  const deleteHandler = (id) => {
    setDeleteItemId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formdataHandler = (allData) => {
    const newFormData = {
      id: uuid(),
      taskname: allData.taskname,
      assigned: allData.assigned,
      duration: allData.duration,
      taskdes: allData.taskdes,
      taskcategory: allData.taskcategory,
      starttime: allData.starttime,
      endtime: allData.endtime,
      tasksection: allData.tasksection,
    };

    const updatedFormData = [...formData, newFormData];
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    toast.success("Item added successfully!");
  };

  const handleDragStart = (id) => (event) => {
    event.dataTransfer.setData("id", id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (targetSection) => (event) => {
    const id = event.dataTransfer.getData("id");
    const draggedItem = formData.find((item) => item.id === id);
    if (draggedItem) {
      const currentSection = draggedItem.tasksection;

      let validNextSection = null;
      
      if (currentSection === "To Do" && targetSection === "In-Progress") {
        validNextSection = "In-Progress";
      } else if (
        currentSection === "In-Progress" &&
        targetSection === "Completed"
      ) {
        validNextSection = "Completed";
      }

      if (validNextSection) {
        const updatedFormData = formData.map((item) =>
          item.id === id ? { ...item, tasksection: validNextSection } : item
        );

        setFormData(updatedFormData);
        localStorage.setItem("formData", JSON.stringify(updatedFormData));
      }
    }
  };

  const confirmDelete = () => {
    const updatedFormData = formData.filter((item) => item.id !== deleteItemId);
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));

    setShowModal(false);
    toast.success("Item deleted!");
  };

  const toDo = formData.filter((item) => item.tasksection === "To Do");
  const progress = formData.filter(
    (item) => item.tasksection === "In-Progress"
  );
  const done = formData.filter((item) => item.tasksection === "Completed");

  return (
    <div className="max-width">
      <TodoFrom
        formdataHandler={formdataHandler}
        editTodo={editTodo}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
      />

      <div className="todocard-flex">
        <div
          className="todo-flex"
          onDragOver={handleDragOver}
          onDrop={handleDrop("To Do")}
        >
          <Todotitle />
          {toDo.map((item) => (
            <div key={item.id} draggable onDragStart={handleDragStart(item.id)}>
              <ToDo
                id={item.id}
                taskname={item.taskname}
                taskcategory={item.taskcategory}
                taskdes={item.taskdes}
                tasksection={item.tasksection}
                starttime={item.starttime}
                endtime={item.endtime}
                duration={item.duration}
                assigned={item.assigned}
                deleteHandler={() => deleteHandler(item.id)}
                editHandler={() => editHandler(item.id)}
              />
            </div>
          ))}
        </div>

        <div
          className="todo-flex"
          onDragOver={handleDragOver}
          onDrop={handleDrop("In-Progress")}
        >
          <Inprogrogresstitle />
          {progress.map((item) => (
            <div key={item.id} draggable onDragStart={handleDragStart(item.id)}>
              <InProgress
                id={item.id}
                taskname={item.taskname}
                taskcategory={item.taskcategory}
                taskdes={item.taskdes}
                tasksection={item.tasksection}
                starttime={item.starttime}
                endtime={item.endtime}
                duration={item.duration}
                assigned={item.assigned}
                deleteHandler={() => deleteHandler(item.id)}
                editHandler={() => editHandler(item.id)}
              />
            </div>
          ))}
        </div>

        <div
          className="todo-flex"
          onDragOver={handleDragOver}
          onDrop={handleDrop("Completed")}
        >
          <Completedtitle />
          {done.map((item) => (
            <div key={item.id}>
              <Completed
                id={item.id}
                taskname={item.taskname}
                taskcategory={item.taskcategory}
                taskdes={item.taskdes}
                tasksection={item.tasksection}
                starttime={item.starttime}
                endtime={item.endtime}
                duration={item.duration}
                assigned={item.assigned}
                deleteHandler={() => deleteHandler(item.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <DeleteModal
        isOpen={showModal}
        onClose={closeModal}
        onDelete={confirmDelete}
      />
    </div>
  );
}

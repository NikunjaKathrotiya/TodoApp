import React, { useEffect, useState } from "react";
import "../TodoForm/TodoForm.css";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export default function TodoFrom({
  formdataHandler,
  isEdit,
  editTodo,
  formData,
  setFormData,
}) {
  const [allData, setAllData] = useState({
    id: uuid(),
    taskname: "",
    assigned: "",
    duration: "",
    taskdes: "",
    taskcategory: "",
    starttime: "",
    endtime: "",
    tasksection: "To Do",
  });
  const allDatahandler = (event) => {
    const { name, value } = event.target;
    setAllData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateFormData()) {
      return;
    }

    formdataHandler(allData);
    resetFormData();
    toast.success("Item added!");
  };
  // edit useeffect
  useEffect(() => {
    if (isEdit && editTodo && editTodo.length > 0) {
      const editedItem = editTodo[0];
      setAllData({
        id: editedItem.id,
        taskname: editedItem.taskname,
        assigned: editedItem.assigned,
        duration: editedItem.duration,
        taskdes: editedItem.taskdes,
        taskcategory: editedItem.taskcategory,
        starttime: editedItem.starttime,
        endtime: editedItem.endtime,
        tasksection: editedItem.tasksection,
      });
    } else {
      resetFormData();
    }
  }, [isEdit, editTodo]);

  const editTaskHandler = (event) => {
    event.preventDefault();
    if (!validateFormData()) {
      return;
    }
    const updatedFormData = formData.map((item) =>
      item.id === allData.id ? { ...allData } : item
    );
  
    setFormData(updatedFormData);
    toast.success("Item updated!");
    resetFormData();
  };
  
  const validateFormData = () => {
    const {
      taskname,
      assigned,
      duration,
      taskdes,
      taskcategory,
      starttime,
      endtime,
    } = allData;

    if (
      !taskname ||
      !assigned ||
      !duration ||
      !taskdes ||
      !taskcategory ||
      !starttime ||
      !endtime
    ) {
      toast.error("Please fill out all fields.");
      return false;
    }

    const startTime = new Date(starttime);
    const endTime = new Date(endtime);
    if (endTime <= startTime) {
      toast.error("End time must be after start time.");
      return false;
    }
    return true;
  };

  const resetFormData = () => {
    setAllData({
      id: uuid(),
      taskname: "",
      assigned: "",
      duration: "",
      taskdes: "",
      taskcategory: "",
      starttime: "",
      endtime: "",
      tasksection: "To Do",
    });
  };

  return (
    <div>
      <section>
        <div className="content">
          <h2>TODO</h2>
        </div>
      </section>
      <div className="container">
        <div className="todo-section">
          <form onSubmit={isEdit ? editTaskHandler : submitHandler}>
            <div className="todo-form">
              <div className="form-group">
                <label htmlFor="task-name">Task Name:</label>
                <input
                  type="text"
                  id="task-name"
                  name="taskname"
                  onChange={allDatahandler}
                  value={allData.taskname}
                  placeholder="Enter task..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="assigned">Assigned To:</label>
                <select
                  id="assigned"
                  name="assigned"
                  onChange={allDatahandler}
                  value={allData.assigned}
                >
                  <option value="">-- Select --</option>
                  <option value="jiya tank">jiya tank</option>
                  <option value="dhaval shrma">dhaval shrma</option>
                  <option value="neha rutak">neha rutak</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration of Completion:</label>
                <input
                  type="time"
                  id="duration"
                  name="duration"
                  onChange={allDatahandler}
                  value={allData.duration}
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskdes">Task Description:</label>
                <input
                  type="text"
                  id="taskdes"
                  name="taskdes"
                  onChange={allDatahandler}
                  value={allData.taskdes}
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="todo-form">
              <div className="form-group">
                <label htmlFor="taskcategory">Select Task Category:</label>
                <select
                  id="taskcategory"
                  name="taskcategory"
                  onChange={allDatahandler}
                  value={allData.taskcategory}
                >
                  <option value="">-- Select --</option>
                  <option value="Designing">Designing</option>
                  <option value="Bug-fixing">Bug-fixing</option>
                  <option value="Office-work">Office-work</option>
                  <option value="QA">QA</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="starttime">Start Time:</label>
                <input
                  type="datetime-local"
                  id="starttime"
                  name="starttime"
                  onChange={allDatahandler}
                  value={allData.starttime}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endtime">End Time:</label>
                <input
                  type="datetime-local"
                  id="endtime"
                  name="endtime"
                  onChange={allDatahandler}
                  value={allData.endtime}
                />
              </div>

              {isEdit && (
                <div className="form-group">
                  <label htmlFor="tasksection">Task Section:</label>
                  <select
                    id="tasksection"
                    name="tasksection"
                    onChange={allDatahandler}
                    value={allData.tasksection}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In-Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
            <div className="add-btn">
              <button type="submit">{isEdit ? "Edit" : "Add Todo"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

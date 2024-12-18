import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newPriority, setNewPriority] = useState('Medium');
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handlePriorityChange(event) {
        setNewPriority(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks((prevTasks) => [
                ...prevTasks,
                { text: newTask, priority: newPriority },
            ]);
            setNewTask('');
            setNewPriority('Medium');
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function handleDragStart(index) {
        setDraggedIndex(index);
    }

    function handleDragOver(index, event) {
        event.preventDefault();
        setHoverIndex(index);
    }

    function handleDrop(index) {
        if (draggedIndex === null) return;

        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks[draggedIndex];

        updatedTasks.splice(draggedIndex, 1);
        updatedTasks.splice(index, 0, draggedTask);

        setTasks(updatedTasks);
        setDraggedIndex(null);
        setHoverIndex(null);
    }

    function handleDragEnd() {
        setHoverIndex(null);
    }

    function sortTasksByPriority() {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        const sortedTasks = [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        setTasks(sortedTasks);
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div className="task-input-container">
                <input
                    type="text"
                    placeholder="Enter a Task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') addTask();
                    }}
                />
                <select
                    value={newPriority}
                    onChange={handlePriorityChange}
                    className="priority-dropdown"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button className="add-button" onClick={addTask}>
                    Add Task
                </button>
            </div>

            <button className="sort-button" onClick={sortTasksByPriority}>
                Sort by Priority
            </button>

            <ol>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        draggable
                        className={`${
                            draggedIndex === index ? 'dragging' : ''
                        } ${hoverIndex === index ? 'drag-over' : ''}`}
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(event) => handleDragOver(index, event)}
                        onDrop={() => handleDrop(index)}
                        onDragEnd={handleDragEnd}
                    >
                        <span className="text">{task.text}</span>
                        <span className={`priority-indicator ${task.priority.toLowerCase()}`}>
                            {task.priority}
                        </span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;

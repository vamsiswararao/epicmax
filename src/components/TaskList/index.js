import React from 'react';
import './index.css'; // Import CSS file for styling (create this file in the same directory)

const TaskList = ({ tasks, onTaskStatusUpdate }) => {
  const handleStatusUpdate = (taskId, newStatus) => {
    // Invoke the callback function to update the task status
    onTaskStatusUpdate(taskId, newStatus);
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.status}`}>
          <h3>{task.taskName}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Assignee: {task.assignee || 'Unassigned'}</p>
          <div className="task-actions">
            {task.status !== 'completed' && (
              <button onClick={() => handleStatusUpdate(task.id, 'started')}>Start</button>
            )}
            <button onClick={() => handleStatusUpdate(task.id, 'completed')}>Complete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

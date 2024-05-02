import React, { Component } from 'react';
import './index.css'; // Import CSS file for styling (create this file in the same directory)

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      description: '',
      dueDate: '',
      assignee: '', // State to store selected assignee (user/team)
      errors: {}, // Object to store validation errors
    };
  }

  // Handler for updating input field values in state
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' }, // Clear validation error when input changes
    });
  };

  // Handler for updating assignee state when selected
  handleAssigneeChange = (event) => {
    const { value } = event.target;
    this.setState({ assignee: value });
  };

  // Form validation method
  validateForm = () => {
    const { taskName, description, dueDate, assignee } = this.state;
    let errors = {};

    if (!taskName.trim()) {
      errors.taskName = 'Task Name is required';
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
    }

    if (!dueDate) {
      errors.dueDate = 'Due Date is required';
    }

    if (!assignee) {
      errors.assignee = 'Assignee is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handler for form submission
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      // Send task data to backend
      fetch('https://epicmax-server.onrender.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Task created successfully:', data);
          // Clear form after successful submission
          this.setState({
            taskName: '',
            description: '',
            dueDate: '',
            assignee: '',
            errors: {},
          });
        })
        .catch((error) => {
          console.error('Error creating task:', error);
          // Handle error and display appropriate message
        });
    }
  };

  render() {
    const { taskName, description, dueDate, assignee, errors } = this.state;

    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={this.handleInputChange}
          />
          {errors.taskName && <span className="error">{errors.taskName}</span>}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={this.handleInputChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={this.handleInputChange}
          />
          {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </div>
        <div className="form-group">
          <label>Assignee:</label>
          <select className='assignee' name="assignee" value={assignee} onChange={this.handleAssigneeChange}>
            <option value="">Select Assignee</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
            <option value="user4">User 4</option>
          </select>
          {errors.assignee && <span className="error">{errors.assignee}</span>}
        </div>
        <button className="create-btn" type="submit">Create Task</button>
      </form>
    );
  }
}

export default TaskForm;

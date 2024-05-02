import React from 'react';
import './App.css';
import TaskForm from "./components/TaskForm"
import AssigneeDropdown from './components/AssigneeDropdown';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';

class App extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'user1' },
        { id: 2, name: 'user2' },
        { id: 3, name: 'user3' },
      ],
      tasks: [], // Array to store tasks fetched from backend
      task: []
    };
  }

  componentDidMount() {
    // Fetch tasks from backend
    fetch('https://epicmax-server.onrender.com/tasks')
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data, task:data.filter((task) =>
        task.assignee === "user1"
        ) }))
      .catch((error) => console.error('Error fetching tasks:', error));
  }
  handleAssigneeSelect = (assigneeName) => {
    const filterData =this.state.tasks.filter((task) =>
        task.assignee === assigneeName
        );
    this.setState({ task: filterData });
  };

  handleTaskStatusUpdate = (taskId, newStatus) => {
    // Send task status update request to backend
    fetch(`https://epicmax-server.onrender.com//tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Task status updated successfully:', data);
        // Update task status in frontend state
        const updatedTasks = this.state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        this.setState({ task: updatedTasks });
      })
      .catch((error) => console.error('Error updating task status:', error));
  };

  render(){
  return (
    <div className="App-header">
      <h1>Task Manager</h1>
        <TaskForm />
        <AssigneeDropdown users={this.state.users} onSelectAssignee={this.handleAssigneeSelect} />
        <TaskList tasks={this.state.task} onTaskStatusUpdate={this.handleTaskStatusUpdate}/>
        <TaskSummary tasks={this.state.task} />
    </div>
  );
}
}

export default App;

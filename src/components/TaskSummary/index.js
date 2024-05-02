// src/components/TaskSummary.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TaskSummary = ({ tasks }) => {
  const completionData = [
    { name: 'Pending', value: tasks.filter((task) => task.status === 'pending').length },
    { name: 'Started', value: tasks.filter((task) => task.status === 'started').length },
    { name: 'Completed', value: tasks.filter((task) => task.status === 'completed').length },
  ];

  return (
    <div>
      <h2>Task Summary</h2>
      <BarChart width={600} height={300} data={completionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TaskSummary; 

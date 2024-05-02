import React from 'react';
import "./index.css"

const AssigneeDropdown = ({ users, onSelectAssignee }) => {
  return (
    <select className="select" onChange={(e) => onSelectAssignee(e.target.value)}>
      {users.map((user) => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default AssigneeDropdown;

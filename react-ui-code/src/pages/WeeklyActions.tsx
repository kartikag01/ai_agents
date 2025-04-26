import React from 'react';

const WeeklyActions: React.FC = () => {
  const weeklyTasks = [
    "Submit project report by Wednesday",
    "Follow up on skipped meetings",
    "Review AI suggestions for next week's schedule",
    "Sync with the team about Q2 goals"
  ];

  return (
    <div className="weekly-actions">
      <h1 className="weekly-actions__title">Weekly Actions</h1>
      <ul className="weekly-actions__list">
        {weeklyTasks.map((task, idx) => (
          <li key={idx} className="weekly-actions__item">{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyActions;

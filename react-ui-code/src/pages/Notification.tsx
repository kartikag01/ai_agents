import React from 'react';

const Notifications: React.FC = () => {
  const notifications = [
    "Your 1:1 meeting is starting in 10 minutes.",
    "New AI suggestion: Reschedule the 'Design Review'.",
    "You missed 2 meetings yesterday."
  ];

  return (
    <div className="notifications">
      <h1 className="notifications__title">Notifications</h1>
      <ul className="notifications__list">
        {notifications.map((note, idx) => (
          <li key={idx} className="notifications__item">{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

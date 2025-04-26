// src/components/MeetingAttendancePrediction.tsx
import React, { useState, useEffect } from 'react';

// Sample historical attendance data: 1 means attended, 0 means not attended
const attendanceData = [
  { meeting_id: 1, attended: 1 },
  { meeting_id: 2, attended: 0 },
  { meeting_id: 3, attended: 1 },
  { meeting_id: 4, attended: 1 },
  { meeting_id: 5, attended: 0 },
  // more data
];

const MeetingAttendancePrediction: React.FC = () => {
  const [prediction, setPrediction] = useState<string>('Pending...');

  const calculateAttendanceProbability = () => {
    const totalMeetings = attendanceData.length;
    const attendedMeetings = attendanceData.filter((data) => data.attended === 1).length;

    const probability = (attendedMeetings / totalMeetings) * 100;
    setPrediction(`Your probability of attending future meetings is: ${probability.toFixed(2)}%`);
  };

  useEffect(() => {
    calculateAttendanceProbability();
  }, []);

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-green-600 mb-6 text-center">📊 Meeting Attendance Prediction</h1>
      <p className="text-xl text-gray-700 text-center">{prediction}</p>
    </div>
  );
};

export default MeetingAttendancePrediction;

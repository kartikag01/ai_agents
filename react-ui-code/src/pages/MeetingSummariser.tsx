import React, { useEffect, useState } from 'react';
import meetingData from '../assets/meeting_summaries.json';

interface MeetingSummary {
  meeting_id: number;
  title: string;
  date: string;
  attendees: string[];
  summary: string;
  action_items: string[];
  links: Record<string, string>;
}

const MeetingSummariser: React.FC = () => {
  const [meetings, setMeetings] = useState<MeetingSummary[]>([]);

  useEffect(() => {
    setMeetings(meetingData.meeting_summaries);
  }, []);

  const speakSummary = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">📋 Meeting Summaries</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <div
            key={meeting.meeting_id}
            className="bg-white shadow-lg p-6 rounded-2xl border-l-4 border-indigo-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-1">{meeting.title}</h2>

            <p className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
              📅 {meeting.date}
            </p>

            <p className="mb-4 italic text-gray-800 bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded">
              {meeting.summary}
            </p>

            <button
              onClick={() => speakSummary(meeting.summary)}
              className="mb-6 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-full shadow hover:scale-105 transition"
            >
              🔊 Play Summary
            </button>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <span>🧑‍🤝‍🧑</span> Attendees:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                {meeting.attendees.map((person, idx) => (
                  <li key={idx}>{person}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <span>📌</span> Action Items:
              </h3>
              <ul className="flex flex-wrap gap-2 mt-2">
                {meeting.action_items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition"
                      title="Click to view more"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Action item clicked: ${item}`);
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <span>🔗</span> Links:
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-700 mt-1">
                {Object.entries(meeting.links).map(([key, url], idx) => (
                  <li key={idx}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-900"
                    >
                      {key.replace(/_/g, ' ')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSummariser;

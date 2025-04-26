import React, { useEffect, useState } from 'react';

interface DailyInsight {
  title: string;
  action?: { title: string }[];
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<DailyInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const response = await fetch(
          'https://coach.sfe.dev.zsservices.com/api/coach/rep-view/daily-data',
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch daily insights');
        }

        const data = await response.json();
        setNotifications(data.daily_insights || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyData();
  }, []);

  return (
    <div className="notifications p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((item, idx) => (
            <li
              key={idx}
              className="bg-white p-4 shadow rounded border-l-4 border-blue-500"
            >
              <p className="text-gray-800">{item.title}</p>
              {item.action?.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-blue-700">
                  {item.action.map((act, i) => (
                    <li key={i}>{act.title}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

import React, { useEffect, useState } from 'react';

interface InsightAction {
  title: string;
}

interface WeeklyInsight {
  title: string;
  action?: InsightAction[];
}

const WeeklyActions: React.FC = () => {
  const [weeklyInsights, setWeeklyInsights] = useState<WeeklyInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('https://coach.sfe.dev.zsservices.com/api/coach/rep-view/weekly-data', {
          credentials: 'include', // 👈 important: send cookies with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch weekly insights');
        }

        const data = await response.json();
        setWeeklyInsights(data.weekly_insights || []);
      } catch (err: any) {
        console.error('Error fetching weekly insights:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return <div className="p-4">Loading Weekly Actions...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="weekly-actions p-4">
      <h1 className="weekly-actions__title text-xl font-semibold mb-4">Weekly Actions</h1>
      <ul className="weekly-actions__list space-y-3">
        {weeklyInsights.map((insight, idx) => (
          <li key={idx} className="weekly-actions__item bg-white shadow p-4 rounded text-gray-800">
            <p>{insight.title}</p>
            {insight.action && insight.action.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-blue-600">
                {insight.action.map((act, actIdx) => (
                  <li key={actIdx}>{act.title}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyActions;

import React, { useEffect, useState } from 'react';

interface InsightAction {
  title: string;
}

interface Insight {
  title: string;
  action?: InsightAction[];
  type: 'daily' | 'weekly';
}

const Insights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const [dailyRes, weeklyRes] = await Promise.all([
          fetch('https://coach.sfe.dev.zsservices.com/api/coach/rep-view/daily-data', {
            credentials: 'include',
          }),
          fetch('https://coach.sfe.dev.zsservices.com/api/coach/rep-view/weekly-data', {
            credentials: 'include',
          }),
        ]);

        if (!dailyRes.ok || !weeklyRes.ok) {
          throw new Error('Failed to fetch insights');
        }

        const dailyData = await dailyRes.json();
        const weeklyData = await weeklyRes.json();

        const dailyInsights: Insight[] = (dailyData.daily_insights || []).map((item: any) => ({
          ...item,
          type: 'daily',
        }));

        const weeklyInsights: Insight[] = (weeklyData.weekly_insights || []).map((item: any) => ({
          ...item,
          type: 'weekly',
        }));

        const combined = [...dailyInsights, ...weeklyInsights];

        setInsights(combined);
      } catch (err: any) {
        console.error('Error fetching insights:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading insights...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const dailyInsights = insights.filter((item) => item.type === 'daily');
  const weeklyInsights = insights.filter((item) => item.type === 'weekly');

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">📢 Daily & Weekly Insights</h1>

      {/* Daily Insights */}
      {dailyInsights.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Daily Insights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dailyInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold text-gray-800">{insight.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">Daily</span>
                </div>

                {insight.action && insight.action.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-blue-600">
                    {insight.action.map((act, actIdx) => (
                      <li key={actIdx}>{act.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Weekly Insights */}
      {weeklyInsights.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Weekly Insights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {weeklyInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold text-gray-800">{insight.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">Weekly</span>
                </div>

                {insight.action && insight.action.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-purple-600">
                    {insight.action.map((act, actIdx) => (
                      <li key={actIdx}>{act.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Insights;

import React, { useState, useEffect } from 'react';
import dailyData from '../assets/daily.json';
import weeklyData from '../assets/weekly.json';
import { jsPDF } from "jspdf";

interface InsightAction {
  title: string;
  priority?: 'high' | 'low'; // Optional priority field
}

interface Insight {
  title: string;
  action?: InsightAction[];
  type: 'daily' | 'weekly';
}

const Insights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const loadData = () => {
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
    };

    loadData();
  }, []);

  const dailyInsights = insights.filter((item) => item.type === 'daily');
  const weeklyInsights = insights.filter((item) => item.type === 'weekly');

  // Download Insights as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Daily & Weekly Insights", 10, 10);

    let yPosition = 20;

    const renderInsights = (insightsList: Insight[], type: string) => {
      insightsList.forEach((insight) => {
        doc.setFontSize(12);
        doc.text(`${type}: ${insight.title}`, 10, yPosition);
        yPosition += 10;

        insight.action?.forEach((action) => {
          doc.text(`- ${action.title}`, 20, yPosition);
          yPosition += 10;

          // Add priority
          const priorityText = action.priority === 'high' ? 'High Priority' : 'Low Priority';
          doc.text(priorityText, 30, yPosition);
          yPosition += 10;
        });
        yPosition += 5;
      });
    };

    renderInsights(dailyInsights, "Daily");
    renderInsights(weeklyInsights, "Weekly");

    doc.save("insights.pdf");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-700">📢 Daily & Weekly Insights</h1>

      {/* Daily Insights Section */}
      {dailyInsights.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Daily Insights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dailyInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-semibold text-gray-800">{insight.title}</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Daily</span>
                </div>

                {/* Action Items (Always Visible) */}
                {insight.action?.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {insight.action.map((act, actIdx) => (
                      <li key={actIdx} className="flex justify-between items-center">
                        {act.title}
                        {/* Priority Text: High or Low */}
                        <span className={`text-xs ${act.priority === 'high' ? 'text-red-500' : 'text-green-500'}`}>
                          {act.priority === 'high' ? 'High Priority' : 'Low Priority'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Weekly Insights Section */}
      {weeklyInsights.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-purple-700">Weekly Insights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {weeklyInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-semibold text-gray-800">{insight.title}</p>
                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Weekly</span>
                </div>

                {/* Action Items (Always Visible) */}
                {insight.action?.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {insight.action.map((act, actIdx) => (
                      <li key={actIdx} className="flex justify-between items-center">
                        {act.title}
                        {/* Priority Text: High or Low */}
                        <span className={`text-xs ${act.priority === 'high' ? 'text-red-500' : 'text-green-500'}`}>
                          {act.priority === 'high' ? 'High Priority' : 'Low Priority'}
                        </span>
                      </li>
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

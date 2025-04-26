import React from 'react';
import { assistantData } from '../mockData';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WidgetCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="widget-card">
    <h2 className="widget-card__title">{title}</h2>
    <div className="widget-card__content">{children}</div>
  </div>
);

const COLORS = ['#4CAF50', '#F44336', '#FF9800'];

const Assistance: React.FC = () => {
  const chartData = [
    { name: 'Attended', value: assistantData.productivityStats.attended },
    { name: 'Missed', value: assistantData.productivityStats.missed },
    { name: 'Canceled', value: assistantData.productivityStats.canceled },
  ];

  return (
    <div className="assistance">
      <h1 className="assistance__title">Your Smart Assistant</h1>
      <div className="assistance__widgets">
        <WidgetCard title="Day Plan Overview">
          <ul className="list-disc pl-4">
            {assistantData.dayPlan.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </WidgetCard>

        <WidgetCard title="Meeting Summarizer">
          <p>{assistantData.meetingSummary}</p>
          <button className="button button--blue">Summarize My Day</button>
        </WidgetCard>

        <WidgetCard title="Priority Meetings">
          <ul className="list-disc pl-4">
            {assistantData.priorityMeetings.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </WidgetCard>

        <WidgetCard title="AI Recommendations">
          <ul className="list-disc pl-4">
            {assistantData.aiRecommendations.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </WidgetCard>

        <WidgetCard title="Calendar Cleaner">
          <ul className="list-disc pl-4">
            {assistantData.calendarCleanUp.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
          <button className="button button--red">Clean My Calendar</button>
        </WidgetCard>

        <WidgetCard title="Productivity Score">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </WidgetCard>
      </div>
    </div>
  );
};

export default Assistance;

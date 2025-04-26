import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Our AI Productivity Coach
        </motion.h1>

        <motion.p 
          className="text-lg text-gray-700 text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Helping you master your day, meetings, and tasks — one insight at a time.
        </motion.p>

        <motion.div 
          className="flex flex-col lg:flex-row gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* What We've Built */}
          <motion.section 
            className="bg-white p-8 rounded-3xl shadow-xl flex-1"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-800">✨ What We've Built So Far</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li><strong>Daily Insights:</strong> Get a snapshot of your key activities each day.</li>
              <li><strong>Weekly Insights:</strong> Summarize your weekly performance to identify patterns.</li>
              <li><strong>Priority Lists:</strong> Keep track of your top meetings and action items.</li>
              <li><strong>Admin Task Management:</strong> View and act on pending approvals quickly.</li>
            </ul>
          </motion.section>

          {/* Vision */}
          <motion.section 
            className="bg-white p-8 rounded-3xl shadow-xl flex-1"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-purple-800">🚀 The Vision We're Building Towards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-6">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Day Plan Overview:</strong> Your day's meetings and tasks, beautifully summarized.</li>
                <li><strong>Priority Meetings List:</strong> Focus only on what's important.</li>
                <li><strong>Schedule New Meetings:</strong> Plan directly from your dashboard.</li>
                <li><strong>Recurring Meeting Management:</strong> Optimize or cancel recurring meetings.</li>
              </ul>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Meeting Summarizer:</strong> Auto-generate quick notes after every meeting.</li>
                <li><strong>AI Recommendations:</strong> Smart suggestions like "Skip this low-priority meeting".</li>
                <li><strong>Calendar Cleaner:</strong> Identify and clean up unattended or outdated meetings.</li>
                <li><strong>Smart Scheduling:</strong> Suggest best times based on your availability.</li>
              </ul>
            </div>
          </motion.section>

          {/* Future Enhancements */}
          <motion.section 
            className="bg-white p-8 rounded-3xl shadow-xl flex-1"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">🛠 Future Enhancements</h2>
            <p className="text-gray-700 mt-2 mb-6">
              These are features that are in progress or will be rolled out soon based on user needs:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Meeting Attendance Prediction based on your past habits.</li>
              <li>Productivity Score to track and optimize your performance.</li>
              <li>More AI-driven insights and automation.</li>
            </ul>
          </motion.section>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🚀 Built with ❤️ to supercharge your productivity.
        </motion.div>
      </div>
    </div>
  );
};

export default About;

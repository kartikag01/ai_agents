import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import schedulingData from '../assets/scheduling.json';

interface ActionItem {
  subject?: string;
  from?: string;
  event_title?: string;
  organizer?: string;
  action_required: string;
  timestamp: string;
}

const EnhancedScheduling: React.FC = () => {
  const [tasks, setTasks] = useState<ActionItem[]>([]);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (schedulingData && schedulingData.human_action_needed) {
      setTasks(schedulingData.human_action_needed);
    }
  }, []);

  const handleOk = (index: number) => {
    setTooltip("✅ Task marked as Done!");
    setTimeout(() => {
      removeTask(index);
      setTooltip(null);
    }, 800);
  };

  const handleCancel = (index: number) => {
    setTooltip("❌ Task Cancelled.");
    setTimeout(() => {
      removeTask(index);
      setTooltip(null);
    }, 800);
  };

  const removeTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto mt-10 relative">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">⚡ Attention Needed</h1>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md z-50 text-sm"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Cards */}
      <AnimatePresence>
        {tasks.length > 0 ? (
          <div className="space-y-6">
            {tasks.map((task, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative bg-gray-100 p-6 rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl border-2 border-transparent hover:border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-all duration-300 cursor-pointer"
              >
                {/* Glow effect for pending cards */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0px #c084fc',
                      '0 0 10px #c084fc',
                      '0 0 0px #c084fc',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                />

                {/* Main Content */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div>
                    <p className="text-indigo-600 text-sm font-semibold mb-2">Subject:</p>
                    <p className="text-gray-900 text-lg font-medium">{task.subject || task.event_title}</p>
                  </div>

                  <div>
                    <p className="text-indigo-600 text-sm font-semibold mb-2">From:</p>
                    <p className="text-gray-800 text-lg font-medium">{task.from || task.organizer}</p>
                  </div>

                  <div>
                    <p className="text-indigo-600 text-sm font-semibold mb-2">Date:</p>
                    <p className="text-gray-700 text-lg">{formatDate(task.timestamp)}</p>
                  </div>

                  <div>
                    <p className="text-indigo-600 text-sm font-semibold mb-2">Action Required:</p>
                    <p className="text-gray-700 text-lg">{task.action_required}</p>
                  </div>
                </div>

                {/* Slide to Reveal Buttons */}
                <div className="absolute top-0 right-0 h-full flex items-center space-x-2 opacity-0 group-hover:opacity-100 pr-4 transition-all duration-500 z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleOk(idx)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-full shadow-md"
                  >
                    OK
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCancel(idx)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-full shadow-md"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-sm"
          >
            No tasks found.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedScheduling;

import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-800 text-white ${isOpen ? "w-60" : "w-16"} transition-all duration-300 h-screen`}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
        {isOpen ? "<" : ">"}
      </button>
      <nav className="flex flex-col mt-4 space-y-4">
        <Link to="/assistance" className="pl-4">Assistance</Link>
        <Link to="/weekly-actions" className="pl-4">Weekly Actions</Link>
        <Link to="/notifications" className="pl-4">Notifications</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <span className="font-extrabold text-2xl tracking-wide hover:scale-105 transform transition-transform duration-300">
          Mailendar AI
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex items-center space-x-8">
        <Link
          to="/weekly-actions"
          className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-medium relative group transform hover:scale-105 transition-transform"
        >
          Weekly Actions
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
        </Link>

      
        <Link
          to="/meetings"
          className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-medium relative group transform hover:scale-105 transition-transform"
        >
          Meeting Summarizer
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
        </Link>

        <Link
          to="/enhanced-scheduling"
          className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-medium relative group transform hover:scale-105 transition-transform"
        >
          Attention Needed
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
        </Link>

        {/* <Link
          to="/attendance-prediction"
          className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-medium relative group transform hover:scale-105 transition-transform"
        >
          Prediction
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
        </Link> */}
      </nav>

      {/* Secondary Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/about"
          className="text-white hover:text-green-300 transition-colors duration-300 text-base relative group transform hover:scale-105 transition-transform"
        >
          About
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-300 transition-all group-hover:w-full"></span>
        </Link>

        <Link
          to="/login"
          className="text-white hover:text-green-300 transition-colors duration-300 text-base relative group transform hover:scale-105 transition-transform"
        >
          Login
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-300 transition-all group-hover:w-full"></span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

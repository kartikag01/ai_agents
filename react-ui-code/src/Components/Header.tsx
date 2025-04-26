import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="flex items-center">
       
        <span className="font-bold text-2xl">AI Coach</span>
      </div>
      <div className="flex ">
        {/* <Link to="/assistance" className="pl-4">
          Assistance
        </Link> */}
        <Link to="/weekly-actions" className="pl-4">
          Weekly Actions
        </Link>
        <Link to="/notifications" className="pl-4">
          Notifications
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
};

export default Header;

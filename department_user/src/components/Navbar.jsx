import { User, FileText, BarChart2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      {/* Left - User Info */}
      <div className="flex items-center space-x-3 text-2xl font-semibold tracking-wide">
        <User size={28} className="text-white drop-shadow-md" />
        <span>Welcome, User</span>
      </div>

      {/* Center - Navigation Links */}
      <div className="flex space-x-6 text-lg">
        <Link to="/request">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200">
            <FileText size={20} />
            <span>Request</span>
          </button>
        </Link>

        <Link to="/status">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200">
            <BarChart2 size={20} />
            <span>Status</span>
          </button>
        </Link>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/90 hover:bg-red-600 transition-all duration-200">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Right - Spacer for symmetry */}
      <div className="w-[60px]"></div>
    </nav>
  );
};

export default Navbar;

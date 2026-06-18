import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../constants/navItems";

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              Task Management
            </h1>
          </div>

          <nav>
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {navItems?.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={` hover:text-blue-600 font-medium transition-colors ${location.pathname === item.path ? "text-blue-800" : "text-gray-700"}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

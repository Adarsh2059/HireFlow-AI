import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RecruiterSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Jobs",
      path: "/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Create Job",
      path: "/recruiter/jobs/create",
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">HireFlow AI</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 rounded-lg bg-red-500 px-4 py-3 hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default RecruiterSidebar;

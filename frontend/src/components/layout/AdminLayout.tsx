import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, MessageSquare, UtensilsCrossed, LogOut } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/admin/reservations", label: "Reservations", icon: <Calendar className="w-5 h-5" /> },
    { path: "/admin/inquiries", label: "Inquiries", icon: <MessageSquare className="w-5 h-5" /> },
    { path: "/admin/menu", label: "Menu", icon: <UtensilsCrossed className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3B2416] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-widest uppercase">TheBuzzCafe</h1>
          <p className="text-white/50 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-[#C68642] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

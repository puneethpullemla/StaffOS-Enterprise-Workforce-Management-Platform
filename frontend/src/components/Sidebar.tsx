import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  FileText,
  Wallet,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Employees",
      icon: <Users size={20} />,
      path: "/employees",
    },
    {
      name: "Departments",
      icon: <Building2 size={20} />,
      path: "/departments",
    },
    {
      name: "Attendance",
      icon: <CalendarCheck size={20} />,
      path: "/attendance",
    },
    {
      name: "Leave",
      icon: <FileText size={20} />,
      path: "/leave",
    },
    {
      name: "Payroll",
      icon: <Wallet size={20} />,
      path: "/payroll",
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
            W
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              Workforce
            </h1>

            <p className="text-sm text-slate-400">
              Enterprise HRMS
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">

        {menus.map((menu) => {

          const active =
            location.pathname === menu.path;

          return (

            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200
              ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >

              <div className="flex items-center gap-3">

                {menu.icon}

                <span className="font-medium">
                  {menu.name}
                </span>

              </div>

              {active && <ChevronRight size={18} />}

            </Link>

          );

        })}

      </nav>

      {/* User */}

      <div className="border-t border-slate-800 p-5">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">
            P
          </div>

          <div>

            <p className="font-semibold">
              Puneeth
            </p>

            <p className="text-sm text-slate-400">
              Administrator
            </p>

          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}
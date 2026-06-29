import {
  Bell,
  CalendarDays,
  Search,
} from "lucide-react";

export default function Navbar() {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Workforce Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here's what's happening today.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute right-3 top-1 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />

        </div>

        {/* Date */}

        <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm font-medium text-slate-700">
            {today}
          </span>

        </div>

        {/* Notification */}

        <button className="relative rounded-full bg-slate-100 p-3 transition hover:bg-slate-200">

          <Bell
            size={20}
            className="text-slate-700"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
            P
          </div>

          <div className="hidden lg:block">

            <p className="font-semibold text-slate-800">
              Puneeth
            </p>

            <p className="text-sm text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>

  );

}
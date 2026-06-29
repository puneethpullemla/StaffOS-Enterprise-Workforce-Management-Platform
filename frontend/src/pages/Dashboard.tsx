import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboard } from "../services/dashboard";

import EmployeeChart from "../components/charts/EmployeeChart";
import AttendanceChart from "../components/charts/AttendanceChart";

import {
  Users,
  Building2,
  CalendarCheck,
  FileText,
  Wallet,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      {/* Dashboard Cards */}

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

        <Card
            title="Employees"
            value={stats.total_employees}
            color="from-blue-500 to-blue-700"
            icon={<Users size={26} 
            />}
        />

        <Card
            title="Departments" 
            value={stats.total_departments}
            color="from-emerald-500 to-emerald-700"
            icon={<Building2 size={26} />}
        />

        <Card
            title="Attendance"
            value={stats.total_attendance}
            color="from-orange-500 to-orange-700"
            icon={<CalendarCheck size={26} />}
        />

        <Card
            title="Leaves"
            value={stats.total_leaves}
            color="from-rose-500 to-rose-700"
            icon={<FileText size={26} />}
        />

        <Card
            title="Payroll"
            value={stats.total_payrolls}
            color="from-violet-500 to-violet-700"
            icon={<Wallet size={26} />}
        />

        </div> 

      {/* Charts */}

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">
            Employee Distribution
            </h2>

            <EmployeeChart />

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">
            Attendance Overview
            </h2>

            <AttendanceChart
            data={stats.attendance_chart}
            />

        </div>

        </div>

      {/* Recent Data */}

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Recent Employees */}

        <div className="rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb- flex items-center justify-between">

            <h2 className="text-2xl font-bold">
                Recent Employees
            </h2>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {stats.recent_employees.length}
            </span>

            </div>

            <div className="space-y-4">

            {stats.recent_employees.map((employee: any) => (

                <div
                key={employee.id}
                className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
                >

                <div className="flex items-center gap-4">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">

                    {employee.name.charAt(0).toUpperCase()}

                    </div>

                    <div>

                    <p className="font-semibold">
                        {employee.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {employee.designation}
                    </p>

                    </div>

                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Active
                </span>

                </div>

            ))}

            </div>

        </div>

        {/* Recent Leaves */}

        <div className="rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
                Recent Leaves
            </h2>

            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                {stats.recent_leaves.length}
            </span>

            </div>

            <div className="space-y-4">

            {stats.recent_leaves.map((leave: any, index: number) => (

                <div
                key={index}
                className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
                >

                <div>

                    <p className="font-semibold">
                    Employee #{leave.employee_id}
                    </p>

                </div>

                <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold
                    ${
                    leave.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {leave.status}
                </span>

                </div>

            ))}

            </div>

        </div>

        </div>
    </DashboardLayout>
    );
}

function Card({
  title,
  value,
  color,
  icon,
}: any) {
  return (

    <div
      className={`rounded-2xl bg-gradient-to-r ${color}
      p-6 text-white shadow-lg transition-all duration-300
      hover:-translate-y-2 hover:shadow-2xl`}
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm opacity-80">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            {value}
          </h2>

        </div>

        <div className="rounded-xl bg-white/20 p-4">

          {icon}

        </div>

      </div>

    </div>


  );
}
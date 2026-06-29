import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getAttendance,
  checkIn,
  checkOut,
} from "../services/attendance";

import toast from "react-hot-toast";

import {
  Search,
  LogIn,
  LogOut,
} from "lucide-react";

interface Attendance {
  id: number;
  employee_id: number;
  attendance_date: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
}

export default function Attendance() {
  const [attendance, setAttendance] =
    useState<Attendance[]>([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [search, setSearch] =
    useState("");

  const loadAttendance = async () => {
    try {
      const response =
        await getAttendance();

      setAttendance(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleCheckIn = async () => {
    if (!employeeId) return;

    try {
      await checkIn(Number(employeeId));

      toast.success("Checked In");

      setEmployeeId("");

      loadAttendance();
    } catch (error) {
      console.error(error);

      toast.error("Check In Failed");
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId) return;

    try {
      await checkOut(Number(employeeId));

      toast.success("Checked Out");

      setEmployeeId("");

      loadAttendance();
    } catch (error) {
      console.error(error);

      toast.error("Check Out Failed");
    }
  };

  const filteredAttendance =
    attendance.filter((item) =>
      item.employee_id
        .toString()
        .includes(search)
    );

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Attendance
        </h1>

        <p className="mt-1 text-gray-500">
          Track employee attendance records.
        </p>

      </div>

      {/* Actions */}

      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-6 shadow">

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(e.target.value)
          }
          className="rounded-xl border p-3 w-52"
        />

        <button
          onClick={handleCheckIn}
          className="flex h-6 w-26 items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
        >
          <LogIn size={18} />
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          className="flex h-6 w-28 items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Check Out
        </button>

      </div>

      {/* Search */}

      <div className="relative mb-8 w-96">

        <Search
          size={18}
          className="absolute -4 top-1 right-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Employee ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border py-3 pl-11 pr-4 shadow-sm focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4">
                Employee ID
              </th>

              <th>Date</th>

              <th>Check In</th>

              <th>Check Out</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredAttendance.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  No Attendance Records
                </td>

              </tr>

            ) : (

              filteredAttendance.map(
                (record) => (

                  <tr
                    key={record.id}
                    className="border-b text-center transition hover:bg-slate-50"
                  >

                    <td className="p-4 font-semibold">
                      {record.employee_id}
                    </td>

                    <td>
                      {record.attendance_date}
                    </td>

                    <td>
                      {record.check_in
                        ? new Date(
                            record.check_in
                          ).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td>
                      {record.check_out
                        ? new Date(
                            record.check_out
                          ).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold
                        ${
                          record.status === "PRESENT"
                            ? "bg-green-100 text-green-700"
                            : record.status === "ABSENT"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {record.status}
                      </span>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import LeaveModal from "../components/LeaveModal";

import {
  getLeaves,
  updateLeave,
} from "../services/leave";

import toast from "react-hot-toast";

import {
  Search,
  Plus,
  Check,
  X,
} from "lucide-react";

interface Leave {
  id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
}

export default function Leave() {
  const [leaves, setLeaves] =
    useState<Leave[]>([]);

  const [open, setOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const loadLeaves = async () => {
    try {
      const response =
        await getLeaves();

      setLeaves(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleStatus = async (
    id: number,
    status: string
  ) => {
    try {
      await updateLeave(id, status);

      toast.success("Leave Updated");

      loadLeaves();
    } catch (error) {
      console.error(error);

      toast.error("Update Failed");
    }
  };

  const filteredLeaves =
    leaves.filter((leave) =>
      leave.employee_id
        .toString()
        .includes(search)
    );

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Leave Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage employee leave requests.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Apply Leave
        </button>

      </div>

      {/* Search */}

      <div className="relative mb-8 w-96">

        <Search
          size={18}
          className="absolute right-4 top-1  text-gray-400"
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

              <th>
                Start Date
              </th>

              <th>
                End Date
              </th>

              <th>
                Reason
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLeaves.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No Leave Requests
                </td>

              </tr>

            ) : (

              filteredLeaves.map((leave) => (

                <tr
                  key={leave.id}
                  className="border-b text-center transition hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold">
                    {leave.employee_id}
                  </td>

                  <td>
                    {leave.start_date}
                  </td>

                  <td>
                    {leave.end_date}
                  </td>

                  <td>
                    {leave.reason}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold
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

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          handleStatus(
                            leave.id,
                            "APPROVED"
                          )
                        }
                        className="rounded-lg bg-green-100 p-2 text-green-700 transition hover:bg-green-200"
                      >
                        <Check size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleStatus(
                            leave.id,
                            "REJECTED"
                          )
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                      >
                        <X size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {open && (

        <LeaveModal
          onClose={() =>
            setOpen(false)
          }
          onSuccess={() => {
            loadLeaves();
            setOpen(false);
          }}
        />

      )}

    </DashboardLayout>
  );
}
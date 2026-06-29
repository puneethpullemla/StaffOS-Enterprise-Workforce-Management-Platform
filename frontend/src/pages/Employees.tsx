import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeModal from "../components/EmployeeModal";
import {
  getEmployees,
  deleteEmployee,
} from "../services/employee";
import toast from "react-hot-toast";

import {
  Pencil,
  Trash2,
  Plus,
  Search,
} from "lucide-react";

interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  designation: string;
  salary: number;
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<any>(null);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees(
        search,
        page,
        10
      );

      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      toast.success(
        "Employee deleted successfully"
      );

      loadEmployees();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete employee"
      );
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [search, page]);

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Employees
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all employees in your organization.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedEmployee(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Employee 
        </button>

      </div>

      {/* Search */}

      <div className="relative mb-8 w-96">

        <Search
          size={18}
          className="absolute right-4 top-1 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search employees..."
          className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 shadow-sm focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        <table className="w-full">

          <thead className="bg-slate-100 text-slate-700">

            <tr>

              <th className="p-4">
                Employee ID
              </th>

              <th>
                Employee
              </th>

              <th>
                Email
              </th>

              <th>
                Designation
              </th>

              <th>
                Salary
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No employees found.
                </td>

              </tr>

            ) : (

              employees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b text-center transition hover:bg-slate-50"
                >

                  <td className="p-4">
                    {employee.employee_id}
                  </td>

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-7 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                        {employee.first_name.charAt(0).toUpperCase()}

                      </div>

                      <div className="text-left">

                        <p className="font-semibold">

                          {employee.first_name}{" "}
                          {employee.last_name}

                        </p>

                        <p className="text-xs text-gray-500">

                          Employee

                        </p>

                      </div>

                    </div>

                  </td>

                  <td>
                    {employee.email}
                  </td>

                  <td>
                    {employee.designation}
                  </td>

                  <td>

                    <span className="font-semibold text-green-600">

                      ₹
                      {Number(
                        employee.salary
                      ).toLocaleString()}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedEmployee(
                            employee
                          );

                          setOpen(true);
                        }}
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            employee.id
                          )
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="mt-6 flex justify-end gap-5 left-1">

        <button
          onClick={() =>
            setPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          className=" h-7 w-20 rounded border px-5 py-2 transition bg-blue-500 hover:bg-slate-100"
        >
          Previous
        </button>

        <button
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          className="h-7 w-15 rounded border px-5 py-2 transition bg-blue-500 hover:bg-slate-100 "
        >
          Next
        </button>

      </div>

      {/* Modal */}

      {open && (

        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => {
            setOpen(false);
            setSelectedEmployee(null);
          }}
          onSuccess={loadEmployees}
        />

      )}

    </DashboardLayout>
  );
}
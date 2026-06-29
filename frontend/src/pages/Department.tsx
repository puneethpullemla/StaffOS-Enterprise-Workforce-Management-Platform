import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DepartmentModal from "../components/DepartmentsModal";

import {
  getDepartments,
  deleteDepartment,
} from "../services/department";


interface Department {
  id: number;
  name: string;
}

export default function Departments() {

  const [departments, setDepartments] = useState<Department[]>([]);

  const [open, setOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState<any>(null);

  const [search, setSearch] = useState("");

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleDelete = async (id: number) => {

    const ok = window.confirm(
      "Delete Department?"
    );

    if (!ok) return;

    try {

      await deleteDepartment(id);

      loadDepartments();

    } catch (error) {
      console.error(error);
    }

  };

  const filteredDepartments = departments.filter(
    (department) =>
      department.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (


    <DashboardLayout>

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Departments
        </h1>

        <button
          onClick={() => {
            setSelectedDepartment(null);
            setOpen(true);
          }}
          className="w-32 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Add Department
        </button>

      </div>

      <div className="mb-5">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search Department..."
          className="w-80 rounded-lg border border-gray-300 p-3"
        />

      </div>

      <div className="overflow-x-auto rounded-lg shadow">

        <table className="w-full bg-white">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-3">
                Department Name
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredDepartments.length === 0 ? (

              <tr>

                <td
                  colSpan={2}
                  className="p-6 text-center text-gray-500"
                >
                  No Departments Found
                </td>

              </tr>

            ) : (

              filteredDepartments.map(
                (department) => (

                  <tr
                    key={department.id}
                    className="border-b text-center hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {department.name}
                    </td>

                    <td className="space-x-2 ">

                      <button
                        onClick={() => {

                          setSelectedDepartment(
                            department
                          );

                          setOpen(true);

                        }}
                        className="h-6 w-8 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            department.id
                          )
                        }
                        className="h-6 w-12  rounded lg bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {open && (

        <DepartmentModal

          department={
            selectedDepartment
          }

          onClose={() => {

            setOpen(false);

            setSelectedDepartment(
              null
            );

          }}

          onSuccess={loadDepartments}

        />

      )}

    </DashboardLayout>

  );

}
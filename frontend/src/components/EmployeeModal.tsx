import { useEffect, useState } from "react";
import {
  createEmployee,
  updateEmployee,
} from "../services/employee";
import { getDepartments } from "../services/department";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  employee?: any;
}

interface Department {
  id: number;
  name: string;
}

export default function EmployeeModal({
  onClose,
  onSuccess,
  employee,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);

  const [form, setForm] = useState({
    employee_id: employee?.employee_id || "",
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    department_id: employee?.department_id || 1,
    designation: employee?.designation || "",
    salary: employee?.salary || "",
    joining_date: employee?.joining_date || "",
    status: employee?.status || "ACTIVE",
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "department_id"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    if (employee) {
      await updateEmployee(employee.id, form);

      toast.success("Employee updated successfully");

    } else {
      await createEmployee(form);

      toast.success("Employee added successfully");
    }

    onSuccess();

    onClose();

  } catch (error: any) {

    console.error(error);

    toast.error(
      error.response?.data?.detail ||
      "Operation failed"
    );

  } finally {

    setLoading(false);

  }
};

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            placeholder="Employee ID"
            className="rounded border p-3"
          />

          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="rounded border p-3"
          />

          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="rounded border p-3"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded border p-3"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="rounded border p-3"
          />

          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="rounded border p-3"
          >
            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="rounded border p-3"
          />

          <input
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="rounded border p-3"
          />

          <input
            name="joining_date"
            type="date"
            value={form.joining_date}
            onChange={handleChange}
            className="rounded border p-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded border p-3"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-6 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Saving..."
              : employee
              ? "Update Employee"
              : "Add Employee"}
          </button>

        </div>

      </div>

    </div>
  );
}
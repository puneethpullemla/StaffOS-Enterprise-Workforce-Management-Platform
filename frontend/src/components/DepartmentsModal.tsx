import { useState } from "react";
import toast from "react-hot-toast";

import {
  createDepartment,
  updateDepartment,
} from "../services/department";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  department?: any;
}

export default function DepartmentModal({
  onClose,
  onSuccess,
  department,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: department?.name || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (department) {
        await updateDepartment(
          department.id,
          form
        );

        toast.success(
          "Department updated successfully"
        );

      } else {
        await createDepartment(form);

        toast.success(
          "Department created successfully"
        );
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

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {department
              ? "Edit Department"
              : "Add Department"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            ×
          </button>

        </div>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Department Name"
          className="w-full rounded border p-3"
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Saving..."
              : department
              ? "Update"
              : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}
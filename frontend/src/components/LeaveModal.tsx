import { useState } from "react";
import { applyLeave } from "../services/leave";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LeaveModal({
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    employee_id: "",

    start_date: "",

    end_date: "",

    reason: "",

  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await applyLeave({

        employee_id: Number(form.employee_id),

        start_date: form.start_date,

        end_date: form.end_date,

        reason: form.reason,

      });

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      alert("Failed to Apply Leave");

    } finally {

      setLoading(false);

    }

  };

  return (


        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Apply Leave
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            ×
          </button>

        </div>

        <div className="grid gap-4">

          <input
            type="number"
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            placeholder="Employee ID"
            className="rounded border p-3"
          />

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="rounded border p-3"
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="rounded border p-3"
          />

          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason"
            rows={4}
            className="rounded border p-3"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Applying..." : "Apply Leave"}
          </button>

        </div>

      </div>

    </div>
  );
}



import { useState } from "react";
import { generatePayroll } from "../services/payroll";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PayrollModal({
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    employee_id: "",

    month: "",

    bonus: "",

    deductions: "",

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

      await generatePayroll({
    
        employee_id:
          Number(form.employee_id),

        month: form.month,

        bonus: Number(form.bonus),

        deductions:
          Number(form.deductions),

      });
      toast.success("Payroll generated successfully");
      
      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      toast.error("Payroll generation failed");

    } finally {

      setLoading(false);

    }

  };

  return (


        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Generate Payroll
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
            type="month"
            name="month"
            value={form.month}
            onChange={handleChange}
            className="rounded border p-3"
          />

          <input
            type="number"
            name="bonus"
            value={form.bonus}
            onChange={handleChange}
            placeholder="Bonus"
            className="rounded border p-3"
          />

          <input
            type="number"
            name="deductions"
            value={form.deductions}
            onChange={handleChange}
            placeholder="Deductions"
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
            {loading
              ? "Generating..."
              : "Generate"}
          </button>

        </div>

      </div>

    </div>
  );
}
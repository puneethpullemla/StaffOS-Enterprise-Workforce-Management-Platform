import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import PayrollModal from "../components/PayrollModal";

import {
  getPayrolls,
  markPaid,
} from "../services/payroll";

import toast from "react-hot-toast";

import {
  Search,
  Wallet,
  CheckCircle,
} from "lucide-react";

interface Payroll {
  id: number;
  employee_id: number;
  month: string;
  basic_salary: number;
  bonus: number;
  deductions: number;
  net_salary: number;
  status: string;
}

export default function Payroll() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const loadPayrolls = async () => {
    try {
      const response = await getPayrolls();
      setPayrolls(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load payrolls");
    }
  };

  useEffect(() => {
    loadPayrolls();
  }, []);

  const handlePaid = async (id: number) => {
    try {
      await markPaid(id, "PAID");

      toast.success("Payroll marked as paid");

      loadPayrolls();
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark payroll");
    }
  };

  const filteredPayrolls = payrolls.filter((item) =>
    item.employee_id.toString().includes(search)
  );

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Payroll
          </h1>

          <p className="mt-1 text-gray-500">
            Manage employee payroll and salary records.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-40 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Wallet size={18} />
          Generate Payroll
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
          placeholder="Search Employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border py-3 pl-11 pr-4 shadow-sm focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4">Employee ID</th>
              <th>Month</th>
              <th>Basic</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredPayrolls.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="p-8 text-center text-gray-500"
                >
                  No Payroll Records
                </td>

              </tr>

            ) : (

              filteredPayrolls.map((payroll) => (

                <tr
                  key={payroll.id}
                  className="border-b text-center transition hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold">
                    {payroll.employee_id}
                  </td>

                  <td>{payroll.month}</td>

                  <td>₹{payroll.basic_salary}</td>

                  <td>₹{payroll.bonus}</td>

                  <td>₹{payroll.deductions}</td>

                  <td className="font-bold text-blue-700">
                    ₹{payroll.net_salary}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        payroll.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payroll.status}
                    </span>

                  </td>

                  <td>

                    {payroll.status === "PAID" ? (

                      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">

                        <CheckCircle size={18} />

                        Paid

                      </span>

                    ) : (

                      <button
                        onClick={() => handlePaid(payroll.id)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                      >
                        Mark Paid
                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {open && (

        <PayrollModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            loadPayrolls();
            setOpen(false);
          }}
        />

      )}

    </DashboardLayout>
  );
}
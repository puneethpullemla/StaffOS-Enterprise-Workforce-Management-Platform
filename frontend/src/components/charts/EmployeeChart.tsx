import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", employees: 12 },
  { month: "Feb", employees: 16 },
  { month: "Mar", employees: 20 },
  { month: "Apr", employees: 24 },
  { month: "May", employees: 28 },
  { month: "Jun", employees: 34 },
];

export default function EmployeeChart() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Employee Growth
      </h2>

      <BarChart
        width={500}
        height={280}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="employees"
          fill="#2563eb"
        />

      </BarChart>

    </div>
  );
}
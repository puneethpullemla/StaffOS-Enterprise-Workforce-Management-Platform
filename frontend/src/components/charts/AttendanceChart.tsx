import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: {
    PRESENT?: number;
    ABSENT?: number;
    HALF_DAY?: number;
  };
}

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
];

export default function AttendanceChart({
  data,
}: Props) {

  const chartData = [
    {
      name: "Present",
      value: data.PRESENT || 0,
    },
    {
      name: "Absent",
      value: data.ABSENT || 0,
    },
    {
      name: "Half Day",
      value: data.HALF_DAY || 0,
    },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Attendance Status
      </h2>

      <PieChart
        width={350}
        height={280}
      >

        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={90}
          label
        >

          {chartData.map((entry, index) => (

            <Cell
              key={index}
              fill={COLORS[index]}
            />

          ))}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </div>
  );
}
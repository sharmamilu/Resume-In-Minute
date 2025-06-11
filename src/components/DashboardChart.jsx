import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardChart = () => {
  const data = {
    labels: ["Applied", "Saved", "Reviewed", "Interviews"],
    datasets: [
      {
        label: "Activity Stats",
        data: [5, 3, 2, 1],
        backgroundColor: ["#3498db", "#1abc9c", "#f39c12", "#e74c3c"],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#2c3e50",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#2c3e50",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#2c3e50",
        },
        grid: {
          color: "#ecf0f1",
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <h4>Application Insights</h4>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardChart;

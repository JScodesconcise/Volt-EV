import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./UsageReportChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsageReportChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
  axios.get("http://localhost:8080/api/usage/report/chart")
    .then((res) => {
      console.log("Page visit data:", res.data); // ✅ Add this line
        const labels = res.data.map((entry) => entry.page);
        const data = res.data.map((entry) => entry.visits);

        setChartData({
          labels,
          datasets: [
            {
              label: "Page Visits",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => console.error("Error fetching usage report data:", err));
  }, []);

  return (
    <div className="usage-report-chart-container">
      <h2>Website Usage Report</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Page Visit Frequency",
            },
          },
        }}
      />
    </div>
  );
};

export default UsageReportChart;

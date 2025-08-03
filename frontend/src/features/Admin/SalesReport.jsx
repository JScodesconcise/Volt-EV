import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesReport.css";

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/order/sales-report")
      .then((res) => {
        const rawData = res.data;

        // Transform object into array of { month, vehicles } for rendering
        const transformedData = Object.entries(rawData).map(([month, vehicles]) => ({
          month,
          vehicles,
        }));

        setReportData(transformedData);
      })
      .catch((err) => {
        console.error("Failed to fetch sales report:", err);
      });
  }, []);

  return (
    <div className="report-container">
      <h2>Monthly Sales Report</h2>
      {reportData.length === 0 ? (
        <p>No sales data available.</p>
      ) : (
        <ul className="sales-list">
          {reportData.map((entry, index) => (
            <li key={index} className="sales-item">
              <strong>{entry.month}:</strong>
              <ul>
                {(entry.vehicles || []).length === 0 ? (
                  <li style={{ marginLeft: "1rem" }}>No vehicles sold</li>
                ) : (
                  entry.vehicles.map((vehicle, i) => (
                    <li key={i} style={{ marginLeft: "1rem" }}>
                      • {vehicle}
                    </li>
                  ))
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalesReport;

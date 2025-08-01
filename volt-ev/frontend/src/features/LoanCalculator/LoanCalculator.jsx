import React, { useState } from "react";
import "./LoanCalculator.css";
import Navbar from "../Layout/Navbar";

function LoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  const calculateLoan = () => {
    const price = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12; 
    const months = parseInt(loanTerm);

    if (price && down >= 0 && rate >= 0 && months > 0) {
      const principal = price - down;

      if (principal <= 0) {
        setMonthlyPayment("0.00");
        return;
      }

      if (rate === 0) {
        // No interest case
        const payment = principal / months;
        setMonthlyPayment(payment.toFixed(2));
      } else {
        // Standard loan payment formula
        const payment =
          (principal * rate * Math.pow(1 + rate, months)) /
          (Math.pow(1 + rate, months) - 1);
        setMonthlyPayment(payment.toFixed(2));
      }
    }
  };

  const resetForm = () => {
    setVehiclePrice("");
    setDownPayment("");
    setLoanTerm("");
    setInterestRate("");
    setMonthlyPayment("");
  };

  return (
    <div className="loan-calculator-container">
      <div className="loan-calculator-header">
        <Navbar></Navbar>
        <h1>Loan Calculator</h1>
        <p>Estimate your monthly payments based on loan preferences</p>
      </div>

      <div className="loan-calculator-form">
        <div className="form-group">
          <label htmlFor="vehiclePrice">Vehicle Price</label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              id="vehiclePrice"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="downPayment">Down Payment</label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              id="downPayment"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Loan term</label>
          <select id="loanTerm" value={loanTerm} 
            onChange={(e) => setLoanTerm(e.target.value)}
            className="loan-term-dropdown"
            required>
            <option value="" disabled>Select</option>
            <option value="12">12 months (1 year)</option>
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">Interest Rate</label>
          <div className="input-wrapper">
            <span className="percentage-symbol">%</span>
            <input
              type="text"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="calculate-button" onClick={calculateLoan}>
            Calculate
          </button>
          <button type="button" className="reset-button" onClick={resetForm}>
            Reset
          </button>
        </div>

        <div className="form-group result-group">
          <label htmlFor="monthlyPayment">Monthly Payment</label>
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              id="monthlyPayment"
              value={monthlyPayment}
              readOnly
              placeholder="0.00"
              className="result-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;

import React, { useState } from "react";
import { makePayment } from "../../services/apiServices";
import "./Payments.css";

const Payment = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [type, setType] = useState("top-up");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const paymentData = {
        fromAccountId,
        toAccountId,
        amount,
        pin,
        type,
      };

      const response = await makePayment(paymentData);
      console.log("Payment successful:", response);
    } catch (err) {
      setError("Failed to make the payment. Please try again.");
      console.error("Payment failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment">
      <h3>Payment</h3>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="From Account ID"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
        />
        <input
          type="text"
          placeholder="To Account ID"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="top-up">Top-Up</option>
          <option value="transfer">Transfer</option>
          <option value="pay-bill">Pay Bill</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Payment;

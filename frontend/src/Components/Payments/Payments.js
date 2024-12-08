import React, { useState } from "react";
import { makePayment } from "../../services/apiServices";
import "./Payments.css";

const Payment = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [type, setType] = useState("deposit");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem("accounts")) || []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let fromAccount = null;
    let toAccount = null;

    if (type === "deposit") {
      toAccount = toAccountId.trim() === "" ? null : toAccountId;
    } else if (type === "withdrawal") {
      fromAccount = fromAccountId.trim() === "" ? null : fromAccountId;
    } else if (type === "transfer") {
      fromAccount = fromAccountId.trim() === "" ? null : fromAccountId;
      toAccount = toAccountId.trim() === "" ? null : toAccountId;
    }

    try {
      const paymentData = {
        fromAccountId: fromAccount,
        toAccountId: toAccount,
        amount,
        pin,
        type,
      };

      const response = await makePayment(paymentData);
      console.log("Payment successful:", response);

      let updatedAccounts = [...accounts];
      if (type === "deposit" && toAccount) {
        const toAccountIndex = updatedAccounts.findIndex((acc) => acc.id === parseInt(toAccount));
        if (toAccountIndex !== -1) {
          updatedAccounts[toAccountIndex].balance += parseFloat(amount);
        }
      } else if (type === "withdrawal" && fromAccount) {
        const fromAccountIndex = updatedAccounts.findIndex((acc) => acc.id === parseInt(fromAccount));
        if (fromAccountIndex !== -1) {
          updatedAccounts[fromAccountIndex].balance -= parseFloat(amount);
        }
      } else if (type === "transfer" && fromAccount && toAccount) {
        const fromAccountIndex = updatedAccounts.findIndex((acc) => acc.id === parseInt(fromAccount));
        const toAccountIndex = updatedAccounts.findIndex((acc) => acc.id === parseInt(toAccount));
        if (fromAccountIndex !== -1 && toAccountIndex !== -1) {
          updatedAccounts[fromAccountIndex].balance -= parseFloat(amount);
          updatedAccounts[toAccountIndex].balance += parseFloat(amount);
        }
      }

      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      setAccounts(updatedAccounts);

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
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="transfer">Transfer</option>
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

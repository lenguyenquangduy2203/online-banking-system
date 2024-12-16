import React, { useState } from "react";
import { makePayment } from "../../services/apiServices";
import "./Payments.css";

const Payment = ({ language }) => {
  const translations = {
    en: {
      title: "Payment",
      fromAccount: "From Account ID",
      toAccount: "To Account ID",
      amount: "Amount",
      pin: "PIN",
      deposit: "Deposit",
      withdrawal: "Withdrawal",
      transfer: "Transfer",
      submit: "Submit",
      processing: "Processing...",
      error: "Failed to make the payment. Please try again.",
    },
    vn: {
      title: "Thanh Toán",
      fromAccount: "ID Tài Khoản Gửi",
      toAccount: "ID Tài Khoản Nhận",
      amount: "Số Tiền",
      pin: "Mã PIN",
      deposit: "Nạp Tiền",
      withdrawal: "Rút Tiền",
      transfer: "Chuyển Tiền",
      submit: "Gửi",
      processing: "Đang Xử Lý...",
      error: "Không thể thực hiện thanh toán. Vui lòng thử lại.",
    },
  };

  const text = translations[language] || translations.en;

  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [type, setType] = useState("deposit");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("accounts")) || []
  );

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
        const toAccountIndex = updatedAccounts.findIndex(
          (acc) => acc.id === parseInt(toAccount)
        );
        if (toAccountIndex !== -1) {
          updatedAccounts[toAccountIndex].balance += parseFloat(amount);
        }
      } else if (type === "withdrawal" && fromAccount) {
        const fromAccountIndex = updatedAccounts.findIndex(
          (acc) => acc.id === parseInt(fromAccount)
        );
        if (fromAccountIndex !== -1) {
          updatedAccounts[fromAccountIndex].balance -= parseFloat(amount);
        }
      } else if (type === "transfer" && fromAccount && toAccount) {
        const fromAccountIndex = updatedAccounts.findIndex(
          (acc) => acc.id === parseInt(fromAccount)
        );
        const toAccountIndex = updatedAccounts.findIndex(
          (acc) => acc.id === parseInt(toAccount)
        );
        if (fromAccountIndex !== -1 && toAccountIndex !== -1) {
          updatedAccounts[fromAccountIndex].balance -= parseFloat(amount);
          updatedAccounts[toAccountIndex].balance += parseFloat(amount);
        }
      }

      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      setAccounts(updatedAccounts);
    } catch (err) {
      setError(text.error);
      console.error("Payment failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="payment">
        <h3>{text.title}</h3>

        {/* Tabs for Transaction Types */}
        <div className="tabs">
          <button
            className={type === "deposit" ? "active" : ""}
            onClick={() => setType("deposit")}
          >
            {text.deposit}
          </button>
          <button
            className={type === "withdrawal" ? "active" : ""}
            onClick={() => setType("withdrawal")}
          >
            {text.withdrawal}
          </button>
          <button
            className={type === "transfer" ? "active" : ""}
            onClick={() => setType("transfer")}
          >
            {text.transfer}
          </button>
        </div>

        {/* Form for Payment */}
        <form onSubmit={handlePayment}>
          {type !== "deposit" && (
            <input
              type="text"
              placeholder={text.fromAccount}
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
            />
          )}
          {type !== "withdrawal" && (
            <input
              type="text"
              placeholder={text.toAccount}
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
            />
          )}
          <input
            type="number"
            placeholder={text.amount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="password"
            placeholder={text.pin}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? text.processing : text.submit}
          </button>
        </form>

        {/* Error message */}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Payment;

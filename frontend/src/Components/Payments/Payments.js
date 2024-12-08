import React, { useEffect, useState } from "react";
import "./Payments.css";

const Payments = ({ language }) => {
  const translations = {
    en: {
      title: "Payments",
      noPayments: "No payments available.",
      error: "Failed to load payment data.",
      form: {
        recipient: "Recipient Account",
        amount: "Amount",
        notes: "Notes (optional)",
        submit: "Submit Payment",
      },
    },
    vn: {
      title: "Thanh Toán",
      noPayments: "Không có dữ liệu thanh toán.",
      error: "Không thể tải dữ liệu thanh toán.",
      form: {
        recipient: "Tài Khoản Người Nhận",
        amount: "Số Tiền",
        notes: "Ghi Chú (không bắt buộc)",
        submit: "Xác Nhận Thanh Toán",
      },
    },
  };

  const text = translations[language] || translations.en;

  const [error, setError] = useState("");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("payments")) || [];
        setPayments(data);
      } catch (err) {
        setError(text.error);
      }
    };

    fetchPayments();
  }, [text.error]);

  return (
    <div className="payments">
      <h3>{text.title}</h3>
      {error && <p className="error-message">{error}</p>}
      {!error && payments.length === 0 && <p>{text.noPayments}</p>}
      <form>
        <input type="text" placeholder={text.form.recipient} />
        <input type="number" placeholder={text.form.amount} />
        <textarea placeholder={text.form.notes} />
        <button type="submit">{text.form.submit}</button>
      </form>
    </div>
  );
};

export default Payments;

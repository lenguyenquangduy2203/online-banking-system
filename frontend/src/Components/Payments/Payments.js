import React, { useEffect, useState } from "react";
import "./Payments.css";
import axios from "axios";

const Payments = ({ language, apiKey }) => {
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
        pin: "PIN",
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
        pin: "Mã PIN",
      },
    },
  };

  const text = translations[language] || translations.en;

  const [error, setError] = useState("");
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    fromAccountId: "",
    toAccountId: "",
    amount: "",
    pin: "",
    type: "TRANSFER",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/transactions",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );
      if (response.data.status === "success") {
        alert("Payment successful!");
        setPayments((prevPayments) => [...prevPayments, formData]);
        setFormData({
          fromAccountId: "",
          toAccountId: "",
          amount: "",
          pin: "",
          type: "TRANSFER",
          notes: "",
        });
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/2/transactions",
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
            },
          }
        );
        if (response.data.status === "success") {
          setPayments(response.data.data);
        }
      } catch (err) {
        setError(text.error);
      }
    };

    fetchPayments();
  }, [text.error, apiKey]);

  return (
    <div className="payments">
      <h3>{text.title}</h3>
      {error && <p className="error-message">{error}</p>}
      {!error && payments.length === 0 && <p>{text.noPayments}</p>}
      <form onSubmit={handlePaymentSubmit}>
        <input
          type="text"
          name="fromAccountId"
          placeholder={text.form.recipient}
          value={formData.fromAccountId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="toAccountId"
          placeholder={text.form.recipient}
          value={formData.toAccountId}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder={text.form.amount}
          value={formData.amount}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder={text.form.notes}
          value={formData.notes}
          onChange={handleChange}
        />
        <input
          type="password"
          name="pin"
          placeholder={text.form.pin}
          value={formData.pin}
          onChange={handleChange}
        />
        <button type="submit">{text.form.submit}</button>
      </form>
    </div>
  );
};

export default Payments;

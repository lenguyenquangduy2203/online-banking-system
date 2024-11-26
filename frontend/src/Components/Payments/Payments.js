import React, { useState } from "react";
import "./Payments.css";

const Payments = ({ language }) => {
  const translations = {
    en: {
      title: "Payments",
      tabs: ["Transfers", "Payments"],
      transferForm: {
        title: "Transfer Money",
        recipient: "Recipient Account",
        amount: "Amount",
        notes: "Notes (optional)",
        submit: "Transfer",
      },
      paymentForm: {
        title: "Pay a Bill",
        select: "Select Bill",
        amount: "Amount",
        submit: "Pay",
      },
    },
    vi: {
      title: "Thanh Toán",
      tabs: ["Chuyển Tiền", "Thanh Toán"],
      transferForm: {
        title: "Chuyển Tiền",
        recipient: "Tài Khoản Người Nhận",
        amount: "Số Tiền",
        notes: "Ghi Chú (không bắt buộc)",
        submit: "Chuyển",
      },
      paymentForm: {
        title: "Thanh Toán Hóa Đơn",
        select: "Chọn Loại Hóa Đơn",
        amount: "Số Tiền",
        submit: "Thanh Toán",
      },
    },
  };

  const text = translations[language] || translations.en;  // Apply correct language

  const [tab, setTab] = useState("transfers");

  return (
    <div className="payments">
      <h2>{text.title}</h2>
      <div className="tabs">
        {text.tabs.map((tabName, index) => (
          <button
            key={index}
            className={tab === tabName.toLowerCase() ? "active" : ""}
            onClick={() => setTab(tabName.toLowerCase())}
          >
            {tabName}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tab === "transfers" && <Transfers text={text.transferForm} />}
        {tab === "payments" && <PaymentsForm text={text.paymentForm} />}
      </div>
    </div>
  );
};

const Transfers = ({ text }) => (
  <div>
    <h3>{text.title}</h3>
    <form>
      <input type="text" placeholder={text.recipient} />
      <input type="number" placeholder={text.amount} />
      <textarea placeholder={text.notes} />
      <button type="submit">{text.submit}</button>
    </form>
  </div>
);

const PaymentsForm = ({ text }) => (
  <div>
    <h3>{text.title}</h3>
    <form>
      <select>
        <option>{text.select}</option>
      </select>
      <input type="number" placeholder={text.amount} />
      <button type="submit">{text.submit}</button>
    </form>
  </div>
);

export default Payments;

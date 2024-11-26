import React from "react";
import "./Cards.css";

const cardData = [
  { balance: "35,450,200 VND", cardNumber: "4255 0102 0874 4345", type: "Visa" },
  { balance: "50,027,050 VND", cardNumber: "**** 4588", type: "Mastercard" },
  { balance: "20,000,000 VND", cardNumber: "**** 8908", type: "Visa" },
];

const Cards = ({ language }) => {
  const translations = {
    en: {
      title: "Bank Cards",
      balance: "Balance",
    },
    vi: {
      title: "Thẻ Ngân Hàng",
      balance: "Số Dư",
    },
  };

  const text = translations[language] || translations.en;

  return (
    <div className="cards">
      <h3>{text.title}</h3>
      <div className="card-list">
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <p>
              {text.balance}: {card.balance}
            </p>
            <p>
              {card.type} - {card.cardNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

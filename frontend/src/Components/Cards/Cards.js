import React, { useEffect, useState } from "react";
import { getCards } from "../../services/apiServices";
import "./Cards.css";

const Cards = ({ language }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  const translations = {
    en: { title: "Bank Cards", balance: "Balance" },
    vn: { title: "Thẻ Ngân Hàng", balance: "Số Dư" },
  };

  const text = translations[language] || translations.en;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (err) {
        setError("Failed to load cards.");
      }
    };

    fetchCards();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="cards">
      <h3>{text.title}</h3>
      <div className="card-list">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <p>{text.balance}: {card.balance}</p>
            <p>{card.type} - {card.cardNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

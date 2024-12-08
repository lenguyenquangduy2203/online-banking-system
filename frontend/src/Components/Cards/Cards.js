import { useEffect, useState } from "react";
import React from "react";
import "./Cards.css";

const Cards = ({ language }) => {
  const translations = {
    en: {
      title: "Bank Cards",
      balance: "Balance",
    },
    vn: {
      title: "Thẻ Ngân Hàng",
      balance: "Số Dư",
    },
  };

  const text = translations[language] || translations.en;

  // State to manage card data
  const [cardData, setCardData] = useState(
    JSON.parse(localStorage.getItem("accounts")) || []
  );

  // Effect to reload card data when `localStorage` changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedData = JSON.parse(localStorage.getItem("accounts")) || [];
      setCardData(updatedData);
    };

    // Listen for `storage` events (if other tabs modify localStorage)
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
              {card.type} - {card.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

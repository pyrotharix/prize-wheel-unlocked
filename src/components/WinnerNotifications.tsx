
import React, { useState, useEffect } from 'react';

const WINNER_MESSAGES = [
  "Emma Johnson from USA just won an iPhone 15 Pro Max!",
  "Carlos Sanchez from Mexico invited 25 friends and earned his iPhone!",
  "Lina Müller from Germany received her prize — delivery in 7 days!",
  "Sophia Martinez from Brazil just won iPhone 14 Pro Max – Silver!",
  "Ethan Nguyen from Vietnam invited 25 friends and unlocked delivery!",
  "Fatima Hassan from UAE completed payment — courier arriving soon!",
  "David Chen from Canada just claimed his iPhone 13 Pro Gold!",
  "Maria Rodriguez from Spain won iPhone 15 Plus Starlight!",
  "Ahmed Al-Rashid from Morocco completed his referrals successfully!",
  "Isabella Silva from Portugal received her iPhone delivery confirmation!"
];

export const WinnerNotifications = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % WINNER_MESSAGES.length);
        setIsVisible(true);
      }, 500);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-y border-green-500/30 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="text-green-300 font-semibold text-sm md:text-base">
            🎉 {WINNER_MESSAGES[currentMessage]}
          </span>
        </div>
      </div>
    </div>
  );
};

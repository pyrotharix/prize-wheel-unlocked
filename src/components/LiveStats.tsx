
import React, { useState, useEffect } from 'react';

export const LiveStats = () => {
  const [onlineUsers, setOnlineUsers] = useState(194);
  const [prizesDelivered, setPrizesDelivered] = useState(6128);
  const [successfulDeliveries, setSuccessfulDeliveries] = useState(5765);

  useEffect(() => {
    // Update online users every 10 seconds
    const onlineInterval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newValue = Math.max(180, Math.min(220, prev + change));
        return newValue;
      });
    }, 10000);

    // Update prizes every minute
    const prizesInterval = setInterval(() => {
      setPrizesDelivered(prev => prev + 1);
    }, 60000);

    // Update deliveries every 2 minutes
    const deliveriesInterval = setInterval(() => {
      setSuccessfulDeliveries(prev => prev + 1);
    }, 120000);

    return () => {
      clearInterval(onlineInterval);
      clearInterval(prizesInterval);
      clearInterval(deliveriesInterval);
    };
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-sm border-y border-blue-500/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Online Now:</span>
            <span className="font-bold text-green-400 text-lg">{onlineUsers.toLocaleString()}</span>
            <span className="text-sm text-gray-400">users</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Prizes Claimed:</span>
            <span className="font-bold text-yellow-400 text-lg">{prizesDelivered.toLocaleString()}</span>
            <span className="text-sm text-gray-400">iPhones</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Delivered:</span>
            <span className="font-bold text-blue-400 text-lg">{successfulDeliveries.toLocaleString()}</span>
            <span className="text-sm text-gray-400">confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

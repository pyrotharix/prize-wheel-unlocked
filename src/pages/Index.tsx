
import React, { useState, useEffect } from 'react';
import { FortuneWheel } from '../components/FortuneWheel';
import { LiveStats } from '../components/LiveStats';
import { WinnerNotifications } from '../components/WinnerNotifications';
import { RegistrationModal } from '../components/RegistrationModal';
import { ReferralTracker } from '../components/ReferralTracker';
import { DeliveryForm } from '../components/DeliveryForm';
import { Button } from '@/components/ui/button';
import { MessageSquare, Share2 } from 'lucide-react';

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [user, setUser] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    // Check if user is already registered
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsRegistered(true);
      setReferralCount(userData.referralCount || 0);
    }

    // Check for referral parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    if (referralCode) {
      localStorage.setItem('referrer', referralCode);
    }
  }, []);

  const handleWheelSpin = (prize) => {
    setWonPrize(prize);
    if (!isRegistered) {
      setShowRegistration(true);
    }
  };

  const handleRegistration = (userData) => {
    const referrer = localStorage.getItem('referrer');
    const newUser = {
      ...userData,
      referralCode: generateReferralCode(),
      referralCount: 0,
      registeredAt: new Date().toISOString(),
      referredBy: referrer || null
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsRegistered(true);
    setShowRegistration(false);

    // If user was referred, increment the referrer's count
    if (referrer) {
      incrementReferrerCount(referrer);
    }
  };

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const incrementReferrerCount = (referrerCode) => {
    // In a real app, this would be handled by the backend
    // For demo purposes, we'll simulate it
    console.log(`Incrementing count for referrer: ${referrerCode}`);
  };

  const updateReferralCount = (count) => {
    setReferralCount(count);
    if (user) {
      const updatedUser = { ...user, referralCount: count };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      if (count >= 25) {
        setShowDelivery(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%2300d2ff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Ultimate iPhone Giveaway
          </div>
          <nav className="hidden md:flex space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-400 transition-colors">How it Works</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Winners</a>
            <a href="#" className="hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Live Stats */}
      <div className="pt-20">
        <LiveStats />
      </div>

      {/* Winner Notifications */}
      <WinnerNotifications />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent animate-pulse">
            Spin the Wheel
          </h1>
          <h2 className="text-2xl md:text-4xl mb-4 text-blue-300">
            Win Your Dream iPhone Today!
          </h2>
          <p className="text-xl text-gray-300 border-b-2 border-blue-400 inline-block pb-1 animate-pulse">
            Invite 25 friends to unlock free delivery of your prize
          </p>
        </div>

        {/* Fortune Wheel Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Panel - Instructions */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-300">How to Win</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">1</div>
                  <span>Spin the wheel to win a prize</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">2</div>
                  <span>Register to claim your prize</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">3</div>
                  <span>Invite 25 friends to unlock delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">4</div>
                  <span>Pay $2.99 for shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Fortune Wheel */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <FortuneWheel onSpin={handleWheelSpin} disabled={isRegistered && !user} />
            
            {isRegistered && (
              <div className="mt-8 w-full max-w-md">
                <ReferralTracker 
                  user={user}
                  referralCount={referralCount}
                  onReferralCountUpdate={updateReferralCount}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Trust Indicators */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-300">Recent Winners</h3>
              <div className="space-y-3">
                {[
                  { name: "Emma J.", country: "USA", phone: "iPhone 14 Pro Max" },
                  { name: "Carlos S.", country: "Mexico", phone: "iPhone 15 Plus" },
                  { name: "Lina M.", country: "Germany", phone: "iPhone 13 Pro" },
                ].map((winner, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {winner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{winner.name}</div>
                      <div className="text-gray-400 text-xs">{winner.country} • {winner.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-2 text-green-300">Trust Score</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-sm text-gray-400">Verified Secure</div>
            </div>
          </div>
        </div>

        {/* Delivery Section */}
        {referralCount >= 25 && (
          <div className="mt-12">
            <DeliveryForm user={user} />
          </div>
        )}
      </div>

      {/* Floating Chat Button */}
      <Button 
        className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 shadow-lg shadow-blue-500/25"
        size="icon"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        onRegister={handleRegistration}
        wonPrize={wonPrize}
      />

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-sm border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Ultimate iPhone Giveaway — All rights reserved
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center mt-4">
            This site is not affiliated with Apple Inc. The giveaway is conducted independently.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

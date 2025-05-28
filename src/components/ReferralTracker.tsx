
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ReferralTracker = ({ user, referralCount, onReferralCountUpdate }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  if (!user) return null;

  const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
  const progressPercentage = Math.min((referralCount / 25) * 100, 100);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Share this link with your friends to earn referrals.",
    });
  };

  const simulateReferral = () => {
    // For demo purposes - simulate a new referral
    if (referralCount < 25) {
      const newCount = referralCount + 1;
      onReferralCountUpdate(newCount);
      
      toast({
        title: "New Referral! 🎉",
        description: `You now have ${newCount} referrals. ${25 - newCount} more to unlock delivery!`,
      });

      // Show confetti effect at milestones
      if (newCount === 5 || newCount === 10 || newCount === 15 || newCount === 20 || newCount === 25) {
        triggerConfetti();
      }
    }
  };

  const triggerConfetti = () => {
    // Simple confetti effect
    const confetti = document.createElement('div');
    confetti.className = 'fixed inset-0 pointer-events-none z-50';
    confetti.innerHTML = Array.from({ length: 50 }, (_, i) => 
      `<div class="absolute animate-bounce bg-yellow-400 w-2 h-2 rounded-full" style="
        top: ${Math.random() * 100}%; 
        left: ${Math.random() * 100}%; 
        animation-delay: ${Math.random() * 2}s;
        animation-duration: ${1 + Math.random()}s;
      "></div>`
    ).join('');
    document.body.appendChild(confetti);
    setTimeout(() => document.body.removeChild(confetti), 3000);
  };

  const shareToWhatsApp = () => {
    const message = `🎉 Join me in this amazing iPhone giveaway! Spin the wheel and win your dream iPhone! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const shareToTelegram = () => {
    const message = `🎉 Amazing iPhone giveaway! Spin and win! ${referralLink}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`);
  };

  const shareToTwitter = () => {
    const message = `🎉 Just spun the wheel in this amazing iPhone giveaway! Your turn to win! ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 w-full">
      <h3 className="text-xl font-bold mb-4 text-center text-blue-300">
        Invite Friends to Unlock Delivery
      </h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-blue-400 font-bold">{referralCount} / 25</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-center mt-2">
          {referralCount >= 25 ? (
            <span className="text-green-400 font-bold">🎉 Delivery Unlocked!</span>
          ) : (
            <span className="text-gray-400 text-sm">
              {25 - referralCount} more friends needed
            </span>
          )}
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">Your Referral Link</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-300"
          />
          <Button
            onClick={copyReferralLink}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share with Friends
        </Button>

        {showShareOptions && (
          <div className="grid grid-cols-2 gap-2 animate-fade-in">
            <Button onClick={shareToWhatsApp} variant="outline" size="sm" className="bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30">
              WhatsApp
            </Button>
            <Button onClick={shareToTelegram} variant="outline" size="sm" className="bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30">
              Telegram
            </Button>
            <Button onClick={shareToFacebook} variant="outline" size="sm" className="bg-blue-700/20 border-blue-600 text-blue-300 hover:bg-blue-700/30">
              Facebook
            </Button>
            <Button onClick={shareToTwitter} variant="outline" size="sm" className="bg-sky-600/20 border-sky-500 text-sky-300 hover:bg-sky-600/30">
              Twitter
            </Button>
          </div>
        )}
      </div>

      {/* Demo Button */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <Button
          onClick={simulateReferral}
          disabled={referralCount >= 25}
          variant="outline"
          size="sm"
          className="w-full text-gray-400 border-gray-600 hover:bg-gray-700"
        >
          🎯 Simulate Referral (Demo)
        </Button>
      </div>
    </div>
  );
};

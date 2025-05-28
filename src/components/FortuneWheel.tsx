
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const WHEEL_SEGMENTS = [
  { 
    id: 1, 
    model: "iPhone 15 Pro Max", 
    color: "Sierra Blue", 
    bgColor: "from-blue-600 to-blue-800",
    textColor: "text-white" 
  },
  { 
    id: 2, 
    model: "iPhone 15 Plus", 
    color: "Starlight", 
    bgColor: "from-gray-200 to-gray-400",
    textColor: "text-gray-800" 
  },
  { 
    id: 3, 
    model: "iPhone 15", 
    color: "Midnight", 
    bgColor: "from-gray-800 to-black",
    textColor: "text-white" 
  },
  { 
    id: 4, 
    model: "iPhone 15 Pro", 
    color: "Silver", 
    bgColor: "from-gray-300 to-gray-500",
    textColor: "text-gray-800" 
  },
  { 
    id: 5, 
    model: "iPhone 14 Pro Max", 
    color: "Deep Purple", 
    bgColor: "from-purple-600 to-purple-800",
    textColor: "text-white" 
  },
  { 
    id: 6, 
    model: "iPhone 14 Plus", 
    color: "PRODUCT(RED)", 
    bgColor: "from-red-600 to-red-800",
    textColor: "text-white" 
  },
  { 
    id: 7, 
    model: "iPhone 13 Pro", 
    color: "Gold", 
    bgColor: "from-yellow-400 to-yellow-600",
    textColor: "text-gray-800" 
  },
  { 
    id: 8, 
    model: "iPhone SE", 
    color: "Black", 
    bgColor: "from-gray-900 to-black",
    textColor: "text-white" 
  }
];

export const FortuneWheel = ({ onSpin, disabled = false }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const wheelRef = useRef(null);

  const handleSpin = () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    setShowResult(false);

    // Generate random rotation (multiple full rotations + random position)
    const minSpins = 5;
    const maxSpins = 8;
    const spins = Math.random() * (maxSpins - minSpins) + minSpins;
    const finalRotation = spins * 360 + Math.random() * 360;
    
    setRotation(finalRotation);

    // Calculate which segment was selected
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const normalizedRotation = (360 - (finalRotation % 360)) % 360;
    const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
    const winner = WHEEL_SEGMENTS[selectedIndex];

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(winner);
      setShowResult(true);
      onSpin(winner);
    }, 4000);
  };

  const segmentAngle = 360 / WHEEL_SEGMENTS.length;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Spinning Particles Effect */}
        {isSpinning && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                style={{
                  top: `${50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                  left: `${50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Wheel */}
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full relative overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-400/30"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
          >
            {WHEEL_SEGMENTS.map((segment, index) => {
              const angle = segmentAngle * index;
              return (
                <div
                  key={segment.id}
                  className={`absolute w-full h-full bg-gradient-to-r ${segment.bgColor} border-r border-black/20`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${
                      50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)
                    }% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-2"
                    style={{
                      transform: `rotate(${segmentAngle / 2}deg) translate(0, -60px)`,
                      transformOrigin: '50% 100%'
                    }}
                  >
                    <div className={`font-bold text-xs md:text-sm ${segment.textColor} drop-shadow-lg`}>
                      {segment.model}
                    </div>
                    <div className={`text-xs ${segment.textColor} opacity-80 drop-shadow-lg`}>
                      {segment.color}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-4 border-yellow-300 shadow-lg">
            <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse"></div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 w-0 h-0 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning || disabled}
        className={`
          relative px-8 py-4 text-xl font-bold rounded-full
          ${isSpinning 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 animate-pulse shadow-lg shadow-green-500/30'
          }
          transition-all duration-300 transform hover:scale-105
        `}
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Spinning...
          </span>
        ) : (
          'SPIN TO WIN'
        )}
      </Button>

      {/* Result Modal */}
      {showResult && selectedPrize && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 rounded-2xl border border-yellow-400 max-w-md mx-4 text-center relative overflow-hidden">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Congratulations! 🎉
            </h2>
            <p className="text-xl mb-6">
              You won the <span className="font-bold text-yellow-400">{selectedPrize.model}</span> in <span className="font-bold text-yellow-400">{selectedPrize.color}</span>!
            </p>
            <Button
              onClick={() => setShowResult(false)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-bold"
            >
              Claim Your Prize
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

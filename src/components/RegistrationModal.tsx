
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export const RegistrationModal = ({ isOpen, onClose, onRegister, wonPrize }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate registration process
    setTimeout(() => {
      onRegister(formData);
      setIsSubmitting(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl border border-blue-500/30 max-w-md w-full p-6 relative">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
            Claim Your Prize! 🎉
          </h2>
          {wonPrize && (
            <p className="text-lg text-gray-300">
              You won: <span className="font-bold text-yellow-400">{wonPrize.model} - {wonPrize.color}</span>
            </p>
          )}
          <p className="text-sm text-gray-400 mt-2">
            Register now to secure your iPhone and start inviting friends!
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters with letters and numbers
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-bold text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </span>
            ) : (
              'Register & Claim Prize'
            )}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
};

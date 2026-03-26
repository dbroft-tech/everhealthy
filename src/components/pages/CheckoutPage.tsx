import { useState } from 'react';
import { Plus, Minus, Trash2, CreditCard, ShoppingBag, Smartphone, Loader2 } from 'lucide-react';
import { CartItem } from '../Cart';
import { toast } from 'sonner';
import { Currency, convertPrice, formatPrice } from '../../utils/currency';

interface CheckoutPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  currency: Currency;
  exchangeRate: number;
}

export function CheckoutPage({ items, onUpdateQuantity, onRemoveItem, currency, exchangeRate }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mtn' | 'airtel'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const displaySubtotal = convertPrice(subtotal, exchangeRate, currency);
  const displayTax = convertPrice(tax, exchangeRate, currency);
  const displayShipping = convertPrice(shipping, exchangeRate, currency);
  const displayTotal = convertPrice(total, exchangeRate, currency);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPaymentStatus = async (txId: string) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/check-payment-status?transactionId=${txId}`,
        {
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return null;
    }
  };

  const handleMobileMoneyPayment = async (provider: 'MTN' | 'AIRTEL') => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please fill in your name, email, and phone number');
      return;
    }

    setIsProcessing(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const orderId = `ORD-${Date.now()}`;
      const endpoint = provider === 'MTN' ? 'mtn-mobile-money' : 'airtel-mobile-money';

      const response = await fetch(
        `${supabaseUrl}/functions/v1/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderId,
            phoneNumber: formData.phone,
            amount: total,
            currency: currency === 'UGX' ? 'UGX' : 'USD',
            customerName: formData.fullName,
            customerEmail: formData.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.error || 'Payment request failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      setTransactionId(data.transactionId);
      toast.success(`Payment request sent! Please check your ${provider} phone to approve the transaction.`, {
        duration: 10000,
      });

      let attempts = 0;
      const maxAttempts = 30;
      const checkInterval = setInterval(async () => {
        attempts++;

        const statusData = await checkPaymentStatus(data.transactionId);

        if (statusData && statusData.transaction) {
          if (statusData.transaction.status === 'success') {
            clearInterval(checkInterval);
            toast.success('Payment successful! Your order has been placed.');
            setIsProcessing(false);
            setTransactionId(null);
          } else if (statusData.transaction.status === 'failed') {
            clearInterval(checkInterval);
            toast.error('Payment failed. Please try again.');
            setIsProcessing(false);
            setTransactionId(null);
          }
        }

        if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          toast.info('Payment is taking longer than expected. We will notify you once completed.');
          setIsProcessing(false);
        }
      }, 5000);

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'mtn') {
      handleMobileMoneyPayment('MTN');
    } else if (paymentMethod === 'airtel') {
      handleMobileMoneyPayment('AIRTEL');
    } else {
      toast.success('Order placed successfully! Thank you for your purchase.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-emerald-600 font-semibold mb-3">
                        {formatPrice(convertPrice(item.product.price, exchangeRate, currency), currency)}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="p-1.5 hover:bg-white rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-white rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="ml-auto text-red-600 hover:text-red-700 p-1.5"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(convertPrice(item.product.price * item.quantity, exchangeRate, currency), currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-semibold">Credit/Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mtn')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                    paymentMethod === 'mtn'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">MTN Mobile Money</span>
                    <span className="text-xs text-gray-500">Pay with MTN MoMo</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('airtel')}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                    paymentMethod === 'airtel'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Airtel Money</span>
                    <span className="text-xs text-gray-500">Pay with Airtel Money</span>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {(paymentMethod === 'mtn' || paymentMethod === 'airtel') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Instructions:</strong>
                  </p>
                  <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
                    <li>Make sure your phone number is correct</li>
                    <li>Click "Place Order" to initiate payment</li>
                    <li>You'll receive a prompt on your phone</li>
                    <li>Enter your Mobile Money PIN to complete payment</li>
                  </ol>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Total</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(displaySubtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(displayTax, currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(displayShipping, currency)}</span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                    Add {formatPrice(convertPrice(50 - subtotal, exchangeRate, currency), currency)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span>{formatPrice(displayTotal, currency)}</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'card' ? <CreditCard className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                    Place Order
                  </>
                )}
              </button>
              {isProcessing && transactionId && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 text-center">
                    Waiting for payment confirmation on your phone...
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-500 text-center mt-4">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

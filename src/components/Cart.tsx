import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';
import { Currency, convertPrice, formatPrice } from '../utils/currency';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  currency: Currency;
  exchangeRate: number;
}

export function Cart({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency,
  exchangeRate,
}: CartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const displaySubtotal = convertPrice(subtotal, exchangeRate, currency);
  const displayTax = convertPrice(tax, exchangeRate, currency);
  const displayTotal = convertPrice(total, exchangeRate, currency);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Add some products to get started!
            </p>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-emerald-600 font-semibold mb-2">
                        {formatPrice(convertPrice(item.product.price, exchangeRate, currency), currency)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-6 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(displaySubtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(displayTax, currency)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(displayTotal, currency)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onCheckout();
                  onClose();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

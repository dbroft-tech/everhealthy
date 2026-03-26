import { Star, ShoppingCart } from 'lucide-react';
import { Currency, convertPrice, formatPrice } from '../utils/currency';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  currency?: Currency;
  exchangeRate?: number;
}

export function ProductCard({ product, onAddToCart, currency = 'USD', exchangeRate = 3700 }: ProductCardProps) {
  const displayPrice = convertPrice(product.price, exchangeRate, currency);
  const displayOriginalPrice = product.originalPrice
    ? convertPrice(product.originalPrice, exchangeRate, currency)
    : undefined;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(displayPrice, currency)}
            </div>
            {displayOriginalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(displayOriginalPrice, currency)}
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

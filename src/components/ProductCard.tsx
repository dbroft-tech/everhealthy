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

export function ProductCard({
  product,
  onAddToCart,
  currency = 'USD',
  exchangeRate = 3700
}: ProductCardProps) {

  const displayPrice = convertPrice(product.price, exchangeRate, currency);

  // ✅ WhatsApp numbers
  const primaryNumber = '256707125860';
  const secondaryNumber = '256768779337';

  const message = encodeURIComponent(
    `Hello, I want to order ${product.name}`
  );

  const whatsappPrimary = `https://wa.me/${primaryNumber}?text=${message}`;
  const whatsappSecondary = `https://wa.me/${secondaryNumber}?text=${message}`;

  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h3 className="font-bold text-gray-900 text-lg mb-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <p className="text-xl font-bold text-emerald-600 mb-3">
          {formatPrice(displayPrice, currency)}
        </p>

        {/* ⭐ Rating */}
        <p className="text-yellow-500 text-sm mb-4">
          ⭐ {product.rating} ({product.reviews})
        </p>

        {/* 🔥 BUTTONS */}
        <div className="flex flex-col gap-2">

          {/* ADD TO CART */}
          <button
            onClick={() => onAddToCart(product)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>

          {/* ✅ WHATSAPP PRIMARY */}
          <a
            href={whatsappPrimary}
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-center"
          >
            Order on WhatsApp
          </a>

          {/* ✅ BACKUP NUMBER */}
          <a
            href={whatsappSecondary}
            target="_blank"
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg text-center text-sm"
          >
            Alternative WhatsApp
          </a>

        </div>

      </div>
    </div>
  );
}
import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { ProductsPage } from './components/pages/ProductsPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { ContactPage } from './components/pages/ContactPage';
import { Product } from './components/ProductCard';
import { CartItem } from './components/Cart';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Expanded product data
const products: Product[] = [
  {
    id: '1',
    name: 'Vitamin D3 5000 IU',
    description: 'High potency vitamin D supplement for bone and immune health',
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.5,
    reviews: 328,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '2',
    name: 'Blood Pressure Monitor',
    description: 'Digital automatic blood pressure monitor with large LCD display',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 542,
    image: 'https://images.unsplash.com/photo-1606206873764-fd15e242df52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NzYzOTg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Medical Devices',
    inStock: true,
  },
  {
    id: '3',
    name: 'Omega-3 Fish Oil 1000mg',
    description: 'Premium fish oil supplement for heart and brain health',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.6,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '4',
    name: 'Pain Relief Ibuprofen 200mg',
    description: 'Fast-acting pain relief and fever reducer, 100 tablets',
    price: 8.99,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lfGVufDF8fHx8MTc2NzY4MjAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pain Relief',
    inStock: true,
  },
  {
    id: '5',
    name: 'Multivitamin Complex',
    description: 'Complete daily multivitamin with essential nutrients',
    price: 15.99,
    originalPrice: 21.99,
    rating: 4.4,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '6',
    name: 'Digital Thermometer',
    description: 'Fast and accurate digital thermometer with fever indicator',
    price: 12.99,
    rating: 4.5,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1606206873764-fd15e242df52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NzYzOTg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Medical Devices',
    inStock: true,
  },
  {
    id: '7',
    name: 'Antibiotic Cream',
    description: 'First aid antibiotic ointment for minor cuts and burns',
    price: 6.99,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lfGVufDF8fHx8MTc2NzY4MjAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'First Aid',
    inStock: true,
  },
  {
    id: '8',
    name: 'Probiotic 50 Billion CFU',
    description: 'Advanced probiotic formula for digestive and immune support',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '9',
    name: 'Calcium + Vitamin D',
    description: 'Essential calcium supplement with vitamin D3 for bone strength',
    price: 14.99,
    rating: 4.5,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '10',
    name: 'Glucose Monitor Kit',
    description: 'Complete blood glucose monitoring system with test strips',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1606206873764-fd15e242df52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NzYzOTg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Medical Devices',
    inStock: true,
  },
  {
    id: '11',
    name: 'Acetaminophen 500mg',
    description: 'Extra strength pain reliever and fever reducer',
    price: 9.99,
    rating: 4.6,
    reviews: 672,
    image: 'https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lfGVufDF8fHx8MTc2NzY4MjAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pain Relief',
    inStock: true,
  },
  {
    id: '12',
    name: 'Vitamin C 1000mg',
    description: 'High potency vitamin C for immune system support',
    price: 11.99,
    originalPrice: 16.99,
    rating: 4.7,
    reviews: 389,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '13',
    name: 'First Aid Kit - 100 Pieces',
    description: 'Complete first aid kit for home and travel',
    price: 29.99,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lfGVufDF8fHx8MTc2NzY4MjAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'First Aid',
    inStock: true,
  },
  {
    id: '14',
    name: 'Zinc 50mg Tablets',
    description: 'Essential mineral supplement for immune health',
    price: 10.99,
    rating: 4.5,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
  {
    id: '15',
    name: 'Pulse Oximeter',
    description: 'Fingertip pulse oximeter for oxygen saturation monitoring',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1606206873764-fd15e242df52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NzYzOTg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Medical Devices',
    inStock: true,
  },
  {
    id: '16',
    name: 'Magnesium 400mg',
    description: 'High absorption magnesium for muscle and nerve function',
    price: 13.99,
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY3NjMyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vitamins & Supplements',
    inStock: true,
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'checkout' | 'contact'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const handleNavigate = (page: 'home' | 'products' | 'checkout' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'home' && (
        <HomePage 
          products={products}
          onAddToCart={handleAddToCart}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'products' && (
        <ProductsPage 
          products={products}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage />
      )}

      <Footer />

      <Toaster position="top-right" />
    </div>
  );
}

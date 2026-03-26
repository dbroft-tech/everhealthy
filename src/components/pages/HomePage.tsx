import { ArrowRight, ShieldCheck, Truck, Headphones as HeadphonesIcon, Award } from 'lucide-react';
import { Product, ProductCard } from '../ProductCard';
import { Currency } from '../../utils/currency';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: 'home' | 'products' | 'checkout' | 'contact') => void;
  currency: Currency;
  exchangeRate: number;
}

export function HomePage({ products, onAddToCart, onNavigate, currency, exchangeRate }: HomePageProps) {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Trusted by 50,000+ Customers
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <br />
                <span className="text-emerald-600">Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Quality healthcare products delivered to your door. Fast, reliable, and always here when you need us.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 transition-all hover:border-emerald-600"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1080"
                alt="Herbal Medicine Products"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Certified Products',
                description: 'FDA approved medications',
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Free shipping over $50',
              },
              {
                icon: HeadphonesIcon,
                title: '24/7 Support',
                description: 'Expert pharmacist help',
              },
              {
                icon: Award,
                title: 'Best Prices',
                description: 'Price match guarantee',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4 group-hover:bg-emerald-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular health and wellness products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                currency={currency}
                exchangeRate={exchangeRate}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('products')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Get exclusive deals, health tips, and product updates delivered to your inbox.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '500+', label: 'Products' },
                { number: '24/7', label: 'Support' },
                { number: '100%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-emerald-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

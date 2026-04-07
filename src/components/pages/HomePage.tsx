import { ArrowRight, ShieldCheck, Truck, Headphones as HeadphonesIcon, Award } from 'lucide-react';
import { Product, ProductCard } from '../ProductCard';
import { Currency } from '../../utils/currency';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: 'home' | 'products' | 'checkout' | 'contact' | 'about' | 'testimonials' | 'business') => void;
  currency: Currency;
  exchangeRate: number;
}

export function HomePage({ products, onAddToCart, onNavigate, currency, exchangeRate }: HomePageProps) {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Natural Herbal Medicine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-emerald-900/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-8">
            <div className="inline-block animate-fade-in">
              <span className="relative overflow-hidden bg-gradient-to-r from-emerald-500/30 via-emerald-400/30 to-emerald-500/30 backdrop-blur-sm text-emerald-200 border border-emerald-400/40 px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/20">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
                <span className="relative">Trusted by 50,000+ Customers Worldwide</span>
              </span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Natural Healing,
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                Global Reach
              </span>
            </h1>
            <p className="text-2xl text-gray-200 leading-relaxed drop-shadow-lg">
              Experience the power of Ayurvedic wellness with our ISO certified, WHO approved herbal medicines delivered worldwide.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('products')}
                className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 text-white px-10 py-5 rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/60"
              >
                <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/30"></span>
                <span className="relative flex items-center gap-3">
                  Shop Now
                  <ArrowRight className="w-6 h-6" />
                </span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg border-2 border-white/30 transition-all hover:border-white/50 shadow-xl"
              >
                Contact Us
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: '30+', label: 'Years Experience' },
                { number: '15+', label: 'Countries' },
                { number: '3000+', label: 'Years of Tradition' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'ISO & WHO Certified',
                description: 'Internationally approved products',
              },
              {
                icon: Truck,
                title: 'Global Delivery',
                description: 'Shipping to 15+ countries',
              },
              {
                icon: HeadphonesIcon,
                title: '24/7 Support',
                description: 'Expert guidance anytime',
              },
              {
                icon: Award,
                title: 'Ayurvedic Excellence',
                description: '3000+ years of tradition',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 rounded-2xl transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-emerald-500/30"></div>
                  <div className="absolute inset-[2px] bg-gradient-to-t from-transparent via-white/30 to-white/50 rounded-2xl transform group-hover:rotate-12 transition-transform duration-300"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl transform group-hover:scale-90 transition-transform duration-300"></div>
                  <feature.icon className="w-10 h-10 text-emerald-600 relative z-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="relative overflow-hidden bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg shadow-emerald-500/40">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                <span className="relative">Our Bestsellers</span>
              </span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular Ayurvedic health and wellness products, trusted by thousands worldwide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
              className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 text-white px-12 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-400/50"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/30"></span>
              <span className="relative flex items-center gap-3">
                View All Products
                <ArrowRight className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="bg-emerald-400/30 backdrop-blur-sm text-emerald-100 border border-emerald-300/40 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  Business Opportunity
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Turn Your Passion for Health into Income
              </h2>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Join thousands of successful entrepreneurs building wealth while helping others achieve natural wellness. Start your business with minimal investment and unlimited growth potential.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => onNavigate('business')}
                  className="bg-white text-emerald-700 px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-xl hover:scale-105"
                >
                  Learn More
                  <ArrowRight className="w-6 h-6" />
                </button>
                <a
                  href={`https://wa.me/256702111134?text=${encodeURIComponent("I'm interested in the business opportunity")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg border-2 border-white/30 transition-all hover:border-white/50"
                >
                  Contact Us
                </a>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '30%', label: 'Profit Margin' },
                  { number: '15+', label: 'Countries' },
                  { number: '50K+', label: 'Distributors' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-emerald-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/companystory.jpeg"
                alt="Business opportunity"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Natural ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-emerald-800/90 to-teal-800/95"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-white">
                Join Our Wellness Community
              </h2>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Get exclusive deals, Ayurvedic health tips, and product updates delivered to your inbox. Start your journey to natural wellness today.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-5 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-lg"
                />
                <button className="bg-white text-emerald-700 px-10 py-5 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '39+', label: 'Premium Products' },
                { number: '24/7', label: 'Expert Support' },
                { number: '100%', label: 'Natural & Safe' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all border border-white/20 hover:scale-105 duration-300"
                >
                  <div className="text-5xl font-bold mb-2 text-white">{stat.number}</div>
                  <div className="text-emerald-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

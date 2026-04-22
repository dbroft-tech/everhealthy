import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'products' | 'checkout' | 'contact' | 'about' | 'testimonials' | 'business') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Everhealthy</h2>
                <p className="text-xs text-emerald-400">Your Wellness Partner</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              ISO & WHO certified Ayurvedic products for natural health and wellness. Join thousands worldwide achieving better health naturally.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', page: 'home' as const },
                { label: 'Products', page: 'products' as const },
                { label: 'Testimonials', page: 'testimonials' as const },
                { label: 'About Us', page: 'about' as const },
                { label: 'Contact', page: 'contact' as const },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Business</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('business')}
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Business Opportunity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('business')}
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  How to Earn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('business')}
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('business')}
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Join Now
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Location</p>
                <p className="text-gray-300 text-sm">Kampala, Uganda</p>
              </li>
              <li>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Phone</p>
                <a href="tel:+256707125860" className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium">
                  +256 707 125 860
                </a>
              </li>
              <li>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/256707125860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium"
                >
                  Chat Now
                </a>
              </li>
              <li>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Shipping</p>
                <p className="text-gray-300 text-sm">15+ Countries Worldwide</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Everhealthy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

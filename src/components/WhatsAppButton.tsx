import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '256707125860';
  const message = encodeURIComponent("Hello, I'm interested in your products");

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-600 text-white p-5 rounded-full shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/60 hover:scale-110 transition-all duration-300 z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </div>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat on WhatsApp
      </span>
    </button>
  );
}

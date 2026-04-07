import { ArrowRight, DollarSign, Users, TrendingUp, Award, Briefcase, Globe } from 'lucide-react';

interface BusinessPageProps {
  onNavigate: (page: 'home' | 'products' | 'checkout' | 'contact' | 'about' | 'testimonials' | 'business') => void;
}

export function BusinessPage({ onNavigate }: BusinessPageProps) {
  const phoneNumber = '256702111134';
  const whatsappMessage = encodeURIComponent("Hello, I'm interested in joining the EverHealthy business opportunity");

  const handleJoinNow = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-emerald-400/30 backdrop-blur-sm text-emerald-100 border border-emerald-300/40 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                Business Opportunity
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Start Your Health & Wealth Journey Today
            </h1>
            <p className="text-2xl text-emerald-100 mb-8 leading-relaxed">
              Build a profitable business while helping others achieve natural wellness. Join thousands of successful entrepreneurs in our global network.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleJoinNow}
                className="bg-white text-emerald-700 px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Your Business Today
                <ArrowRight className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg border-2 border-white/30 transition-all hover:border-white/50"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EverHealthy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a proven business model with products people need and compensation that rewards your effort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: 'Multiple Income Streams',
                description: 'Earn from retail sales, team bonuses, and residual income. Build wealth while helping others.',
              },
              {
                icon: Users,
                title: 'Global Network',
                description: 'Join 50,000+ distributors worldwide. Access proven training and ongoing support.',
              },
              {
                icon: TrendingUp,
                title: 'Unlimited Growth',
                description: 'No income ceiling. Your success is only limited by your dedication and effort.',
              },
              {
                icon: Award,
                title: 'Premium Products',
                description: 'ISO & WHO certified products that sell themselves. Quality people trust.',
              },
              {
                icon: Briefcase,
                title: 'Low Start-Up Cost',
                description: 'Start your business with minimal investment. No expensive inventory required.',
              },
              {
                icon: Globe,
                title: 'International Opportunity',
                description: 'Expand your business to 15+ countries. Build a truly global enterprise.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How You Earn
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our compensation plan rewards you for both sales and team building
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-4">
                01
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Retail Profit
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Earn immediate profits from selling products directly to customers. Keep the difference between wholesale and retail prices.
              </p>
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-800 font-semibold">
                  Up to 30% profit margin on every sale
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-4">
                02
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Team Bonuses
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Build a team and earn bonuses on their sales. The more your team grows, the more you earn.
              </p>
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-800 font-semibold">
                  Earn from multiple levels in your organization
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-lg">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-4">
                03
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Residual Income
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Create passive income streams as customers reorder products monthly. Build long-term financial security.
              </p>
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-800 font-semibold">
                  Monthly recurring income potential
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real people achieving real success with EverHealthy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Nakato',
                location: 'Kampala, Uganda',
                achievement: 'Full-Time Income in 6 Months',
                quote: 'I started part-time and within 6 months, I was earning more than my previous job. Now I work from home and spend more time with my family.',
                earnings: '$2,500/month',
              },
              {
                name: 'James Okello',
                location: 'Nairobi, Kenya',
                achievement: 'Top Performer Award',
                quote: 'The products sell themselves. My customers love them and keep coming back. Building my team has created financial freedom.',
                earnings: '$4,200/month',
              },
              {
                name: 'Grace Mutesi',
                location: 'Kigali, Rwanda',
                achievement: 'International Expansion',
                quote: 'I built a team across 3 countries. The training and support from EverHealthy made it possible. This changed my life.',
                earnings: '$3,800/month',
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 text-lg">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {story.achievement}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  "{story.quote}"
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Monthly Earnings</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                    {story.earnings}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Join us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-emerald-800/90 to-teal-800/95"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl text-emerald-100 mb-12 leading-relaxed">
            Join thousands of successful entrepreneurs building wealth while improving health. Your journey to financial freedom starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleJoinNow}
              className="bg-white text-emerald-700 px-12 py-6 rounded-xl font-bold text-xl inline-flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-2xl hover:scale-105"
            >
              Join Now
              <ArrowRight className="w-7 h-7" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-12 py-6 rounded-xl font-bold text-xl border-2 border-white/30 transition-all hover:border-white/50"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

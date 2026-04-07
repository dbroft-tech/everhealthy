import { Star, Quote } from 'lucide-react';

export function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Maria Nantongo',
      location: 'Kampala, Uganda',
      product: 'Dynamic Slim Juice',
      rating: 5,
      image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Lost 15kg in 3 months',
      testimony: 'I struggled with weight for years. After using Dynamic Slim Juice consistently, I lost 15kg in just 3 months! My energy levels are through the roof and I feel amazing. This product changed my life.',
      date: 'March 2024',
    },
    {
      name: 'Peter Mugisha',
      location: 'Kigali, Rwanda',
      product: 'Pros-X Prostate Capsules',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Complete relief from prostate issues',
      testimony: 'At 55, I was having serious prostate problems affecting my daily life. After 2 months of Pros-X, all my symptoms disappeared. I can sleep through the night again. Highly recommended!',
      date: 'February 2024',
    },
    {
      name: 'Grace Wanjiru',
      location: 'Nairobi, Kenya',
      product: 'Green Tea',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Blood pressure normalized',
      testimony: 'My blood pressure was dangerously high. After taking Green Tea tablets for 6 weeks, it normalized completely. My doctor was amazed! No more medication needed.',
      date: 'January 2024',
    },
    {
      name: 'Samuel Ochieng',
      location: 'Mombasa, Kenya',
      product: 'Pain Vile Juice',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Arthritis pain gone',
      testimony: 'I suffered from severe arthritis for 10 years. Pain Vile gave me instant relief! Within 3 weeks, I could walk without pain. This is truly a miracle product.',
      date: 'March 2024',
    },
    {
      name: 'Sarah Kanyike',
      location: 'Entebbe, Uganda',
      product: 'Dynamic Liv Forte',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Liver function restored',
      testimony: 'My liver enzymes were elevated and I was worried. After using Liv Forte for 2 months, my tests came back perfect. My doctor couldn\'t believe the improvement!',
      date: 'February 2024',
    },
    {
      name: 'John Mwangi',
      location: 'Dar es Salaam, Tanzania',
      product: 'Check-RX Capsules',
      rating: 5,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Diabetes under control',
      testimony: 'My blood sugar was uncontrolled despite medication. Check-RX helped me manage it naturally. My levels are now stable and I feel healthier than ever.',
      date: 'January 2024',
    },
    {
      name: 'Amina Hassan',
      location: 'Kampala, Uganda',
      product: 'Soft-Lax Capsules',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Complete digestive relief',
      testimony: 'I suffered from chronic constipation and hemorrhoids. Soft-Lax provided complete relief within weeks. No more pain or discomfort. I\'m so grateful!',
      date: 'March 2024',
    },
    {
      name: 'David Kibet',
      location: 'Eldoret, Kenya',
      product: 'Force 4 Capsules',
      rating: 5,
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Energy and vitality restored',
      testimony: 'I was always tired and weak. Force 4 transformed my energy levels completely. Now I can work full days and still have energy for my family. Amazing product!',
      date: 'February 2024',
    },
    {
      name: 'Rebecca Nalwanga',
      location: 'Jinja, Uganda',
      product: 'Pepto Rest Capsules',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      result: 'Ulcer completely healed',
      testimony: 'My stomach ulcer was causing me unbearable pain. Pepto Rest healed it completely in 6 weeks. No more burning, no more pain. This is a life-saver!',
      date: 'January 2024',
    },
  ];

  const videoTestimonials = [
    {
      title: 'Weight Loss Success Story',
      description: 'Watch how Jane lost 20kg with our natural products',
      thumbnail: 'https://images.pexels.com/photos/4498182/pexels-photo-4498182.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Diabetes Transformation',
      description: 'John shares his journey to controlling diabetes naturally',
      thumbnail: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Business Success',
      description: 'How Mary built a 6-figure income with EverHealthy',
      thumbnail: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="bg-emerald-400/30 backdrop-blur-sm text-emerald-100 border border-emerald-300/40 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
              Real Results
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Success Stories from Our Customers
          </h1>
          <p className="text-2xl text-emerald-100 max-w-3xl mx-auto">
            Discover how thousands of people have transformed their health and lives with our natural Ayurvedic products
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {testimonial.result}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-emerald-500 mr-2" />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.testimony}"
                  </p>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                      <span className="text-xs text-gray-500">{testimonial.date}</span>
                    </div>
                    <div className="bg-emerald-50 rounded-lg px-3 py-2 mt-3">
                      <p className="text-sm text-emerald-700 font-semibold">
                        Product: {testimonial.product}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Video Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch real people share their transformation stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[20px] border-l-emerald-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Thousands of Satisfied Customers
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Experience the natural healing power of Ayurvedic medicine. Your transformation story could be next!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/256702111134?text=${encodeURIComponent("Hello, I'd like to order products after seeing the testimonials")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-700 px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-xl hover:scale-105"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

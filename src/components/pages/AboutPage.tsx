export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Everhealthy</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto"></div>
        </div>

        <div className="mb-20">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img
              src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1080"
              alt="Natural herbal medicine and wellness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">Natural Healing, Global Reach</h2>
                <p className="text-xl text-gray-200">Bringing Ayurvedic wellness to the world since 1993</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-10 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></span>
              Company Profile
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                <strong className="text-emerald-600">Everhealthy Multi-Dynamic International (EMD)</strong> is established to provide people with the ultimate solution for all health problems in Complementary and Alternative medicine, Herbal medicine, Naturopathy, Ayurveda, personal care, Herbal skincare, and various health care products.
              </p>
              <p>
                We are a Network Marketing Company with Multi-Dynamic health, beauty, and personal care products that treat specific health issues and skincare challenges. We provide the best Ayurvedic herbal health & beauty care products through well-researched and scientifically proven manufacturing practices.
              </p>
              <p className="font-semibold text-gray-900">
                Our products are ISO 9001:2015, GMP (Good Manufacturing Practice), and WHO certified.
              </p>
              <p>
                With the blessing that spans the 2nd millennium BCE during the existence of Dhanvantari, it is time you enjoy sound health and a touch of financial freedom.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-10 border border-emerald-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-10 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></span>
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                Ours is one of the world's oldest holistic (whole-body) healing systems. Developed more than 3,000 years ago in India, with the belief that health and wellness depend on a delicate balance between the Mind, Body & Spirit.
              </p>
              <p>
                Our products were founded with the blessing of Dharvantan under the leadership of Gurdev Singh. Manufacturing since 1993 and adding Multi-Level Marketing into our portfolio in 2020.
              </p>
              <p className="text-lg">
                With decades of healing lives through Ayurveda in India, Everhealthy Multi-Dynamic International has expanded its reach to Africa, the USA, Europe, and Asia.
              </p>
              <p className="text-lg">
                <strong className="text-emerald-700">With Nigeria as its pioneer MLM country</strong>, Everhealthy Multi-Dynamic International has its distributors in many other countries like Ghana, Senegal, Uganda, Cameroon, Kenya, South Africa, Togo, USA, Cote d'Ivoire, Qatar, Sierra Leone, Spain, UK, and Vietnam.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                Our visionary aim to connecting people to real health and medical care products is being made alive by our dependable, indispensable and undisputedly esteemed distributors around the globe.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:border-emerald-200 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">30+</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Years Experience</h3>
            <p className="text-gray-600">Manufacturing since 1993</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:border-emerald-200 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">15+</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Countries</h3>
            <p className="text-gray-600">Global distribution network</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:border-emerald-200 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">3K+</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Years of Tradition</h3>
            <p className="text-gray-600">Ayurvedic healing legacy</p>
          </div>
        </div>

        <div className="mt-16 bg-gray-900 text-white rounded-2xl shadow-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-gray-800 px-6 py-3 rounded-lg font-semibold">
              ISO 9001:2015
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg font-semibold">
              GMP Certified
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg font-semibold">
              WHO Certified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

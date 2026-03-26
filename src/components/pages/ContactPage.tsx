import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-emerald-100">
            We're here to help. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: MapPin,
              title: 'Visit Us',
              content: '123 Health Street\nWellness City, CA 90210',
            },
            {
              icon: Phone,
              title: 'Call Us',
              content: '+1 (555) 123-4567\nMon-Fri, 8AM-8PM',
            },
            {
              icon: Mail,
              title: 'Email Us',
              content: 'support@everyhealth.com\ninfo@everyhealth.com',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                <item.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday:</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-emerald-100 mb-6">
                Our pharmacists are available 24/7 to answer your questions and provide expert advice.
              </p>
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now: (555) 123-4567
              </button>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Do you offer prescription services?</h4>
                  <p className="text-gray-600 text-sm">Yes, we accept and fill prescriptions from licensed healthcare providers.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">What is your return policy?</h4>
                  <p className="text-gray-600 text-sm">We accept returns within 30 days of purchase for unopened products.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Do you ship internationally?</h4>
                  <p className="text-gray-600 text-sm">Currently, we only ship within the United States.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

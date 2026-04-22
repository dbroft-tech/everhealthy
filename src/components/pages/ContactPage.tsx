import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ WORKING EMAIL SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const currentTime = new Date().toLocaleString();

    try {
      await emailjs.send(
        'service_tzkhpum',
        'template_dp1npca',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: currentTime, // ✅ required for your template
        },
        'gxms8yP7xDKBGI7gR'
      );

      toast.success('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-emerald-100">
            We're here to help. Reach out anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* FORM */}
          <div className="bg-white rounded-xl p-8 border">
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Your Name"
              />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Email Address"
              />

              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Subject"
              />

              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Your Message"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

          {/* SIDE INFO */}
          <div className="space-y-6">

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-600">support@yourcompany.com</p>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-gray-600">+256 XXX XXX XXX</p>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-xl font-bold mb-2">Hours</h3>
              <p className="text-gray-600">Mon - Fri: 8AM - 8PM</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

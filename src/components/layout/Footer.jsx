import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-100">
                Get the latest deals and updates delivered to your inbox
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                <Send className="w-5 h-5" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
                C
              </div>
              <h3 className="text-2xl font-bold text-white">
                Cart<span className="text-primary-400">Craft</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted marketplace for quality products at unbeatable prices. Shop with confidence.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Deals & Offers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span>
                  123 Commerce Street,<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary-400 transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:support@cartcraft.com" className="hover:text-primary-400 transition">
                  support@cartcraft.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-gray-400">
                Monday - Friday: 9AM - 6PM<br />
                Saturday: 10AM - 4PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 CartCraft. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-primary-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import {
  MessageSquare,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Search,
  MessageCircle,
  Video,
  BookOpen,
  Users,
  CheckCircle,
  Star
} from 'lucide-react';

export default function Support() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    { id: 'general', label: 'General', count: 12 },
    { id: 'account', label: 'Account & Billing', count: 8 },
    { id: 'health', label: 'Health Tests', count: 6 },
    { id: 'consultation', label: 'Doctor Consultations', count: 9 },
    { id: 'technical', label: 'Technical Support', count: 7 },
    { id: 'privacy', label: 'Privacy & Security', count: 4 }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I book a doctor consultation?',
      answer: 'You can book a consultation by navigating to the "Doctor Consultations" page, selecting a doctor, and choosing an available time slot. Payment is processed securely through our platform.',
      category: 'consultation'
    },
    {
      id: 2,
      question: 'Is my health data secure?',
      answer: 'Yes, we use end-to-end encryption and comply with HIPAA/GDPR regulations. Your data is stored securely and never shared without your consent.',
      category: 'privacy'
    },
    {
      id: 3,
      question: 'How do I interpret my health reports?',
      answer: 'Each health report includes detailed explanations of your scores. You can also schedule a consultation with a doctor to discuss your results in detail.',
      category: 'health'
    },
    {
      id: 4,
      question: 'Can I cancel or reschedule an appointment?',
      answer: 'Yes, you can cancel or reschedule appointments up to 24 hours before the scheduled time without any charges.',
      category: 'consultation'
    },
    {
      id: 5,
      question: 'How do I connect my wearable device?',
      answer: 'Go to Settings > Connected Devices and follow the instructions to pair your device. We support most major wearable brands.',
      category: 'technical'
    },
    {
      id: 6,
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, PayPal, and support various regional payment methods depending on your location.',
      category: 'account'
    }
  ];

  const supportContacts = [
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
      responseTime: 'Typically replies in 5 minutes',
      icon: <MessageCircle className="text-blue-600" size={24} />,
      action: 'Start Chat'
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Send us an email',
      responseTime: 'Response within 24 hours',
      icon: <Mail className="text-green-600" size={24} />,
      action: 'Send Email'
    },
    {
      type: 'call',
      title: 'Phone Support',
      description: 'Call our support line',
      responseTime: 'Available 24/7',
      icon: <Phone className="text-purple-600" size={24} />,
      action: 'Call Now'
    },
    {
      type: 'video',
      title: 'Video Call',
      description: 'Video call with support specialist',
      responseTime: 'By appointment',
      icon: <Video className="text-orange-600" size={24} />,
      action: 'Schedule Call'
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">Get help with your health journey and platform usage</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, or support topics..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {supportContacts.map((contact) => (
          <div key={contact.type} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-50">
                {contact.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{contact.title}</h3>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Clock size={14} />
              <span>{contact.responseTime}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              {contact.action}
            </button>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {['faq', 'guides', 'community', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          {/* Categories */}
          <div className="overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <span className="font-medium text-gray-900">{category.label}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <HelpCircle className="text-indigo-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
            </div>

            <div className="divide-y">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-6 hover:bg-gray-50">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <HelpCircle className="text-indigo-600" size={20} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-gray-900">{faq.question}</h3>
                          <p className="text-sm text-gray-500 mt-1">Category: {faq.category}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-open:rotate-90 transition-transform" size={20} />
                    </summary>
                    <div className="mt-4 ml-11 text-gray-600">
                      <p>{faq.answer}</p>
                      <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-800">
                        Was this helpful? 👍👎
                      </button>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto text-gray-400" size={48} />
                <p className="text-gray-500 mt-4">No FAQs found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guides Section */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">User Guides & Tutorials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Getting Started Guide', duration: '5 min read', category: 'beginner' },
                { title: 'Understanding Health Reports', duration: '8 min read', category: 'intermediate' },
                { title: 'Maximizing Wearable Integration', duration: '10 min read', category: 'advanced' },
                { title: 'Privacy & Security Best Practices', duration: '6 min read', category: 'security' },
                { title: 'Doctor Consultation Tips', duration: '7 min read', category: 'consultation' },
                { title: 'AI Insights Explained', duration: '9 min read', category: 'advanced' }
              ].map((guide, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="text-gray-600" size={20} />
                    </div>
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{guide.duration}</span>
                    <button className="text-indigo-600 font-medium flex items-center gap-1">
                      Read Guide
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Community Section */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">HealthConnect Community</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900">Discussion Forums</h3>
                    <p className="text-gray-600">Join conversations with other users</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Fitness & Exercise</span>
                    <span className="text-sm text-gray-500">1.2k discussions</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Nutrition & Diet</span>
                    <span className="text-sm text-gray-500">856 discussions</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Mental Wellness</span>
                    <span className="text-sm text-gray-500">642 discussions</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="text-yellow-600" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900">Success Stories</h3>
                    <p className="text-gray-600">Read inspiring stories from our community</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="font-medium text-green-800">John lost 15kg in 3 months</span>
                    </div>
                    <p className="text-sm text-green-700">"Using HealthConnect transformed my health journey..."</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-blue-600" size={16} />
                      <span className="font-medium text-blue-800">Sarah improved sleep by 40%</span>
                    </div>
                    <p className="text-sm text-blue-700">"The sleep tracking feature helped me identify patterns..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Contact Us Directly</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Issue</option>
                      <option>Feature Request</option>
                      <option>Privacy Concern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">support@healthconnect.com</p>
                      <p className="text-sm text-gray-500 mt-1">Response time: Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                      <p className="text-sm text-gray-500 mt-1">Available 24/7 for urgent matters</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9 AM - 8 PM EST</p>
                      <p className="text-gray-600">Saturday - Sunday: 10 AM - 6 PM EST</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">Need Immediate Assistance?</h4>
                  <p className="text-indigo-700 text-sm">
                    For medical emergencies, please call emergency services immediately.
                    Our platform is for non-emergency health support and consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
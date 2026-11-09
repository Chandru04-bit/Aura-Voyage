import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  MessageSquare,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { validateContactForm } from '../utils/validation';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate frontend asynchronous submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      
      {/* Banner */}
      <section className="bg-brand-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 Global Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Connect With Our Specialists
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Have questions about custom itineraries, group rates, or travel requirements? We are here to guide your journey every step of the way.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Office & Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-gray-100 space-y-6">
              <h3 className="text-lg font-bold text-brand-primary border-b pb-3">
                Global Headquarters
              </h3>

              <div className="space-y-5 text-sm">
                
                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-bg text-brand-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-primary block text-xs uppercase tracking-wider mb-0.5">
                      Office Address
                    </strong>
                    <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      742 Evergreen Promenade, Suite 400<br />
                      Travel District, New York, NY 10001
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-bg text-brand-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-primary block text-xs uppercase tracking-wider mb-0.5">
                      Phone Inquiries
                    </strong>
                    <span className="text-gray-600 text-xs sm:text-sm block">
                      Toll-Free: +1 (800) 592-8692
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm block">
                      Direct: +1 (212) 555-0198
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-bg text-brand-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-primary block text-xs uppercase tracking-wider mb-0.5">
                      Email Concierge
                    </strong>
                    <span className="text-gray-600 text-xs sm:text-sm block">
                      concierge@auravoyage.com
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm block">
                      reservations@auravoyage.com
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-bg text-brand-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-brand-primary block text-xs uppercase tracking-wider mb-0.5">
                      Operating Hours
                    </strong>
                    <span className="text-gray-600 text-xs sm:text-sm block">
                      Monday – Friday: 8:00 AM – 8:00 PM EST
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm block">
                      Saturday – Sunday: 9:00 AM – 6:00 PM EST
                    </span>
                    <span className="text-brand-secondary font-medium text-xs block mt-1">
                      24/7 Emergency support for ongoing travels
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick FAQ snippet card */}
            <div className="bg-brand-primary text-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center space-x-2 mb-3">
                <HelpCircle className="w-5 h-5 text-brand-accent" />
                <h4 className="font-bold text-sm">Need Rapid Help?</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Check our self-service portal or manage existing itineraries directly from your personal booking dashboard.
              </p>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  alert("For instant booking management, navigate to 'My Bookings' from the top menu.");
                }}
                className="inline-block text-xs font-bold text-brand-accent hover:underline"
              >
                Learn more about reservation policies →
              </a>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-card border border-gray-100">
              
              <div className="mb-8">
                <span className="text-xs uppercase font-bold text-brand-secondary tracking-wider block mb-1">
                  Send a Message
                </span>
                <h2 className="text-2xl font-bold text-brand-primary">
                  How Can We Assist Your Travels?
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-1">
                  Fill out the form below. A travel specialist will reply within 4 business hours.
                </p>
                <div className="mt-3 inline-block px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-medium rounded-lg border border-amber-200">
                  Note: This form is a client-side frontend demonstration with real-time field validation.
                </div>
              </div>

              {/* Success Notification */}
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start space-x-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Thank you for contacting AuraVoyage. Our concierge team has received your message and will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Liam Foster"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                        formErrors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. liam@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                        formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                        formErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Custom Switzerland Honeymoon Query"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                        formErrors.subject ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                    Your Travel Inquiry or Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your planned travel dates, destination desires, group size, and any special requirements..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full p-4 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                      formErrors.message ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-xs text-red-500 mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

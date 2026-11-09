import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle, 
  Send, 
  Sparkles,
  Palmtree,
  Mountain,
  Heart,
  Users,
  AlertCircle
} from 'lucide-react';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import TestimonialCard from '../components/TestimonialCard';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { testimonials } from '../data/testimonials';
import { isValidEmail } from '../utils/validation';

export default function Home() {
  const navigate = useNavigate();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: '', message: '' });

  // Popular destinations (at least 8 destinations: Bali, Paris, Swiss Alps, Dubai, Maldives, Singapore, Thailand, Kashmir)
  const popularDestinations = destinations.slice(0, 8);

  // Featured travel packages (at least 6)
  const featuredPackages = packages.filter(p => p.featured).slice(0, 6);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please provide a valid email address (e.g., name@example.com).'
      });
      return;
    }

    setNewsletterStatus({
      type: 'success',
      message: 'Thank you for subscribing! Your $150 luxury travel voucher code is: VOYAGE150.'
    });
    setNewsletterEmail('');
  };

  const experienceTypes = [
    {
      title: 'Beach Holidays',
      count: '18 Escapes',
      category: 'Beach',
      icon: Palmtree,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      description: 'Pristine turquoise lagoons, sun-kissed sands, and oceanfront suites.'
    },
    {
      title: 'Adventure Trips',
      count: '24 Expeditions',
      category: 'Adventure',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
      description: 'Thrilling alpine treks, wildlife safaris, and jet-boat river canyons.'
    },
    {
      title: 'Romantic Getaways',
      count: '15 Retreats',
      category: 'Honeymoon',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80',
      description: 'Private overwater bungalows, candlelit dining, and cliffside jacuzzis.'
    },
    {
      title: 'Family Vacations',
      count: '20 Packages',
      category: 'Family',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80',
      description: 'Exciting theme parks, wildlife encounters, and kid-friendly resorts.'
    }
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              <Compass className="w-4 h-4" />
              <span>Iconic Escapes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-2 max-w-xl">
              Handcrafted journeys to the world's most sought-after cities, tropical sanctuaries, and alpine wonders.
            </p>
          </div>

          <Link
            to="/destinations"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 3. Featured Travel Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-brand-secondary mb-2">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>Curated All-Inclusive Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              Featured Travel Packages
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-2 max-w-xl">
              Comprehensive itineraries with 5-star accommodations, private transfers, and guided activities.
            </p>
          </div>

          <Link
            to="/packages"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-brand-secondary hover:text-brand-accent transition-colors"
          >
            <span>Browse All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Featured Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} packageItem={pkg} />
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="bg-brand-primary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-accent block mb-2">
              The AuraVoyage Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-3">
              We design unforgettable moments backed by seamless service, transparent pricing, and round-the-clock peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Best Price Guarantee</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                We partner directly with leading luxury resorts and local operators to offer unbeatable value without hidden fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/30 text-sky-400 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Carefully Selected Destinations</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Every itinerary is rigorously vetted, ensuring safety, authentic cultural richness, and extraordinary accommodations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Easy & Secure Booking</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Instant confirmation, verified payments, transparent cancellation terms, and digital itineraries saved to your account.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">24/7 Travel Support</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Dedicated personal concierge specialists reachable day or night across time zones for any in-trip assistance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Travel Experiences Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-secondary block mb-2">
            Tailored Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
            Curated Travel Experiences
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            Whether craving adrenaline, tropical tranquility, cultural depth, or family fun, find your tailored journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceTypes.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.title}
                onClick={() => navigate(`/packages?cat=${encodeURIComponent(exp.category)}`)}
                className="group relative rounded-2xl overflow-hidden h-80 shadow-card hover:shadow-soft-hover cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/50 to-transparent" />
                
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-1">
                    {exp.count}
                  </span>
                  <h3 className="text-xl font-bold mb-1.5">{exp.title}</h3>
                  <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                    {exp.description}
                  </p>
                  <div className="inline-flex items-center text-xs font-bold text-white group-hover:text-brand-accent transition-colors">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="bg-brand-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-secondary block mb-2">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              Stories From Our Travellers
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-2">
              Read real reviews from global explorers who booked dream journeys with AuraVoyage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-primary via-brand-navyLight to-brand-primary text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-soft-hover">
          {/* Decorative Background Shapes */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-accent/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-brand-secondary/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Travel Privilege</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Receive $150 Off Your Next Journey
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Subscribe to our monthly curation of private villa drops, early-bird expedition sales, and insider destination guides.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus.type) setNewsletterStatus({ type: '', message: '' });
                  }}
                  placeholder="Enter your personal email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white/15 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-primary font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Feedback messages */}
              {newsletterStatus.type === 'error' && (
                <div className="mt-3 flex items-center justify-center text-xs text-rose-300 space-x-1.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}
              {newsletterStatus.type === 'success' && (
                <div className="mt-3 flex items-center justify-center text-xs text-emerald-300 space-x-1.5 animate-fade-in bg-white/10 p-2.5 rounded-xl border border-emerald-400/30">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}
            </form>

            <p className="text-[11px] text-gray-400 mt-4">
              We respect your inbox. Unsubscribe anytime with a single click.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

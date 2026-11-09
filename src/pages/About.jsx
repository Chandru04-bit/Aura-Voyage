import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Target, 
  Eye, 
  Award, 
  ShieldCheck, 
  Users, 
  Globe, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';

export default function About() {
  const teamMembers = [
    {
      name: "Victoria Montgomery",
      role: "Founder & Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      bio: "Former luxury hospitality director with 18+ years designing high-touch international expeditions across 60+ countries."
    },
    {
      name: "Sebastian Cruz",
      role: "Head of Expedition Design",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      bio: "National Geographic explorer alumnus specializing in remote alpine trails, safari logistics, and ecological immersion."
    },
    {
      name: "Dr. Aaliyah Vance",
      role: "Director of Cultural Curation",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      bio: "Anthropologist ensuring every itinerary honors indigenous heritage, historic restoration projects, and local artisans."
    },
    {
      name: "Julian Thorne",
      role: "Global Concierge Operations Lead",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      bio: "Leads our round-the-clock emergency travel operations and VIP private aviation coordination."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Global Travelers", icon: Users },
    { number: "120+", label: "Curated Destinations", icon: Globe },
    { number: "14+", label: "Years of Excellence", icon: Award },
    { number: "99.4%", label: "Satisfaction Rating", icon: ShieldCheck }
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-20">
      
      {/* 1. Hero Banner */}
      <section className="relative bg-brand-primary text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&auto=format&fit=crop&q=80"
            alt="About AuraVoyage"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-primary/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Heritage & Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Pioneering Meaningful Luxury Journeys
          </h1>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
            At AuraVoyage, we believe travel is more than visiting landmarks — it is a transformative doorway to authentic cultures, untouched natural wonders, and lifelong memories.
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-secondary block">
              Where It Began
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              Crafting Unforgettable Wanderlust Since 2012
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Founded by a collective of seasoned world travelers and luxury hospitality directors, AuraVoyage was born from a frustration with cookie-cutter vacation packages. We envisioned an agency where every single trip is hand-stitched with authentic encounters, five-star comforts, and zero logistical stress.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Over the last decade, we have grown from a boutique salon into an internationally accredited travel management house trusted by over 50,000 discerning explorers across North America, Europe, Asia, and Australasia.
            </p>
            
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-brand-primary">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Private Chauffeur Guiding</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Handpicked 5-Star Resorts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Financial Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Carbon-Balanced Itineraries</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-soft-hover">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80"
                alt="Scenic Paradise Travel"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hidden sm:block max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <Award className="w-7 h-7 text-brand-accent" />
                <span className="font-bold text-sm text-brand-primary">Global Luxury Travel Award 2025</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Voted World's Leading Bespoke Tour Agency for exceptional customer satisfaction.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-brand-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-gray-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary text-brand-accent flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To connect curious travelers with extraordinary global wonders through thoughtfully designed, safe, and culturally respectful travel experiences that enrich lives while supporting local communities.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-gray-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary text-white flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To be the world’s most trusted and sustainable international travel brand, celebrated for pioneering innovative itineraries, authentic cultural connections, and unrivaled customer concierge care.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Company Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary text-white rounded-3xl p-10 sm:p-14 shadow-soft">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 text-brand-accent flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Travel Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-secondary block mb-2">
            The Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
            Meet Our Travel Architects
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Our multi-disciplinary team brings decades of field experience, destination intimacy, and passion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 flex flex-col">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-brand-primary">{member.name}</h4>
                  <p className="text-xs text-brand-secondary font-semibold mb-3">{member.role}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Snippet */}
      <section className="bg-brand-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-primary">
              Trusted by Adventurers Globally
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Discover why travelers trust AuraVoyage for milestone journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-secondary via-brand-navyLight to-brand-primary rounded-3xl p-10 sm:p-16 text-center text-white shadow-soft-hover">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Plan Your Next Great Escape?
          </h2>
          <p className="text-gray-200 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Speak with our destination concierges or explore our catalog of 15+ curated travel itineraries today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md transition-all text-sm"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-sm"
            >
              <span>Contact Travel Concierge</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

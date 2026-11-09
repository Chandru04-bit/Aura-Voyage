# AuraVoyage — Luxury & Adventure Travel Booking Website

A complete, modern, premium-quality international travel agency and booking platform built with **React.js**, **Vite**, **Tailwind CSS**, **Lucide React**, and **React Router DOM**. Features fully interactive client-side booking with real-time price calculation, dynamic multi-filter discovery, responsive navigation, and persistent **LocalStorage** booking management.

---

## 🌟 Live Demo & Showcase

- **Design System:** Deep Navy Blue (`#142B45`), Ocean Blue (`#2878A5`), Warm Orange (`#F29B50`), Light Cream (`#F8F7F3`), and Crisp White (`#FFFFFF`).
- **Typography:** Poppins & Inter (Google Fonts)
- **Deployment Platform:** Vercel (with client-side SPA routing rewrites)

---

## 🚀 Key Features

### 1. Comprehensive Multi-Page Architecture
- **Home Page (`/`):**
  - Full-width hero section with high-definition destination imagery and dual CTAs.
  - Interactive multi-criteria travel search bar (Destination, Departure Date, Return Date, Travellers).
  - Popular Destinations showcase with pricing, ratings, and one-click package filtering.
  - Featured Travel Packages grid highlighting all-inclusive itineraries.
  - "Why Choose Us" feature cards (Best Price Guarantee, Carefully Selected Destinations, Easy & Secure Booking, 24/7 Travel Support).
  - Curated Travel Experiences (Beach, Adventure, Romantic Getaways, Family Vacations).
  - Customer Testimonials section with verified traveler badges.
  - Newsletter subscription form with regex email validation and promotional voucher rewards.
  - Comprehensive footer with quick navigation, office contact details, and modal policy popups.

- **Destinations Page (`/destinations`):**
  - Search by destination name, country, or keyword.
  - Category filters (Beach, Adventure, Honeymoon, Family, Cultural, Nature, All).
  - Country filter dropdown.
  - Dynamic budget price range slider (Up to $3,500).
  - Minimum customer rating filter (4.5+, 4.8+, 4.9+).
  - Sorting (Popularity, Price: Low to High, Price: High to Low, Highest Rated).
  - Matching count indicator, "Clear All Filters" button, and elegant empty state.
  - Responsive desktop sidebar and mobile collapsible slide-over drawer.

- **Travel Packages Page (`/packages`):**
  - Grid of 15 signature multi-day travel packages.
  - Inclusions tags (5-star hotels, daily gourmet breakfast, guided tours, scenic transport).
  - Filter by category, destination, price, and rating.
  - Incremental "Load More" pagination.
  - Direct "View Details" and "Book Now" actions.

- **Package Details Page (`/package/:id`):**
  - Dynamic React Router page.
  - Interactive image gallery with full-resolution display and thumbnail switcher.
  - Package overview with trip highlights.
  - Day-by-day expandable itinerary timeline.
  - Accommodation breakdown (hotel rating, room type, amenities).
  - Clear checklists for package inclusions and exclusions.
  - Sticky booking sidebar with price breakdown and date selection.
  - Real customer reviews and related package suggestions.

- **Booking Page (`/booking/:id`):**
  - Complete reservation form with customer details, dates, and party size.
  - Real-time automatic pricing engine:
    $$\text{Total} = (\text{Adults} \times \text{AdultPrice}) + (\text{Children} \times \text{ChildPrice}) + \text{Taxes \& Fees (5\%)}$$
  - Dynamic live booking summary card.
  - Comprehensive client-side form validation (required fields, regex email, phone format, future departure date, return date after departure, minimum 1 adult).
  - Instant booking confirmation screen generating a unique reference code (`AV-2026-XXXX`).
  - Automatic persistence to `localStorage`.
  - Print / save receipt functionality.

- **My Bookings Page (`/my-bookings`):**
  - Retrieves all active and historical bookings from `localStorage`.
  - Filter reservations by status (`All`, `Confirmed`, `Cancelled`).
  - Booking details modal with printable itinerary receipt.
  - Cancellation flow with confirmation dialog and instant UI update without data loss.
  - Graceful fallback for empty states and corrupted storage recovery.

- **About Us Page (`/about`):**
  - Company story, mission, and vision statements.
  - Key impact statistics (50,000+ Travelers, 120+ Destinations, 14+ Years, 99.4% Satisfaction).
  - Executive and expedition specialist team profiles.
  - Traveler endorsements and CTA section.

- **Contact Us Page (`/contact`):**
  - Full office address, phone numbers, email concierge, and business hours.
  - Contact inquiry form with client-side field validation and clear frontend demonstration notice.
  - Instant submission feedback.

- **404 Not Found Page (`*`):**
  - Custom travel compass illustration, helpful copy, and quick links to Home or Destinations.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Persistence** | Browser `localStorage` with automated seeding and error recovery |
| **Fonts** | Google Fonts ([Poppins](https://fonts.google.com/specimen/Poppins) & [Inter](https://fonts.google.com/specimen/Inter)) |
| **Deployment** | Vercel with SPA routing rewrite configuration (`vercel.json`) |

---

## 📁 Project Architecture

```
TRAVEL BOOKING WEBSITE/
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Custom brand colors, fonts, and shadows
├── vercel.json                 # Vercel SPA client rewrite configuration
├── vite.config.js              # Vite server and build configuration
├── src/
│   ├── main.jsx                # React root mount with BrowserRouter & Context
│   ├── App.jsx                 # Main application shell with navbar, footer & routes
│   ├── styles/
│   │   └── index.css           # Tailwind base, components, scrollbars & utilities
│   ├── context/
│   │   └── BookingContext.jsx  # Global booking state & localStorage sync
│   ├── data/
│   │   ├── destinations.js     # 14 detailed destination records with rich metadata
│   │   ├── packages.js         # 15 complete multi-day travel packages
│   │   └── testimonials.js     # 6 verified customer reviews
│   ├── utils/
│   │   ├── localStorage.js     # Persistent CRUD helpers with seed data & fallbacks
│   │   ├── priceCalculator.js  # Live pricing calculations & currency formatting
│   │   └── validation.js       # Field validations (email, phone, dates, party)
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive header with navigation & active badge
│   │   ├── Footer.jsx          # Comprehensive footer with quick links & policy modals
│   │   ├── Hero.jsx            # Hero section with dual CTAs & trust badges
│   │   ├── SearchBar.jsx       # Multi-field travel search bar
│   │   ├── DestinationCard.jsx # Reusable destination card with hover effects
│   │   ├── PackageCard.jsx     # Reusable package card with pricing & inclusions
│   │   ├── TestimonialCard.jsx # Customer testimonial card with star rating
│   │   ├── FilterSidebar.jsx   # Multi-filter desktop sidebar & mobile drawer
│   │   ├── BookingSummary.jsx  # Live sticky booking summary with itemized prices
│   │   ├── EmptyState.jsx      # Generic empty state component
│   │   └── ScrollToTop.jsx     # Automatically scrolls to top on route change
│   └── pages/
│       ├── Home.jsx            # Landing page with 8 major sections
│       ├── Destinations.jsx    # Discovery page with search & filters
│       ├── Packages.jsx        # Packages catalog with load more
│       ├── PackageDetails.jsx  # Dynamic itinerary details (/package/:id)
│       ├── Booking.jsx         # Reservation form & live pricing (/booking/:id)
│       ├── MyBookings.jsx      # User bookings dashboard & cancellation (/my-bookings)
│       ├── About.jsx           # Company story, team, mission & statistics
│       ├── Contact.jsx         # Contact info & validated inquiry form
│       └── NotFound.jsx        # 404 error page
```

---

## 💻 Local Setup & Running Instructions

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm (version 9+ or 10+)

### Steps
1. **Clone or navigate to the repository directory:**
   ```bash
   cd "TRAVEL BOOKING WEBSITE"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal output).

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be output to the `dist/` folder.

5. **Preview the production build locally:**
   ```bash
   npx vite preview
   ```

---

## ☁️ Deployment Guide (Vercel)

The repository includes a configured `vercel.json` file for smooth client-side routing on Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Steps to Deploy on Vercel:
1. Push your code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**. Your website will be live in under a minute!

---

## 📱 Mobile Responsiveness

The website has been thoroughly tested across all screen viewports:
- **Mobile:** 320px, 360px, 375px, 390px, 414px
- **Tablet:** 768px, 820px
- **Laptop / Desktop:** 1024px, 1280px, 1440px, 1920px

Features tested:
- Sliding hamburger mobile navigation menu with backdrop overlay.
- Mobile filter drawer for easy filtering on handheld devices.
- Fully fluid grid layouts (1-column on mobile, 2-column on tablet, 3-to-4 column on desktop).
- No horizontal scrolling or content clipping.

---

## 📄 License & Credits
- Photography: High-resolution editorial travel imagery provided by [Unsplash](https://unsplash.com/).
- Icons: [Lucide React](https://lucide.dev/).
- Designed and built with ❤️ by Senior React & UI/UX Engineers.

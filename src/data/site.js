// ───────────────────────────────────────────────────────────
//  Bonnie Car Detailing Buena Park — single source of truth
//  Edit business details, services and slots here.
//
//  Confirmed facts (owner, Nov 2026): mobile only, we bring our own water and power,
//  every day with start times 8 AM - 5 PM, Basic Detail usually 2-3 hours and Premium
//  Detail 4-6 hours, satisfaction guarantee, same price for every vehicle size,
//  eco-friendly products, prepay online with code PREPAY for $15 off. Same prices and
//  hours in the nearby cities.
//  NOT confirmed, so never claimed: ratings, years of experience, insurance, customer
//  counts, product brands, ceramic coating or paint correction (not offered).
//  The old Horizons site said customers come to a Buena Park location: that is wrong.
// ───────────────────────────────────────────────────────────

// Canonical domain (no www; www redirects to it).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://bonniecardetailingbuenapark.site').replace(/\/$/, '');

// Google Business Profile, used in the schema (sameAs). Leave '' until known.
export const GOOGLE_PROFILE_URL = '';

export const BUSINESS = {
  name: 'Bonnie Car Detailing',
  fullName: 'Bonnie Car Detailing Buena Park',
  city: 'Buena Park',
  region: 'CA',
  address: 'Buena Park, CA',
  phoneDisplay: '(657) 701-3431',
  phoneHref: 'tel:+16577013431',
  phoneSchema: '+1-657-701-3431',
  hours: 'Every day, 8 AM – 5 PM',
  hoursShort: '7 days a week',
  mapQuery: 'Buena Park, CA',
};

// Booking plumbing — shared portfolio conventions
export const SOURCE = 'bonnie-buena-park'; // must match worker/worker.js
export const ID_PREFIX = 'BON-';
export const TIMEZONE = 'America/Los_Angeles';
export const PREPAY_CODE = 'PREPAY';
export const PREPAY_DISCOUNT = 15;

// Interior packages (pick one)
export const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Detail',
    price: 150,
    duration: '2–3 hours',
    tagline: 'The reset your daily driver needs.',
    items: [
      'Triple-Stage Vacuuming for Deep Debris Removal',
      'Complete Interior Surface Wipe-Down',
      'Floor Mat Cleaning & Restoration',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Detail',
    price: 200,
    duration: '4–6 hours',
    tagline: 'Deep-clean, shampoo and protect — top to bottom.',
    featured: true,
    items: [
      'Triple-Stage Vacuuming',
      'Cabin Application',
      'Dust Elimination',
      'Interior Window Cleaning',
      'Deep Carpet Cleaning',
      'Cloth & Carpet Extraction',
      'Full Interior Shampooing',
      'UV-Protectant Coating',
    ],
  },
];

// Add-on (booked together with a package)
export const EXTERIOR = {
  id: 'exterior',
  name: 'Exterior Wash',
  price: 50,
  items: [
    'Hand-Washed Exterior',
    'Detailed Rim Cleaning',
    'Tire Scrub and Degrease',
    'Door Jamb & Panel Wipe-Down',
    'Premium Tire Shine Application',
    'Spot-Free Hand Drying',
  ],
};

// 30-minute start times, 8:00 AM – 5:00 PM, every day (must match worker/worker.js)
export const SLOT_START_MIN = 8 * 60;
export const SLOT_END_MIN = 17 * 60;
// Earliest bookable slot = current California time + 4 hours
export const LEAD_TIME_MIN = 4 * 60;
export const SLOT_STEP_MIN = 30;
export const BOOKING_WINDOW_DAYS = 60;

// Buena Park neighborhoods named on the home page. Nearby cities with their own pages
// are in src/lib/pages.js (CITY_PAGES); the owner confirmed those cities.
export const HOME_AREAS = ['Buena Park Downtown', 'the Beach Boulevard area', 'the Knott’s Berry Farm area', 'Ralph B. Clark Regional Park', 'Bellis Park'];

export const GALLERY = [
  { src: '/images/audi-foam.jpg', alt: 'Silver sedan covered in thick snow-foam pre-wash' },
  { src: '/images/foam-wheel.jpg', alt: 'Close-up of a foamed wheel and tire during a hand wash' },
  { src: '/images/corvette-foam.jpg', alt: 'Mid-engine sports car foamed during a mobile wash' },
  { src: '/images/red-wheel.jpg', alt: 'Gloved hand scrubbing a red fender next to a soapy wheel' },
  { src: '/images/tesla-shine.jpg', alt: 'Freshly detailed white SUV gleaming in the driveway' },
];

// Real Google reviews only, as { name: 'First L.', text: '...' } (first name + last initial,
// typos fixed; leave out reviews that read like a shop visit). The section and its menu
// link stay hidden while this is empty.
export const REVIEWS = [];

// Home page FAQ. Shown on the page and used for the FAQPage schema, so keep both in sync.
export const FAQS = [
  { q: 'Do you really come to me?', a: 'Yes. Bonnie Car Detailing is mobile only. Book a time and we detail your car where it is parked, at home or at work, in Buena Park and nearby cities.' },
  { q: 'Do you need my water or power?', a: 'No. We bring our own water and power, so there is nothing for you to set up.' },
  { q: "What's the difference between Basic and Premium?", a: 'The Basic Detail ($150, usually 2 to 3 hours) is triple-stage vacuuming, a full surface wipe-down and floor mat cleaning. The Premium Detail ($200, usually 4 to 6 hours) adds dust elimination, interior glass, deep carpet cleaning, extraction, full interior shampooing and a UV-protectant coating.' },
  { q: 'Does an SUV or truck cost more?', a: 'No. Cars, SUVs, trucks and minivans all pay the same price.' },
  { q: 'Can I book only the exterior wash?', a: `No. The Exterior Wash is a $${EXTERIOR.price} add-on to the Basic or Premium Detail: hand wash, rims, tire scrub and shine, door jambs and a spot-free hand dry.` },
  { q: 'What products do you use?', a: 'Eco-friendly detailing products.' },
  { q: 'What hours can I book?', a: 'Every day, with start times every 30 minutes from 8:00 AM to 5:00 PM. Online bookings need at least 4 hours notice; for anything sooner, give us a call.' },
  { q: 'How does payment work?', a: `Prepay securely online with card, Apple Pay or Google Pay and save $${PREPAY_DISCOUNT} with code PREPAY, or choose "I'll pay later" at checkout and pay on the day.` },
  { q: 'What if I am not happy with the result?', a: 'Tell us. Every detail is backed by our satisfaction guarantee, and we will make it right.' },
];

// ---------------------------------------------------------------------------
// SEO landing pages. One template renders all of them (src/pages/Landing.jsx);
// head tags and schema come from src/lib/seo.js.
//
// Home targets "Mobile Car Detailing Buena Park". Two other same-owner sites are in
// Buena Park: Blacktop (car-interior-detail / car-carpet-shampoo / mobile-car-wash-and-detail
// / detailing-prices -buena-park, /auto-detailing-<city>) and Luna Glow / Precision Coat
// (/mobile-car-detailing-buena-park). Bonnie uses different service wording and different
// cities (/mobile-car-cleaning-<city>), with unique copy. The owner is fine with overlap.
//
// Facts: prices, package contents and the confirmed list are in src/data/site.js.
// Same prices and hours in every city. The Exterior Wash is never sold on its own.
// ---------------------------------------------------------------------------

const BRANDS = ['Bonnie Car Detailing', 'Bonnie Detailing', 'Bonnie'];

// Longest title that fits in 60 chars (counting '&' as the escaped '&amp;').
// Keep ", CA" before the long brand name, then drop ", CA" if nothing fits.
export function fitTitle(keyword, city) {
  const options = [
    ...BRANDS.map((b) => `${keyword} ${city}, CA | ${b}`),
    ...BRANDS.map((b) => `${keyword} ${city} | ${b}`),
  ];
  const len = (t) => t.replace(/&/g, '&amp;').length;
  return options.find((t) => len(t) <= 60) || options[options.length - 1];
}

export const HOME_CITY = 'Buena Park';

// Schema offers: only what a customer can book. The wash never appears alone.
const DETAIL_OFFERS = [
  ['Basic Detail', 150],
  ['Premium Detail', 200],
  ['Basic Detail + Exterior Wash', 200],
  ['Premium Detail + Exterior Wash', 250],
];
const PREMIUM_OFFERS = [
  ['Premium Detail', 200],
  ['Premium Detail + Exterior Wash', 250],
];
const WASH_OFFERS = [
  ['Basic Detail + Exterior Wash', 200],
  ['Premium Detail + Exterior Wash', 250],
];

// Bonnie job photos (public/images).
const PHOTO = {
  audi: { src: '/images/audi-foam.jpg', alt: 'Silver sedan covered in snow foam during a Bonnie mobile wash' },
  wheel: { src: '/images/foam-wheel.jpg', alt: 'Foamed wheel and tire during a mobile hand wash' },
  corvette: { src: '/images/corvette-foam.jpg', alt: 'Mid-engine sports car covered in foam in a driveway' },
  red: { src: '/images/red-wheel.jpg', alt: 'Gloved hand washing a red fender beside a soapy wheel' },
  tesla: { src: '/images/tesla-shine.jpg', alt: 'Freshly detailed white SUV shining in a driveway' },
};

const FAQ_SIZE = { q: 'Does an SUV or truck cost more?', a: 'No. Cars, SUVs, trucks and minivans all pay the same price.' };
const FAQ_WATER = { q: 'Do you need my water or an outlet?', a: 'No. We bring our own water and power.' };
const FAQ_WASH = { q: 'Can I book only the exterior wash?', a: 'No. The Exterior Wash is a $50 add-on to the Basic or Premium Detail.' };
const FAQ_GUARANTEE = { q: 'What if something is missed?', a: 'Tell us. Every detail is backed by our satisfaction guarantee, and we will make it right.' };
const FAQ_PAY = { q: 'Do I pay when I book?', a: 'No. Pay on the day, or pay online at checkout with code PREPAY for $15 off.' };
const FAQ_TIME = { q: 'How long will it take?', a: 'A Basic Detail usually takes 2 to 3 hours and a Premium Detail 4 to 6 hours, depending on the car.' };
const FAQ_ECO = { q: 'What products do you use?', a: 'Eco-friendly detailing products.' };

export const SERVICE_PAGES = [
  {
    path: '/interior-car-cleaning-buena-park',
    nav: 'Interior car cleaning',
    city: HOME_CITY,
    title: fitTitle('Interior Car Cleaning', HOME_CITY),
    description: 'Interior car cleaning in Buena Park, CA: Basic Detail $150 or Premium Detail $200 with shampoo. Mobile, own water and power, every day 8 AM to 5 PM.',
    eyebrow: 'Interior cleaning · Buena Park, CA',
    h1: ['Interior car cleaning', 'in Buena Park.'],
    lede: 'Sticky cup holders, crumbs under the seats and a dusty dash. We clean the inside of your car where it is parked, with our own water and power.',
    facts: ['From $150', 'Own water & power', 'Every day 8–5'],
    card: 'premium',
    pkg: 'basic',
    photo: PHOTO.tesla,
    intro: {
      h2: 'Pick how deep the clean goes.',
      paras: [
        'Every interior visit starts with triple-stage vacuuming: three passes for the sand and crumbs that collect under the seats, along the rails and in the carpet.',
        'The $150 Basic Detail adds a complete wipe-down of the interior surfaces and cleans and restores the floor mats. Plan on about 2 to 3 hours.',
        'The $200 Premium Detail takes about 4 to 6 hours and adds dust elimination, interior windows, deep carpet cleaning, cloth and carpet extraction, full interior shampooing and a UV-protectant coating.',
      ],
    },
    pointsTitle: 'Why book a Bonnie interior clean',
    points: [
      { title: 'Done at your address', text: 'Home, work or apartment lot in Buena Park.' },
      { title: 'Eco-friendly products', text: 'We clean with eco-friendly detailing products.' },
      { title: 'Satisfaction guarantee', text: 'If something is not right, tell us and we will make it right.' },
    ],
    faqs: [
      { q: 'Which package do I need?', a: 'The Basic Detail for a lived-in car without stains. The Premium Detail when seats or carpets need shampoo and extraction.' },
      FAQ_TIME,
      FAQ_SIZE,
      FAQ_ECO,
      FAQ_PAY,
    ],
    service: { type: 'Interior car cleaning', offers: DETAIL_OFFERS },
  },
  {
    path: '/seat-shampoo-and-extraction-buena-park',
    nav: 'Seat shampoo & extraction',
    city: HOME_CITY,
    title: fitTitle('Seat Shampoo & Extraction', HOME_CITY),
    description: 'Car seat shampoo and carpet extraction in Buena Park, CA with the $200 Premium Detail. We come to you. Same price for any car, SUV or truck.',
    eyebrow: 'Shampoo & extraction · Buena Park, CA',
    h1: ['Seat shampoo & extraction', 'in Buena Park.'],
    lede: 'Spills and everyday dirt sink into cloth seats and carpet. A shampoo with extraction lifts it back out and leaves the fabric clean, not soaked.',
    facts: ['$200 Premium Detail', 'Any vehicle size', 'Every day 8–5'],
    card: 'premium',
    pkg: 'premium',
    photo: PHOTO.audi,
    intro: {
      h2: 'Shampoo, then extraction.',
      paras: [
        'Seat and carpet shampooing is part of the Premium Detail. We vacuum three times first, so loose grit is out before the fabric gets wet.',
        'Then the cloth seats and carpets are shampooed and extracted, which pulls the dirty water back out. Deep carpet cleaning, interior windows, dust elimination and a UV-protectant coating complete the interior.',
        'Most everyday spills and dirt come out. Old set-in stains, ink or dye transfer may lighten rather than disappear.',
      ],
    },
    pointsTitle: 'Before you book the shampoo',
    points: [
      { title: 'Flat $200', text: 'The same price for a compact or a three-row SUV.' },
      { title: 'About 4 to 6 hours', text: 'The usual time for a Premium Detail.' },
      { title: 'Inside and out', text: 'Add the $50 Exterior Wash for $250 in total.' },
    ],
    faqs: [
      { q: 'Is shampoo included in the Basic Detail?', a: 'No. Shampoo and extraction come with the Premium Detail ($200). The Basic Detail is vacuuming, a full wipe-down and floor mats.' },
      { q: 'Will every stain come out?', a: 'Most everyday stains do. Old set-in stains, ink or dye transfer may only lighten.' },
      FAQ_SIZE,
      FAQ_WATER,
      FAQ_GUARANTEE,
    ],
    service: { type: 'Car seat shampoo and carpet extraction', offers: PREMIUM_OFFERS },
  },
  {
    path: '/hand-car-wash-and-detail-buena-park',
    nav: 'Hand wash & detail',
    city: HOME_CITY,
    title: fitTitle('Hand Car Wash & Detail', HOME_CITY),
    description: 'Hand car wash and detail in Buena Park, CA: interior detail plus the $50 exterior hand wash, $200 or $250. Mobile, with our own water and power.',
    eyebrow: 'Inside & out · Buena Park, CA',
    h1: ['Hand car wash & detail', 'in Buena Park.'],
    lede: 'One visit for the whole car. Choose an interior detail, add the Exterior Wash, and we foam, wash and hand dry the outside right in your driveway.',
    facts: ['From $200', 'Foam & hand wash', 'Own water & power'],
    card: 'combo',
    pkg: 'premium',
    photo: PHOTO.corvette,
    intro: {
      h2: 'Inside first, then the hand wash.',
      paras: [
        'The Exterior Wash is an add-on, so every visit starts with the Basic Detail ($150) or the Premium Detail ($200) inside the car.',
        'For $50 more we hand wash the outside, clean the rims in detail, scrub and degrease the tires, wipe the door jambs and panels, add tire shine and hand dry the paint so it does not spot.',
        'That makes $200 with the Basic Detail or $250 with the Premium Detail. We bring our own water and power, so there is nothing to hook up.',
      ],
    },
    pointsTitle: 'The whole car in one visit',
    points: [
      { title: 'Hand washed', text: 'Foam, hand wash, detailed rims and a spot-free hand dry.' },
      { title: 'Self-contained', text: 'Our own water and power, at your Buena Park address.' },
      { title: '$15 off online', text: 'Use code PREPAY at checkout, or pay on the day.' },
    ],
    faqs: [
      { q: 'What does a wash and detail cost?', a: '$200 for the Basic Detail with the Exterior Wash, or $250 for the Premium Detail with the Exterior Wash.' },
      FAQ_WASH,
      FAQ_WATER,
      FAQ_ECO,
      FAQ_PAY,
    ],
    service: { type: 'Hand car wash and interior detail', offers: WASH_OFFERS },
  },
  {
    path: '/car-detailing-cost-buena-park',
    nav: 'Detailing cost',
    city: HOME_CITY,
    title: fitTitle('Car Detailing Cost', HOME_CITY),
    description: 'What car detailing costs in Buena Park, CA: Basic Detail $150, Premium Detail $200, Exterior Wash add-on $50. Same price for any vehicle size.',
    eyebrow: 'Cost · Buena Park, CA',
    h1: ['Car detailing cost', 'in Buena Park.'],
    lede: 'Flat prices that do not change with the size of your vehicle. Here is what each package costs, what it covers and how long it usually takes.',
    facts: ['Basic $150', 'Premium $200', 'Wash add-on $50'],
    card: 'premium',
    pkg: 'premium',
    photo: PHOTO.red,
    intro: {
      h2: 'Three prices to know.',
      paras: [
        '$150, Basic Detail, about 2 to 3 hours: triple-stage vacuuming for deep debris, a complete interior surface wipe-down, and floor mats cleaned and restored.',
        '$200, Premium Detail, about 4 to 6 hours: triple-stage vacuuming plus cabin application, dust elimination, interior windows, deep carpet cleaning, cloth and carpet extraction, full interior shampooing and a UV-protectant coating.',
        '+$50, Exterior Wash, added to either detail: hand wash, detailed rims, tire scrub and degrease, door jambs and panels, tire shine and a spot-free hand dry. Code PREPAY takes $15 off online.',
      ],
    },
    pointsTitle: 'No surprises',
    points: [
      { title: 'Same price any vehicle', text: 'A hatchback and a pickup pay the same.' },
      { title: 'Visit included', text: 'The price includes coming to your address.' },
      { title: 'Pay now or later', text: 'Prepay online for $15 off, or pay on the day.' },
    ],
    faqs: [
      { q: 'What is the most I would pay?', a: '$250: the Premium Detail with the Exterior Wash. $235 if you prepay online with code PREPAY.' },
      FAQ_SIZE,
      FAQ_TIME,
      FAQ_WASH,
      FAQ_GUARANTEE,
    ],
    service: { type: 'Auto detailing', offers: DETAIL_OFFERS },
  },
];

// City pages: same packages, prices and hours; local wording.
function cityPage({ slug, city, areas, lede, paras, photo, faq }) {
  return {
    path: `/mobile-car-cleaning-${slug}`,
    nav: city,
    city,
    isCity: true,
    title: fitTitle('Mobile Car Cleaning', city),
    description: `Mobile car cleaning and detailing in ${city}, CA by Bonnie. Details $150 and $200, $50 hand wash add-on, same price any car. Every day 8 AM to 5 PM.`,
    eyebrow: `Mobile car cleaning · ${city}, CA`,
    h1: ['Mobile car cleaning', `in ${city}.`],
    lede,
    facts: ['From $150', 'Own water & power', 'Every day 8–5'],
    card: 'combo',
    pkg: 'premium',
    photo,
    areas,
    intro: { h2: `Detailed where you park in ${city}.`, paras },
    pointsTitle: `Why ${city} drivers book Bonnie`,
    points: [
      { title: 'Buena Park prices', text: 'The same $150 and $200 details and $50 wash add-on, for any vehicle.' },
      { title: 'Self-contained', text: 'We bring our own water and power, so there is nothing to hook up.' },
      { title: 'Satisfaction guarantee', text: 'If something is not right, tell us and we will make it right.' },
    ],
    faqs: [
      { q: `Do you come to ${city}?`, a: `Yes. We detail cars at homes and workplaces across ${city}, including ${areas.slice(0, 3).join(', ')}.` },
      faq,
      FAQ_SIZE,
      FAQ_WATER,
      FAQ_WASH,
    ],
    service: { type: 'Mobile car cleaning and detailing', offers: DETAIL_OFFERS },
  };
}

export const CITY_PAGES = [
  cityPage({
    slug: 'stanton',
    city: 'Stanton',
    areas: ['Beach Boulevard', 'Katella Avenue', 'Stanton Central Park', 'Cerritos Avenue', 'Western Avenue'],
    lede: 'Stanton is just south of Buena Park along Beach Boulevard. We bring the full detail to your home or workplace there.',
    paras: [
      'We work across Stanton, from the neighborhoods off Beach Boulevard and Katella Avenue to the streets around Stanton Central Park, Cerritos Avenue and Western Avenue.',
      'Choose the $150 Basic Detail for three vacuum passes, a full wipe-down and clean floor mats, or the $200 Premium Detail when seats and carpets need shampoo and extraction.',
      'Add the $50 Exterior Wash for a hand wash and spot-free dry. Start times run every day from 8 AM to 5 PM.',
    ],
    photo: PHOTO.wheel,
    faq: { q: 'Is Stanton the same price as Buena Park?', a: 'Yes. Same packages, same prices and the same hours, every day from 8 AM to 5 PM.' },
  }),
  cityPage({
    slug: 'garden-grove',
    city: 'Garden Grove',
    areas: ['West Garden Grove', 'Downtown Garden Grove', 'Little Saigon', 'Garden Grove Boulevard', 'Chapman Avenue'],
    lede: 'Garden Grove is a short drive south of Buena Park. Book a detail and we set up in your driveway or office parking.',
    paras: [
      'We detail cars throughout Garden Grove, from West Garden Grove and downtown to Little Saigon and the homes along Garden Grove Boulevard and Chapman Avenue.',
      'The Basic Detail ($150, usually 2 to 3 hours) covers vacuuming, a full wipe-down and floor mats. The Premium Detail ($200, usually 4 to 6 hours) adds deep carpet cleaning, extraction, shampoo and UV protection.',
      'There is no extra charge for an SUV, truck or minivan, and code PREPAY takes $15 off when you pay online.',
    ],
    photo: PHOTO.audi,
    faq: { q: 'Can you detail my car at work in Garden Grove?', a: 'Yes. Enter the work address when you book; we only need room around the car to open the doors.' },
  }),
  cityPage({
    slug: 'norwalk',
    city: 'Norwalk',
    areas: ['Norwalk Town Square', 'Firestone Boulevard', 'Imperial Highway', 'Studebaker Road', 'Alondra Boulevard'],
    lede: 'Norwalk sits just over the county line from Buena Park. We bring the same mobile detailing and prices there.',
    paras: [
      'We come to homes and workplaces across Norwalk, from the streets near Norwalk Town Square to the neighborhoods off Firestone Boulevard, Imperial Highway, Studebaker Road and Alondra Boulevard.',
      'Book the $150 Basic Detail or the $200 Premium Detail, which adds full shampoo and cloth and carpet extraction to the interior.',
      'Want the outside done too? The $50 Exterior Wash adds a hand wash, detailed rims, tire shine and a spot-free hand dry.',
    ],
    photo: PHOTO.tesla,
    faq: { q: 'Do you charge more to come to Norwalk?', a: 'No. Norwalk pays the same prices as Buena Park.' },
  }),
  cityPage({
    slug: 'santa-fe-springs',
    city: 'Santa Fe Springs',
    areas: ['Heritage Park', 'Telegraph Road', 'Florence Avenue', 'Norwalk Boulevard', 'Santa Fe Springs Road'],
    lede: 'Santa Fe Springs mixes homes and business parks. We detail cars at both, at your house or in your work lot.',
    paras: [
      'We work across Santa Fe Springs, from the homes near Heritage Park to the offices and business parks along Telegraph Road, Florence Avenue, Norwalk Boulevard and Santa Fe Springs Road.',
      'Pick the $150 Basic Detail or the $200 Premium Detail with deep carpet cleaning, extraction, full shampoo and a UV-protectant coating.',
      'Add the $50 Exterior Wash for the outside. Pay online with code PREPAY for $15 off, or pay on the day.',
    ],
    photo: PHOTO.red,
    faq: { q: 'Can you detail a work vehicle in a business park?', a: 'Yes, at the same price. Enter the work address when you book; we bring our own water and power.' },
  }),
  cityPage({
    slug: 'la-habra',
    city: 'La Habra',
    areas: ['Downtown La Habra', 'La Habra Marketplace', 'Whittier Boulevard', 'Imperial Highway', 'Beach Boulevard'],
    lede: 'La Habra is north of Buena Park up Beach Boulevard. We bring the same interior details, and the hand wash if you want it.',
    paras: [
      'We detail cars across La Habra, from downtown and the streets around La Habra Marketplace to the neighborhoods off Whittier Boulevard, Imperial Highway and Beach Boulevard.',
      'The $150 Basic Detail gives the cabin three vacuum passes, a full wipe-down and clean floor mats. The $200 Premium Detail adds shampoo, extraction and a UV-protectant coating.',
      'Same price for any vehicle size, and start times every day from 8 AM to 5 PM.',
    ],
    photo: PHOTO.corvette,
    faq: { q: 'Can I book a weekend in La Habra?', a: 'Yes. We work every day of the week, with start times from 8 AM to 5 PM.' },
  }),
  cityPage({
    slug: 'placentia',
    city: 'Placentia',
    areas: ['Old Town Placentia', 'Kraemer Boulevard', 'Yorba Linda Boulevard', 'Tri-City Park', 'Rose Drive'],
    lede: 'Placentia is just past Fullerton from Buena Park. We come to your home or office there with everything we need.',
    paras: [
      'We work across Placentia, from Old Town and the homes near Tri-City Park to the neighborhoods off Kraemer Boulevard, Yorba Linda Boulevard and Rose Drive.',
      'Choose the $150 Basic Detail or the $200 Premium Detail when the seats and carpets need shampoo and extraction.',
      'The $50 Exterior Wash adds a hand wash, rims, tire shine and a spot-free dry. Code PREPAY takes $15 off when you pay online.',
    ],
    photo: PHOTO.wheel,
    faq: { q: 'How much is inside and out in Placentia?', a: '$250 for the Premium Detail with the Exterior Wash, or $200 for the Basic Detail with the Exterior Wash.' },
  }),
  cityPage({
    slug: 'artesia',
    city: 'Artesia',
    areas: ['Pioneer Boulevard', 'South Street', '183rd Street', 'Artesia Park', 'Norwalk Boulevard'],
    lede: 'Artesia is a few minutes west of Buena Park. Book online and we detail the car right where it is parked.',
    paras: [
      'We come to homes and businesses across Artesia, from Pioneer Boulevard and South Street to the streets around Artesia Park, 183rd Street and Norwalk Boulevard.',
      'The Basic Detail ($150) covers vacuuming, a full wipe-down and floor mats. The Premium Detail ($200) adds deep carpet cleaning, extraction, shampoo and UV protection.',
      'Add the $50 Exterior Wash for the outside. We bring our own water and power.',
    ],
    photo: PHOTO.tesla,
    faq: { q: 'Do you need a driveway in Artesia?', a: 'No. Street parking or a parking lot works too, as long as we can reach all sides of the car.' },
  }),
  cityPage({
    slug: 'lakewood',
    city: 'Lakewood',
    areas: ['Lakewood Center', 'Mayfair', 'Lakewood Village', 'Del Amo Boulevard', 'Carson Street'],
    lede: 'Lakewood is west of Buena Park past Cerritos. We bring the full mobile detail to your street there.',
    paras: [
      'We detail cars throughout Lakewood, from the neighborhoods around Lakewood Center and Mayfair to Lakewood Village and the homes along Del Amo Boulevard and Carson Street.',
      'Pick the $150 Basic Detail or the $200 Premium Detail, which adds full shampoo and cloth and carpet extraction to the interior.',
      'Same price for any car, SUV, truck or minivan. Start times run every day from 8 AM to 5 PM.',
    ],
    photo: PHOTO.audi,
    faq: { q: 'Is Lakewood the same price as Buena Park?', a: 'Yes. Same packages, same prices and the same hours.' },
  }),
];

export const LANDING_PAGES = [...SERVICE_PAGES, ...CITY_PAGES];

export function findLanding(path) {
  return LANDING_PAGES.find((p) => p.path === path);
}

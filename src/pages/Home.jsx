import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  CalendarCheck,
  Truck,
  ShieldCheck,
  Droplets,
  Sparkles,
  CreditCard,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Hand,
} from 'lucide-react';
import useReveal from '../components/useReveal';
import { BUSINESS, HOME_AREAS, GALLERY, PREPAY_DISCOUNT } from '../data/site';
import { Packages, Reviews, Faq, Cta, AreaChips } from '../components/Sections';

/* ─── Hero ───────────────────────────────────────────── */
function Bubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 61) % 100}%`,
        size: 8 + ((i * 7) % 22),
        dur: 11 + ((i * 3) % 12),
        delay: -((i * 1.7) % 14),
        dx: `${((i % 5) - 2) * 26}px`,
      })),
    []
  );
  return (
    <div className="bubbles" aria-hidden="true">
      {bubbles.map((b, i) => (
        <i
          key={i}
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            '--dx': b.dx,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ribbon = [
    'Mobile Detailing',
    'Buena Park, CA',
    'We Come To You',
    'Every Day 8 AM – 5 PM',
    'Interior Deep Cleans',
    'Hand Wash Add-On',
  ];
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" />
      <Bubbles />
      <div className="container hero-inner">
        <div>
          <h1 className="hero-kicker hero-in">
            <b>Mobile</b> car detailing in {BUSINESS.city}, {BUSINESS.region}
          </h1>
          <p className="hero-title hero-in" style={{ '--d': '80ms' }}>
            <span className="chrome">We bring the</span> <span className="shine">shine</span>
            <br />
            <span className="chrome">to your driveway.</span>
          </p>
          <p className="hero-sub hero-in" style={{ '--d': '160ms' }}>
            Deep interior details and an optional hand-washed exterior, done right where your car is parked,
            with our own water and power. Pick a package, pick a time and we handle the rest.
          </p>
          <div className="hero-ctas hero-in" style={{ '--d': '240ms' }}>
            <Link to="/book" className="btn btn-gold">
              <span>
                <CalendarCheck size={18} /> Book Online
              </span>
            </Link>
            <a href={BUSINESS.phoneHref} className="btn btn-outline">
              <span>
                <Phone size={18} /> {BUSINESS.phoneDisplay}
              </span>
            </a>
          </div>
          <div className="hero-trust hero-in" style={{ '--d': '320ms' }}>
            <span>
              <Truck size={16} /> Fully mobile
            </span>
            <span>
              <Droplets size={16} /> Own water &amp; power
            </span>
            <span>
              <Clock size={16} /> Every day 8–5
            </span>
            <span>
              <CreditCard size={16} /> Pay online or later
            </span>
          </div>
        </div>

        <div className="hero-visual hero-in" style={{ '--d': '120ms' }}>
          <div className="hex hero-hex-outline" />
          <div className="hex hero-hex-photo">
            <img
              src="/images/audi-foam.webp"
              alt="Sedan covered in snow foam during a Bonnie Car Detailing wash"
              width="720"
              height="892"
              decoding="async"
            />
          </div>
          <div className="hero-badge">
            <small>Details from</small>
            <strong>$150</strong>
          </div>
          <div className="hero-badge hero-badge-2">
            <span className="dot">
              <Droplets size={20} />
            </span>
            <span>
              <b>Save ${PREPAY_DISCOUNT}</b>
              <small>when you prepay</small>
            </span>
          </div>
        </div>
      </div>

      <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {ribbon.map((t) => (
                <span key={t + k}>
                  {t} <Sparkles size={16} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ────────────────────────────────────────── */
function Process() {
  const laps = [
    {
      title: 'Pick a package',
      text: 'Choose Basic or Premium, then decide if you want the Exterior Wash added on.',
    },
    {
      title: 'Lock in a time',
      text: 'Grab any open start time between 8:00 AM and 5:00 PM, seven days a week.',
    },
    {
      title: 'We pull up & detail',
      text: `We come to your spot in ${BUSINESS.city} with our own water and power. You carry on with your day — we hand back a fresh car.`,
    },
  ];
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow blue">How it works</span>
          <h2 className="section-title">
            Three laps to <span className="blue">clean</span>
          </h2>
        </div>
        <div className="road">
          {laps.map((l, i) => (
            <div className="lap reveal" key={l.title} style={{ '--d': `${i * 140}ms` }}>
              <div className="lap-num">
                <span>0{i + 1}</span>
              </div>
              <div>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ────────────────────────────────────────── */
const TILE_LABELS = ['Snow foam pre-wash', 'Wheels & tires', 'Full-body foam', 'Hand wash', 'Driveway finish'];

function Gallery() {
  const [idx, setIdx] = useState(null);

  useEffect(() => {
    if (idx === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [idx]);

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <span className="eyebrow">Foam files</span>
            <h2 className="section-title">
              Work from the <span className="gold">driveway</span>
            </h2>
          </div>
          <p className="section-lead reveal" style={{ '--d': '100ms' }}>
            Thick foam, careful hands, spotless finish. Tap any shot to see it full size.
          </p>
        </div>
        <div className="bento reveal">
          {GALLERY.map((g, i) => (
            <button key={g.src} className={`tile tile-${i + 1}`} onClick={() => setIdx(i)} aria-label={`View ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" />
              <span className="tile-label">{TILE_LABELS[i]}</span>
            </button>
          ))}
        </div>
        <p className="gallery-hint" style={{ display: 'none', justifyContent: 'center', gap: 6, color: 'var(--muted)', fontSize: '0.8rem', marginTop: 12 }}>
          <Hand size={14} /> Swipe for more
        </p>
      </div>

      {idx !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setIdx(null)}>
          <img src={GALLERY[idx].src} alt={GALLERY[idx].alt} onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-close" aria-label="Close" onClick={() => setIdx(null)}>
            <X size={20} />
          </button>
          <button
            className="lb-btn lb-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length);
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="lb-btn lb-next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i + 1) % GALLERY.length);
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}

/* ─── Why Bonnie ─────────────────────────────────────── */
function Why() {
  const items = [
    {
      icon: Truck,
      title: 'We come to you',
      text: `Home, work or apartment lot in ${BUSINESS.city} — no drop-offs, no waiting rooms, no rides needed.`,
    },
    {
      icon: Sparkles,
      title: 'Interior-first detailing',
      text: 'Triple-stage vacuuming, extraction and shampooing that pulls out what a quick wipe leaves behind.',
    },
    {
      icon: ShieldCheck,
      title: 'Satisfaction guarantee',
      text: 'Every detail is backed by our satisfaction guarantee. If something is not right, we make it right.',
    },
    {
      icon: Droplets,
      title: 'Eco-friendly products',
      text: 'We use eco-friendly detailing products, and the same price applies to every car, SUV, truck or minivan.',
    },
  ];
  return (
    <section className="section why" id="why">
      <div className="container why-grid">
        <div className="why-photo reveal">
          <div className="frame">
            <img src="/images/tesla-shine.jpg" alt="Freshly detailed white SUV shining in a driveway" loading="lazy" />
          </div>
          <div className="stamp" aria-hidden="true">
            <div>
              <b>7</b>days
              <br />a week
            </div>
          </div>
        </div>
        <div>
          <div className="reveal">
            <span className="eyebrow">Why Bonnie</span>
            <h2 className="section-title">
              Built for <span className="gold">busy</span> drivers
            </h2>
            <p className="section-lead">
              Your schedule stays yours. We bring the equipment, the products and the patience to get every
              corner right.
            </p>
          </div>
          <div className="why-list">
            {items.map(({ icon: Icon, title, text }, i) => (
              <div className="why-item reveal" key={title} style={{ '--d': `${i * 90}ms` }}>
                <span className="ico">
                  <Icon size={24} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="stats reveal">
            <div className="stat">
              <b>100%</b>
              <small>Mobile</small>
            </div>
            <div className="stat">
              <b>7</b>
              <small>Days open</small>
            </div>
            <div className="stat">
              <b>8AM–5PM</b>
              <small>Start times</small>
            </div>
            <div className="stat">
              <b>${PREPAY_DISCOUNT}</b>
              <small>Prepay savings</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Service area ───────────────────────────────────── */
function Area() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return (
    <section className="section area" id="area">
      <div className="container">
        <div className="area-card reveal">
          <div className="area-copy">
            <span className="eyebrow blue">Service area</span>
            <h2 className="section-title">
              Rolling through <span className="gold">{BUSINESS.city}</span>
            </h2>
            <p className="section-lead">
              Based in {BUSINESS.city} and detailing all over town, from {HOME_AREAS.slice(0, 3).join(', ')} to{' '}
              {HOME_AREAS[3]}, plus these nearby cities at the same prices:
            </p>
            <AreaChips />
            <div className="area-info">
              <div>
                <Clock size={18} /> {BUSINESS.hours}
              </div>
              <div>
                <Phone size={18} /> <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
              </div>
            </div>
          </div>
          <div className="area-map">
            <iframe title={`Map of ${BUSINESS.city}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal([]);
  return (
    <>
      <Hero />
      <Packages />
      <Process />
      <Gallery />
      <Why />
      <Area />
      <Reviews />
      <Faq />
      <Cta />
    </>
  );
}

import { Link } from 'react-router-dom';
import { Check, MapPin, Phone, CalendarCheck } from 'lucide-react';
import useReveal from '../components/useReveal';
import { BUSINESS, PACKAGES, EXTERIOR } from '../data/site';
import { Packages, Faq, Cta, ServiceChips, AreaChips } from '../components/Sections';

// One template for every SEO landing page in src/lib/pages.js.

const basic = PACKAGES.find((p) => p.id === 'basic');
const premium = PACKAGES.find((p) => p.id === 'premium');

// Hero price card: the Premium Detail, or 'combo' = Premium + Exterior Wash.
// The Exterior Wash is never shown as a product on its own.
function PriceCard({ page }) {
  const combo = page.card === 'combo';
  const name = combo ? `${premium.name} + ${EXTERIOR.name}` : premium.name;
  const price = combo ? premium.price + EXTERIOR.price : premium.price;
  const items = combo
    ? ['Everything in the Premium Detail', 'Full Interior Shampooing', 'Cloth & Carpet Extraction', 'Hand-Washed Exterior', 'Detailed Rim Cleaning', 'Spot-Free Hand Drying']
    : premium.items;
  return (
    <aside className="lp-card" aria-label={name}>
      <span className="lp-card-flag">{combo ? 'Inside & out' : 'Most complete'}</span>
      <h2 className="lp-card-name">{name}</h2>
      <p className="lp-card-price">
        ${price}
        <small> any vehicle</small>
      </p>
      <ul className="pkg-list">
        {items.map((f) => (
          <li key={f}>
            <span className="tick">
              <Check size={14} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <Link className="btn btn-gold btn-block" to="/book?service=premium">
        <span>Book this detail</span>
      </Link>
      <p className="lp-card-note">
        {combo
          ? `Or the ${basic.name} + wash for $${basic.price + EXTERIOR.price}, or a detail alone from $${basic.price}.`
          : `Or the ${basic.name} for $${basic.price}. Prepay with code PREPAY to save $15.`}
      </p>
    </aside>
  );
}

// City pages: neighborhoods + map.
function Local({ page }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${page.city}, CA`)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return (
    <section className="section area">
      <div className="container">
        <div className="area-card reveal">
          <div className="area-copy">
            <span className="eyebrow blue">Service area</span>
            <h2 className="section-title">
              Where we work in <span className="gold">{page.city}</span>
            </h2>
            <p className="section-lead">
              We come to homes and workplaces across {page.city}. Not sure about your address? Call{' '}
              <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.
            </p>
            <div className="chips">
              {page.areas.map((a) => (
                <span key={a} className="chip">
                  <MapPin size={13} /> {a}
                </span>
              ))}
            </div>
          </div>
          <div className="area-map">
            <iframe title={`Map of ${page.city}, CA`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Landing({ page }) {
  useReveal([page.path]);
  const { intro } = page;
  return (
    <>
      <section className="lp-hero">
        <div className="container lp-grid">
          <div>
            <nav className="lp-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.nav}</span>
            </nav>
            <span className="eyebrow blue">{page.eyebrow}</span>
            <h1 className="lp-title">
              <span className="chrome">{page.h1[0]}</span> <span className="lp-city">{page.h1[1]}</span>
            </h1>
            <p className="hero-sub">{page.lede}</p>
            <div className="hero-ctas">
              <Link to={`/book?service=${page.pkg}`} className="btn btn-gold">
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
            <div className="hero-trust">
              {page.facts.map((f) => (
                <span key={f}>
                  <Check size={16} /> {f}
                </span>
              ))}
            </div>
          </div>
          <PriceCard page={page} />
        </div>
      </section>

      <section className="section lp-intro">
        <div className="container lp-intro-grid">
          <div className="reveal">
            <h2 className="section-title">{intro.h2}</h2>
            {intro.paras.map((p) => (
              <p key={p} className="lp-p">
                {p}
              </p>
            ))}
          </div>
          <figure className="lp-photo reveal">
            <img src={page.photo.src} alt={page.photo.alt} loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="section lp-points">
        <div className="container">
          <div className="section-head center reveal">
            <h2 className="section-title">{page.pointsTitle}</h2>
          </div>
          <div className="lp-points-grid">
            {page.points.map((pt, i) => (
              <div className="lp-point reveal" key={pt.title} style={{ '--d': `${i * 90}ms` }}>
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Packages title={<>Prices for <span className="gold">every visit</span></>} showLinks={false} />

      {page.isCity && <Local page={page} />}

      <Faq faqs={page.faqs} title={page.isCity ? `${page.city} detailing questions` : `${page.nav} questions`} />

      <section className="section lp-related" aria-label="More from Bonnie Car Detailing">
        <div className="container">
          <h2 className="lp-related-title">More detailing services</h2>
          <ServiceChips exclude={page.path} home />
          <h2 className="lp-related-title">Areas we serve</h2>
          <AreaChips exclude={page.path} home />
        </div>
      </section>

      <Cta where={page.city} />
    </>
  );
}

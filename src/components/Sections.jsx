import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, CalendarCheck, Check, Plus, ArrowRight, MapPin, Star, Quote } from 'lucide-react';
import { BUSINESS, PACKAGES, EXTERIOR, FAQS, REVIEWS, GOOGLE_RATING, GOOGLE_PROFILE_URL } from '../data/site';
import { SERVICE_PAGES, CITY_PAGES, HOME_CITY } from '../lib/pages';

// Sections shared by the home page and the SEO landing pages.

/* ─── Link chips to the landing pages ─── */
export function ServiceChips({ exclude, home = false }) {
  return (
    <div className="chips link-chips">
      {home && (
        <Link className="chip home" to="/">
          Mobile car detailing in {HOME_CITY}
        </Link>
      )}
      {SERVICE_PAGES.filter((p) => p.path !== exclude).map((p) => (
        <Link key={p.path} className="chip" to={p.path}>
          {p.nav}
        </Link>
      ))}
    </div>
  );
}

export function AreaChips({ exclude, home = false }) {
  return (
    <div className="chips link-chips">
      {home && (
        <Link className="chip home" to="/#area">
          <MapPin size={13} /> {HOME_CITY}
        </Link>
      )}
      {CITY_PAGES.filter((p) => p.path !== exclude).map((p) => (
        <Link key={p.path} className="chip" to={p.path}>
          <MapPin size={13} /> {p.city}
        </Link>
      ))}
    </div>
  );
}

/* ─── Packages ─── */
export function Packages({ title, showLinks = true }) {
  return (
    <section className="section packages" id="packages">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <span className="eyebrow">The Detail Menu</span>
            <h2 className="section-title">
              {title || (
                <>
                  Pick your <span className="gold">package</span>
                </>
              )}
            </h2>
          </div>
          <p className="section-lead reveal" style={{ '--d': '100ms' }}>
            Two interior packages, one simple add-on. Flat pricing for any car, SUV, truck or minivan, done by
            hand at your location with our own water and power.
          </p>
        </div>

        <div className="pkg-grid">
          {PACKAGES.map((p, i) => (
            <article
              key={p.id}
              className={`pkg reveal ${p.featured ? 'pkg-featured' : ''}`}
              style={{ '--d': `${i * 120}ms` }}
            >
              <span className="pkg-ghost" aria-hidden="true">
                0{i + 1}
              </span>
              {p.featured && <span className="pkg-flag">Most complete</span>}
              <div className="pkg-top">
                <div>
                  <h3 className="pkg-name">{p.name}</h3>
                  <p className="pkg-tag">
                    {p.tagline} Usually {p.duration}.
                  </p>
                </div>
              </div>
              <div className="pkg-price">
                <sup>$</sup>
                <b>{p.price}</b>
                <small>Interior</small>
              </div>
              <ul className="pkg-list">
                {p.items.map((it) => (
                  <li key={it}>
                    <span className="tick">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="addon reveal">
          <div className="addon-price hex">
            <div>
              <small>Add-on</small>
              <b>+${EXTERIOR.price}</b>
            </div>
          </div>
          <div>
            <h3>{EXTERIOR.name}</h3>
            <p>Add it to either package during booking for a full inside-and-out finish.</p>
            <ul>
              {EXTERIOR.items.map((it) => (
                <li key={it}>
                  <Plus size={14} strokeWidth={3} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showLinks && (
          <div className="pkg-links reveal">
            <span>Compare in detail:</span>
            <ServiceChips />
          </div>
        )}

        <div className="pkg-cta reveal">
          <Link to="/book" className="btn btn-gold">
            <span>
              Book Now <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews (hidden while REVIEWS is empty) ─── */
export function Reviews() {
  if (!REVIEWS.length) return null;
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Reviews</span>
          <h2 className="section-title">
            What customers <span className="gold">say</span>
          </h2>
          {GOOGLE_RATING && (
            <p className="section-lead rev-rating">
              Rated {GOOGLE_RATING.value} out of 5 from {GOOGLE_RATING.count} reviews on{' '}
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                Google
              </a>
              .
            </p>
          )}
        </div>
        <div className="rev-grid">
          {REVIEWS.map((r, i) => (
            <figure className="rev reveal" key={r.name} style={{ '--d': `${(i % 3) * 80}ms` }}>
              <Quote size={22} className="rev-q" aria-hidden="true" />
              <div className="rev-stars" aria-label="5 stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote>{r.text}</blockquote>
              <figcaption>{r.name}, Google review</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
export function Faq({ faqs = FAQS, title }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="reveal">
          <span className="eyebrow">Questions</span>
          <h2 className="section-title">
            {title || (
              <>
                Good to <span className="gold">know</span>
              </>
            )}
          </h2>
          <p className="section-lead">Anything else on your mind? We&apos;re a quick call away.</p>
          <a href={BUSINESS.phoneHref} className="btn btn-outline" style={{ marginTop: 26 }}>
            <span>
              <Phone size={17} /> {BUSINESS.phoneDisplay}
            </span>
          </a>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item reveal ${open === i ? 'open' : ''}`} style={{ '--d': `${i * 70}ms` }}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {f.q}
                <span className="pm">
                  <Plus size={18} />
                </span>
              </button>
              <div className="faq-a">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA band ─── */
export function Cta({ where }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-band reveal">
          <div>
            <span className="eyebrow">
              <Star size={14} /> Ready when you are
            </span>
            <h2 style={{ marginTop: 12 }}>Your car&apos;s next clean starts here.</h2>
            <p>Pick a package and a time in a few taps. We&apos;ll bring the shine to you{where ? ` in ${where}` : ''}.</p>
          </div>
          <div className="actions">
            <Link to="/book" className="btn btn-gold">
              <span>
                <CalendarCheck size={18} /> Book Online
              </span>
            </Link>
            <a href={BUSINESS.phoneHref} className="btn btn-outline">
              <span>
                <Phone size={18} /> Call Now
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

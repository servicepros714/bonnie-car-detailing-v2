import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, CalendarCheck } from 'lucide-react';
import { BUSINESS, REVIEWS } from '../data/site';
import { SERVICE_PAGES, CITY_PAGES, HOME_CITY } from '../lib/pages';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/logo-sm.webp" alt={BUSINESS.fullName} width="360" height="264" loading="lazy" />
          <p>
            Mobile car detailing in {BUSINESS.city}, {BUSINESS.region}. We roll up to your driveway, your
            office or your curb with our own water and power.
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            {SERVICE_PAGES.map((p) => (
              <li key={p.path}>
                <Link to={p.path}>{p.nav}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Areas</h4>
          <ul>
            <li>
              <Link to="/">{HOME_CITY}</Link>
            </li>
            {CITY_PAGES.map((p) => (
              <li key={p.path}>
                <Link to={p.path}>{p.city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/#process">How It Works</Link>
            </li>
            <li>
              <Link to="/#gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/#area">Service Area</Link>
            </li>
            {REVIEWS.length > 0 && (
              <li>
                <Link to="/#reviews">Reviews</Link>
              </li>
            )}
            <li>
              <Link to="/#faq">FAQ</Link>
            </li>
            <li>
              <Link to="/book">Book Online</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li className="row">
              <Phone size={15} />
              <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </li>
            <li className="row">
              <MapPin size={15} />
              <span>{BUSINESS.address}</span>
            </li>
            <li className="row">
              <Clock size={15} />
              <span>{BUSINESS.hours}</span>
            </li>
            <li className="row">
              <CalendarCheck size={15} />
              <Link to="/book">Book online anytime</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-word" aria-hidden="true">
        BONNIE
      </div>
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span>
            © {year} {BUSINESS.fullName}. All rights reserved.
          </span>
          <span>Mobile Car Detailing · Buena Park, CA</span>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { ServiceChips } from '../components/Sections';

// Prerendered as dist/404.html, which Cloudflare Pages serves (with a 404 status) for unknown URLs.
export default function NotFound() {
  return (
    <section className="section nf">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="section-title">Page not found</h1>
        <p className="section-lead">That page does not exist. See our detailing services or book online.</p>
        <ServiceChips home />
        <Link to="/book" className="btn btn-gold">
          <span>
            <CalendarCheck size={18} /> Book Online
          </span>
        </Link>
      </div>
    </section>
  );
}

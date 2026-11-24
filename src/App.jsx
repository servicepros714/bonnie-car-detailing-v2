import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import MobileActionBar from './components/MobileActionBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Book from './pages/Book';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Seo from './components/Seo';
import { LANDING_PAGES } from './lib/pages';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

const FLOW_ROUTES = ['/book', '/checkout', '/confirmation'];

export default function App() {
  const { pathname } = useLocation();
  const inFlow = FLOW_ROUTES.includes(pathname);

  return (
    <>
      <ScrollManager />
      <Seo />
      <Navbar solid={inFlow} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {LANDING_PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<Landing page={page} />} />
          ))}
          <Route path="/book" element={<Book />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!inFlow && <Footer />}
      {!inFlow && <MobileActionBar />}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0b2350',
            color: '#e9eef4',
            border: '1px solid rgba(111,211,255,.28)',
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px',
          },
          iconTheme: { primary: '#f7c520', secondary: '#140f00' },
        }}
      />
    </>
  );
}

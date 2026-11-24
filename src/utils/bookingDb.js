// Booking data layer: the Cloudflare Worker (worker/worker.js) + the shared D1 database.
// The Worker prices every booking from the selected service ids and checks card payments
// with Stripe, so nothing the browser sends about price or payment is trusted.

import { EXTERIOR, PACKAGES } from '../data/site';

const PENDING_KEY = 'bonnie_pending_booking';
const LAST_KEY = 'bonnie_last_booking';

const rawApi = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
export const API_URL =
  rawApi.startsWith('https://') && !/YOUR-|your-subdomain/i.test(rawApi) ? rawApi : '';
export const apiConfigured = Boolean(API_URL);

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  } catch {
    throw new Error('Could not reach the booking server. Check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Something went wrong. Please try again.');
    err.status = res.status;
    err.code = res.status === 409 ? 'SLOT_TAKEN' : data.code;
    throw err;
  }
  return data;
}

/** Service ids for the Worker: one package, plus 'exterior' when the add-on is chosen. */
export const serviceIds = (pending) => [pending.packageId, ...(pending.exterior ? [EXTERIOR.id] : [])];

export function serviceLabel(pending) {
  const pkg = PACKAGES.find((p) => p.id === pending.packageId);
  return `${pkg?.name || 'Detail'}${pending.exterior ? ` + ${EXTERIOR.name}` : ''}`;
}

/** Start times already booked on a date. */
export async function getBookedTimes(dateKey) {
  if (!apiConfigured) return [];
  try {
    const data = await request(`/api/availability?start=${encodeURIComponent(dateKey)}&end=${encodeURIComponent(dateKey)}`);
    return data.booked?.[dateKey] || [];
  } catch {
    return [];
  }
}

/** -> { clientSecret, paymentIntentId, amount } priced by the Worker. */
export function createPaymentIntent(pending, coupon) {
  return request('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({
      services: serviceIds(pending),
      coupon: coupon || '',
      date: pending.date,
      time: pending.time,
      name: pending.info.name,
      email: pending.info.email,
    }),
  });
}

/**
 * Save the booking. Pay later: { payLater: true }. Card: { paymentIntentId } — the Worker
 * re-reads that PaymentIntent from Stripe before saving the booking as Paid.
 * Returns { id, booking } with the Worker's booking id, payment status and total.
 */
export async function createBooking(pending, { payLater = false, paymentIntentId } = {}) {
  const data = await request('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({
      services: serviceIds(pending),
      date: pending.date,
      time: pending.time,
      ...pending.info,
      payLater,
      paymentIntentId,
    }),
  });
  const booking = {
    id: data.id,
    date: pending.date,
    time: pending.time,
    service: serviceLabel(pending),
    ...pending.info,
    payment_status: data.payment_status,
    total: data.total,
  };
  try {
    sessionStorage.setItem(LAST_KEY, JSON.stringify(booking));
  } catch {
    /* ignore */
  }
  return { id: data.id, booking };
}

export function savePending(data) {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}
export function loadPending() {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_KEY) || 'null');
  } catch {
    return null;
  }
}
export function clearPending() {
  try {
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}
export function loadLastBooking() {
  try {
    return JSON.parse(sessionStorage.getItem(LAST_KEY) || 'null');
  } catch {
    return null;
  }
}

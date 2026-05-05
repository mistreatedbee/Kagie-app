import React, { useMemo, useState } from 'react';
import DatePicker from './DatePicker';
import { trackEvent } from '../lib/analytics';
import { format } from 'date-fns';

type Props = {
  price: number;
  onInstantBook?: (payload?: any) => void;
  onRequest?: (payload?: any) => void;
  unavailable?: string[];
}

export default function ReserveCard({ price, onInstantBook, onRequest, unavailable = [], minNights = 1 }: Props & { minNights?: number }) {
  const [range, setRange] = useState<any>(undefined);
  const [instant, setInstant] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'ZAR'|'USD'|'EUR'>('ZAR');

  const nights = useMemo(() => {
    if (!range || !range.from || !range.to) return 0;
    const diff = Math.round((range.to - range.from) / (1000 * 60 * 60 * 24));
    return diff || 1;
  }, [range]);

  // convert unavailable strings (if any) into Date objects for DatePicker
  const disabledDates = useMemo(() => {
    return unavailable.map((d: any) => new Date(d));
  }, [unavailable]);

  // check if selected range includes any disabled dates
  function rangeIncludesDisabled(from?: Date, to?: Date) {
    if (!from || !to) return false;
    const start = from.setHours(0, 0, 0, 0);
    const end = to.setHours(0, 0, 0, 0);
    return disabledDates.some(dd => {
      const t = new Date(dd).setHours(0, 0, 0, 0);
      return t >= start && t <= end;
    });
  }

  const subtotal = useMemo(() => nights * price, [nights, price]);
  const cleaning = subtotal ? 150 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + cleaning + taxes - applied;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === 'STUDENT10') {
      const disc = Math.round(subtotal * 0.1);
      setApplied(disc);
    } else {
      setApplied(0);
      alert('Invalid coupon');
      trackEvent('coupon_invalid', { code: coupon });
    }
  }

  function validateAndProceed(action: 'instant' | 'request') {
    setError(null);
    if (!range || !range.from || !range.to) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    if (rangeIncludesDisabled(range.from, range.to)) {
      setError('Selected dates include unavailable dates. Please choose different dates.');
      return;
    }
    if (nights < minNights) {
      setError(`Minimum stay is ${minNights} nights.`);
      return;
    }
    setError(null);
    trackEvent(action === 'instant' ? 'book_initiated' : 'request_initiated', { range, total });
    if (action === 'instant') onInstantBook?.({ range, total }); else onRequest?.({ range });
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-2xl font-bold">R{price.toLocaleString()}</div>
          <div className="text-xs text-neutral-500">/ month</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{nights} nights</div>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium">Select dates</label>
        <DatePicker selected={range} onSelect={setRange} disabledDates={disabledDates} />
        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Promo code</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value as any)} className="text-sm border rounded px-2 py-1">
            <option>ZAR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
        <div className="flex gap-2 mt-2">
          <input value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 rounded-lg border border-neutral-200 px-3 py-2" placeholder="Enter code" />
          <button onClick={applyCoupon} className="bg-brand text-white px-4 rounded-lg">Apply</button>
        </div>
      </div>

      <div className="mb-4 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>R{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span>Cleaning</span><span>R{cleaning}</span></div>
        <div className="flex justify-between"><span>Taxes</span><span>R{taxes}</span></div>
        {applied > 0 && (<div className="flex justify-between text-green-700"><span>Discount</span><span>-R{applied}</span></div>)}
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg"> <span>Total</span><span>R{total.toLocaleString()}</span></div>
      </div>

      <div className="mb-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={instant} onChange={() => setInstant(!instant)} aria-checked={instant} aria-label="Instant book toggle" />
          Instant Book
        </label>
      </div>

      <div className="flex gap-3">
        <button onClick={() => validateAndProceed(instant ? 'instant' : 'request')} className="flex-1 bg-brand text-white py-3 rounded-2xl font-bold">{instant ? 'Book Now' : 'Request to Book'}</button>
        <button onClick={() => alert('Message host modal (mock)')} className="px-4 py-3 border rounded-2xl">Message</button>
      </div>
    </div>
  );
}
